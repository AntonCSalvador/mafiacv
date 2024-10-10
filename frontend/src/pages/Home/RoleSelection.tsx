import { useState, useEffect } from "react";
import { Button, Group, Text } from "@mantine/core";
import { socket } from "./Home";

interface RoleSelectionProps {
  playerIDs: string[];
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ playerIDs }) => {
  const [mafiaCount, setMafiaCount] = useState<number>(0);
  const [medicCount, setMedicCount] = useState<number>(0);

  useEffect(() => {
    socket.on("roles-assigned", (data) => {
      console.log("Role selection data:", data);
    });
  });

  const handleIncrement = (
    setter: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    setter((prev) => prev + 1);
  };

  const handleDecrement = (
    setter: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    setter((prev) => Math.max(prev - 1, 0));
  };

  const createRoleArray = () => {
    const roles: string[] = [
      ...Array(mafiaCount).fill("mafia"),
      ...Array(medicCount).fill("medic"),
    ];
    return roles;
  };

  const selectRoles = (roles: string[]) => {
    console.log(playerIDs, roles);
    socket.emit("select-roles", roles, playerIDs);
  };

  return (
    <div>
      <Group>
        <Text>Mafia</Text>
        <Text>{mafiaCount}</Text>
        <Button onClick={() => handleIncrement(setMafiaCount)} size="xs">
          ▲
        </Button>
        <Button
          onClick={() => handleDecrement(setMafiaCount)}
          size="xs"
          disabled={mafiaCount === 0}
        >
          ▼
        </Button>
      </Group>

      <Group>
        <Text>Medic</Text>
        <Text>{medicCount}</Text>
        <Button onClick={() => handleIncrement(setMedicCount)} size="xs">
          ▲
        </Button>
        <Button
          onClick={() => handleDecrement(setMedicCount)}
          size="xs"
          disabled={medicCount === 0}
        >
          ▼
        </Button>
      </Group>

      <Button onClick={() => selectRoles(createRoleArray())}>
        Select Roles
      </Button>
    </div>
  );
};

export default RoleSelection;
