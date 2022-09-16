import React from 'react';
import { AppShell, Header } from '@mantine/core';
import { AppRoutes } from '../router/routes';
import { AppHeader } from './AppHeader'

interface ShellLayoutProps {
  username: string;
  children: any;
  logout: Function;
}

export const AppShellLayout = ({ username, children, logout }: ShellLayoutProps) => {
  return (
    <AppShell
      padding="md"
      navbar={<AppRoutes />}
      header={<Header height={60} p="xs"><AppHeader username={username} logout={logout}/></Header>}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      {children}
    </AppShell>
  )
}