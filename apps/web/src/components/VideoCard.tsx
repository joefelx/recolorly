import React from "react";

export default function VideoCard() {
  return (
    <div className="w-full p-5 my-10 flex items-center justify-center">
      <iframe
        width="560"
        height="315"
        className="border-2 border-[#FC2D35]"
        src="https://www.youtube.com/embed/SpgN6tX5_YM?si=chZS6GPZ6HVghrBn"
        title="Recolorly Demo"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
}
