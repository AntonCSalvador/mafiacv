import "@mantine/core/styles.css";
import { 
  Button,
  Group,
  Stack,
  Text,
  CopyButton,
  ScrollArea
} from "@mantine/core";
import { IconSettings } from '@tabler/icons-react';
import '../../index.css';
import LobbyPlayer from '../../components/lobbyPlayer'

export default function Layout() {
  return (
    <div className="bg-mafiaBlack-default min-h-screen p-4">
      {/* Header */}
      <Group justify="space-between" style={{ marginBottom: '40px' }}>
        <img src="/images/cotton_velvet.jpg"  className="w-12 h-12 border-transparent hover:border-white border-2" />
        <Group>
          <h1 className= "underline text-slate-100 hover:text-red-600">home</h1>
          <img src="/images/github_logo.webp"
          className= "w-12 h-12 border-transparent hover:border-white border-2" 
          onClick={() => {window.open('https://github.com/AntonCSalvador/mafiacv', '_blank'); console.log("test");}} />
        </Group>
      </Group>
      {/* End header */}
      <Stack mt="xs" justify="center" align="center">
        <Group>
          <Text size="md" color="red">Location: Beabadoobee Concert</Text>
        </Group>
        <Group>
          <Text size="md" color="red">Invite Code: </Text>
          <CopyButton value="https://www.youtube.com/">
            {({ copied, copy }) => (
              <Button color={copied ? '#3E8E7E' : '#E94560'} onClick={copy}>
                {copied ? 'Copied code' : 'CODE'}
              </Button>
            )}
          </CopyButton>
          <Button color="#E94560">
              Theme
          </Button>
        </Group>
        <Group className="border-4 border-mafiaRed-default rounded-lg p-4">
          <Stack>
            <Group>
              <Text size="md" color="white">Everyone's Ready</Text>
              <Button color="#3E8E7E" onClick={() => console.log("hello")}>
                Start
              </Button>
              <Button variant="outline" color="#E94560">
                <IconSettings size={24} stroke={2} />
              </Button>
            </Group>
            <Group justify="center" align="center">
              <div className="min-w-[100%] w-[100%] bg-mafiaBlack-default p-4">
                <ScrollArea h={300}>
                  <LobbyPlayer name="Beabadoobee"/>
                  <LobbyPlayer name="Gojo"/>
                  <LobbyPlayer name="Clairo"/>
                  <LobbyPlayer name="Lasagna Field"/>
                  <LobbyPlayer name="Hanni Pham"/>
                  <LobbyPlayer name="COTTONVELVET"/>
                  <LobbyPlayer name="Kaniel"/>
                  <LobbyPlayer name="Joey"/>
                </ScrollArea>
              </div>
            </Group>
          </Stack>
        </Group>        
      </Stack>
    </div>
  );
}
