import LinkedList from '../linkedlist.js';

describe('test size', function () {
    it('Empty List', () => {
        const list = new LinkedList();
        expect(list.size()).toEqual(0);
    });
    it('1 item List', () => {
        const list = new LinkedList(25);
        expect(list.size()).toEqual(1);
    });
    it('10 items List', () => {
        const list = new LinkedList(6, 3, 5, 8, 6, 1, 5, 4, 0, 2);
        expect(list.size()).toEqual(10);
    });
});
describe('test add at', function () {
    it('At negative index', () => {
        const list = new LinkedList(12, 53, 12, 6);
        expect(() => list.addAt(-50, 666)).toThrow('Invalid index');
    });
    it('At index 0', () => {
        const list = new LinkedList(12, 53, 12, 6);
        list.addAt(0, 666);
        expect(list.head.value).toEqual(666);
        expect(list.head.next.value).toEqual(12);
    });
    it('At index 1', () => {
        const list = new LinkedList(12, 53, 12, 6);
        list.addAt(1, 666);
        expect(list.head.value).toEqual(12);
        expect(list.head.next.value).toEqual(666);
        expect(list.head.next.next.value).toEqual(53);
    });
    it('At index one before last', () => {
        const list = new LinkedList(12, 53, 12, 6);
        list.addAt(3, 666);
        expect(list.head.next.next.next.value).toEqual(666);
        expect(list.head.next.next.next.next.value).toEqual(6);
    });
    it('At index last', () => {
        const list = new LinkedList(12, 53, 12, 6);
        list.addAt(4, 666);
        expect(list.head.next.next.next.next.value).toEqual(666);
        expect(list.head.next.next.next.next.next).toBeNull();
    });
});

describe('test add', function () {
    it('To empty List', () => {
        const list = new LinkedList();
        list.add(10);
        expect(list.head.value).toEqual(10);
        expect(list.head.next).toBeNull();
    });
    it('1 item List', () => {
        const list = new LinkedList(25);
        list.add(32);
        expect(list.head.value).toEqual(25);
        expect(list.head.next.value).toEqual(32);
        expect(list.head.next.next).toBeNull();
    });
    it('10 items List', () => {
        const list = new LinkedList(6, 3, 5, 8, 6, 1, 5, 4, 0, 2);
        list.add(666);
        expect(
            list.head.next.next.next.next.next.next.next.next.next.next.value
        ).toEqual(666);
        expect(
            list.head.next.next.next.next.next.next.next.next.next.next.next
        ).toBeNull();
    });
});

describe('test getFirst', function () {
    it('Empty List', () => {
        const list = new LinkedList();
        expect(list.getFirst()).toBeUndefined();
    });
    it('1 item List', () => {
        const list = new LinkedList(25);
        expect(list.getFirst()).toEqual(25);
    });
    it('10 items List', () => {
        const list = new LinkedList(6, 3, 5, 8, 6, 1, 5, 4, 0, 2);
        expect(list.getFirst()).toEqual(6);
    });
});

describe('test getLast', function () {
    it('Empty List', () => {
        const list = new LinkedList();
        expect(list.getLast()).toBeUndefined();
    });
    it('1 item List', () => {
        const list = new LinkedList(25);
        expect(list.getLast()).toEqual(25);
    });
    it('10 items List', () => {
        const list = new LinkedList(6, 3, 5, 8, 6, 1, 5, 4, 0, 2);
        expect(list.getLast()).toEqual(2);
    });
});

describe('test getAt', function () {
    it('Empty List, 1st elem', () => {
        const list = new LinkedList();
        expect(() => list.getAt(0)).toThrow('Invalid index');
    });
    it('Empty List, 4th elem', () => {
        const list = new LinkedList();
        expect(() => list.getAt(4)).toThrow('Invalid index');
    });
    it('first elem', () => {
        const list = new LinkedList(35, 21);
        expect(list.getAt(0)).toEqual(35);
    });
    it('last elem of 1 elem', () => {
        const list = new LinkedList(35);
        expect(list.getAt(0)).toEqual(35);
    });
    it('last elem of multiple elem', () => {
        const list = new LinkedList(35, 24, 65);
        expect(list.getAt(2)).toEqual(65);
    });
    it('some elem of multiple elem 1', () => {
        const list = new LinkedList(35, 24, 65, 64, 23);
        expect(list.getAt(2)).toEqual(65);
    });
    it('some elem of multiple elem 2', () => {
        const list = new LinkedList('alpha', 'beta', 'gamma', 'delta');
        expect(list.getAt(1)).toEqual('beta');
    });
    it('4th elem of 3-item elem', () => {
        const list = new LinkedList('alpha', 'beta', 'gamma');
        expect(() => list.getAt(3)).toThrow('Invalid index');
    });
    it('10th elem of 3-item elem', () => {
        const list = new LinkedList('alpha', 'beta', 'gamma');
        expect(() => list.getAt(10)).toThrow('Invalid index');
    });
    it('negative index', () => {
        const list = new LinkedList('alpha', 'beta', 'gamma');
        expect(() => list.getAt(-10)).toThrow('Invalid index');
    });
});

describe('test clear', function () {
    it('should clear list', () => {
        const list = new LinkedList(53, 12, 63, 12);
        list.clear();
        expect(list.head).toBeUndefined();
    });
});

describe('test toArray', function () {
    it('empty list', () => {
        const list = new LinkedList();
        const array = list.toArray();
        expect(array).toEqual([]);
    });
    it('1 item list', () => {
        const list = new LinkedList(23);
        const array = list.toArray();
        expect(array).toEqual([23]);
    });
    it('6 item list', () => {
        const list = new LinkedList(23, 34, 45, 56, 67, 78);
        const array = list.toArray();
        expect(array).toEqual([23, 34, 45, 56, 67, 78]);
    });
    it('6 item string list', () => {
        const list = new LinkedList(
            'alpha',
            'beta',
            'gamma',
            'delta',
            'epsilon',
            'dzeta'
        );
        const array = list.toArray();
        expect(array).toEqual([
            'alpha',
            'beta',
            'gamma',
            'delta',
            'epsilon',
            'dzeta',
        ]);
    });
    it('2 item object list', () => {
        const list = new LinkedList({ a: 45 }, { b: 21 });
        const array = list.toArray();
        expect(array).toEqual([{ a: 45 }, { b: 21 }]);
    });
});

describe('remove at', function () {
    it('first index', () => {
        const list = new LinkedList(53, 12, 63, 12);
        list.removeAt(0);
        expect(list.head.value).toEqual(12);
        expect(list.head.next.next.next).toBeNull();
    });
    it('second index', () => {
        const list = new LinkedList(53, 12, 63, 12);
        list.removeAt(1);
        expect(list.head.value).toEqual(53);
        expect(list.head.next.value).toEqual(63);
        expect(list.head.next.next.next).toBeNull();
    });
    it('third index', () => {
        const list = new LinkedList(53, 12, 63, 13);
        list.removeAt(2);
        expect(list.head.value).toEqual(53);
        expect(list.head.next.value).toEqual(12);
        expect(list.head.next.next.value).toEqual(13);
        expect(list.head.next.next.next).toBeNull();
    });
    it('last index', () => {
        const list = new LinkedList(53, 12, 63, 13);
        list.removeAt(3);
        expect(list.head.value).toEqual(53);
        expect(list.head.next.value).toEqual(12);
        expect(list.head.next.next.value).toEqual(63);
        expect(list.head.next.next.next).toBeNull();
    });
    it('negative index', () => {
        const list = new LinkedList('alpha', 'beta', 'gamma');
        expect(() => list.removeAt(-10)).toThrow('Invalid index');
    });
    it('too big index', () => {
        const list = new LinkedList('alpha', 'beta', 'gamma');
        expect(() => list.removeAt(3)).toThrow('Invalid index');
    });
});

describe('remove at', function () {
    it('from array', () => {
        const list = LinkedList.fromArray([2,4,6]); 
        expect(list.head.value).toEqual(2);
        expect(list.head.next.value).toEqual(4);
        expect(list.head.next.next.value).toEqual(6);
        expect(list.head.next.next.next).toBeNull();
    });
    it('from empty', () => {
        const list = LinkedList.fromArray([]); 
        expect(list.head).toBeUndefined();
    });
});
