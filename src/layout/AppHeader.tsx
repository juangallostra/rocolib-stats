import { ActionIcon, Burger, Group, MediaQuery, Text } from '@mantine/core';
import { IconLogout, IconUser } from '@tabler/icons';

interface AppHeaderProps {
  opened: boolean;
  setOpened: any
  logout: any;
  username: string
}

export const AppHeader = ({ opened, setOpened, logout, username }: AppHeaderProps) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
        <Burger
          opened={opened}
          onClick={() => setOpened((o: boolean) => !o)}
          size='sm'
          color='black'
          mr='xl'
        />
      </MediaQuery>

      <Group style={{width: '100%', paddingLeft: '0'}} sx={{ height: '100%' }} px={20} position='apart'>
        <Group>
          <IconUser size={24} />
          <div style={{ flex: 1 }}>
            <Text size='md' weight={500}>
              {username}
            </Text>
          </div>
        </Group>
        <ActionIcon variant='default' onClick={logout} size={30}>
          <IconLogout size={20} />
        </ActionIcon>
      </Group>
    </div>
  );
}