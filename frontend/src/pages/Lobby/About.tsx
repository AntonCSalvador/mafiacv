import "@mantine/core/styles.css";
import { 
  Button,
  Group,
  Stack,
 
} from "@mantine/core";
import '../../index.css'; // Ensure this imports Tailwind styles

export default function Layout() {
  return (
    <div className="bg-mafiaBlack-default min-h-screen p-4">
      <Stack align="center">
        <Group>
          <h1>Hi</h1>
        </Group>
        <Group>
          <h1>Hi</h1>
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
