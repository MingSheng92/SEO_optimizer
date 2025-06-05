interface OverviewStatsProps {
  overallScore: number;
  warningCount: number;
  errorCount: number;
  passedCount: number;
}

export default function OverviewStats({ 
  overallScore, 
  warningCount, 
  errorCount, 
  passedCount 
}: OverviewStatsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "#10b981";
    if (score >= 60) return "#f59e0b";
    return "#ef4444";
  };

  const getScoreText = (score: number) => {
    if (score >= 80) return "Very Good";
    if (score >= 60) return "Good";
    return "Needs Work";
  };

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 lg:mb-8">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-8">
        {/* Circular Progress Score */}
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="relative">
            <svg className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 transform -rotate-90" viewBox="0 0 120 120">
              {/* Background circle */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                stroke="#f3f4f6"
                strokeWidth="8"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                stroke={getScoreColor(overallScore)}
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-slate-900">{overallScore}</div>
                <div className="text-xs sm:text-sm text-slate-500">/100</div>
              </div>
            </div>
          </div>
          <div className="mt-3 sm:mt-4 text-center">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900">Overall SEO Score</h3>
            <p className="text-xs sm:text-sm text-slate-600">{getScoreText(overallScore)}</p>
          </div>
        </div>

        {/* SEO Summary Cards */}
        <div className="flex-1 w-full">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">SEO Summary</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {/* Passed Checks */}
            <div className="bg-green-50 rounded-lg p-3 sm:p-4 border border-green-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-2 sm:ml-3">
                  <p className="text-xs sm:text-sm font-medium text-green-800">Passed Checks</p>
                  <p className="text-xl sm:text-2xl font-bold text-green-900">{passedCount}</p>
                </div>
              </div>
            </div>

            {/* Warnings */}
            <div className="bg-yellow-50 rounded-lg p-3 sm:p-4 border border-yellow-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-2 sm:ml-3">
                  <p className="text-xs sm:text-sm font-medium text-yellow-800">Warnings</p>
                  <p className="text-xl sm:text-2xl font-bold text-yellow-900">{warningCount}</p>
                </div>
              </div>
            </div>

            {/* Failed Checks */}
            <div className="bg-red-50 rounded-lg p-3 sm:p-4 border border-red-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-2 sm:ml-3">
                  <p className="text-xs sm:text-sm font-medium text-red-800">Failed Checks</p>
                  <p className="text-xl sm:text-2xl font-bold text-red-900">{errorCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
