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
  AspectRatio,
  rem,
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
      <div className="bg-mafiaBlack-default min-h-screen p-4 flex items-center justify-center">
        <Box maw="90vw" mx="auto" >
          {/* Red border Box */}
          <Box
            style={{
              border: '4px solid red', 
              borderRadius: '0.5rem', 
              overflow: 'hidden', 
            }}
          >
            
            <BackgroundImage
              src="/images/campfire.gif"
              radius="sm"
              style={{
                height: '50vh', 
                width: '50vw', 
                maxHeight: 'none', 
                backgroundPosition: 'center', // Center the image
              }}
            >
              <Center style={{ height: '100%' }} p="md">
                <Stack align="center">
                  <Text size="lg" color="#fff">
                    Page loaded <b>{seconds}</b> seconds ago
                  </Text>
                  <Button onClick={interval.toggle} color={interval.active ? 'red' : 'teal'}>
                    {interval.active ? 'Stop' : 'Start'} counting
                  </Button>
                </Stack>
              </Center>
            </BackgroundImage>
            
          </Box>
        </Box>
      </div>
    );
    
  }