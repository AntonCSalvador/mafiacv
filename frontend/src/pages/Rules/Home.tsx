import "@mantine/core/styles.css";
import { Button, Stack } from "@mantine/core";
import { useState } from 'react';
import { Container, Group, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {Text} from '@mantine/core';
import { Box } from '@mantine/core';




export default function RulePage(){
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(false);

  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh' }}>
      <Group justify="space-between" style={{ marginBottom: '40px' }}>
      <img src="/images/cotton_velvet.jpg"  className="w-12 h-12 border-transparent hover:border-white border-2" />
      <Group>
      <a href= '/' className= "underline text-slate-100 hover:text-red-600">home</a>
      <img src="/images/github_logo.webp"
      className= "w-12 h-12 border-transparent hover:border-white border-2" 
      onClick={() => {window.open('https://github.com/AntonCSalvador/mafiacv', '_blank'); console.log("test");}} />
      </Group>
      </Group>
    <div style={{ height: '75vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Stack mt="lg" justify="center" align="center">
      <Text size="xl" fw={700} style={{ color: 'red',fontSize: '36px' }}>How to Play</Text> 
      <Box className= "bg-black border-4 border-mafiaRed-default rounded-md p-4 h-[85vh] w-[95vw]" >
        <p className="mb-4 text-slate-100 text-xl">
          1. Game Setup<br />
          <div className="pl-8">
          <li>Mafia: 1-3 players (depending on group size) whose goal is to eliminate the villagers without getting caught</li>
          <li>Villagers: (the rest of the players): Identify the Mafia and vote them out</li>
          </div>
          <div className="pl-16">
            <li> Medic - A villager who can heal one person per night, including themselves</li>
            <li> Sheriff - A villager who can investigate one player per night to learn if they are mafiaS</li>
          </div>
          2. Game Phases<br />
          <div className="pl-8">
            <h1 className= "underline"> Night </h1>
            </div>
          <div className= "pl-16">
              <li> Everyone “goes to sleep” by closing their eyes</li>
              <li> The Mafia will open their eyes and if there are multiple Mafia, they must agree on which one player they want to eliminate</li>
              <li> The Medic will open their eyes and select which one player they want to heal</li>
              <li> The Sheriff will open their eyes and select which one player they want to investigate, and they will get an answer of either “Mafia” or “Town”</li>
          </div>
          <div className= "pl-8">
            <h1 className= "underline"> Day </h1>
          </div>
          <div className= "pl-16">
            <li> Everyone “wakes up” by opening their eyes</li>
            <li> The remaining  players will discuss who they think the Mafia is based on their suspicions</li>
            <li> When the timer is up, the remaining players can nominate a player to defend themselves and possibly get voted out, or pass and go into the next Night</li>
          </div>
          3. Winning the Games
          <div className= "pl-8">
            <li> The Mafia wins when they outnumber or equal the number of Villagers</li>
            <li> The Villagers win when the vote out all members of the Mafia</li>

          </div>
        </p>
      </Box>
      </Stack>
    </div>
    </div>
      
  );
};

