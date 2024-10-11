import "@mantine/core/styles.css";
import { useDisclosure } from '@mantine/hooks';
import { Modal, Grid, Button, Textarea } from '@mantine/core';
import { useState } from 'react';

// Function to render an individual button with text above the image
const renderButtonWithImage = (text: string, imageSrc: string, borderColor: string, onClickHandler: () => void) => (
  <Button
    size="xl"
    variant="outline"
    radius={10}
    styles={{
      root: {
        position: 'relative', // Make button relative for proper positioning of text
        borderWidth: '4px',
        borderColor: "#000000", 
        height: '150px',  
        width: '285px',   
        padding: '0',     
        overflow: 'hidden',  // Ensure the image fits within the button
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    }}
    onClick={onClickHandler}
  >
    {/* Image that fills the button */}
    <img 
      src={imageSrc}
      alt={text} 
      style={{ 
        position: 'absolute',   // Image is placed absolutely behind the text
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        objectFit: 'cover', 
        zIndex: 0  // Image stays behind the text
      }} 
    />
  </Button>
);

export default function About() {
  const [opened, { open, close }] = useDisclosure(false);
  const [customModalOpened, { open: openCustom, close: closeCustom }] = useDisclosure(false);
  const [customSetting, setCustomSetting] = useState('');

  return (
    <div className="bg-mafiaBlack-default min-h-screen p-4">
      <Modal
        centered
        opened={opened}
        onClose={close}
        size="90%"
        styles={{
          content: {
            backgroundColor: '#1D1F27', 
          },
          header: {
            backgroundColor: '#1D1F27',
          },
        }}
      >
        <Grid justify="center" align="center" gutter="lg" mb={10}>
          <Grid.Col span={6} style={{ display: 'flex', justifyContent: 'center' }}>
            {renderButtonWithImage('Beebadoobee London Concert', '/beebadoobee.png', '#3E8E7E', () => { console.log('1 clicked'); close(); })}
          </Grid.Col>
          <Grid.Col span={6} style={{ display: 'flex', justifyContent: 'center' }}>
            {renderButtonWithImage('Donut Strat Aftermath', '/wawa.png', '#3E8E7E', () => { console.log('2 clicked'); close(); })}
          </Grid.Col>

          <Grid.Col span={6} style={{ display: 'flex', justifyContent: 'center' }}>
            {renderButtonWithImage('Donkey Kong Country', '/kong.png', '#3E8E7E', () => { console.log('3 clicked'); close(); })}
          </Grid.Col>
          <Grid.Col span={6} style={{ display: 'flex', justifyContent: 'center' }}>
            {renderButtonWithImage('Little Woman', '/women.png', '#3E8E7E', () => { console.log('4 clicked'); close(); })}
          </Grid.Col>

          <Grid.Col span={6} style={{ display: 'flex', justifyContent: 'center' }}>
            {renderButtonWithImage('Les Checkers', '/checkers.png', '#3E8E7E', () => { console.log('5 clicked'); close(); })}
          </Grid.Col>
          <Grid.Col span={6} style={{ display: 'flex', justifyContent: 'center' }}>
            {renderButtonWithImage('KSI Music Video', '/king.png', '#3E8E7E', () => { console.log('6 clicked'); close(); })}
          </Grid.Col>
        </Grid>

        <Grid justify="center" mt={10} mb={10}>
          <Button
            size="lg"
            styles={{
              root: {
                backgroundColor: '#3E8E7E',
                color: '#FFFFFF',
                width: '200px',  
                border: 'none',
                borderRadius: '5px',
                transition: 'background-color 0.3s ease',
                '&:hover': {
                  backgroundColor: 'red', 
                },
              },
            }}
            onClick={() => {
              console.log('Switching to custom prompt modal');
              close();
              openCustom();
            }}
          >
            CUSTOMIZE
          </Button>
        </Grid>
      </Modal>

      <Modal
        centered
        title="Custom setting"
        opened={customModalOpened}
        onClose={closeCustom}
        size="90%"
        styles={{
          content: {
            backgroundColor: '#1D1F27',
          },
          header: {
            backgroundColor: '#1D1F27',
          },
          title: {
            color: 'white',        // Make the title text white
            textAlign: 'center',   // Center the title
            width: '100%',         // Full width for centering
          },
        }}
      >
        <Textarea
          radius="lg"
          placeholder="Enter your custom mafia setting here!"
          autosize
          variant="filled"
          minRows={10}
          value={customSetting}
          onChange={(event) => setCustomSetting(event.currentTarget.value)}
          styles={{
            input: {
              backgroundColor: '#1D1F27', 
              color: 'white',             
              borderColor: '#3E8E7E',     
              borderWidth: '2px',      
                 
            },
          }}
        />
        <Grid justify="center" mt={10}>
          <Button
            size="lg"
            variant="outline"
            mb={10}
            mt={15}
            radius={10}
            styles={{
              root: {
                borderWidth: '4px',
                borderColor: '#E94560',  
                color: 'white',
                width: '200px',  
              },
            }}
            onClick={() => {
              console.log(customSetting);
              closeCustom();
            }}
          >
            Enter
          </Button>
        </Grid>
      </Modal>

      <Grid justify="center">
        <Button
          size="lg"
          variant="outline"
          radius={10}
          styles={{
            root: {
              borderWidth: '4px',
              borderColor: '#E94560',  
              color: 'white',
              width: '200px',  
              transition: 'background-color 0.3s ease',
              '&:hover': {
                backgroundColor: 'red',  
              },
            },
          }}
          onClick={open}
        >
          Themes
        </Button>
      </Grid>
    </div>
  );
}
