const StatusBadge = ({ status, size = 'large' }) => {
  const getStatusClass = () => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'delivered') return 'bg-green-100 text-green-800';
    if (statusLower === 'processing') return 'bg-blue-100 text-blue-800';
    if (statusLower === 'shipped') return 'bg-purple-100 text-purple-800';
    return 'bg-gray-100 text-gray-800';
  };

  const sizeClasses = size === 'large' 
    ? 'px-4 py-2 text-sm font-semibold' 
    : 'px-2 py-1 text-xs';

    
  return (
    <span className={`${getStatusClass()} ${sizeClasses} rounded-full whitespace-nowrap`}>
      {status}
    </span>
  );
};

export default StatusBadge;