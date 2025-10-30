import React from "react";
import { Link } from "react-router-dom"

const VideoBanner = () => {
    return (
         <div className="relative w-full h-[90vh] overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/BgmiBanner.mp4"
        autoPlay
        loop
        muted
        playsInline
      ></video>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>

      {/* Text Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Welcome to Play4Glory
        </h1>
        <p className="text-lg md:text-2xl mb-8 max-w-2xl drop-shadow-md">
          Join thrilling tournaments, intense scrims, and epic TDM battles. Prove your glory today!
        </p>
        <Link to="/tournament">
          <button className="bg-[#06B6D4] hover:bg-[#0891B2] text-white font-semibold px-6 py-3 rounded-lg text-lg transition-all duration-300 shadow-lg hover:scale-105">
            Join Now
          </button>
        </Link>
      </div>
    </div>
    )
}

export default VideoBanner;