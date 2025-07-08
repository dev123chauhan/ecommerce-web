import  { useState } from 'react';
import { Trash2, ChevronLeft, AlertTriangle } from 'lucide-react';
import airpods from "../../assets/airpods.png"
const MyCancellation = () => {
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [otherReason, setOtherReason] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);

  const cancellationReasons = [
    'Changed my mind',
    'Found a better price',
    'Shipping takes too long',
    'Product not needed anymore',
    'Ordered by mistake'
  ];

  const handleReasonToggle = (reason) => {
    setSelectedReasons(prev => 
      prev.includes(reason) 
        ? prev.filter(r => r !== reason)
        : [...prev, reason]
    );
  };

  const handleCancellation = () => {
    console.log('Order cancelled', {
      reasons: [...selectedReasons, ...(otherReason ? [`Other: ${otherReason}`] : [])]
    });
    setIsConfirming(false);
  };

  return (
    <div className='dark:bg-gray-900 dark:text-white transition-colors duration-300'>
    <div className="min-h-screen  flex flex-col max-w-7xl mx-auto">

      <header className="shadow-sm p-4 flex items-center ">
        <button className="mr-4">
          <ChevronLeft className="" />
        </button>
        <h1 className="text-xl font-semibold  mt-40">Cancel Order</h1>
      </header>


      <div className="p-4 shadow-sm mb-4">
        <div className="flex items-center">
          <img 
            src={airpods} 
            alt="Product" 
            className="w-20 h-20 object-cover rounded-lg mr-4"
          />
          <div>
            <h2 className="font-medium">Buds</h2>
            <p className="text-gray-500 text-sm">Quantity: 1 | $129.99</p>
          </div>
        </div>
      </div>


      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">
          Why are you cancelling?
        </h3>
        
        <div className="space-y-3">
          {cancellationReasons.map((reason) => (
            <label 
              key={reason} 
              className="flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedReasons.includes(reason)}
                onChange={() => handleReasonToggle(reason)}
                className="mr-3 w-5 h-5 rounded accent-black"
              />
              <span className="text-gray-700">{reason}</span>
            </label>
          ))}

          <div className="mt-4">
            <label 
              htmlFor="other-reason" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Other Reason (Optional)
            </label>
            <textarea
              id="other-reason"
              rows="3"
              value={otherReason}
              onChange={(e) => setOtherReason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
              placeholder="Explain your reason for cancellation"
            />
          </div>
        </div>
      </div>

      {!isConfirming && (
        <div className="p-4  mt-4">
          <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md flex items-center mb-4">
            <AlertTriangle className="text-yellow-500 mr-3" />
            <p className="text-yellow-800 text-sm">
              Please note that cancellation is subject to order status and processing stage.
            </p>
          </div>
        </div>
      )}


      <div className="mt-auto p-4  shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        {!isConfirming ? (
          <button 
            onClick={() => setIsConfirming(true)}
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
          >
            <Trash2 className="mr-2" />
            Cancel Order
          </button>
        ) : (
          <div className="space-y-3">
            <button 
              onClick={handleCancellation}
              className="w-full bg-red-600 text-white  py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              Confirm Cancellation
            </button>
            <button 
              onClick={() => setIsConfirming(false)}
              className="w-full bg-black text-white  py-3 rounded-lg  transition-colors"
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default MyCancellation;