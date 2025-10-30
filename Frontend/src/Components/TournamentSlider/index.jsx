import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Typography, Card, CardContent, Avatar } from "@mui/material";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const sections = [
  {
    title: "Tournament Highlights",
    type: "video",
    items: [
      {
        title: "Final Match Highlights",
        thumbnail: "/highlights.jpg",
        link: "https://www.youtube.com/watch?v=abc123",
      },
      {
        title: "Epic 1v4 Clutch",
        thumbnail: "/1v4clutch.webp",
        link: "https://www.youtube.com/watch?v=def456",
      },
      {
        title: "Clutches wins matches",
        thumbnail: "/Clutch.png",
        link: "https://www.youtube.com/watch?v=def456",
      },
      {
        title: "Top fragger frags",
        thumbnail: "TopFragger.jpg",
        link: "https://www.youtube.com/watch?v=def456",
      },
    ],
  },
  {
    title: "Watch Live",
    type: "video",
    items: [
      {
        title: "Live Finals Day 2",
        thumbnail: "/live1.avif",
        link: "https://www.youtube.com/watch?v=ghi789",
      },
      {
        title: "Grand Finals Stream",
        thumbnail: "/live2.jpg",
        link: "https://www.youtube.com/watch?v=jkl012",
      },
      {
        title: "Grand Finals Stream",
        thumbnail: "/live3.jpg",
        link: "https://www.youtube.com/watch?v=jkl012",
      },
      {
        title: "Grand Finals Stream",
        thumbnail: "/live4.jpg",
        link: "https://www.youtube.com/watch?v=jkl012",
      },
    ],
  },
  {
    title: "Tournament Winners",
    type: "winner",
    items: [
      {
        logo: "/images/team1.png",
        team: "Team Alpha",
        chicken: 5,
        finish: 42,
        placement: 35,
        total: 77,
      },
      {
        logo: "/images/team2.png",
        team: "Team Phoenix",
        chicken: 3,
        finish: 39,
        placement: 30,
        total: 69,
      },
      {
        logo: "/images/team2.png",
        team: "Team Phoenix",
        chicken: 3,
        finish: 39,
        placement: 30,
        total: 69,
      },
      {
        logo: "/images/team2.png",
        team: "Team Phoenix",
        chicken: 3,
        finish: 39,
        placement: 30,
        total: 69,
      },
    ],
  },
];

const TournamentSlider = () => {

  return (
    <Box className="w-full mt-10 px-3">
      {sections.map((section, idx) => (
        <Box key={idx} className="mb-10">
          <Typography variant="h6" className="text-white font-[Orbitron] mb-3">
            {section.title}
          </Typography>

          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={3.7}
            // autoplay={{
            //   delay: 2500,
            //   disableOnInteraction: false,
            // }}
            navigation
            loop={true}
            className="tournamentSwiper "
          >
            {/* 🎥 Video Section */}
            {section.type === "video" &&
              section.items.map((item, index) => (
                <SwiperSlide key={index}>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Box className="w-[320px] h-[180px] bg-[#1a1c20] rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)] relative group">
                      {/* Thumbnail */}
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300"
                      />

                      {/* ▶️ Always-visible play icon */}
                      <Box className="absolute inset-0 flex items-center justify-center">
                        <Box className="w-16 h-16 rounded-full border-4 border-[#06B6D4] bg-black/70 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#06B6D4"
                            viewBox="0 0 24 24"
                            width="28"
                            height="28"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </Box>
                      </Box>
                    </Box>

                    <Typography
                      variant="subtitle1"
                      className="text-white mt-2 font-medium text-center"
                    >
                      {item.title}
                    </Typography>
                  </a>
                </SwiperSlide>
              ))}

            {/* 🏆 Winner Section */}
            {section.type === "winner" &&
              section.items.map((team, index) => (
                <SwiperSlide key={index}>
                  <Card
                    sx={{
                      width: 300,
                      borderRadius: "16px",
                      backgroundColor: "#10131f",
                      color: "white",
                      boxShadow: "0 0 20px rgba(0,0,0,0.5)",
                    }}
                  >
                    <CardContent className="flex flex-col items-center">
                      <Avatar
                        src={team.logo}
                        alt={team.team}
                        sx={{
                          width: 80,
                          height: 80,
                          mb: 2,
                          border: "2px solid #06B6D4",
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{ fontFamily: "Orbitron", mb: 1, color: "#06B6D4" }}
                      >
                        {team.team}
                      </Typography>
                      <Box className="text-sm space-y-1">
                        <Typography>
                          🐔 Chicken Dinners: {team.chicken}
                        </Typography>
                        <Typography>🔥 Finishes: {team.finish}</Typography>
                        <Typography>
                          📍 Placement Points: {team.placement}
                        </Typography>
                        <Typography>🏆 Total Points: {team.total}</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
          </Swiper>
        </Box>
      ))}
    </Box>
  );
};

export default TournamentSlider;
