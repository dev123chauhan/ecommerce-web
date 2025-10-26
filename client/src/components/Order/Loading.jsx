const Loading = () => {
  return (
    <div className="min-h-screen dark:bg-gray-900 dark:text-white flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-[#db4444] border-r-transparent mb-4"></div>
        <p>Loading your orders...</p>
      </div>
    </div>
  );
};

export default Loading;