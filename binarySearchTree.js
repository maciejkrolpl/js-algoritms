class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor(value) {
        this.root = new Node(value);
    }

    add(value, node = this.root) {
        if (value <= node.value) {
            if (!node.left) {
                node.left = new Node(value);
            } else {
                this.add(value, node.left);
            }
        } else {
            if (!node.right) {
                node.right = new Node(value);
            } else {
                this.add(value, node.right);
            }
        }
    }

    search(value, node = this.root) {
        if (node.value === value) {
            return true;
        }
        if (value <= node.value) {
            if (!node.left) {
                return false;
            } else {
                return this.search(value, node.left);
            }
        } else {
            if (!node.right) {
                return false;
            } else {
                return this.search(value, node.right);
            }
        }
    }

    delete(value, node = this.root) {
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

            const tempNode = this.findSmallestNode(node.right);
            node.value = tempNode.value;
            node.right = this.delete(tempNode.value, node.right);
            return node;
        } else if (value < node.value) {
            node.left = this.delete(value, node.left);
            return node;
        } else {
            node.right = this.delete(value, node.right);
            return node;
        }
    }

    findSmallestNode(node) {
        while (node.left) {
            node = node.left;
        }

        return node;
    }

    inorderPrint(node = this.root, arr = []) {
        if (!node) {
            return node;
        }
        this.inorderPrint(node.left, arr);
        arr.push(node.value);
        this.inorderPrint(node.right, arr);
        return arr;
    }

    preorderPrint(node = this.root, arr = []) {
        if (!node) {
            return;
        }
        arr.push(node.value);
        this.preorderPrint(node.left, arr);
        this.preorderPrint(node.right, arr);
        return arr;
    }

    postorderPrint(node = this.root, arr = []) {
        if (!node) {
            return;
        }
        this.postorderPrint(node.left, arr);
        this.postorderPrint(node.right, arr);
        arr.push(node.value);
        return arr;
    }

    levelOrderPrint(node = this.root, lvl = 0, lvls = {}) {
        if (!node) {
            return;
        }
        if (lvls.hasOwnProperty(lvl)) {
            lvls[lvl].push(node.value);
        } else {
            lvls[lvl] = [node.value];
        }
        lvl++;
        this.levelOrderPrint(node.left, lvl, lvls);
        this.levelOrderPrint(node.right, lvl, lvls);
        return lvls;
    }

    levelsCount(node = this.root) {
        if (!node) {
            return 0;
        }
        return (
            Math.max(
                this.levelsCount(node.left),
                this.levelsCount(node.right)
            ) + 1
        );
    }

    prettyPrint() {
        const getCol = (h) => (h === 1 ? 1 : getCol(h - 1) * 2 + 1);

        const pp = (arr, node, x, y, height) => {
            if (!node) {
                return;
            }

            arr[y][x] = node.value;

            pp(arr, node.left, x - Math.pow(2, height - 2), y + 1, height - 1);
            pp(arr, node.right, x + Math.pow(2, height - 2), y + 1, height - 1);
        };

        const height = this.levelsCount();
        const cols = getCol(height);
        const arr = Array.from({ length: height }, () =>
            Array.from({ length: cols }, () => ' ')
        );
        pp(arr, this.root, Math.floor(cols / 2), 0, height);

        const printable = arr.map(row => row.join` `).join('\n')
        console.log(printable)
    }
}

export default BinarySearchTree;
