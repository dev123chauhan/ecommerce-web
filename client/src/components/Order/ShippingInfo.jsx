const ShippingInfo = ({ customerInfo }) => {
  return (
    <div className="border-t pt-4">
      <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div className="space-y-1">
          <p className="text-gray-600 dark:text-gray-400">Name</p>
          <p className="font-semibold">{customerInfo.name}</p>
        </div>
        <div className="space-y-1">
          <p className="text-gray-600 dark:text-gray-400">Email</p>
          <p className="font-semibold">{customerInfo.email}</p>
        </div>
        <div className="sm:col-span-2 space-y-1">
          <p className="text-gray-600 dark:text-gray-400">Shipping Address</p>
          <p className="font-semibold">
            {customerInfo.address}
            <br />
            {customerInfo.city}, {customerInfo.zipCode}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;