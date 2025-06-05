interface FacebookPreviewProps {
  title: string | null;
  description: string | null;
  url: string;
}

export default function FacebookPreview({ title, description, url }: FacebookPreviewProps) {
  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.toUpperCase();
    } catch {
      return url.toUpperCase();
    }
  };

  const truncateText = (text: string | null, maxLength = 80) => {
    if (!text) return "No description available";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-4 sm:p-6 border-b border-slate-200">
        <h3 className="text-base sm:text-lg font-semibold text-slate-900">Facebook Preview</h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">How your page appears when shared on Facebook</p>
      </div>
      <div className="p-4 sm:p-6">
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <div className="w-full h-24 sm:h-32 bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center">
            <div className="text-slate-400 text-center">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span className="text-xs">Preview Image</span>
            </div>
          </div>
          <div className="p-3 sm:p-4 bg-slate-50">
            <p className="text-xs text-slate-500 mb-1 truncate">{getDomain(url)}</p>
            <h4 className="text-sm font-medium text-slate-900 line-clamp-2">
              {title || "Untitled Page"}
            </h4>
            <p className="text-xs text-slate-600 mt-1 line-clamp-2">
              {truncateText(description)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
