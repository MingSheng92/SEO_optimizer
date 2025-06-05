import { Badge } from "@/components/ui/badge";

interface TwitterCardAnalysisProps {
  twitterTags: {
    card: string | null;
    site: string | null;
    creator: string | null;
    title: boolean;
    description: boolean;
    image: boolean;
  };
}

export default function TwitterCardAnalysis({ twitterTags }: TwitterCardAnalysisProps) {
  const TagStatus = ({ present }: { present: boolean }) => {
    return present ? (
      <span className="text-green-600 text-xs">✓ Present</span>
    ) : (
      <span className="text-slate-400 text-xs">- Missing</span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-4 sm:p-6 border-b border-slate-200">
        <h3 className="text-base sm:text-lg font-semibold text-slate-900">Twitter Card Tags</h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">Twitter-specific sharing optimization</p>
      </div>
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <h5 className="text-sm font-medium text-slate-900 mb-3">Card Configuration</h5>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">twitter:card</span>
                {twitterTags.card ? (
                  <Badge variant="secondary" className="bg-blue-50 text-blue-600">
                    {twitterTags.card}
                  </Badge>
                ) : (
                  <span className="text-slate-400 text-xs">- Missing</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">twitter:site</span>
                {twitterTags.site ? (
                  <span className="text-green-600 text-xs">✓ {twitterTags.site}</span>
                ) : (
                  <span className="text-slate-400 text-xs">- Missing</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">twitter:creator</span>
                {twitterTags.creator ? (
                  <span className="text-green-600 text-xs">✓ {twitterTags.creator}</span>
                ) : (
                  <span className="text-slate-400 text-xs">- Missing</span>
                )}
              </div>
            </div>
          </div>
          <div>
            <h5 className="text-sm font-medium text-slate-900 mb-3">Content Tags</h5>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">twitter:title</span>
                <TagStatus present={twitterTags.title} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">twitter:description</span>
                <TagStatus present={twitterTags.description} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">twitter:image</span>
                <TagStatus present={twitterTags.image} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
