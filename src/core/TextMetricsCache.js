function getCacheKey(word, font) {
  return word + "," + font;
}

// Note: Probably can just keep a head and tail variable around - no need for a
// special class...
class LinkedList {
  head;
  tail;
}

class TextMetricsNode {
  key = null;
  next = null;
  previous = null;
  textMetricsData = null;
}

export class TextMetricsCache {
  constructor() {
    // your data structure is stored in this.cacheData
    this.cacheData = new Map();

    // if you need any other class variables,
    // you can add them here:
    this.linkedList = new LinkedList();
  }

  setHeadNode(textMetricsNode) {
    // Link the cached node as the head node...
    textMetricsNode.previous = null;
    textMetricsNode.next = this.linkedList.head;

    // Link the previous head node as the second node...
    if (this.linkedList.head) {
      this.linkedList.head.previous = textMetricsNode;
    }

    // Set the linked list head to the cached node...
    this.linkedList.head = textMetricsNode;
  }

  getCachedEntry(word, font) {
    // please write the code to look up and return the stored
    // TextMetrics, if it exists in the cache, for the input
    // word and font strings.

    const cacheKey = getCacheKey(word, font);
    const textMetricsNode = this.cacheData.get(cacheKey);

    // If there is no cached node, return early...
    if (!textMetricsNode) return;

    // If the cached node is the head node, no need to promote the cached node,
    // just return the data...
    if (textMetricsNode === this.linkedList.head) {
      return textMetricsNode.textMetricsData;
    }

    // Link the cached node's siblings to eachother...
    textMetricsNode.previous.next = textMetricsNode.next;

    if (textMetricsNode.next) {
      textMetricsNode.next.previous = textMetricsNode.previous;
    }

    // If the cached node is the tail node, designate its sibling as the new
    // tail node...
    if (textMetricsNode === this.linkedList.tail) {
      this.linkedList.tail = textMetricsNode.previous;
    }

    this.setHeadNode(textMetricsNode);

    // Return the associated data...
    return textMetricsNode.textMetricsData;
  }

  setCachedEntry(word, font, textMetricsData) {
    // please write the code to store the textMetricsData
    // which corresponds to the  input word and font strings

    const cacheKey = getCacheKey(word, font);

    const textMetricsNode = new TextMetricsNode();
    textMetricsNode.key = cacheKey;
    textMetricsNode.textMetricsData = textMetricsData;

    // Store the new textMetricsNode...
    this.cacheData.set(cacheKey, textMetricsNode);

    // Place the new textMetricsNode as the head node...
    this.setHeadNode(textMetricsNode);

    if (!this.linkedList.tail) {
      this.linkedList.tail = textMetricsNode;
    }
  }

  /**
   * This method will be called when there are too many entries
   * in the cache and we need to evict some of them.
   *
   * @param {integer} numEntriesToEvict - the number of entries that need
   *                                      to be evicted from this.cacheData
   */
  evictEntries(numEntriesToEvict) {
    // Please write the code to choose entries to evict and evict them,
    // according to the strategy/data structure you chose in Question 2.

    // If there are no entries to evict, return early...
    if (numEntriesToEvict < 1) {
      return;
    }

    // If there are no more nodes in the linked list, return early...
    if (!this.linkedList.tail) {
      return;
    }

    // Note: We could improve this by short-circuting the linked list directly
    // and iterate over the detached nodes to dispose of their contents instead
    // of working on each tail node one at a time...
    for (let i = 0; i < numEntriesToEvict; ++i) {
      const evictNode = this.linkedList.tail;

      // If we're trying to evict more nodes than we have, return early...
      if (!evictNode) {
        return;
      }

      // Set the second last node as the tail node...
      if (evictNode.previous) {
        this.linkedList.tail = evictNode.previous;
        this.linkedList.tail.next = null;
      } else {
        this.linkedList.head = null;
        this.linkedList.tail = null;
      }

      // Unlink the evictNode and nullify its data...
      this.cacheData.delete(evictNode.key);

      evictNode.key = null;
      evictNode.previous = null;
      evictNode.next = null;
      evictNode.textMetricsData = null;
    }
  }

  dump() {
    // If the linked list hasn't yet been initialized, return early...
    let dump = "";

    if (!this.linkedList.head) return dump;

    let textMetricsNode = this.linkedList.head;

    // Cut the loop short to avoid infinite loops - just-in-case
    // (not that, that would ever happen!)
    for (let i = 0; i < 100; ++i) {
      dump += textMetricsNode.textMetricsData;

      if (!textMetricsNode.next) break;

      textMetricsNode = textMetricsNode.next;
      dump += ", ";
    }

    return dump;
  }
}
