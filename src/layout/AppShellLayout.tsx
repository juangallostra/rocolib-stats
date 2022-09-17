import React, { useState } from 'react';
import { AppShell, Header } from '@mantine/core';
import { AppHeader } from './AppHeader'
import { AppRoutes } from '../router';

interface ShellLayoutProps {
  username: string;
  children: any;
  logout: Function;
}

export const AppShellLayout = ({ username, children, logout }: ShellLayoutProps) => {
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      navbarOffsetBreakpoint='sm'
      asideOffsetBreakpoint='sm'
      padding='md'
      navbar={
        <AppRoutes opened={opened}/>
      }
      header={
        <Header height={60} p='xs'>
          <AppHeader opened={opened} setOpened={setOpened} username={username} logout={logout}/>
        </Header>
      }
      // styles={(theme) => ({
      //   main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      // })}
    >
      {children}
    </AppShell>
  )
}