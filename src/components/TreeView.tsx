import React, { ReducerAction, useState } from "react";
import { DndProvider } from "react-dnd";
import {
  Tree,
  NodeModel,
  MultiBackend,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";

import { IconChevronRight, IconChevronDown } from "@tabler/icons";
import "./TreeView.css";
import { BoulderProblemNode } from "../pages/utils";
import { CardGradient, CardSimple } from "./CardTreeNodeView";

export interface TreeViewProps {
  nodes: NodeModel<BoulderProblemNode>[];
}

export const TreeView = ({ nodes }: TreeViewProps) => {
  const [treeData, setTreeData] =
    useState<NodeModel<BoulderProblemNode>[]>(nodes);
  const handleDrop = (newTreeData: NodeModel<BoulderProblemNode>[]) =>
    setTreeData(newTreeData);

  const getTreeNode = (
    node: NodeModel<BoulderProblemNode>,
    icon?: React.ReactNode
  ) => {
    if (node.data?.isTerminalNode) {
      return (
        <CardGradient
          title={node.text}
          description={node.data.boulder!.notes}
          difficultyColor={node.data.boulder!.difficulty}
        ></CardGradient>
      );
    }
    return <CardSimple title={node.text} icon={icon} />;
    // return node.text;
  };

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <Tree
        tree={treeData}
        rootId={0}
        canDrag={(node) => false}
        onDrop={handleDrop}
        render={(node, { depth, isOpen, onToggle }) => (
          <div
            style={{ marginLeft: depth * 10 }}
            onClick={() => (node.droppable ? onToggle() : (() => {})())}
          >
            {getTreeNode(
              node,
              isOpen ? <IconChevronDown /> : <IconChevronRight />
            )}
          </div>
        )}
      />
    </DndProvider>
  );
};
