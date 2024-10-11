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
      <Group>
        <Stack>
          <LobbyPlayer name="hanni pham"/>
        </Stack>
        <Stack>
          <LobbyPlayer name="hanni pham"/>
        </Stack>
      </Group>

    </div>
  );
}
