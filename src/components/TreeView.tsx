import { useState } from "react";
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
import { CardGradient } from "./CardTreeNodeView";

export interface TreeViewProps {
  nodes: NodeModel<BoulderProblemNode>[];
}

export const TreeView = ({ nodes }: TreeViewProps) => {
  const [treeData, setTreeData] =
    useState<NodeModel<BoulderProblemNode>[]>(nodes);
  const handleDrop = (newTreeData: NodeModel<BoulderProblemNode>[]) =>
    setTreeData(newTreeData);

  const getTreenode = (node: NodeModel<BoulderProblemNode>) => {
    if (node.data?.isTerminalNode) {
      return (
        <CardGradient
          title={node.text}
          description={node.data.boulder!.notes}
          difficultyColor={node.data.boulder!.difficulty}
        ></CardGradient>
      );
    }
    return node.text;
  };

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <Tree
        tree={treeData}
        rootId={0}
        canDrag={(node) => false}
        onDrop={handleDrop}
        render={(node, { depth, isOpen, onToggle }) => (
          // <div style={{ marginLeft: depth * 10, display: "flex" }}>
          <div style={{ marginLeft: depth * 10 }}>
            {node.droppable && (
              <span onClick={onToggle}>
                {isOpen ? <IconChevronDown /> : <IconChevronRight />}
              </span>
            )}
            {getTreenode(node)}
          </div>
        )}
      />
    </DndProvider>
  );
};
