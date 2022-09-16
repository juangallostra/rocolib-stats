import { Loader, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { StatsCard, StatsSegments } from '../components';
import { AppShellLayout } from '../layout';
import './Dashboard.css';

export interface DashboardProps {
    token: string;
    username: string;
    logout: Function;
}

export interface Ticklist {
    boulders: Boulder[];
}

export interface Boulder {
    color: string,
    creator: string,
    date_climbed: string[],
    difficulty: string,
    feet: string,
    gym: string,
    holds: Hold[],
    is_done: boolean,
    name: string,
    radius: number,
    raters: number,
    rating: number,
    repetitions: number,
    safe_name: string,
    section: string,
    time: string,
    _id: string,
}

interface Hold {
    color: string,
    x: number,
    y: number,
}

export const Dashboard = ({ token, username, logout }: DashboardProps) => {
    const [userTicklist, setUserTicklist] = useState<Boulder[]>()

    const colors = ["green", "blue", "yellow", "red"];

    useEffect(() => {
        getUserData(token).then(
            (res: Ticklist) => {
                setUserTicklist(res.boulders);
            }
        )
    })

    async function getUserData(token: string) {
        return fetch(
            // 'https://rocolib.herokuapp.com/api/v1/user/ticklist',
            'http://localhost:5050/api/v1/user/ticklist',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then(data => data.json())
    }

    function segmentData(ticklist: Boulder[]): any {
        return colors.map(
            c => Object.fromEntries(
                [
                    ["count", "" + ticklist.filter(p => p.is_done && p.difficulty === c).length],
                    ["label", c],
                    ["part", Math.round(100 * (100 * (Number.EPSILON + ticklist.filter(p => p.is_done && p.difficulty === c).length / ticklist.filter(p => p.is_done).length))) / 100],
                    ["color", c]
                ]
            )
        );
    }

    if (userTicklist) {
        return (
            <AppShellLayout logout={logout} username={username}>
                <h2>Dashboard</h2>
                <div style={{marginBottom: "1rem"}}>
                <StatsCard done={userTicklist.filter(e => e.is_done).length} todo={userTicklist.filter(e => !e.is_done).length}></StatsCard>
                </div>
                <StatsSegments total={"" + userTicklist.filter(e => e.is_done).length} diff={0} data={segmentData(userTicklist)} ></StatsSegments>
            </AppShellLayout>
        )
    } else {
        return (
            <AppShellLayout username={username} logout={logout}>
                <h2>Dashboard</h2>
                <div className='loader-wrapper'>
                    <Loader size={'xl'} />
                </div>
            </AppShellLayout>
        )
    }
}