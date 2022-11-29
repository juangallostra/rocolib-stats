import React from "react";
import { Loader, Text } from "@mantine/core";
import { DailyStats, StatsCard, StatsSegments } from "../components";
import { AppShellLayout } from "../layout";
import "./Dashboard.css";
import { useQuery } from "@tanstack/react-query";
import { Boulder, getUserTicklist } from "../api";

export interface DashboardProps {
  token: string;
  username: string;
  logout: Function;
}

export const Dashboard = ({ token, username, logout }: DashboardProps) => {
  const colors = ["green", "blue", "yellow", "red"];
  const ticklistQueryKey = "ticklist";

  function segmentData(ticklist: Boulder[]): any {
    return colors.map((c) =>
      Object.fromEntries([
        ["count", "" + ticklist.filter((p) => p.difficulty === c).length],
        ["label", c],
        [
          "part",
          Math.round(
            100 *
              (100 *
                (Number.EPSILON +
                  ticklist.filter((p) => p.difficulty === c).length /
                    ticklist.length))
          ) / 100,
        ],
        ["color", c],
      ])
    );
  }

  const { isLoading, error, data } = useQuery<boolean, unknown, Boulder[]>(
    [ticklistQueryKey],
    () => getUserTicklist(token)
  );

  if (isLoading) {
    return (
      <AppShellLayout username={username} logout={logout}>
        <h2>Dashboard</h2>
        <div className="loader-wrapper">
          <Loader size={"xl"} />
        </div>
      </AppShellLayout>
    );
  }
  if (error) {
    <Text>Error loading data</Text>;
  }
  return (
    <AppShellLayout logout={logout} username={username}>
      <h2>Dashboard</h2>
      <div style={{ marginBottom: "1rem" }}>
        <StatsCard
          done={data!.filter((p) => p.is_done).length}
          todo={data!.filter((p) => !p.is_done).length}
        ></StatsCard>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <StatsSegments
          total={"" + data!.filter((e) => e.is_done).length}
          diff={0}
          data={segmentData(data!.filter((p) => p.is_done))}
          title="problems sent"
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <StatsSegments
          total={"" + data!.filter((p) => !p.is_done).length}
          diff={0}
          data={segmentData(data!.filter((p) => !p.is_done))}
          title="problems in ticklist to send"
        />
      </div>
      <div>
        <DailyStats sentProblems={data!.filter((p) => p.is_done)}></DailyStats>
      </div>
    </AppShellLayout>
  );
};
