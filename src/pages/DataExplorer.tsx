import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getGyms, getGymWalls, getProblems } from '../api';
import { TreeView } from '../components';
import { AppShellLayout } from '../layout';
import { NodeModel } from "@minoru/react-dnd-treeview";
import { Loader, Text } from '@mantine/core';

interface DataExplorerProps {
    logout: Function;
    username: string;
}


// Get gyms, walls and problems
const getTree = async (): Promise<any> => {
    const gyms = await getGyms();

    let dataTree: any[] = [];
    let id = 1;

    let NameToIdMap = new Map<string, number>();

    gyms.forEach(g => {
        dataTree.push({
            id: id,
            parent: 0,
            droppable: true,
            text: g.name,
        });
        NameToIdMap.set(g.name, id);
        id++;
    });

    for (const gym of gyms) {
        const gymWalls = await getGymWalls(gym.id);
        for (const wall of gymWalls) {
            console.log(`Adding wall ${wall.name} to gym ${gym.name} that has tree id ${NameToIdMap.get(gym.name)}`);
            // for each wall we should get its parent from the gym name matches
            // Check the id in the
            dataTree.push({
                id: id,
                parent: NameToIdMap.get(gym.name),
                droppable: false,
                text: wall.name,    
            });
            id++;
        }

        const gymProblems = await getProblems(gym.id);
        // Add to tree
    }

    console.log(dataTree);

    return dataTree;
}


export const DataExplorer = ({ logout, username }: DataExplorerProps) => {

    const ddbbQueryKey = 'ddbbData';

    const { isLoading, error, data } = useQuery<boolean, unknown, NodeModel[]>([ddbbQueryKey], () => getTree());

    // build the tree somehow 
    if (isLoading) {
        return (
            <AppShellLayout username={username} logout={logout}>
                <h2>Dashboard</h2>
                <div className='loader-wrapper'>
                    <Loader size={'xl'} />
                </div>
            </AppShellLayout>
        )
    }
    if (error) {
        <Text>Error loading data</Text>
    }
    return (
        <AppShellLayout username={username} logout={logout}>
            <h2>Database Data Explorer</h2>
            <TreeView nodes={data!}></TreeView>
        </AppShellLayout>
    )
}