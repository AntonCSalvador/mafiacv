import "@mantine/core/styles.css";
import { useDisclosure } from '@mantine/hooks';
import { Modal, Grid, Button, Textarea } from '@mantine/core';
import { useState } from 'react';

const renderButtonWithImage = (text: string, imageSrc: string, borderColor: string, onClickHandler: () => void) => (
  <Button
    size="xl"
    variant="outline"
    radius={10}
    styles={{
      root: {
        borderWidth: '4px',
        borderColor: borderColor,
        height: '150px',
        width: '285px',
        padding: 0,
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    }}
    onClick={onClickHandler}
  >
    <img
      src={imageSrc}
      alt={text}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
    />
  </Button>
);

export default function About() {
  const [opened, { open, close }] = useDisclosure(false);
  const [customModalOpened, { open: openCustom, close: closeCustom }] = useDisclosure(false);
  const [customSetting, setCustomSetting] = useState('');
  const [selectedText, setSelectedText] = useState('None');

  const handleButtonClick = (text: string) => {
    setSelectedText(text);
    close();
  };

  const renderMainModal = () => (
    <Modal
      centered
      opened={opened}
      onClose={close}
      size="90%"
      styles={{
        content: { backgroundColor: '#1D1F27' },
        header: { backgroundColor: '#1D1F27' },
      }}
    >
      <Grid justify="center" align="center" gutter="lg" mb={10}>
        <Grid.Col span={6} style={{ display: 'flex', justifyContent: 'center' }}>
          {renderButtonWithImage('Beebadoobee London Concert', '/beebadoobee.png', '#3E8E7E', () => handleButtonClick('Beebadoobee London Concert'))}
        </Grid.Col>
        <Grid.Col span={6} style={{ display: 'flex', justifyContent: 'center' }}>
          {renderButtonWithImage('Donut Strat Aftermath', '/wawa.png', '#3E8E7E', () => handleButtonClick('Donut Strat Aftermath'))}
        </Grid.Col>
        <Grid.Col span={6} style={{ display: 'flex', justifyContent: 'center' }}>
          {renderButtonWithImage('Donkey Kong Country', '/kong.png', '#3E8E7E', () => handleButtonClick('Donkey Kong Country'))}
        </Grid.Col>
        <Grid.Col span={6} style={{ display: 'flex', justifyContent: 'center' }}>
          {renderButtonWithImage('Little Woman', '/women.png', '#3E8E7E', () => handleButtonClick('Little Woman'))}
        </Grid.Col>
        <Grid.Col span={6} style={{ display: 'flex', justifyContent: 'center' }}>
          {renderButtonWithImage('Les Checkers', '/checkers.png', '#3E8E7E', () => handleButtonClick('Les Checkers'))}
        </Grid.Col>
        <Grid.Col span={6} style={{ display: 'flex', justifyContent: 'center' }}>
          {renderButtonWithImage('KSI Music Video', '/king.png', '#3E8E7E', () => handleButtonClick('KSI Music Video'))}
        </Grid.Col>
      </Grid>

      <Grid justify="center" mt={10} mb={10}>
        <Button
          size="lg"
          styles={{root: {backgroundColor: '#3E8E7E', color: '#FFFFFF', width: '200px', borderRadius: '5px', transition: 'background-color 0.3s ease',},}}
          onClick={() => { setSelectedText('Custom'); close(); openCustom(); }} >
          CUSTOMIZE
        </Button>
      </Grid>
    </Modal>
  );

  const renderCustomModal = () => (
    <Modal centered title="Custom setting" opened={customModalOpened} onClose={closeCustom} size="90%" 
      styles={{ content: { backgroundColor: '#1D1F27' }, header: { backgroundColor: '#1D1F27' }, title: { color: 'white', textAlign: 'center', width: '100%' },}}
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
  );

  return (
    <div className="bg-mafiaBlack-default min-h-screen p-4">
      {renderMainModal()}
      {renderCustomModal()}

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
              '&:hover': { backgroundColor: 'red' },
            },
          }}
          onClick={open}
        >
          Themes
        </Button>
      </Grid>
      {/* this below will be deleted as its to show usability for on the lobby page */}

      {/* <Grid justify="center" mt={10}>
        <p style={{ color: 'white', fontSize: '18px' }}>{selectedText}</p>
      </Grid> */} 
    </div>
  );
}
