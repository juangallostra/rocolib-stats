import { ActionIcon, Group, Text } from "@mantine/core";
import { IconLogout, IconUser } from "@tabler/icons";

export const AppHeader = ({ logout, username }: any) => {
  return (
    <Group sx={{ height: '100%' }} px={20} position="apart">
      <Group>
        <IconUser size={24} />
        <div style={{ flex: 1 }}>
          <Text size="md" weight={500}>
            {username}
          </Text>
        </div>
      </Group>
      <ActionIcon variant="default" onClick={logout} size={30}>
        <IconLogout size={20} />
      </ActionIcon>
    </Group>);
}