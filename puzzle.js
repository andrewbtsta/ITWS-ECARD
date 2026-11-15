const SIZE = 3;               // 3 x 3 puzzle
const TOTAL = SIZE * SIZE;    // 9 pieces

const shuffleBtn = document.getElementById("shuffleBtn");
const board = document.getElementById("board");
const statusText = document.getElementById("status");

let pieces = [];        // pieces[position] = which part of the picture is there
let selected = -1;      // the piece clicked first (-1 means none)
let moves = 0;
let finished = false;

const countCorrect = () => {
  let count = 0;
  for (let i = 0; i < TOTAL; i++) {
    if (pieces[i] === i) count++;
  }
  return count;
};

const shuffle = () => {
  pieces = [];
  for (let i = 0; i < TOTAL; i++) pieces.push(i);

  // shuffle until no piece is in the right place
  do {
    for (let i = TOTAL - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = pieces[i];
      pieces[i] = pieces[j];
      pieces[j] = temp;
    }
  } while (countCorrect() > 0);

  selected = -1;
  moves = 0;
  finished = false;
  board.classList.remove("done");
  drawBoard();
};

const drawBoard = () => {
  board.innerHTML = "";

  for (let i = 0; i < TOTAL; i++) {
    let piece = pieces[i];
    let button = document.createElement("button");
    button.type = "button";
    button.className = "tile";

    if (i === selected) button.classList.add("sel");
    if (piece === i) button.classList.add("ok");

    let col = piece % SIZE;
    let row = Math.floor(piece / SIZE);
    let x = col * 100 / (SIZE - 1);
    let y = row * 100 / (SIZE - 1);

    button.style.backgroundImage = "url('" + CARD.image + "')";
    button.style.backgroundPosition = x + "% " + y + "%";
    button.setAttribute("aria-label", "Piece " + (i + 1));
    button.onclick = () => clickPiece(i);

    board.appendChild(button);
  }

  statusText.textContent = countCorrect() + " of " + TOTAL + " pieces in place, " + moves + " swaps";
};

const clickPiece = (i) => {
  if (finished || pieces[i] === i) return;

  if (selected === -1) {
    selected = i;
  } else if (selected === i) {
    selected = -1;
  } else {
    let temp = pieces[selected];
    pieces[selected] = pieces[i];
    pieces[i] = temp;
    selected = -1;
    moves++;
  }

  drawBoard();

  if (countCorrect() === TOTAL) winGame();
};

// solved: show the full picture for a moment, then go to page 3
const winGame = () => {
  finished = true;
  board.classList.add("done");
  statusText.textContent = "Solved in " + moves + " swaps!";
  setTimeout(() => { window.location.href = "message.html"; }, 1500);
};

shuffleBtn.onclick = shuffle;
shuffle();
