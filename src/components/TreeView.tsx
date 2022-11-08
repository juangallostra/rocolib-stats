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
export interface TreeViewProps {
  nodes: NodeModel[]
}

export const TreeView = ({nodes}: TreeViewProps) => {
  const [treeData, setTreeData] = useState<NodeModel[]>(nodes);
  const handleDrop = (newTreeData: NodeModel[]) => setTreeData(newTreeData);

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <Tree
        tree={treeData}
        rootId={0}
        onDrop={handleDrop}
        render={(node, { depth, isOpen, onToggle }) => (
          <div style={{ marginLeft: depth * 10, display: 'flex' }}>
            {node.droppable && (
              // <span onClick={onToggle}>{isOpen ? "[-]" : "[+]"}</span>
              <span onClick={onToggle}>{isOpen ? <IconChevronDown/> : <IconChevronRight/>}</span>
            )}
            {node.text}
          </div>
        )}
      />
    </DndProvider>
  );
}