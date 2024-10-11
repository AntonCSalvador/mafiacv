import "@mantine/core/styles.css";
import { useState, useEffect } from 'react';
import { useInterval } from '@mantine/hooks';
import "@mantine/core/styles.css";
import { 
  BackgroundImage,
  Center, 
  Box,
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
      <div style={{ backgroundColor: 'black'}}>
      <Box maw="50vw" mx="25vw" c="blue.6" bg="#fff">
        <BackgroundImage
          src="/images/campfire.gif" 
          radius="sm"
      >
          <Center p="25vh" my="15vh">
            <Stack align="center">
              <Text>Page loaded <b>{seconds}</b> seconds ago</Text>
              <Button onClick={interval.toggle} color={interval.active ? 'red' : 'teal'}>
                {interval.active ? 'Stop' : 'Start'} counting
              </Button>
            </Stack>
          </Center>
        </BackgroundImage>
      </Box>
      </div>
    );
  }