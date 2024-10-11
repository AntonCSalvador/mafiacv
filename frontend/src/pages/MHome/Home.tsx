import "@mantine/core/styles.css";
import { Button } from "@mantine/core";

export default function About(){
  return (
    <div className="bg-red-800">
      <h1>About Page</h1>
      <p>Learn more about us on this page.</p>
      <Button color="red">
        go
      </Button>
    </div>
  );
};

