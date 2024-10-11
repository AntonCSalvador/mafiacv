import "@mantine/core/styles.css";
import { useState, useEffect } from 'react';
import { useInterval } from '@mantine/hooks';
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

export default function Night() {
    const [seconds, setSeconds] = useState(120);
    const interval = useInterval(() => setSeconds((s) => s - 1), 1000);
  
    useEffect(() => {
      interval.start();
      return interval.stop;
    }, []);
  
    return (
      <Stack align="center">
        <Text>Page loaded <b>{seconds}</b> seconds ago</Text>
        <Button onClick={interval.toggle} color={interval.active ? 'red' : 'teal'}>
          {interval.active ? 'Stop' : 'Start'} counting
        </Button>
      </Stack>
    );
  }