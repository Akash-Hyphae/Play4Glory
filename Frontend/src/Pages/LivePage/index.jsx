import React, { useState, useEffect } from "react";
import api from "../../Api/axios";

const categories = ["Tournament", "TDM Knockout", "Scrims"];

const getYouTubeThumbnail = (url, fallback) => {
  if (!url) return fallback;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : fallback;
};

const LivePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tournament");
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiveStreams = async () => {
      try {
        const res = await api.get("/tournaments");
        const allTournaments = res.data.tournaments || [];

        const streamTournaments = allTournaments.filter(
          (t) => t.liveStreamUrl && t.liveStreamUrl.trim() !== ""
        );

        setTournaments(streamTournaments);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveStreams();
  }, []);

  const getFilteredStreams = () => {
    if (selectedCategory === "Tournament") {
      return tournaments.filter((t) => t.eventType?.toLowerCase() === "tournament");
    }
    if (selectedCategory === "TDM Knockout") {
      return tournaments.filter((t) => t.eventType?.toLowerCase() === "tdm");
    }
    if (selectedCategory === "Scrims") {
      return tournaments.filter((t) => t.eventType?.toLowerCase() === "scrim");
    }
    return tournaments;
  };

  const currentStreams = getFilteredStreams();

  return (
    <div className="min-h-screen bg-[#0B0E16] text-white px-6 md:px-10 py-10 font-Poppins">
      {/* ====== HEADER SECTION ====== */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-cyan-400 mb-1">
            Live Streams
          </h1>
          <p className="text-gray-400 text-sm">
            Watch live tournament broadcasts, knockout showdowns & scrims
          </p>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 text-base md:text-lg font-semibold rounded-lg border transition-all duration-300 ${
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
      {loading ? (
        <div className="text-center py-24 text-cyan-400 text-xl font-bold">
          Loading Live Streams...
        </div>
      ) : currentStreams.length === 0 ? (
        <div className="bg-[#10131F] border border-cyan-900 rounded-2xl p-12 text-center max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-cyan-400 mb-2">
            No Live Streams Right Now
          </h2>
          <p className="text-gray-400 text-sm">
            There are currently no active streams under {selectedCategory}. Streams will appear here as soon as the tournament host adds a link.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentStreams.map((item) => {
            const fallbackThumbnail = item.bannerImage || "/1v4clutch.webp";
            const thumbnail =
              item.liveStreamThumbnail ||
              getYouTubeThumbnail(item.liveStreamUrl, fallbackThumbnail);

            return (
              <div
                key={item._id}
                className="bg-[#10131F] rounded-2xl overflow-hidden border border-[#06B6D4]/30 hover:border-[#06B6D4]/80 transition-all duration-300 shadow-[0_0_25px_rgba(0,0,0,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] flex flex-col justify-between"
              >
                <a
                  href={item.liveStreamUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  {/* Thumbnail with LIVE Badge */}
                  <div className="relative w-full aspect-video overflow-hidden">
                    <img
                      src={thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* LIVE Badge */}
                    <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-md animate-pulse">
                      ● LIVE
                    </span>

                    {/* Game Tag */}
                    <span className="absolute top-3 right-3 bg-cyan-500 text-black text-xs font-bold px-2 py-0.5 rounded shadow">
                      {item.game}
                    </span>
                  </div>

                  {/* Video Title & Meta */}
                  <div className="p-4 space-y-2">
                    <h2 className="text-lg font-bold text-white group-hover:text-cyan-400 transition truncate">
                      {item.title}
                    </h2>

                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span>Type: <strong className="text-cyan-300">{item.tournamentType}</strong></span>
                      <span>Date: {new Date(item.startTime).toLocaleDateString()}</span>
                    </div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LivePage;