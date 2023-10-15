
const sketchpad = document.querySelector('#sketchpad');

// Utility Functions

// The difference in total grid square between old and new grid when the size changes
// If the grid gets smaller, simply remove excess squares and resize the remaining. No need to remove all/add all and then add new event listeners
const calculateSquareDiff = (oldSize, newSize) => {
    const oldTotal = oldSize ** 2;
    const newTotal = newSize ** 2;
    return newTotal - oldTotal;
}

// Initial Variable Sizes
let gridSize = 50;
let squareColor = '#abcdef';
let basis;

const gridSizeInput = document.querySelector('#grid-size');
const gridSizeLabel = document.querySelector('#grid-size-label');
const squareColorInput = document.querySelector('#square-color');

// Grid Size Change Event
gridSizeInput.addEventListener('change', (event) => {
    const oldGridSize = gridSize;
    gridSize = event.target.value;
    totalSquareDiff = calculateSquareDiff(oldGridSize, gridSize);
    initGrid(totalSquareDiff);
})

// Color Change Event
squareColorInput.addEventListener('change', (event) => {
    squareColor = event.target.value;
})

// Update UI, remove old grid, build new grid
const initGrid = (squareDiff) => {
    gridSizeLabel.textContent = `Grid Size: ${gridSize} by ${gridSize}`
    gridSizeInput.value = gridSize;
    calcSquareSizePercent();
    initSquares(squareDiff);
}

// Calculate the length/width percents of each square
const calcSquareSizePercent = () => {
    basis = 1/gridSize * 100;
}

// Add grid squares based on current gridSize
const initSquares = (squareDiff = null) => {

    // No change
    if (squareDiff === 0) return;

    // First time, create all squares
    if (!squareDiff) {
        for (let r=0; r<gridSize; r++) {
            for (let c=0; c<gridSize; c++) {
                const square = document.createElement('div');
                initSquare(square);
                sketchpad.appendChild(square);
            }
        }
    } else {
        // Reference to all current squares
        const allSquares = document.querySelectorAll('.square');

        allSquares.forEach(square => {
            square.style.backgroundColor = null;
        })

        // Remove excess squares if new grid is smaller than old grid
        // But keep remaining to save on initialization
        if (squareDiff < 0) {
            for (let i=0; i > squareDiff; i--) {
                if (sketchpad.firstChild)
                    sketchpad.removeChild(sketchpad.firstChild);
            }
        }
        
        // Add new squares if new grid is bigger than old grid
        // Keep existing squares to reduce initialization
        else if (squareDiff > 0) {
    
            allSquares.forEach(square => {
                resizeSquare(square);
            })
    
            for (let i=0; i < squareDiff; i++) {
                const square = document.createElement('div');
                initSquare(square);
                sketchpad.appendChild(square);
            }
        }
    }
}

// Add styling and events to new squares
const initSquare = (square) => {
    // Setup style
    square.classList.add('square');
    resizeSquare(square);

    // Handle Drawing
    square.addEventListener('mousemove', (event) => {
        event.preventDefault();
        // If left-mouse button is down
        if (event.buttons === 1) {
            event.target.style.backgroundColor = squareColor;
        }
    })
    // Disable dragging
    square.ondragstart = () => false;
}

// Set the size of a square per the basis
const resizeSquare = (square) => {
    square.style.flexBasis = `${basis}%`;
    square.style.height = `${basis}%`;
}

// Set the size of the sketchpad container
const calcSketchpadContainerSize = () => {
    const controls = document.querySelector('#controls');
    const instructions = document.querySelector('#instructions');
    const footer = document.querySelector('#footer');
    const sketchpadContainer = document.querySelector('#sketchpad-container');
    const controlsHeight = controls.offsetHeight + 3;
    const instructionsHeight = instructions.offsetHeight + 3;
    const footerHeight = footer.offsetHeight + 3;
    
    sketchpadContainer.style.maxHeight = `calc(100vh - ${controlsHeight}px - ${instructionsHeight}px - ${footerHeight}px)`;
}

// Initiate the grid
initGrid();
squareColorInput.value = squareColor;
// Initiate the grid container
calcSketchpadContainerSize();