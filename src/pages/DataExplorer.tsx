import { useQuery } from "@tanstack/react-query";
import { TreeView } from "../components";
import { AppShellLayout } from "../layout";
import { NodeModel } from "@minoru/react-dnd-treeview";
import { Loader, Text } from "@mantine/core";
import { BoulderProblemNode, getTree } from "./utils";

interface DataExplorerProps {
  logout: Function;
  username: string;
}

export const DataExplorer = ({ logout, username }: DataExplorerProps) => {
  const ddbbQueryKey = "ddbbData";

  const { isLoading, error, data } = useQuery<NodeModel<BoulderProblemNode>[], unknown, NodeModel<BoulderProblemNode>[]>(
    [ddbbQueryKey],
    () => getTree()
  );

  if (isLoading) {
    return (
      <AppShellLayout username={username} logout={logout}>
        <h2>Database Explorer</h2>
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
    <AppShellLayout username={username} logout={logout}>
      <h2>Database Explorer</h2>
      <TreeView nodes={data!}></TreeView>
    </AppShellLayout>
  );
};
