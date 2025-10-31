import React from "react";

export const NotificationBar = () => {
  return (
    <div className="w-full h-10 flex justify-center bg-neutral-900 text-white">
      <div className="flex items-center justify-center gap-2">
        <p className="text-sm">Get 25% OFF on your first order.</p>
        <span className="font-medium underline cursor-pointer">Order Now</span>
      </div>
    </div>
  );
};
