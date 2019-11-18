const LinkedList = require('./linkedList');

// how NOT to sort - bubble sort
const swap = (array, i, j) => {
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
};

const bubbleSort = (array) => {
    let swaps = 0;
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i + 1]) {
            swap(array, i, i + 1);
            swaps++;
        }
    }

    if (swaps > 0) {
        return bubbleSort(array);
    }
    return array;
};

const mergeSort = (array) => {
    if (array.length <= 1) {
        return array;
    }

    const middle = Math.floor(array.length / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle, array.length);

    left = mergeSort(left);
    right = mergeSort(right);
    return merge(left, right, array);
};

const merge = (left, right, array) => {
    let leftIndex = 0;
    let rightIndex = 0;
    let outputIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            array[outputIndex++] = left[leftIndex++];
        }
        else {
            array[outputIndex++] = right[rightIndex++];
        }
    }

    for (let i = leftIndex; i < left.length; i++) {
        array[outputIndex++] = left[i];
    }

    for (let i = rightIndex; i < right.length; i++) {
        array[outputIndex++] = right[i];
    }
    return array;
};

const quickSort = (array, start = 0, end = array.length) => {
    if (start >= end) {
        return array;
    }
    const middle = partition(array, start, end);
    array = quickSort(array, start, middle);
    array = quickSort(array, middle + 1, end);
    return array;
};

const partition = (array, start, end) => {
    const pivot = array[end - 1];
    let j = start;
    for (let i = start; i < end - 1; i++) {
        if (array[i] <= pivot) {
            swap(array, i, j);
            j++;
        }
    }
    swap(array, end-1, j);
    return j;
};

const splitLinkedList = (linkedList) => {
    let middle = Math.floor(linkedList.size / 2)
    let left = new LinkedList();
    let right = new LinkedList();
  
    let currentNode = linkedList.head;
    let index = 0
    while (currentNode) {
      if(index < middle) {
        left.insertAtLastPosition(currentNode.data);
      } else {
        right.insertAtLastPosition(currentNode.data);
      }
      currentNode = currentNode.next;
      index++
    }
    return [left, right];
  }

const mergeSortLinkedList = (linkedList) => {
    if (linkedList.size <= 1) {
        return linkedList;
    }
    let [left, right] = splitLinkedList(linkedList);
    // linkedList.printListData();
    // left.printListData();
    // right.printListData();

//left = mergeSortLinkedList(left)
//right = mergeSortLinkedList(right)
//return mergeLinkedList(left, right, linkedList);
}

const main = () => {
    let option = process.argv[2] || 1
    switch (option) {
      case '1':
        console.log(`\nSort ${count} numbers using Bubble Sort:`)
        bubbleSort(arr)
        break
      case '2':
        console.log(`\nSort ${count} numbers using Merge Sort:`)
        steps = 0
        mergeSort(arr)
        break
      case '3':
        console.log(`\nSort ${count} numbers using Quick Sort:`)
        steps = 0
        quickSort(arr)
        break
      case '4':
        let myLinkedList = new LinkedList()
        let allData = [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2]
        allData.forEach(item => myLinkedList.insertAtLastPosition(item))
        mergeSortLinkedList(myLinkedList)
        break
      default:
        console.log(`\nSort ${count} numbers using Bubble Sort:`)
        bubbleSort(arr)
        break
    }
  }
  main();