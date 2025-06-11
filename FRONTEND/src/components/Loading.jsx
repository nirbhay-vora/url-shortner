import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center w-screen justify-center h-screen bg-gradient-to-br from-purple-100 to-blue-100">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500"></div>
      <p className="text-purple-700 text-xl ml-4">Loading...</p>
    </div>
  );
};

export default Loading;
