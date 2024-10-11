import "@mantine/core/styles.css";
import { Group, Stack, Text, Image, ScrollArea } from "@mantine/core";
import '../../index.css';
import VotePlayer from '../../components/votePlayer';

export default function Layout() {
  return (

    <div className="bg-mafiaBlack-default min-h-screen items-center">
      <Group justify="center" align="center" gap={50} className="flex flex-col min-h-screen md:flex-row gap-4 w-full border-4 border-blue-500">
        <Stack align="center" justify="center" className="w-full md:w-1/3 border-4 border-blue-500">
          <Text size="md" color="white">Theme: L'Checkers</Text>
          <Image radius="md" src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png" className="border-4 border-mafiaRed-default" />
        </Stack>
        <Stack mt="sm" className="w-full md:w-1/3 border-4 border-mafiaRed-default rounded-md">
          <Group justify="center" align="center">
              <div className="min-w-[100%] w-[100%] bg-mafiaBlack-default p-4">
                <Text mb="sm" size="md" color="white">Nominations: </Text>
                <ScrollArea h={400}>
                  <VotePlayer name="Beabadoobee"/>
                  <VotePlayer name="Gojo"/>
                  <VotePlayer name="Clairo"/>
                  <VotePlayer name="Lasagna Field"/>
                  <VotePlayer name="Hanni Pham"/>
                  <VotePlayer name="COTTONVELVET"/>
                  <VotePlayer name="Kaniel"/>
                  <VotePlayer name="Joey"/>
                </ScrollArea>
              </div>
          </Group>       
        </Stack>
      </Group>
    </div>
  );
}
