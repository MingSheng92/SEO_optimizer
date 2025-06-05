import { Button } from "@/components/ui/button";
import { RefreshCw, Download, Share2 } from "lucide-react";

interface ActionPanelProps {
  onRefresh: () => void;
  onExport: () => void;
  onShare: () => void;
}

export default function ActionPanel({ onRefresh, onExport, onShare }: ActionPanelProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Quick Actions</h3>
        <div className="space-y-2 sm:space-y-3">
          <Button 
            onClick={onRefresh}
            className="w-full bg-blue-50 text-blue-700 hover:bg-blue-100 border-0 text-sm sm:text-base py-2 sm:py-3"
            variant="outline"
          >
            <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Refresh Analysis
          </Button>
          <Button 
            onClick={onExport}
            className="w-full bg-green-50 text-green-700 hover:bg-green-100 border-0 text-sm sm:text-base py-2 sm:py-3"
            variant="outline"
          >
            <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Download Report
          </Button>
          <Button 
            onClick={onShare}
            className="w-full bg-purple-50 text-purple-700 hover:bg-purple-100 border-0 text-sm sm:text-base py-2 sm:py-3"
            variant="outline"
          >
            <Share2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Share Results
          </Button>
        </div>
      </div>
    </div>
  );
}
