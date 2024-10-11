import { useState } from "react";
import { Button, Group, Text } from "@mantine/core";
import { socket } from "./Home";

interface RoleSelectionProps {
  lobbyId: string;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ lobbyId }) => {
  const [mafiaCount, setMafiaCount] = useState<number>(0);
  const [medicCount, setMedicCount] = useState<number>(0);

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
    socket.emit("select-roles", roles, lobbyId);
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
