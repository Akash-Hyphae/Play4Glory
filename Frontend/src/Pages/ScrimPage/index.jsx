// src/components/ScrimsSection/ScrimsSection.jsx
import { React, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import RegisterDialog from "../../Components/RegisterDialog";

// Each match has its own filled slots out of 16
const scrimSlots = [
  {
    time: "12:00 - 15:00",
    matches: [
      { map: "Erangle, Miramar, Rondo", img: "/erangle.png", filled: 12 },
      { map: "Erangle, Miramar, Rondo", img: "/miramar.png", filled: 9 },
      { map: "Erangle, Miramar, Rondo", img: "/rondo.jpg", filled: 15 },
      { map: "Erangle, Miramar, Rondo", img: "/erangle.png", filled: 15 },
      { map: "Erangle, Miramar, Rondo", img: "/miramar.png", filled: 15 },
      { map: "Erangle, Miramar, Rondo", img: "/rondo.jpg", filled: 15 },
    ],
  },
  {
    time: "15:00 - 18:00",
    matches: [
      { map: "Erangle, Miramar, Rondo", img: "/erangle.png", filled: 12 },
      { map: "Erangle, Miramar, Rondo", img: "/miramar.png", filled: 9 },
      { map: "Erangle, Miramar, Rondo", img: "/rondo.jpg", filled: 15 },
      { map: "Erangle, Miramar, Rondo", img: "/erangle.png", filled: 15 },
      { map: "Erangle, Miramar, Rondo", img: "/miramar.png", filled: 15 },
      { map: "Erangle, Miramar, Rondo", img: "/rondo.jpg", filled: 15 },
    ],
  },
  {
    time: "18:00 - 21:00",
    matches: [
      { map: "Erangle, Miramar, Rondo", img: "/erangle.png", filled: 12 },
      { map: "Erangle, Miramar, Rondo", img: "/miramar.png", filled: 9 },
      { map: "Erangle, Miramar, Rondo", img: "/rondo.jpg", filled: 15 },
      { map: "Erangle, Miramar, Rondo", img: "/erangle.png", filled: 15 },
      { map: "Erangle, Miramar, Rondo", img: "/miramar.png", filled: 15 },
      { map: "Erangle, Miramar, Rondo", img: "/rondo.jpg", filled: 15 },
    ],
  },
  {
    time: "21:00 - 00:00",
    matches: [
      { map: "Erangle, Miramar, Rondo", img: "/erangle.png", filled: 12 },
      { map: "Erangle, Miramar, Rondo", img: "/miramar.png", filled: 9 },
      { map: "Erangle, Miramar, Rondo", img: "/rondo.jpg", filled: 15 },
      { map: "Erangle, Miramar, Rondo", img: "/erangle.png", filled: 15 },
      { map: "Erangle, Miramar, Rondo", img: "/miramar.png", filled: 15 },
      { map: "Erangle, Miramar, Rondo", img: "/rondo.jpg", filled: 15 },
    ],
  },
];

const ScrimsSection = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <section className="py-8 px-6 space-y-10 bg-[#0B0E16] min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-cyan-400 tracking-wide mb-4 md:mb-0">
          Scrims
        </h1>
      </div>
      {scrimSlots.map((slot, i) => (
        <div
          key={i}
          className="bg-[#0D101A] rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-[#06B6D4]/30 p-6"
        >
          {/* Time Slot Heading */}
          <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center">
            {slot.time}
          </h2>

          {/* Swiper Slider */}
          <Swiper
            slidesPerView={3}
            spaceBetween={20}
            navigation={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Navigation, Autoplay]}
            className="mySwiper"
          >
            {slot.matches.map((match, index) => {
              const progress = (match.filled / 16) * 100;
              const color =
                progress >= 100
                  ? "#22c55e" // green
                  : progress >= 10
                    ? "#06B6D4" // cyan
                    : "#ef4444"; // red

              return (
                <SwiperSlide
                  key={index}
                  className="bg-[#10131F] rounded-xl overflow-hidden border border-[#06B6D4]/30 hover:border-[#06B6D4]/80 transition group"
                >
                  <div className="relative">
                    <img
                      src={match.img}
                      alt={match.map}
                      className="w-full h-44 object-cover opacity-90 group-hover:opacity-100 transition"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D101A] to-transparent" />
                  </div>

                  <div className="p-4 flex flex-col items-center text-center space-y-2">
                    <h3 className="text-white text-lg font-semibold">
                      {match.map}
                    </h3>

                    {/* Thin slot bar */}
                    <div className="w-full relative mt-1">
                      <div className="w-full h-1 bg-[#1B2033] rounded-full overflow-hidden">
                        <div
                          className="h-full transition-all duration-700"
                          style={{
                            width: `${progress}%`,
                            background: "#06B6D4",
                          }}
                        ></div>
                      </div>
                      <span className="absolute right-0 -top-4 text-xs text-gray-400">
                        {match.filled}/16
                      </span>
                    </div>

                    <button
                      onClick={() => setOpenDialog(true)}
                      className="mt-3 border border-cyan-500 text-cyan-400 rounded-md px-4 py-2 hover:bg-cyan-500 hover:text-black transition"
                    >
                      Register Scrim
                    </button>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      ))}
      <RegisterDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        tournamentTitle={"Scrim Match"}
      />
      ;
    </section>
  );
};

export default ScrimsSection;
