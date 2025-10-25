export default function FlashSaleTimer({ timeLeft }) {
  return (
    <div className="flex space-x-3 sm:space-x-4">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div className="px-3 py-2 rounded">
            <div className="text-lg sm:text-2xl font-bold">
              {value.toString().padStart(2, "0")}
            </div>
            <div className="text-xs sm:text-sm">{unit}</div>
          </div>
        </div>
      ))}
    </div>
  );
}