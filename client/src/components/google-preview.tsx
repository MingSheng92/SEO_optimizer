interface GooglePreviewProps {
  title: string | null;
  description: string | null;
  url: string;
}

export default function GooglePreview({ title, description, url }: GooglePreviewProps) {
  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  const truncateDescription = (text: string | null, maxLength = 155) => {
    if (!text) return "No description available";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-4 sm:p-6 border-b border-slate-200">
        <h3 className="text-base sm:text-lg font-semibold text-slate-900">Google Search Preview</h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">How your page appears in search results</p>
      </div>
      <div className="p-4 sm:p-6">
        <div className="bg-slate-50 p-3 sm:p-4 rounded-lg">
          <div className="space-y-1">
            <div className="text-xs sm:text-sm text-slate-600 truncate">
              {getDomain(url)} › {url.split('/').slice(3).join(' › ')}
            </div>
            <h4 className="text-base sm:text-lg text-blue-600 hover:underline cursor-pointer line-clamp-2">
              {title || "Untitled Page"}
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed line-clamp-3">
              {truncateDescription(description)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
