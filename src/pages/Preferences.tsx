import React from 'react';
import { AppShellLayout } from '../layout';

interface PreferenceProps {
    logout: Function;
    username: string;
}

export const Preferences = ({logout, username}: PreferenceProps) => {
    return (
        <AppShellLayout username={username} logout={logout}>
            <h2>Preferences</h2>
        </AppShellLayout>
    )
}