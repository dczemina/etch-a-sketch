
const sketchpad = document.querySelector('#sketchpad');

let gridSize = 32;

const buildGrid = () => {
    const basis = 1/gridSize * 100;
    for (let r=0; r<gridSize; r++) {
        for (let c=0; c<gridSize; c++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.style.flexBasis = `${basis}%`;
            square.style.height = `${basis}%`;
            sketchpad.appendChild(square);
        }
    }
}

const calculateSketchadContainerSize = () => {
    const controls = document.querySelector('#controls');
    const sketchpadContainer = document.querySelector('#sketchpad-container');
    const controlsHeight = controls.offsetHeight + 2;
    sketchpadContainer.style.maxHeight = `calc(100vh - ${controlsHeight}px)`;
}

buildGrid();

calculateSketchadContainerSize();