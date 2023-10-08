const sketchpad = document.querySelector('#sketchpad');

let gridSize = 32;

const buildGrid = () => {
    const basis = 1/gridSize * 100;
    for (let r=0; r<gridSize; r++) {
        for (let c=0; c<gridSize; c++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.style.flexBasis = `${basis}%`;
            square.style.paddingBottom = `${basis}%`;
            sketchpad.appendChild(square);
        }
    }
}

buildGrid();