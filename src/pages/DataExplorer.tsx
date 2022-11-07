import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getGyms, getGymWalls, getProblems } from '../api';
import { TreeView } from '../components';
import { AppShellLayout } from '../layout';

interface DataExplorerProps {
    logout: Function;
    username: string;
}

// Get gyms, walls and problems
const getTree = () => {
    getGyms().then(
        gymArray => gymArray.map(
            g => getGymWalls(g.id).then(
                w => console.log(w)
            )
        )
    );
    return true;
}


export const DataExplorer = ({logout, username}: DataExplorerProps) => {

    const ddbbQueryKey = 'ddbbData';



    const { isLoading, error, data } = useQuery<boolean, unknown, any>([ddbbQueryKey], () => getTree())



    return (
        <AppShellLayout username={username} logout={logout}>
            <h2>Database Data Explorer</h2>
            <TreeView></TreeView>
        </AppShellLayout>
    )
}