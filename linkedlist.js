class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    add(value) {
        if (this.head) {
            let last = this.head;
            while (last.next) {
                last = last.next;
            }
            last.next = new Node(value);
        } else {
            this.head = new Node(value);
        }
    }

    toArray() {
        const array = [];
        if (this.size() > 0) {
            let node;
            do {
                node = node?.next || this.head;
                array.push(node.value);
            } while (node.next);
        }
        return array;
    }

    addAt(index, value) {
        if (index > this.size() || index < 0) {
            throw 'Invalid index';
        }
        if (index === 0) {
            const oldHead = this.head;
            this.head = new Node(value);
            this.head.next = oldHead;
        } else {
            let i = 0;
            let nodePrev = this.head;
            while (i < index - 1) {
                nodePrev = nodePrev.next;
                i++;
            }
            const nodeNext = nodePrev.next;
            nodePrev.next = new Node(value);
            nodePrev.next.next = nodeNext;
        }
    }

    removeAt(index) {
        if (index >= this.size() || index < 0) {
            throw 'Invalid index';
        }
        if (index === 0) {
            this.head = this.head.next;
        } else {
            let i = 0;
            let nodePrev = this.head;
            while (i < index - 1) {
                nodePrev = nodePrev.next;
                i++;
            }
            const nodeNext = nodePrev.next.next;
            nodePrev.next = nodeNext;
        }
    }

    size() {
        if (this.head) {
            let size = 1;
            let node = this.head;
            while (node.next) {
                size++;
                node = node.next;
            }
            return size;
        } else {
            return 0;
        }
    }

    getAt(index) {
        const size = this.size();
        if (index >= size || index < 0) {
            throw 'Invalid index';
        } else if (index === 0) {
            return this.getFirst();
        } else if (index === size - 1) {
            return this.getLast();
        }
        let i = 0;
        let node = this.head;
        while (i < index) {
            node = node.next;
            i++;
        }
        return node.value;
    }

    clear() {
        this.head = undefined;
    }

    getFirst() {
        return this.head?.value;
    }

    getLast() {
        if (this.size() <= 1) {
            return this.getFirst();
        }
        let node = this.head;
        while (node.next) {
            node = node.next;
        }
        return node.value;
    }

    constructor() {
        if (arguments.length > 0) {
            this.head = new Node(arguments[0]);
        }
        if (arguments.length > 1) {
            for (let i = 1, l = arguments.length; i < l; i++) {
                this.add(arguments[i]);
            }
        }
    }

    static fromArray(array) {
        const list = new LinkedList();
        if (array.length) {
            for (const i of array) {
                list.add(i);
            }
        }
        return list;
    }
}

export default LinkedList;
