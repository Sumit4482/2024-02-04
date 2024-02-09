/**
 * Represents a Binary Tree.
 * @class
 */
class BinaryTree {
    /**
     * Create a new binary tree.
     * @constructor
     */
    constructor() {
        this.root = null; // Pointer to the root node of the tree
    }

    /**
     * Insert a new node with the given value into the binary tree.
     * @param {*} value - The value to be inserted.
     */
    insert(value) {
        const newNode = new BNode(value);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    /**
     * Helper function to recursively insert a new node into the binary tree.
     * @param {BNode} node - The current node being considered.
     * @param {BNode} newNode - The new node to be inserted.
     */
    insertNode(node, newNode) {
        if (newNode.data < node.data) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    /**
     * Remove a node with the given value from the binary tree.
     * @param {*} value - The value of the node to be removed.
     */
    remove(value) {
        this.root = this.removeNode(this.root, value);
    }

    /**
     * Helper function to recursively remove a node with the given value from the binary tree.
     * @param {BNode} node - The current node being considered.
     * @param {*} value - The value of the node to be removed.
     * @returns {BNode} - The updated node after removal.
     */
    removeNode(node, value) {
        if (node === null) {
            return null;
        } else if (value < node.data) {
            node.left = this.removeNode(node.left, value);
            return node;
        } else if (value > node.data) {
            node.right = this.removeNode(node.right, value);
            return node;
        } else {
            // Node with the value found, perform removal
            // Case 1: Node has no children
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }
            // Case 2: Node has one child
            if (node.left === null) {
                node = node.right;
                return node;
            } else if (node.right === null) {
                node = node.left;
                return node;
            }
            // Case 3: Node has two children
            const minRightNode = this.findMinNode(node.right);
            node.data = minRightNode.data;
            node.right = this.removeNode(node.right, minRightNode.data);
            return node;
        }
    }

    /**
     * Helper function to find the node with the minimum value in a subtree.
     * @param {BNode} node - The root node of the subtree.
     * @returns {BNode} - The node with the minimum value in the subtree.
     */
    findMinNode(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }
}


