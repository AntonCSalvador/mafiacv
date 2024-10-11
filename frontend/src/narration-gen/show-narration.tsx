// src/narration-gen/LandingPage.tsx
import React, { useState } from 'react';
import { getStory } from './text-gen';  // Use the getStory function from text-gen.ts

const LandingPage: React.FC = () => {
  const [numPlayers, setNumPlayers] = useState(5); // State to track number of players
  const [playerNames, setPlayerNames] = useState<string[]>([]); // State to track player names
  const [killedPlayer, setKilledPlayer] = useState<string | null>(null); // State for killed player
  const [healedPlayer, setHealedPlayer] = useState<string | null>(null); // State for healed player
  const [setting, setSetting] = useState<string>(''); // State for the story setting
  const [error, setError] = useState<string | null>(null); // Error state
  const [story, setStory] = useState<string | null>(null); // State for generated story
  const [loading, setLoading] = useState(false); // Loading state

  // Handle form submission to generate player names input fields
  const handleNumPlayersChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const num = parseInt(e.target.value, 10);
    setNumPlayers(num);
    setPlayerNames(Array(num).fill('')); // Initialize player names with empty strings
    setKilledPlayer(null); // Reset killed player when number of players changes
    setHealedPlayer(null); // Reset healed player when number of players changes
  };

  // Handle change in player names input
  const handlePlayerNameChange = (index: number, value: string) => {
    const updatedNames = [...playerNames];
    updatedNames[index] = value;
    setPlayerNames(updatedNames);
  };

  // Handle selection of killed player
  const handleKilledPlayerSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setKilledPlayer(e.target.value);
  };

  // Handle selection of healed player
  const handleHealedPlayerSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHealedPlayer(e.target.value);
  };

  // Handle setting input
  const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSetting(e.target.value);
  };

  // Generate the story based on the number of players, player names, killed player, healed player, and setting
  const generateStory = async () => {
    if (!killedPlayer || !healedPlayer || playerNames.some((name) => !name) || !setting) {
      setError("Please ensure all player names are filled, both players are selected, and a setting is specified.");
      return;
    }
    setError(null); // Clear any previous errors
    setLoading(true); // Show loading state

    // Conditionally generate the prompt based on whether killedPlayer and healedPlayer are the same
    let prompt = '';

    if (killedPlayer === healedPlayer) {
      prompt = `Write a story about a group of people. The setting is ${setting} and there were originally ${numPlayers} players. The players' names are ${playerNames.join(', ')}. During the night, in our story, ${killedPlayer} was almost killed by 'the mafia'. Write the story relative to our setting. Make it interesting and funny. Keep it under 50 words. Involve at least 3 characters in the story. Use misdirection as to not reveal who almost died until the end of the story. It should be clear that the medic saved the person and that nobody died. Keep it under 50 words`;
    } else {
      prompt = `Write a story about a murder. The setting of this murder is a ${setting} and there were originally ${numPlayers} players. The players' names are ${playerNames.join(', ')}. During the night, in our story, ${killedPlayer} was killed by 'the mafia'. Write the story of the mafia killing this person relative to our setting. Make it interesting and funny. Keep it under 50 words. Involve at least 3 characters in the story. Use misdirection as to not reveal who died until the end of the story. It should be clear who died in the story. Keep it under 50 words`;
    }

    try {
      const result = await getStory(prompt);  // Send the generated prompt to the Gemini API (via getStory function)
      setStory(result);  // Set the story in the state
    } catch (error) {
      console.error("Error generating story:", error);
      setError("There was an issue generating the story.");  // Handle errors
    }

    setLoading(false);  // Hide loading state
  };

  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>Player List Setup</h1>
        <p>Select the number of players (5-15), enter their names, choose a killed and healed player, and specify the setting:</p>

        {/* Step 1: Select number of players */}
        <div>
          <label htmlFor="numPlayers">Number of Players:</label>
          <select id="numPlayers" value={numPlayers} onChange={handleNumPlayersChange}>
            {Array.from({ length: 11 }, (_, i) => i + 5).map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        {/* Step 2: Generate input fields for player names */}
        <div>
          <h3>Enter Player Names</h3>
          {Array.from({ length: numPlayers }).map((_, index) => (
            <div key={index}>
              <label htmlFor={`player-${index}`}>Player {index + 1}:</label>
              <input
                type="text"
                id={`player-${index}`}
                value={playerNames[index] || ''}
                onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                placeholder={`Enter Player ${index + 1}'s name`}
              />
            </div>
          ))}
        </div>

        {/* Step 3: Select killed player */}
        <div>
          <h3>Select Killed Player</h3>
          <select value={killedPlayer || ''} onChange={handleKilledPlayerSelection}>
            <option value="" disabled>Select a killed player</option>
            {playerNames.map((name, index) => (
              name && <option key={index} value={name}>{name}</option>
            ))}
          </select>
        </div>

        {/* Step 4: Select healed player */}
        <div>
          <h3>Select Healed Player</h3>
          <select value={healedPlayer || ''} onChange={handleHealedPlayerSelection}>
            <option value="" disabled>Select a healed player</option>
            {playerNames.map((name, index) => (
              name && <option key={index} value={name}>{name}</option>
            ))}
          </select>
        </div>

        {/* Step 5: Specify the setting */}
        <div>
          <h3>Specify the Setting</h3>
          <input
            type="text"
            value={setting}
            onChange={handleSettingChange}
            placeholder="Enter the setting of the story"
          />
        </div>

        {/* Step 6: Generate Story Button */}
        <div>
          <button onClick={generateStory} disabled={loading}>
            {loading ? 'Generating Story...' : 'Generate Story'}
          </button>
        </div>

        {/* Show error if applicable */}
        {error && <div className="error-box"><p>{error}</p></div>}

        {/* Display the generated story */}
        {story && (
          <div className="story-box">
            <h3>Generated Story:</h3>
            <p>{story}</p>
          </div>
        )}
      </header>
    </div>
  );
};

export default LandingPage;
