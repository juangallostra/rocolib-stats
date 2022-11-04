import React from 'react';
import { Loader, Text } from '@mantine/core';
import { DailyStats, StatsCard, StatsSegments } from '../components';
import { AppShellLayout } from '../layout';
import './Dashboard.css';
import { useQuery } from '@tanstack/react-query'

export interface DashboardProps {
    token: string;
    username: string;
    logout: Function;
}

export interface Ticklist {
    boulders: Boulder[];
}

export interface Boulder {
    color: string;
    creator: string;
    date_climbed: string[];
    difficulty: string;
    feet: string;
    gym: string;
    holds: Hold[];
    is_done: boolean;
    name: string;
    radius: number;
    raters: number;
    rating: number;
    repetitions: number;
    safe_name: string;
    section: string;
    time: string;
    _id: string;
}

interface Hold {
    color: string;
    x: number;
    y: number;
}

export const Dashboard = ({ token, username, logout }: DashboardProps) => {

    const colors = ['green', 'blue', 'yellow', 'red'];
    const ticklistQueryKey = 'ticklist';

    async function getUserData(token: string) {
        return fetch(
            'https://rocolib.herokuapp.com/api/v1/user/ticklist', // This gets whole ticklist, both done and todo
            // 'http://localhost:5050/api/v1/user/ticklist',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then(data => data.json())
            .then(data => data.boulders)
    }

    function segmentData(ticklist: Boulder[]): any {
        return colors.map(
            c => Object.fromEntries(
                [
                    ['count', '' + ticklist.filter(p => p.difficulty === c).length],
                    ['label', c],
                    ['part', Math.round(100 * (100 * (Number.EPSILON + ticklist.filter(p => p.difficulty === c).length / ticklist.length))) / 100],
                    ['color', c]
                ]
            )
        );
    }

    const { isLoading, error, data } = useQuery<boolean, unknown, Boulder[]>([ticklistQueryKey], () => getUserData(token))


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
        <AppShellLayout logout={logout} username={username}>
            <h2>Dashboard</h2>
            <div style={{ marginBottom: '1rem' }}>
                <StatsCard done={data!.filter(p => p.is_done).length} todo={data!.filter(p => !p.is_done).length}></StatsCard>
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <StatsSegments total={'' + data!.filter(e => e.is_done).length}
                    diff={0}
                    data={segmentData(data!.filter(p => p.is_done))}
                    title='problems sent' />
            </div>
            <div style={{marginBottom: '1rem'}}>
                <StatsSegments total={'' + data!.filter(p => !p.is_done).length}
                    diff={0}
                    data={segmentData(data!.filter(p => !p.is_done))}
                    title='problems in ticklist to send' />
            </div>
            <div>
                <DailyStats sentProblems={data!.filter(p => p.is_done)}></DailyStats>
            </div>
        </AppShellLayout>
    )
}
