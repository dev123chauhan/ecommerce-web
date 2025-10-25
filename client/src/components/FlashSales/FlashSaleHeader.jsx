import { ArrowLeft, ArrowRight } from "lucide-react";
import FlashSaleTimer from "./FlashSaleTimer";
export default function FlashSaleHeader({ timeLeft, onScroll }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
      <h2 className="text-2xl sm:text-3xl font-bold">Flash Sales</h2>

      <FlashSaleTimer timeLeft={timeLeft} />

      <div className="flex space-x-2">
        <button
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
          onClick={() => onScroll("left")}
        >
          <ArrowLeft size={20} />
        </button>
        <button
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
          onClick={() => onScroll("right")}
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
