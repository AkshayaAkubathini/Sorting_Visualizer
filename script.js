
// Generate an array of numbers proportional to bar heights
function generateArray(size, min, max) {
    const array = [];
    const scaleFactor = (max - min) / size;

    for (let i = 0; i < size; i++) {
        const value = Math.floor(min + (i * scaleFactor));
        array.push(value);
    }

    // Shuffle the array to randomize the order
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}



// Visualize the array with number labels
const speedInput = document.getElementById('speed-input');
const speedLabel = document.getElementById('speed-label');
let currentSpeed = parseInt(speedInput.value);
function updateSpeedLabel() {
    speedLabel.textContent = `${currentSpeed} ms`;
}




function visualizeArray(array) {
    const visualizationContainer = document.getElementById('visualization-container');
    visualizationContainer.innerHTML = '';

    const maxValue = Math.max(...array);

    for (let i = 0; i < array.length; i++) {
        const barHeight = `${array[i]}px`;
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = barHeight;

        const label = document.createElement('div');
        label.classList.add('label');
        label.textContent = array[i];

        bar.appendChild(label);
        visualizationContainer.appendChild(bar);
    }
}
function highlightBars(index1, index2) {
    const visualizationContainer = document.getElementById('visualization-container');
    const bars = visualizationContainer.getElementsByClassName('bar');

    for (let i = 0; i < bars.length; i++) {
        if (i === index1 || i === index2) {
            bars[i].style.backgroundColor = 'red';
        }
    }
    if (index1 !== -1) {
        bars[index1].style.backgroundColor = 'red'; // Highlight first index
    }
    if (index2 !== -1) {
        bars[index2].style.backgroundColor = 'red'; // Highlight second index
}}
// Bubble sort algorithm
async function bubbleSort(array) {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                // Swap elements
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                visualizeArray(array);
                highlightBars(j, j + 1);
                await new Promise(resolve => setTimeout(resolve, currentSpeed));
            }
           
        }
    }
    
}

// Selection sort algorithm
async function selectionSort(array) {
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
            visualizeArray(array);
            highlightBars(minIndex, j);
            await new Promise(resolve => setTimeout(resolve, currentSpeed));
        }
        if (minIndex !== i) {
            // Swap elements
            let temp = array[i];
            array[i] = array[minIndex];
            array[minIndex] = temp;

            visualizeArray(array);
            highlightBars(i, minIndex);
            await new Promise(resolve => setTimeout(resolve, currentSpeed));

        }
    }
}

// Insertion sort algorithm
async function insertionSort(array) {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            visualizeArray(array);
            highlightBars(j, j + 1);

            array[j + 1] = array[j];
            j = j - 1;

            visualizeArray(array);
            highlightBars(j + 1, j);
            await new Promise(resolve => setTimeout(resolve, currentSpeed));
        }
        array[j + 1] = key;
        visualizeArray(array);
        highlightBars(j + 1, j);
        await new Promise(resolve => setTimeout(resolve, currentSpeed));
    }
}

// Quick sort algorithm
async function quickSort(array, low, high) {
    if (low < high) {
        let pivotIndex = await partition(array, low, high);
        await quickSort(array, low, pivotIndex - 1);
        await quickSort(array, pivotIndex + 1, high);
    }
}

async function partition(array, low, high) {
    let pivot = array[high];
    let i = low - 1;
    for (let j = low; j <= high - 1; j++) {
        highlightBars(j, high);

        if (array[j] < pivot) {
            i++;
            // Swap elements
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;

            // Update visualization
            visualizeArray(array);
            highlightBars(i, j);
            // Delay for visualization
            await new Promise(resolve => setTimeout(resolve,currentSpeed));
        }
        highlightBars(j, high);
    }
    // Swap elements
    let temp = array[i + 1];
    array[i + 1] = array[high];
    array[high] = temp;

    // Update visualization
    visualizeArray(array);
    highlightBars(i + 1, high);
    // Delay for visualization
    await new Promise(resolve => setTimeout(resolve, currentSpeed));

    return i + 1;
}

async function mergeSort(array, left, right) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        await mergeSort(array, left, mid);
        await mergeSort(array, mid + 1, right);
        await merge(array, left, mid, right);
    }
}

async function merge(array, left, mid, right) {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    const leftArray = new Array(n1);
    const rightArray = new Array(n2);

    for (let i = 0; i < n1; i++) {
        leftArray[i] = array[left + i];
    }
    for (let j = 0; j < n2; j++) {
        rightArray[j] = array[mid + 1 + j];
    }

    let i = 0;
    let j = 0;
    let k = left;

    while (i < n1 && j < n2) {
       

        if (leftArray[i] <= rightArray[j]) {
            array[k] = leftArray[i];
            i++;
        } else {
            array[k] = rightArray[j];
            j++;
        }
        k++;

        // Update visualization
        visualizeArray(array);
        highlightBars(k-1, -1);
        // Delay for visualization
        await new Promise(resolve => setTimeout(resolve, currentSpeed));
    }

    while (i < n1) {
        highlightBars(left + i, -1);

        array[k] = leftArray[i];
        i++;
        k++;

        // Update visualization
        visualizeArray(array);
        highlightBars(k-1, -1);
        // Delay for visualization
        await new Promise(resolve => setTimeout(resolve,currentSpeed));
    }

    while (j < n2) {
        array[k] = rightArray[j];
        j++;
        k++;

        // Update visualization
        visualizeArray(array);
        highlightBars(k-1, -1);
        // Delay for visualization
        await new Promise(resolve => setTimeout(resolve, currentSpeed));
    }
}

// Generate array button click event
document.getElementById('generate-btn').addEventListener('click', () => {
    const arraySizeInput = document.getElementById('arr_sz');
    const arraySize = parseInt(arraySizeInput.value);
    const minValue = 1;
    const maxValue = 100;
    const array = generateArray(arraySize, minValue, maxValue);
    visualizeArray(array);
});


// Increase speed button click event
document.getElementById('increase-speed-btn').addEventListener('click', () => {
    if (currentSpeed < parseInt(speedInput.max)) {
        currentSpeed += parseInt(speedInput.step);
        speedInput.value = currentSpeed;
        updateSpeedLabel();
    }
});

// Decrease speed button click event
document.getElementById('decrease-speed-btn').addEventListener('click', () => {
    if (currentSpeed > parseInt(speedInput.min)) {
        currentSpeed -= parseInt(speedInput.step);
        speedInput.value = currentSpeed;
        updateSpeedLabel();
    }
});

// Speed input change event
speedInput.addEventListener('input', () => {
    currentSpeed = parseInt(speedInput.value);
    updateSpeedLabel();
});

// Initial update of speed label on page load
// updateSpeedLabel()

// Bubble sort button click event
document.getElementById('bubble-sort-btn').addEventListener('click', () => {
    const visualizationContainer = document.getElementById('visualization-container');
    const bars = visualizationContainer.getElementsByClassName('bar');
    const array = Array.from(bars).map(bar => parseInt(bar.style.height));
    bubbleSort(array);
});


// Selection sort button click event
document.getElementById('selection-sort-btn').addEventListener('click', () => {
    const visualizationContainer = document.getElementById('visualization-container');
    const bars = visualizationContainer.getElementsByClassName('bar');
    const array = Array.from(bars).map(bar => parseInt(bar.style.height));
    selectionSort(array);
});

// Insertion sort button click event
document.getElementById('insertion-sort-btn').addEventListener('click', () => {
    const visualizationContainer = document.getElementById('visualization-container');
    const bars = visualizationContainer.getElementsByClassName('bar');
    const array = Array.from(bars).map(bar => parseInt(bar.style.height));
    insertionSort(array);
});

// Quick sort button click event
document.getElementById('quick-sort-btn').addEventListener('click', () => {
    const visualizationContainer = document.getElementById('visualization-container');
    const bars = visualizationContainer.getElementsByClassName('bar');
    const array = Array.from(bars).map(bar => parseInt(bar.style.height));
    quickSort(array, 0, array.length - 1);
});

// Merge sort button click event
document.getElementById('merge-sort-btn').addEventListener('click', () => {
    const visualizationContainer = document.getElementById('visualization-container');
    const bars = visualizationContainer.getElementsByClassName('bar');
    const array = Array.from(bars).map(bar => parseInt(bar.style.height));
    mergeSort(array, 0, array.length - 1);
});
function createBars() {
    const visualizationContainer = document.getElementById('visualization-container');
    visualizationContainer.innerHTML = '';
    const backgroundText = document.createElement('div');
    backgroundText.classList.add('background-text');
    backgroundText.textContent = 'Sorting Visualizer';
    visualizationContainer.appendChild(backgroundText);
    const arraySizeInput = document.getElementById('arr_sz');
    const arraySize = parseInt(arraySizeInput.value);
    const minValue = 10;
    const maxValue = 200;
    const array = generateArray(arraySize, minValue, maxValue);

    for (let i = 0; i < array.length; i++) {
        const barHeight = `${array[i]}px`;
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = barHeight;
        visualizationContainer.appendChild(bar);
    }
}

// Event listener for number of bars input
document.getElementById('arr_sz').addEventListener('input', createBars);
document.getElementById('speed-input')
// Initial creation of bars on page load
createBars();

