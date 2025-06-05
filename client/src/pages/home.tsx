import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import UrlInput from "@/components/url-input";
import OverviewStats from "@/components/overview-stats";
import MetaTagsAnalysis from "@/components/meta-tags-analysis";
import OpenGraphAnalysis from "@/components/open-graph-analysis";
import TwitterCardAnalysis from "@/components/twitter-card-analysis";
import GooglePreview from "@/components/google-preview";
import FacebookPreview from "@/components/facebook-preview";
import TwitterPreview from "@/components/twitter-preview";
import ActionPanel from "@/components/action-panel";
import type { SeoAnalysisResponse } from "@shared/schema";

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<SeoAnalysisResponse | null>(null);
  const { toast } = useToast();

  const analyzeMutation = useMutation({
    mutationFn: async (url: string) => {
      const response = await apiRequest("POST", "/api/analyze", { url });
      return response.json() as Promise<SeoAnalysisResponse>;
    },
    onSuccess: (data) => {
      setAnalysisResult(data);
      toast({
        title: "Analysis Complete",
        description: `SEO analysis completed with a score of ${data.overallScore}/100`,
      });
    },
    onError: (error) => {
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze the website",
        variant: "destructive",
      });
    },
  });

  const handleAnalyze = (url: string) => {
    analyzeMutation.mutate(url);
  };

  const handleExportReport = () => {
    if (!analysisResult) {
      toast({
        title: "No Data",
        description: "Please run an analysis first",
        variant: "destructive",
      });
      return;
    }

    const reportData = {
      analysis: analysisResult,
      timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `seo-analysis-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Report Exported",
      description: "SEO analysis report has been downloaded",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-lg sm:text-xl font-bold text-slate-900">SEO Analyzer</h1>
              </div>
            </div>
            <div className="flex items-center">
              <Button 
                onClick={handleExportReport}
                className="bg-blue-600 text-white hover:bg-blue-700 text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-2"
                disabled={!analysisResult}
              >
                <span className="hidden sm:inline">Export Report</span>
                <span className="sm:hidden">Export</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* URL Input Section */}
        <UrlInput 
          onAnalyze={handleAnalyze} 
          loading={analyzeMutation.isPending}
        />

        {/* Analysis Results */}
        {analysisResult && (
          <div className="analysis-results">
            {/* Overview Stats */}
            <OverviewStats 
              overallScore={analysisResult.overallScore}
              warningCount={analysisResult.warningCount}
              errorCount={analysisResult.errorCount}
              passedCount={analysisResult.passedCount}
            />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {/* Left Column: SEO Analysis */}
              <div className="xl:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
                <MetaTagsAnalysis 
                  title={analysisResult.title}
                  description={analysisResult.description}
                  keywords={analysisResult.keywords}
                  canonical={analysisResult.canonical}
                />
                
                <OpenGraphAnalysis 
                  openGraphTags={analysisResult.openGraphTags}
                />
                
                <TwitterCardAnalysis 
                  twitterTags={analysisResult.twitterTags}
                />
              </div>

              {/* Right Column: Preview Cards */}
              <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                <GooglePreview 
                  title={analysisResult.title}
                  description={analysisResult.description}
                  url={analysisResult.url}
                />
                
                <FacebookPreview 
                  title={analysisResult.title}
                  description={analysisResult.description}
                  url={analysisResult.url}
                />
                
                <TwitterPreview 
                  title={analysisResult.title}
                  description={analysisResult.description}
                  url={analysisResult.url}
                />
                
                <ActionPanel 
                  onRefresh={() => handleAnalyze(analysisResult.url)}
                  onExport={handleExportReport}
                  onShare={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'SEO Analysis Results',
                        text: `SEO Score: ${analysisResult.overallScore}/100 for ${analysisResult.url}`,
                        url: window.location.href
                      });
                    } else {
                      const shareText = `SEO Analysis Results\nScore: ${analysisResult.overallScore}/100\nURL: ${analysisResult.url}`;
                      navigator.clipboard.writeText(shareText).then(() => {
                        toast({
                          title: "Results Copied",
                          description: "Results copied to clipboard!",
                        });
                      });
                    }
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
