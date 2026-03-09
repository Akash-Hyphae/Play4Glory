import React from "react";

const teams = [
  {
    name: "GodLike Esports",
    players: ["Jonathan", "Spower", "Admino", "Manya"]
  },
  {
    name: "Team Soul",
    players: ["Nakul", "Joker", "Legit", "Goblin"]
  },
  {
    name: "Orangutan Gaming",
    players: ["Akop", "Wizzgod", "Aru", "Attanki"]
  },
  {
    name: "Team XSpark",
    players: ["Punk", "Pain", "Tracegod", "Fierce"]
  },
  {
    name: "Revenant Esports",
    players: ["Sensei", "Spraygod", "Hector", "Viper"]
  },
  {
    name: "Blind Esports",
    players: ["Mayavi", "Manya", "Spower", "Driger"]
  }
];

const TeamsTab = () => {
  return (
    <div className="mt-8">

      <h2 className="text-2xl font-semibold text-white mb-6">
        Registered Teams
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {teams.map((team, index) => (
          <div
            key={index}
            className="bg-[#0f172a] border border-gray-700 rounded-xl p-6 
            hover:border-cyan-400 hover:shadow-[0_0_20px_#06b6d4] 
            transition duration-300"
          >
            {/* Team Name */}
            <h3 className="text-lg font-semibold text-cyan-400 mb-4">
              {team.name}
            </h3>

            {/* Player List */}
            <ul className="space-y-2 text-gray-300">
              {team.players.map((player, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2"
                >
                  <span className="text-cyan-400">🎮</span>
                  {player}
                </li>
              ))}
            </ul>

          </div>
        ))}

      </div>

    </div>
  );
};

export default TeamsTab;