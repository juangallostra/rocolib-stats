import { Navbar } from "@mantine/core";
import { DashboardNav, PreferencesNav } from "../components";

export const AppRoutes = () => {
    return (
        <Navbar width={{ base: 250 }} height={"100vh"} p="xs">
            <Navbar.Section mt="xs">
                <DashboardNav />
            </Navbar.Section>
            <Navbar.Section mt="xs">
                <PreferencesNav />
            </Navbar.Section>
        </Navbar>
    );
}
