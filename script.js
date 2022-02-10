const r = document.querySelector(":root");
const newGridButton = document.getElementById("new-grid");
const resetButton = document.getElementById("reset");
const INITIAL_SQUARES_NUMBER = 16;
const MAX_ROWS = 50;

let container = document.getElementById("grid-container");
let squares = [];

// Create a n * n grid filled with divs
const createGrid = (numberOfSquaresPerSide) => {
    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
    numberOfSquaresPerSide = clamp(numberOfSquaresPerSide, 0, MAX_ROWS);

    // Set the amount of rows and columns in the CSS
    r.style.setProperty('--number-squares', numberOfSquaresPerSide);

    // Create n * n number of divs and append them to the grid container
    for (let i = 0; i < numberOfSquaresPerSide; ++i) {
        for (let j = 0; j < numberOfSquaresPerSide; ++j) {
            const div = document.createElement("div");
            div.className = "square";
    
            squares.push(div);  // Keep track of divs
            container.appendChild(div);
        }
    }

    addColoringListeners();
}

// Reset (set color back to default) the grid 
// by reverting the class name of the divs
const resetGrid = () => {
    squares.forEach(square => {
        if (square.className.includes(" colored")) {
            // Reset class name to default
            square.className = "square";
        }
    })
}

// Remove all divs and set div tracker to empty
const deleteGrid = () => {
    squares.forEach(square => {
        container.removeChild(square);
    })

    squares = [];
}

// Add event listeners to all the divs in the grid
const addColoringListeners = () => {
    squares.forEach(square => {
        square.addEventListener('mouseenter', () => {
            // Add class name for coloring
            square.className += " colored";
        });
    })
}

createGrid(INITIAL_SQUARES_NUMBER);

newGridButton.addEventListener('click', () => {
    let numberOfSquares = prompt("Enter the amount of squares you want for the grid! Default: 16");
    if (numberOfSquares === '' || isNaN(numberOfSquares)) {
        numberOfSquares = INITIAL_SQUARES_NUMBER;
    }

    deleteGrid();
    createGrid(numberOfSquares);
});
resetButton.addEventListener('click', resetGrid);