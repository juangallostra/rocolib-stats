import { Navbar } from '@mantine/core';
import { DashboardNav, PreferencesNav, DataExplorerNav } from '../components';

interface NavBarProps {
    opened: boolean;
}

export const AppRoutes = ({opened}: NavBarProps) => {
    return (
        <Navbar p='md' 
            hiddenBreakpoint='sm' 
            hidden={!opened} 
            width={{ sm: 200, lg: 250 }} 
            height={'100vh'}>
            <Navbar.Section mt='xs'>
                <DashboardNav />
            </Navbar.Section>
            <Navbar.Section mt='xs'>
                <PreferencesNav />
            </Navbar.Section>
            <Navbar.Section mt='xs'>
                <DataExplorerNav />
            </Navbar.Section>
        </Navbar>
    );
}
