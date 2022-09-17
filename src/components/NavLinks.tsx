import { NavLink } from '@mantine/core';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IconSettings, IconHome } from "@tabler/icons";

export const PreferencesNav = () => {
    const location = useLocation();
    return (
        <NavLink label='Preferences' 
            component={Link} 
            to='/preferences' 
            active={location.pathname === '/preferences'} 
            icon={<IconSettings></IconSettings>} />
    )
}

export const DashboardNav = () => {
    const location = useLocation();
    return (
        <NavLink label='Dashboard'
            component={Link} 
            to='/'
            active={location.pathname === '/'} 
            icon={<IconHome></IconHome>} />
    )
}