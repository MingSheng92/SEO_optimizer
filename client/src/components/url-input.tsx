import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface UrlInputProps {
  onAnalyze: (url: string) => void;
  loading: boolean;
}

export default function UrlInput({ onAnalyze, loading }: UrlInputProps) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url.trim());
    }
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 mb-4 sm:mb-6 lg:mb-8">
      <div className="max-w-3xl">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">Analyze Website SEO</h2>
        <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6">Enter any website URL to analyze its SEO meta tags and get actionable insights.</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex-1">
            <Input
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-3 sm:px-4 sm:py-3 text-sm sm:text-base border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <Button
            type="submit"
            disabled={loading || !url.trim() || !isValidUrl(url.trim())}
            className="bg-blue-600 text-white px-4 py-3 sm:px-6 sm:py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center min-w-[100px] sm:min-w-[120px] text-sm sm:text-base"
          >
            {loading && <Loader2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />}
            {loading ? "Analyzing..." : "Analyze SEO"}
          </Button>
        </form>
      </div>
    </div>
  );
}
