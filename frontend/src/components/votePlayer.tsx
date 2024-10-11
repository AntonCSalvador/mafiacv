import "@mantine/core/styles.css";
import { 
  Group,
  Text,
} from "@mantine/core";
import '../index.css';

type PlayerProps = {
    name: string;
  };

export default function player({ name }: PlayerProps) {
  return (
        <Group mb="xs" justify="space-between" className="border-4 border-mafiaRed-default rounded-lg">
            <Text size="sm" mb="xs" mt="xs" fw={900} ml="xs" color="#E94560">{name}</Text>
        </Group>
  );
}
