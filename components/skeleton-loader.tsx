const SkeletonLoader = () => (
  <div className="animate-pulse bg-white py-4 my-2">
    <div className="flex flex-col justify-between p-4 border-b md:flex-row md:items-center">
      <div className="flex items-center gap-3">
        {/* Airline logo placeholder */}
        <div className="w-12 h-12 bg-gray-300 rounded"></div>
        {/* Airline details placeholder */}
        <div>
          <div className="w-32 h-4 mb-2 bg-gray-300 rounded"></div>
          <div className="w-24 h-3 bg-gray-200 rounded"></div>
          <div className="w-20 h-3 mt-1 bg-gray-200 rounded"></div>
        </div>
      </div>
      {/* Flight segments placeholders */}
      <div className="flex flex-row items-center justify-between w-full gap-4 mt-4 md:px-4 md:mt-0">
        <div className="flex-1">
          <div className="w-32 h-4 mb-2 bg-gray-300 rounded"></div>
          <div className="w-24 h-3 bg-gray-200 rounded"></div>
          <div className="w-20 h-3 mt-1 bg-gray-200 rounded"></div>
        </div>
        {/* Flight duration placeholder */}
        <div className="flex-1 text-center">
          <div className="w-8 h-8 mx-auto bg-gray-300 rounded-full"></div>
          <p className="w-16 h-3 mx-auto mt-2 bg-gray-200 rounded"></p>
        </div>
        <div className="flex-1">
          <div className="w-32 h-4 mb-2 bg-gray-300 rounded"></div>
          <div className="w-24 h-3 bg-gray-200 rounded"></div>
          <div className="w-20 h-3 mt-1 bg-gray-200 rounded"></div>
        </div>
      </div>
      {/* Cabin details placeholder */}
      <div className="w-full h-4 mt-4 bg-gray-300 rounded md:w-24 md:mt-0"></div>
    </div>
  </div>
);

export default SkeletonLoader;
