import { Check, AlertTriangle, X } from "lucide-react";

interface MetaTagsAnalysisProps {
  title: string | null;
  description: string | null;
  keywords: string | null;
  canonical: string | null;
}

export default function MetaTagsAnalysis({ 
  title, 
  description, 
  keywords, 
  canonical 
}: MetaTagsAnalysisProps) {
  
  const getTitleStatus = () => {
    if (!title) return { status: "error", text: "Missing", color: "red" };
    if (title.length >= 30 && title.length <= 60) return { status: "good", text: "Good", color: "green" };
    if (title.length > 60) return { status: "warning", text: "Too Long", color: "yellow" };
    return { status: "warning", text: "Too Short", color: "yellow" };
  };

  const getDescriptionStatus = () => {
    if (!description) return { status: "error", text: "Missing", color: "red" };
    if (description.length >= 120 && description.length <= 155) return { status: "good", text: "Good", color: "green" };
    if (description.length > 155) return { status: "warning", text: "Too Long", color: "yellow" };
    return { status: "warning", text: "Too Short", color: "yellow" };
  };

  const StatusIcon = ({ status }: { status: string }) => {
    switch (status) {
      case "good":
        return <Check className="w-3 h-3 text-green-600" />;
      case "warning":
        return <AlertTriangle className="w-3 h-3 text-yellow-600" />;
      case "error":
        return <X className="w-3 h-3 text-red-600" />;
      default:
        return null;
    }
  };

  const titleStatus = getTitleStatus();
  const descriptionStatus = getDescriptionStatus();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-4 sm:p-6 border-b border-slate-200">
        <h3 className="text-base sm:text-lg font-semibold text-slate-900">Meta Tags Analysis</h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">Essential meta tags for search engine optimization</p>
      </div>
      <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
        {/* Title Tag */}
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-1">
            <div className={`w-5 h-5 bg-${titleStatus.color}-100 rounded-full flex items-center justify-center`}>
              <StatusIcon status={titleStatus.status} />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-slate-900">Title Tag</h4>
              <span className={`text-xs text-${titleStatus.color}-600 bg-${titleStatus.color}-50 px-2 py-1 rounded`}>
                {titleStatus.text}
              </span>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              {title || "No title tag found"}
            </p>
            {title && (
              <div className="flex items-center mt-2 text-xs text-slate-500">
                <span>{title.length} characters</span>
                <span className="mx-2">•</span>
                <span>
                  {title.length >= 30 && title.length <= 60 
                    ? "Optimal length (30-60 chars)" 
                    : title.length > 60 
                      ? "Exceeds recommended 60 chars"
                      : "Below recommended 30 chars"
                  }
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Meta Description */}
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-1">
            <div className={`w-5 h-5 bg-${descriptionStatus.color}-100 rounded-full flex items-center justify-center`}>
              <StatusIcon status={descriptionStatus.status} />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-slate-900">Meta Description</h4>
              <span className={`text-xs text-${descriptionStatus.color}-600 bg-${descriptionStatus.color}-50 px-2 py-1 rounded`}>
                {descriptionStatus.text}
              </span>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              {description || "No meta description found"}
            </p>
            {description && (
              <div className="flex items-center mt-2 text-xs text-slate-500">
                <span>{description.length} characters</span>
                <span className="mx-2">•</span>
                <span className={description.length > 155 ? "text-yellow-600" : ""}>
                  {description.length >= 120 && description.length <= 155
                    ? "Optimal length (120-155 chars)"
                    : description.length > 155
                      ? "Exceeds recommended 155 chars"
                      : "Below recommended 120 chars"
                  }
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Meta Keywords */}
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-1">
            <div className={`w-5 h-5 ${keywords ? "bg-green-100" : "bg-red-100"} rounded-full flex items-center justify-center`}>
              {keywords ? <Check className="w-3 h-3 text-green-600" /> : <X className="w-3 h-3 text-red-600" />}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-slate-900">Meta Keywords</h4>
              <span className={`text-xs ${keywords ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"} px-2 py-1 rounded`}>
                {keywords ? "Present" : "Missing"}
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              {keywords || "No meta keywords found"}
            </p>
            {!keywords && (
              <p className="text-xs text-slate-500 mt-2">
                While not critical for SEO, some search engines still consider meta keywords
              </p>
            )}
          </div>
        </div>

        {/* Canonical URL */}
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-1">
            <div className={`w-5 h-5 ${canonical ? "bg-green-100" : "bg-yellow-100"} rounded-full flex items-center justify-center`}>
              {canonical ? <Check className="w-3 h-3 text-green-600" /> : <AlertTriangle className="w-3 h-3 text-yellow-600" />}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-slate-900">Canonical URL</h4>
              <span className={`text-xs ${canonical ? "text-green-600 bg-green-50" : "text-yellow-600 bg-yellow-50"} px-2 py-1 rounded`}>
                {canonical ? "Present" : "Missing"}
              </span>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              {canonical || "No canonical URL found"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
