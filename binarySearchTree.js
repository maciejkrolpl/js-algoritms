class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor(value) {
        if (value) {
            this.root = new Node(value);
        }
    }

    add(value) {
        if (!this.root) {
            this.root = new Node(value);
        }
        this.#add(value, this.root);
    }

    #add(value, node) {
        if (value < node.value) {
            if (!node.left) {
                node.left = new Node(value);
            } else {
                this.#add(value, node.left);
            }
        } else if (value > node.value) {
            if (!node.right) {
                node.right = new Node(value);
            } else {
                this.#add(value, node.right);
            }
        }
    }

    exists(value) {
        return this.#exists(value, this.root);
    }

    #exists(value, node = this.root) {
        if (node.value === value) {
            return true;
        }
        if (value < node.value) {
            if (!node.left) {
                return false;
            } else {
                return this.exists(value, node.left);
            }
        } else {
            if (!node.right) {
                return false;
            } else {
                return this.exists(value, node.right);
            }
        }
    }

    delete(value) {
        return this.#delete(value, this.root);
    }

    #delete(value, node = this.root) {
        const findSmallestNode = (node) =>
            node.left ? findSmallestNode(node.left) : node;
        if (!node) {
            return node;
        }

        if (value === node.value) {
            if (!node.left && !node.right) {
                return null;
            }

            if (!node.left) {
                return node.right;
            }

            if (!node.right) {
                return node.left;
            }

            const tempNode = findSmallestNode(node.right);
            node.value = tempNode.value;
            node.right = this.#delete(tempNode.value, node.right);
            return node;
        } else if (value < node.value) {
            node.left = this.#delete(value, node.left);
            return node;
        } else {
            node.right = this.#delete(value, node.right);
            return node;
        }
    }

    toArrayInorder() {
        return this.#toArrayInorder(this.root, []);
    }

    #toArrayInorder(node = this.root, arr = []) {
        if (!node) {
            return node;
        }
        this.#toArrayInorder(node.left, arr);
        arr.push(node.value);
        this.#toArrayInorder(node.right, arr);
        return arr;
    }

    toArrayPreorder() {
        return this.#toArrayPreorder(this.root, []);
    }

    #toArrayPreorder(node = this.root, arr = []) {
        if (!node) {
            return;
        }
        arr.push(node.value);
        this.#toArrayPreorder(node.left, arr);
        this.#toArrayPreorder(node.right, arr);
        return arr;
    }

    toArrayPostorder() {
        return this.#toArrayPostorder(this.root, []);
    }

    #toArrayPostorder(node = this.root, arr = []) {
        if (!node) {
            return;
        }
        this.#toArrayPostorder(node.left, arr);
        this.#toArrayPostorder(node.right, arr);
        arr.push(node.value);
        return arr;
    }

    toArrayLevelorder() {
        const depth = this.depth();
        const arr = Array.from({ length: depth }, () => []);
        return this.#toArrayLevelorder(this.root, 0, arr);
    }

    #toArrayLevelorder(node, lvl = 0, arr) {
        if (!node) {
            return;
        }
        arr[lvl].push(node.value);
        lvl++;
        this.#toArrayLevelorder(node.left, lvl, arr);
        this.#toArrayLevelorder(node.right, lvl, arr);
        return arr;
    }

    depth() {
        return this.#depth(this.root);
    }

    #depth(node) {
        if (!node) {
            return 0;
        }
        return Math.max(this.#depth(node.left), this.#depth(node.right)) + 1;
    }

    prettyPrint() {
        this.#prettyPrint(this.root, '', true);
    }

    #prettyPrint(node, prefix, isLeft) {
        if (node.right) {
            this.#prettyPrint(
                node.right,
                prefix + (isLeft && prefix.length ? '│   ' : '    '),
                false
            );
        }

        const branch = !prefix.length ? '  ─ ' : isLeft ? '└── ' : '┌── ';
        console.log(`${prefix}${branch}${node.value}`);

        if (node.left) {
            this.#prettyPrint(
                node.left,
                prefix + (isLeft ? '    ' : '│   '),
                true
            );
        }
    }

    static toBalancedTree(arr) {
        const tree = new BinarySearchTree();
        return tree.#toBalancedTree(arr);
    }

    toBalancedTree() {
        const inorderArr = this.toArrayInorder();
        return BinarySearchTree.toBalancedTree(inorderArr);
    }

    #toBalancedTree(arr) {
        if (!arr.length) {
            return;
        }
        const mid = parseInt(arr.length / 2);
        this.add(arr[mid]);
        this.#toBalancedTree(arr.slice(0, mid));
        this.#toBalancedTree(arr.slice(mid + 1));
        return this;
    }

    isBalanced() {
        return this.#isBalanced(this.root) > 0;
    }

    #isBalanced(node) {
        if (node === null) {
            return 0;
        }

        const l = this.#isBalanced(node.left);
        if (l === -1) {
            return -1;
        }
        const r = this.#isBalanced(node.right);
        if (r === -1) {
            return -1;
        }

        if (Math.abs(r - l) > 1) {
            return -1;
        }

        return Math.max(l, r) + 1;
    }

    isFull() {
        return this.#isFull(this.root);
    }

    #isFull(node) {
        if (node === null) {
            return;
        }
        const childrenCount = Number(!!node.left) + Number(!!node.right);

        if (childrenCount === 1) {
            return false;
        }

        this.#isFull(node.left);
        this.#isFull(node.right);

        return true;
    }

    isPerfect() {
        const maxDepth = this.#depth(this.root);
        return this.#isPerfect(this.root, maxDepth, 0);
    }

    #isPerfect(node, maxDepth, level) {
        if (node.left === null && node.right === null) {
            return maxDepth === level + 1;
        }

        if (node.left === null || node.right === null) {
            return false;
        }

        return (
            this.#isPerfect(node.left, maxDepth, level + 1) &&
            this.#isPerfect(node.right, maxDepth, level + 1)
        );
    }
}

export default BinarySearchTree;
