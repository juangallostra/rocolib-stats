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

    let dataTree: NodeModel[] = [];
    let id = 1;

    let GymNameToIdMap = new Map<string, number>();
    let WallNameToIdMap = new Map<string, number>();

    gyms.forEach(g => {
        dataTree.push({
            id: id,
            parent: 0,
            droppable: false,
            text: g.name,
        });
        GymNameToIdMap.set(g.name, id);
        id++;
    });

    for (const gym of gyms) {
        const gymWalls = await getGymWalls(gym.id);
        for (const wall of gymWalls) {
            // for each wall we should get its parent from the gym name matches
            dataTree.push({
                id: id,
                parent: GymNameToIdMap.get(gym.name)!,
                droppable: false,
                text: wall.name,    
            });
            // Add new map
            WallNameToIdMap.set(wall.image, id);
            // Make parent droppable
            const parentIdx = dataTree.findIndex((node => node.id === GymNameToIdMap.get(gym.name)));
            dataTree[parentIdx].droppable = true;
            id++;
        }

        const gymProblems = await getProblems(gym.id);
        for (const problem of gymProblems) {
            dataTree.push({
                id: id,
                parent: WallNameToIdMap.get(problem.section)!,
                droppable: false,
                text: problem.name,    
            });
            // Make parent droppable
            const parentIdx = dataTree.findIndex((node => node.id === WallNameToIdMap.get(problem.section)));
            dataTree[parentIdx].droppable = true;            
            id++;
        }
    }
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