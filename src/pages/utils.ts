import { NodeModel } from "@minoru/react-dnd-treeview";
import { Boulder, getGyms, getGymWalls, getProblems } from "../api";

export interface BoulderProblemNode {
    boulder?: Boulder;
    isTerminalNode: boolean; 
}

// Get gyms, walls and problems
export const getTree = async (): Promise<any> => {
    const gyms = await getGyms();
  
    let dataTree: NodeModel<BoulderProblemNode>[] = [];
    let id = 1;
  
    let GymNameToIdMap = new Map<string, number>();
    let WallNameToIdMap = new Map<string, number>();


    gyms.forEach((g) => {
      dataTree.push({
        id: id,
        parent: 0,
        droppable: false,
        text: g.name,
        data: {
            isTerminalNode: false
        }
      });
      GymNameToIdMap.set(g.name, id);
      id++;
    });
  
    for (const gym of gyms) {
      const gymWalls = await getGymWalls(gym.id);
      for (const wall of gymWalls) {
        // for each wall we should get its parent from the gym name matches
        dataTree.push({
          id: id,
          parent: GymNameToIdMap.get(gym.name)!,
          droppable: false,
          text: wall.name,
          data: {
            isTerminalNode: false
          }
        });
        // Add new map
        WallNameToIdMap.set(wall.image, id);
        // Make parent droppable
        const parentIdx = dataTree.findIndex(
          (node) => node.id === GymNameToIdMap.get(gym.name)
        );
        dataTree[parentIdx].droppable = true;
        id++;
      }
  
      const gymProblems = await getProblems(gym.id);
      for (const problem of gymProblems) {
        dataTree.push({
          id: id,
          parent: WallNameToIdMap.get(problem.section)!,
          droppable: false,
          text: problem.name,
          data: {
            isTerminalNode: true,
            boulder: problem
          }
        });
        // Make parent droppable
        const parentIdx = dataTree.findIndex(
          (node) => node.id === WallNameToIdMap.get(problem.section)
        );
        dataTree[parentIdx].droppable = true;
        id++;
      }
    }
    return dataTree;
  };