import { Check, AlertTriangle, Minus } from "lucide-react";

interface OpenGraphAnalysisProps {
  openGraphTags: {
    title: boolean;
    description: boolean;
    image: boolean;
    url: boolean;
    type: boolean;
    site_name: boolean;
    locale: boolean;
  };
}

export default function OpenGraphAnalysis({ openGraphTags }: OpenGraphAnalysisProps) {
  const TagStatus = ({ present, required = false }: { present: boolean; required?: boolean }) => {
    if (present) return <span className="text-green-600 text-xs">✓ Present</span>;
    if (required) return <span className="text-yellow-600 text-xs">⚠ Missing</span>;
    return <span className="text-slate-400 text-xs">- Missing</span>;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-4 sm:p-6 border-b border-slate-200">
        <h3 className="text-base sm:text-lg font-semibold text-slate-900">Open Graph Tags</h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">Social media sharing optimization</p>
      </div>
      <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <h5 className="text-sm font-medium text-slate-900 mb-2">Required Tags</h5>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">og:title</span>
                <TagStatus present={openGraphTags.title} required />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">og:description</span>
                <TagStatus present={openGraphTags.description} required />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">og:image</span>
                <TagStatus present={openGraphTags.image} required />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">og:url</span>
                <TagStatus present={openGraphTags.url} required />
              </div>
            </div>
          </div>
          <div>
            <h5 className="text-sm font-medium text-slate-900 mb-2">Optional Tags</h5>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">og:type</span>
                <TagStatus present={openGraphTags.type} />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">og:site_name</span>
                <TagStatus present={openGraphTags.site_name} />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">og:locale</span>
                <TagStatus present={openGraphTags.locale} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
