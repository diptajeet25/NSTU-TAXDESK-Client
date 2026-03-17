const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">

      {/* Loader */}
      <div className="relative w-20 h-20 mb-6">

        {/* Outer soft ring */}
        <div className="absolute inset-0 rounded-full border-4 border-indigo-100"></div>

        {/* Animated ring */}
        <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>

        {/* Center dot (FIXED SIZE + CENTERED) */}
        <div className="absolute w-12 h-12 bg-indigo-400 opacity-70 rounded-full 
                        top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

      </div>

      {/* Text */}
      <p className="text-sm text-gray-500 !mt-1 tracking-wide">
        Loading dashboard data...
      </p>

    </div>
  );
};

export default Loading;