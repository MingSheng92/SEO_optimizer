interface TwitterPreviewProps {
  title: string | null;
  description: string | null;
  url: string;
}

export default function TwitterPreview({ title, description, url }: TwitterPreviewProps) {
  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  const truncateText = (text: string | null, maxLength = 70) => {
    if (!text) return "No description available";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-4 sm:p-6 border-b border-slate-200">
        <h3 className="text-base sm:text-lg font-semibold text-slate-900">Twitter Preview</h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">How your page appears when shared on Twitter</p>
      </div>
      <div className="p-4 sm:p-6">
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <div className="w-full h-24 sm:h-32 bg-gradient-to-r from-sky-100 to-sky-200 flex items-center justify-center">
            <div className="text-slate-400 text-center">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              <span className="text-xs">Card Image</span>
            </div>
          </div>
          <div className="p-3 sm:p-4">
            <h4 className="text-sm font-medium text-slate-900 line-clamp-2">
              {title || "Untitled Page"}
            </h4>
            <p className="text-xs text-slate-600 mt-1 line-clamp-2">
              {truncateText(description)}
            </p>
            <div className="flex items-center mt-2 text-xs text-slate-500">
              <span className="truncate">{getDomain(url)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
