const { start } = require("repl");

class Graph {
  constructor(nodeCount) {
    this.numberOfNodes = nodeCount;
    this.connections = new Map();
  }

  addNode(node) {
    this.connections.set(node, []);
  }

  addEdge(start, destination) {
    if (destination) {
      this.connections.get(start).push(destination);
      this.connections.get(destination).push(start);
    } else {
      // Self edge
      this.connections.get(start).push(start);
    }
  }

  getNodes() {
    return this.connections.keys();
  }

  printConnections() {
    this.connections.forEach((value, key) => console.log(`${key} => ${value.join(", ")}`));
  }

  getPreOrderTraversal(node, visited = {}, order = []) {
    visited[node] = true;

    order.push(node);

    const neighbors = [...this.connections.get(node)];

    while (neighbors.length) {
      const neighbor = neighbors.shift();

      if (!visited[neighbor]) {
        this.getPreOrderTraversal(neighbor, visited, order);
      }
    }

    return order;
  }

  getPostOrderTraversal(node, visited = {}, order = []) {
    visited[node] = true;

    const neighbors = [...this.connections.get(node)];

    while (neighbors.length) {
      const neighbor = neighbors.shift();

      if (!visited[neighbor]) {
        this.getPostOrderTraversal(neighbor, visited, order);
      }
    }

    order.push(node);

    return order;
  }

  getShortestPath(startingNode, endingNode) {
    const visited = { [startingNode]: true };
    const queue = [startingNode];
    const predecessor = {};

    while (queue?.length) {
      const current = queue.shift();
      const neighbors = this.connections.get(current);

      for (let i = 0; i < neighbors.length; i++) {
        const neighbor = neighbors[i];

        if (!visited[neighbor]) {
          if (neighbor === endingNode) {
            let shortestPath = [endingNode];

            shortestPath = [current, ...shortestPath];

            let precedingNode = predecessor[current];
            while (precedingNode) {
              shortestPath = [precedingNode, ...shortestPath];
              precedingNode = predecessor[precedingNode];
            }

            return shortestPath;
          }

          visited[neighbor] = true;
          predecessor[neighbor] = current;
          queue.push(neighbor);
        }
      }
    }

    return `There is no path from ${startingNode} to ${endingNode}`;
  }
}

const nodes = ["a", "c", "b", "z", "t", "f", "i", "k", "j"];
const graph = new Graph();

nodes.forEach((node) => graph.addNode(node));

graph.addEdge("a", "c");
graph.addEdge("c", "b");
graph.addEdge("b", "z");
graph.addEdge("t", "f");
graph.addEdge("i", "k");
graph.addEdge("k", "j");
graph.addEdge("j", "a");
graph.addEdge("t", "k");
graph.addEdge("b", "f");
graph.addEdge("c");

graph.printConnections();

const graphNodes = graph.getNodes();
const startingNode = graphNodes.next().value;

console.log("\nThe following is an example use case of bfs: Finding the shortest path.");
console.log(
  `Shortest path from ${startingNode} to t is ${graph
    .getShortestPath(startingNode, "t")
    .join(" -> ")}`
);

console.log("\nThe following is an pre-order traversal of the graph using dfs.");
console.log(graph.getPreOrderTraversal(startingNode).join(" -> "));

console.log("\nThe following is an post-order traversal of the graph using dfs.");
console.log(graph.getPostOrderTraversal(startingNode).join(" -> "));
