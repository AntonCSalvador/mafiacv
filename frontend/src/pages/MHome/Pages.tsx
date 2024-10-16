import "@mantine/core/styles.css";
import { Group, Text, Stack } from "@mantine/core";

export default function About(){
  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh' }}>
      <Group justify="space-between" style={{ marginBottom: '40px' }}>
        <img src="/images/cotton_velvet.jpg" className="w-12 h-12 border-transparent hover:border-white border-2" />
        <Group>
          <h1 className= "underline text-slate-100 hover:text-red-600">home</h1>
          <img src="/images/github_logo.webp"
          className= "w-12 h-12 border-transparent hover:border-white border-2" 
          onClick={() => {window.open('https://github.com/AntonCSalvador/mafiacv', '_blank'); console.log("test");}} />
        </Group>
      </Group>
      <div style={{ height: '75vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Stack mt="lg" justify="center" align="center">
          <Text size="xl" fw={700} style={{ color: 'red',fontSize: '36px' }}>Mafia</Text> 
          <button className="bg-black border-4 border-mafiaRed-default rounded-md p-4 hover:bg-red-400 text-red-600 hover:text-slate-100"> <Text size = 'xl' fw={700}>Host a Game</Text></button>
          <button className= "bg-black border-4 border-mafiaRed-default rounded-md p-4 hover:bg-red-400 text-red-600 hover:text-slate-100"> <Text size = 'xl' fw={700}> Join a Game</Text></button>
          <text className="text-2xl underline text-red-600 hover:text-slate-100">How To Play</text>
        </Stack>
      </div>
    </div>
  );
};
