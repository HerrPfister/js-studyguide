class Node {
  constructor(value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
  }

  getValue() {
    return this.value;
  }

  setLeft(left) {
    this.left = left;
  }

  setRight(right) {
    this.right = right;
  }
}

class Tree {
  constructor() {
    this.nodes = new Map();
    this.nodeCount = 0;
  }

  addNode(value) {
    this.nodes.set(value, new Node(value));
    this.nodeCount += 1;
  }

  getStartingNode() {
    return this.nodes.keys().next().value;
  }

  getDepth(node, depth = 0) {
    if (!node) return depth - 1;

    const current = this.nodes.get(node);
    const { left, right } = current;

    const depthLeft = this.getDepth(left, depth + 1);
    const depthRight = this.getDepth(right, depth + 1);

    return depthLeft > depthRight ? depthLeft : depthRight;
  }

  addChildNodes(node, left, right) {
    this.nodes.get(node).setLeft(left);
    this.nodes.get(node).setRight(right);
  }

  getInOrderTraversal(start, depth = 0) {
    if (start) {
      const node = this.nodes.get(start);
      this.getInOrderTraversal(node.left, depth + 1);
      console.log(" ".repeat(depth * 4), node.getValue());
      this.getInOrderTraversal(node.right, depth + 1);
    }
  }

  getPostOrderTraversal(start, depth = 0) {
    if (start) {
      const node = this.nodes.get(start);
      this.getInOrderTraversal(node.left, depth + 1);
      this.getInOrderTraversal(node.right, depth + 1);
      console.log(" ".repeat(depth * 4), node.getValue());
    }
  }

  getPreOrderTraversal(start, depth = 0) {
    if (start) {
      const node = this.nodes.get(start);
      console.log(" ".repeat(depth * 4), node.getValue());
      this.getInOrderTraversal(node.left, depth + 1);
      this.getInOrderTraversal(node.right, depth + 1);
    }
  }

  traverse(type) {
    const startingNode = this.getStartingNode();

    switch (type) {
      case "pre":
        this.getPostOrderTraversal(startingNode);
        break;
      case "post":
        this.getPostOrderTraversal(startingNode);
        break;
      default:
        this.getInOrderTraversal(startingNode);
        break;
    }
  }
}

const nodes = ["a", "c", "b", "z", "t", "f", "i", "k", "j", "x", "y", "m"];
const tree = new Tree();

nodes.forEach((node) => tree.addNode(node));

tree.addChildNodes("a", "c", "b");
tree.addChildNodes("c", "z", "t");
tree.addChildNodes("b", "f", "i");
tree.addChildNodes("f", "k");
tree.addChildNodes("z", "j");
tree.addChildNodes("j", "x");
tree.addChildNodes("x", "y");
tree.addChildNodes("y", "m");

tree.traverse();

console.log(tree.getDepth(tree.getStartingNode()))
