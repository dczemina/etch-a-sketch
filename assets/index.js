
const sketchpad = document.querySelector('#sketchpad');

// Grid Size
let gridSize = 16;
let squareColor = '#000';
let basis;

const gridSizeInput = document.querySelector('#grid-size');
const gridSizeLabel = document.querySelector('#grid-size-label');

gridSizeInput.addEventListener('change', (event) => {
    setupGrid(event.target.value);
})

// Update UI, remove old grid, build new grid
const setupGrid = (size) => {
    gridSize = size;
    gridSizeLabel.textContent = `Grid Size: ${gridSize} by ${gridSize}`
    gridSizeInput.value = gridSize;
    removeGrid();
    calculateSquareSize();
    buildGrid();
    console.log('grid built: ' + gridSize)
}

// Remove all grid squares
const removeGrid = () => {
    while (sketchpad.firstChild)
        sketchpad.removeChild(sketchpad.firstChild);
}

const calculateSquareSize = () => {
    basis = 1/gridSize * 100;
}

// Add grid squares based on current gridSize
const buildGrid = () => {
    for (let r=0; r<gridSize; r++) {
        for (let c=0; c<gridSize; c++) {
            const square = document.createElement('div');
            setupGridSquare(square);
            sketchpad.appendChild(square);
        }
    }
}

const calculateSketchpadContainerSize = () => {
    const controls = document.querySelector('#controls');
    const sketchpadContainer = document.querySelector('#sketchpad-container');
    const controlsHeight = controls.offsetHeight + 2;
    
    sketchpadContainer.style.maxHeight = `calc(100vh - ${controlsHeight}px)`;
}

// Add event listeners for draw
const setupGridSquare = (square) => {
    // Setup style
    square.classList.add('square');
    square.style.flexBasis = `${basis}%`;
    square.style.height = `${basis}%`;

    // Handle Drawing
    square.addEventListener('mousemove', (event) => {
        event.preventDefault();
        // If left-mouse button is down
        if (event.buttons === 1) {
            event.target.classList.add('filled');
        }
    })
    // Disable dragging
    square.ondragstart = () => false;
}

// Initiate the grid
setupGrid(gridSize);
// Initiate the grid container
calculateSketchpadContainerSize();