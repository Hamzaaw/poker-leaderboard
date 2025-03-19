"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const initialPlayers = [
  { name: "Hamza", score: 17, img: "/h.png" },
  { name: "Muhammad", score: 12, img: "/m.png" },
  { name: "Reahan", score: 7, img: "/r.png" },
  { name: "Abdullah", score: 2, img: "/a.png" },
];

export default function PokerLeaderboard() {
  const [players, setPlayers] = useState(initialPlayers);
  const [secretPhrase, setSecretPhrase] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const correctPhrase = "oreo";

  const handleAuth = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (secretPhrase.trim() === correctPhrase) {
      setIsAuthorized(true);
    } else {
      alert("Incorrect secret phrase!");
    }
    setSecretPhrase(""); // Reset password field
  };

  const handleLogout = () => {
    setIsAuthorized(false);
    setSecretPhrase("");
  };

  const updateScore = (index, newScore) => {
    setPlayers((prev) =>
      prev.map((player, i) =>
        i === index ? { ...player, score: parseInt(newScore) || 0 } : player
      )
    );
  };

  return (
    <div className="flex flex-col items-center p-4 md:p-8 space-y-6 bg-gray-900 min-h-screen text-white">
      <motion.h1
        className="text-3xl md:text-5xl font-extrabold text-yellow-400 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Poker Leaderboard
      </motion.h1>

      <div className="w-full max-w-3xl bg-gray-800 p-4 md:p-8 rounded-lg shadow-lg overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm md:text-lg">
          <thead>
            <tr className="border-b border-gray-600 text-yellow-300 text-base md:text-xl">
              <th className="py-2 md:py-4 px-2 md:px-6">Rank</th>
              <th className="py-2 md:py-4 px-2 md:px-6">Player</th>
              <th className="py-2 md:py-4 px-2 md:px-6">Score</th>
            </tr>
          </thead>
          <tbody>
            {players
              .sort((a, b) => b.score - a.score)
              .map((player, index) => (
                <tr key={player.name} className="border-b border-gray-700 hover:bg-gray-700 transition">
                  <td className="py-3 md:py-5 px-2 md:px-6 font-semibold text-center">{index + 1}</td>
                  <td className="py-3 md:py-5 px-2 md:px-6 flex items-center space-x-3 md:space-x-4">
                    <Image
                      src={player.img}
                      alt={player.name}
                      width={60} // Adjusted for mobile
                      height={60}
                      className="w-14 h-14 md:w-20 md:h-20 rounded-full border-4 border-yellow-400 shadow-lg"
                    />
                    <span className="text-base md:text-xl font-semibold">{player.name}</span>
                  </td>
                  <td className="py-3 md:py-5 px-2 md:px-6 text-center">
                    {isAuthorized ? (
                      <input
                        type="number"
                        defaultValue={player.score}
                        className="text-white bg-gray-700 p-2 rounded-md w-12 md:w-16 text-center border-2 border-yellow-400"
                        onBlur={(e) => updateScore(index, e.target.value)}
                      />
                    ) : (
                      <span className="text-base md:text-lg font-semibold">{player.score}</span>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Secret Phrase Section */}
      {!isAuthorized ? (
        <div className="w-full max-w-md bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-yellow-300 text-center">Enter Secret Phrase</h2>
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                placeholder="Secret Phrase"
                type={showSecret ? "text" : "password"}
                value={secretPhrase}
                className="text-white bg-gray-700 p-2 rounded-md w-full border-2 border-yellow-400"
                onChange={(e) => setSecretPhrase(e.target.value)}
              />
              <button 
                type="button"
                onClick={() => setShowSecret(!showSecret)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-3 md:px-4 py-2 rounded-md"
              >
                {showSecret ? "Hide" : "Show"}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 md:py-3 rounded-md font-bold text-lg"
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 md:px-6 py-2 md:py-3 rounded-md font-bold text-lg"
        >
          Logout
        </button>
      )}
    </div>
  );
}
