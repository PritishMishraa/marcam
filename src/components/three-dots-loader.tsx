import React from "react";

export const ThreeDotsLoader = () => {
  return (
    <div>
      <span className="w-2 h-2 ml-2 rounded-full bg-gray-200 inline-block animate-flash"></span>
      <span className="w-2 h-2 ml-2 rounded-full bg-gray-200 inline-block animate-flash [animation-delay:0.2s]"></span>
      <span className="w-2 h-2 ml-2 rounded-full bg-gray-200 inline-block animate-flash [animation-delay:0.4s]"></span>
    </div>
  );
};
