console.log('script.js is Started.....');

const body = document.querySelector('body');
const gridBox = document.querySelector('#grid-box');
const playGame = document.querySelector('#play-game');
const resetGame = document.querySelector('#reset-game');
let isPlaying = false;
let diamondsRevealed = 0;
let totalDiamonds = 0;

let array = [];
for (let i = 0; i < 25; ++i) {
    array.push(i);
}
console.log(array);

function shuffleArray() {
    for (let i = 0; i < 25; ++i) {
        let randomIndex = Math.floor(Math.random() * 25);

        let temp = array[i];
        array[i] = array[randomIndex];
        array[randomIndex] = temp;
    }
}

function resetGameBoard() {
    for (let i = 0; i < 25; ++i) {
        const cell = document.querySelector(`#cell-${Math.floor(i / 5)}-${i % 5}`);
        cell.innerHTML = ``;
    }

    document.querySelector('#nums-mines').value = '15';
    isPlaying = false;
    diamondsRevealed = 0;
}

function revealAllCells() {
    for (let i = 0; i < 25; ++i) {
        const cell = document.querySelector(`#cell-${Math.floor(i / 5)}-${i % 5}`);
        const image = cell.querySelector("img");
        if (image && image.classList.contains('hidden')) {
            image.classList.remove('hidden');
            image.style.opacity = '0.25';
        }
    }
}

resetGame.addEventListener("click", resetGameBoard);

playGame.addEventListener("click", () => {
    let numsMines = parseInt(document.querySelector('#nums-mines').value);

    isPlaying = true;

    if (!numsMines) {
        alert('This input is required.');
    } else {
        alert("The Game is Started!");
        console.log('Input value:', numsMines);
        shuffleArray();
        shuffleArray();
        shuffleArray();

        console.log(array);

        totalDiamonds = 25 - numsMines;

        for (let i = 0; i < numsMines; ++i) {
            let row = Math.floor(array[i] / 5);
            let col = array[i] % 5;

            document.querySelector(`#cell-${row}-${col}`).innerHTML = `<img src="images/boom.png" alt="boom" class="w-full bg-[#334155] p-2 hidden">`;
        }

        for (let i = numsMines; i < 25; ++i) {
            let row = Math.floor(array[i] / 5);
            let col = array[i] % 5;

            document.querySelector(`#cell-${row}-${col}`).innerHTML = `<img src="images/diamond.png" alt="diamond" class="w-full bg-[#334155] p-2 hidden"></img>`;
        }
    }
});

for (let i = 0; i < 25; ++i) {
    let row = Math.floor(i / 5);
    let col = i % 5;
    document.querySelector(`#cell-${row}-${col}`).addEventListener("click", () => {
        if (isPlaying) {
            const image = document.querySelector(`#cell-${row}-${col}`).querySelector("img");
            if (image && image.classList.contains('hidden')) {
                image.classList.remove('hidden');

                if (image.alt === 'boom') {
                    revealAllCells();
                    setTimeout(() => {
                        alert("Oops! You Stepped on a Mine! \nClick OK to Restart The Game");
                        resetGameBoard();
                    }, 500);

                } else if (image.alt === 'diamond') {
                    diamondsRevealed++;
                    if (diamondsRevealed === totalDiamonds) {

                        setTimeout(() => {
                            alert("Congratulations! You found all the diamonds! \nClick OK to Restart The Game");
                            resetGameBoard();
                        }, 500)

                    }
                }
            }
        } else {
            alert('Please Click On Play Game');
        }
    });
}