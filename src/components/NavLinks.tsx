import { NavLink } from "@mantine/core";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IconSettings, IconHome, IconDatabase } from "@tabler/icons";

export const PreferencesNav = () => {
  const location = useLocation();
  return (
    <NavLink
      label="Preferences"
      component={Link}
      to="/preferences"
      active={location.pathname === "/preferences"}
      icon={<IconSettings></IconSettings>}
    />
  );
};

export const DataExplorerNav = () => {
  const location = useLocation();
  return (
    <NavLink
      label="DDBB Explorer"
      component={Link}
      to="/data_explorer"
      active={location.pathname === "/data_explorer"}
      icon={<IconDatabase></IconDatabase>}
    />
  );
};

export const DashboardNav = () => {
  const location = useLocation();
  return (
    <NavLink
      label="Dashboard"
      component={Link}
      to="/"
      active={location.pathname === "/"}
      icon={<IconHome></IconHome>}
    />
  );
};
