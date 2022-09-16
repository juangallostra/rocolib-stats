import React from 'react';
import { AppShellLayout } from '../layout';


export const Preferences = ({logout, username}: any) => {
    return (
        <AppShellLayout username={username} logout={logout}>
            <h2>Preferences</h2>
        </AppShellLayout>
    )
}