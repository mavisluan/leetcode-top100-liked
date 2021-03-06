/* eslint-disable no-console */
/*
146. LRUCache
Design and implement a data structure for Least Recently Used (LRU) cache. It should support the following operations: get and put.

get(key) - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
put(key, value) - Set or insert the value if the key is not already present. When the cache reached its capacity, it should invalidate the least recently used item before inserting a new item.

The cache is initialized with a positive capacity.

Follow up:
Could you do both operations in O(1) time complexity?
*****************************************************
Example:

LRUCache cache = new LRUCache(2);
                              ^ capacity
cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // returns 1
cache.put(3, 3);    // evicts key 2
cache.get(2);       // returns -1 (not found)
cache.put(4, 4);    // evicts key 1
cache.get(1);       // returns -1 (not found)
cache.get(3);       // returns 3
cache.get(4);       // returns 4
*/

// Solution 1: Map ()
class LRUCache {
    constructor(capacity) {
        this.cache = new Map([]);
        this.capacity = capacity;
    }

    get (k) {   // save the value first, then delete the k&v pair. Set the k&v at
        if (!this.cache.has(k)) return -1;
        const value = this.cache.get(k);
        this.cache.delete(k);  //
        this.cache.set(k, value);
        return value;
    }

    put (k, v) {
        if (this.cache.has(k)) {  // if key exists in the map, delete the existing key and update the value
            this.cache.delete(k);
        } else if (this.cache.size === this.capacity) { // if the size reaches the capacity, delete the first k&v
            const firstk = this.cache.keys().next().value;
            this.cache.delete(firstk);
        }
        this.cache.set(k, v)
    }
}

// const cache = new LRUCache(2);
//
// cache.put(1,1);
// cache.put(2,2);
// console.log('get1', cache.get(1));
// cache.put(3,3);
// console.log('get2', cache.get(2));
// cache.put(4,4);
// console.log('get1', cache.get(1));
// console.log('get3', cache.get(3));
// console.log('get4', cache.get(4));

// Solution 2 Hashtable + DLL
var LRUCache2 = function(capacity) {
    this._capacity = capacity;
    this._count = 0;
    this._head = null;
    this._tail = null;
    this._hashTable = {};
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache2.prototype.get = function(key) {
    if (this._hashTable[key]) {
        const { value } = this._hashTable[key];
        const { prev, next } = this._hashTable[key];
        if (prev) { prev.next = next; }
        if (next) { next.prev = prev || next.prev; }

        if (this._tail === this._hashTable[key]) {
            this._tail = prev || this._hashTable[key];
        }

        this._hashTable[key].prev = null;
        if (this._head !== this._hashTable[key]) {
            this._hashTable[key].next = this._head;
            this._head.prev = this._hashTable[key];
        }

        this._head = this._hashTable[key];

        return value;
    }

    return -1;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache2.prototype.put = function(key, value) {
    if (this._hashTable[key]) {
        this._hashTable[key].value = value;
        this.get(key);
    } else {
        this._hashTable[key] = { key, value, prev: null, next: null };
        if (this._head) {
            this._head.prev = this._hashTable[key];
            this._hashTable[key].next = this._head;
        }

        this._head = this._hashTable[key];

        if (!this._tail) {
            this._tail = this._hashTable[key];
        }

        this._count += 1;
    }

    if (this._count > this._capacity) {
        let removedKey = this._tail.key;

        if (this._tail.prev) {
            this._tail.prev.next = null;
            this._tail = this._tail.prev;
            this._hashTable[removedKey].prev = null;
        }

        delete this._hashTable[removedKey];

        this._count -= 1;
    }
};

const cache2 = new LRUCache2(2);
cache2.put(1,1);
cache2.put(2,2);
cache2.get(1);
cache2.put(3,3);
console.log('get 2', cache2.get(2));
console.log('cache2', cache2);
