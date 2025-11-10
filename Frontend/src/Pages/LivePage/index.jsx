import React, { useState } from "react";

const categories = ["Tournament", "TDM Knockout", "Scrims"];

const liveVideos = {
  Tournament: [
    {
      id: 1,
      title: "BGMI Tournament Finals Live",
      thumbnail: "/clutch2.jpg",
      url: "https://www.youtube.com/watch?v=abc123",
    },
    {
      id: 2,
      title: "Grand Finals Day 2",
      thumbnail: "/Clutch.png",
      url: "https://www.youtube.com/watch?v=def456",
    },
    {
      id: 3,
      title: "Grand Finals Day 2",
      thumbnail: "/Clutch.png",
      url: "https://www.youtube.com/watch?v=def456",
    },
    {
      id: 4,
      title: "Grand Finals Day 2",
      thumbnail: "/Clutch.png",
      url: "https://www.youtube.com/watch?v=def456",
    },
    {
      id: 3,
      title: "Semi Finals Day 1",
      thumbnail: "/live2.jpg",
      url: "https://www.youtube.com/watch?v=ghi789",
    },
  ],
  "TDM Knockout": [
    {
      id: 1,
      title: "TDM Knockout Semi Finals Live",
      thumbnail: "/live3.jpg",
      url: "https://www.youtube.com/watch?v=jkl012",
    },
    {
      id: 2,
      title: "1v1 Clutch Showdown",
      thumbnail: "/live4.jpg",
      url: "https://www.youtube.com/watch?v=mno345",
    },
    {
      id: 3,
      title: "1v1 Clutch Showdown",
      thumbnail: "/live4.jpg",
      url: "https://www.youtube.com/watch?v=mno345",
    },
    {
      id: 4,
      title: "1v1 Clutch Showdown",
      thumbnail: "/live4.jpg",
      url: "https://www.youtube.com/watch?v=mno345",
    },
  ],
  Scrims: [
    {
      id: 1,
      title: "Daily Scrims Match Highlights",
      thumbnail: "/highlights.jpg",
      url: "https://www.youtube.com/watch?v=pqr678",
    },
    {
      id: 2,
      title: "Squad Scrims Battle Live",
      thumbnail: "/live2.jpg",
      url: "https://www.youtube.com/watch?v=stu901",
    },
    {
      id: 3,
      title: "Squad Scrims Battle Live",
      thumbnail: "/live2.jpg",
      url: "https://www.youtube.com/watch?v=stu901",
    },
    {
      id: 4,
      title: "Squad Scrims Battle Live",
      thumbnail: "/live2.jpg",
      url: "https://www.youtube.com/watch?v=stu901",
    },
  ],
};

const LivePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tournament");

  return (
    <div className="min-h-screen bg-[#0B0E16] text-white px-10 py-10">
      {/* ====== HEADER SECTION ====== */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
        <h1 className="text-4xl font-extrabold text-cyan-400 mb-4 md:mb-0">
          Live Streams
        </h1>

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 text-lg font-semibold rounded-lg border transition-all duration-300 ${
                selectedCategory === cat
                  ? "border-cyan-500 bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                  : "border-cyan-700 text-cyan-400 hover:bg-cyan-500 hover:text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ====== VIDEO GRID ====== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {liveVideos[selectedCategory].map((video) => (
          <div
            key={video.id}
            className="bg-[#10131F] rounded-xl overflow-hidden border border-[#06B6D4]/30 hover:border-[#06B6D4]/70 transition-all duration-300 shadow-[0_0_25px_rgba(0,0,0,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.3)]"
          >
            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {/* Thumbnail with LIVE Badge */}
              <div className="relative w-full aspect-video overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
                  LIVE
                </span>
              </div>

              {/* Video Title */}
              <div className="p-3">
                <h2 className="text-base font-semibold text-white truncate hover:text-cyan-400 transition">
                  {video.title}
                </h2>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LivePage;
