import "@mantine/core/styles.css";
import { 
  Button,
  Group,
  Stack,
  Text,
  CopyButton
} from "@mantine/core";
import { IconSettings } from '@tabler/icons-react';
import '../../index.css';

export default function Layout() {
  return (
    <div className="bg-mafiaBlack-default min-h-screen p-4">
      <Stack justify="center" align="center">
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
        <Group className="border border-mafiaRed-default rounded-lg p-4">
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
          </Stack>
        </Group>        
      </Stack>


      <h1 className="text-white">About Page</h1>
      <p className="text-white">Learn more about us on this page.</p>
      <Button color="red">
        go
      </Button>
    </div>
  );
}
