/**
 * Represents a node in the linked list.
 * @class
 */
class Node {
  static idCounter = 1;
  /**
   * Create a new node with the given value.
   * @constructor
   * @param {*} val - The value of the node.
   */
  constructor(val) {
    this.data = val;
    this.next = null;
    this.key = Node.idCounter++;
  }
}

/**
 * Represents a linked list.
 * @class
 */
class LinkedList {
  /**
   * Create a new linked list.
   * @constructor
   */
  constructor() {
    this.head = null;
  }

  /**
   * Insert a new node at the front of the linked list.
   * @param {*} value - The value to be inserted.
   */
  insertAtFront(value) {
    var newNode = new Node(value);
    if (this.head == null) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
  }

  /**
   * Insert a new node at the end of the linked list.
   * @param {*} value - The value to be inserted.
   */
  insertAtEnd(value) {
    var newNode = new Node(value);
    if (this.head != null) {
      var temp = this.head;
      while (temp.next != null) {
        temp = temp.next;
      }
      temp.next = newNode;
    } else {
      this.head = newNode;
    }
  }

  /**
   * Delete the node at the front of the linked list.
   */
  deleteAtFront() {
    if (this.head == null) {
      console.log("Linked List is Empty !! ");
    } else {
      this.head = this.head.next;
    }
  }

  /**
   * Delete the node at the end of the linked list.
   */
  deleteAtEnd() {
     if (this.head === null) {
      console.log("Linked List is Empty !! ");
    } else if (this.head.next === null) {
      this.head = null;
    } else {
      let tempNode = this.head;
      while (tempNode.next.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = null;
    }
  }

  /**
   * Reverse the linked list.
   */
  reverseLinkedList() {
		if (this.head === null) {
      console.log("List is Empty !!");
    } else {
      let prev = null;
      let current = this.head;
      let temp;
      while (current !== null) {
        temp = current.next;
        current.next = prev;
        prev = current;
        current = temp;
      }
      this.head = prev;
    }
  }

  /**
   * Search for a value in the linked list.
   * @param {*} value - The value to search for.
   * @returns {boolean} - True if the value is found, false otherwise.
   */
  search(value) {
    let tempNode = this.head;
    while (tempNode !== null) {
      if (tempNode.data === value) {
        return true;
      }
      tempNode = tempNode.next;
    }
    return false;
  }

  /**
   * Get the length of the linked list.
   * @returns {number} - The length of the linked list.
   */
  getLength() {
    let length = 0;
    let tempNode = this.head;
    while (tempNode !== null) {
      length++;
      tempNode = tempNode.next;
    }
    return length;
  }

  /**
   * Remove the first occurrence of a value from the linked list.
   * @param {*} value - The value to be removed.
   */
  removeValue(value) {
    if (this.head === null) {
      console.log("Linked List is Empty !! ");
      return;
    }

    if (this.head.data === value) {
      this.head = this.head.next;
      return;
    }

    let tempNode = this.head;
    while (tempNode.next !== null && tempNode.next.data !== value) {
      tempNode = tempNode.next;
    }

    if (tempNode.next === null) {
      console.log("Value not found in the Linked List");
    } else {
      tempNode.next = tempNode.next.next;
    }
  }

  /**
   * Clear all elements in the linked list.
   */
  clear() {
    this.head = null;
  }

  /**
   * Print the elements of the linked list.
   */
  printLinkedList() {
    var tempNode = this.head;
    while (tempNode != null) {
      process.stdout.write(`${tempNode.data} `);

      tempNode = tempNode.next;
    }
  }

  /**
   * Delete a specific occurrence of a value from the linked list.
   * @param {*} value - The value to be deleted.
   * @param {number} occurrence - The occurrence of the value to delete.
   */
  deleteNodeByOccurrence(value, occurrence) {
    if (this.head === null) {
      console.log("Linked List is Empty !! ");
      return;
    }

    let current = this.head;
    let prev = null;
    let count = 0;

    while (current !== null) {
      if (current.data === value) {
        count++;
        if (count === occurrence) {
          if (prev === null) {
            // If the node to delete is the head
            this.head = current.next;
          } else {
            prev.next = current.next;
          }
          return;
        }
      }
      prev = current;
      current = current.next;
    }
    console.log(
      `Occurrence ${occurrence} of ${value} not found in the Linked List`
    );
  }
}

// Testing Here

var sum = new LinkedList(); //Creating Instance
sum.insertAtFront(20);
sum.insertAtFront(10);
sum.insertAtEnd(30);
sum.insertAtFront(30);
// sum.deleteNodeByOccurrence(30,1)
sum.printLinkedList();
