/*----- constants -----*/

const PLAYERS = {
    '': '',
    '1': 'X',
    '-1': 'O'
 };
 
/*----- app's state (variables) -----*/
let board;
let turn;
let winner;
let plays;
let player1Score = 0;
let player2Score = 0;
let winPattern;

// let board2;
 
/*----- cached element references -----*/
let button = document.getElementById('play');
let reset = document.getElementById('reset')
let msgDisp = document.querySelector('h2');
let scoreX = document.getElementById('ScoreX');
let scoreO = document.getElementById('ScoreO');
    


/*----- event listeners -----*/
button.addEventListener('click', init);
document.getElementById('board').addEventListener('click', renderChoice);
// document.getElementById('board2').addEventListener('click', renderChoice2);
reset.addEventListener('click', resetScore)



/*----- functions -----*/
init();

function init(){
    board = [
        ['','',''],
        ['','',''],
        ['','','']
    ];
    // board2 = [
    //     ['','','','','','','','','']
    // ];
    turn = 1;
    winner = null;
    plays = 0;
    render();
    winPattern = null;
}

function render(){
    button.style.visibility = winner ? 'visible' : 'hidden';
    reset.style.visibility = winner ? 'visible' : 'hidden';
    renderBoard();
    renderMessage();
}

function render2(){
    button.style.visibility = winner ? 'visible' : 'hidden';
    reset.style.visibility = winner ? 'visible' : 'hidden';
    renderBoard2();
    renderMessage();
}

function resetScore(){
    player1Score = 0;
    player2Score = 0;
    scoreO.innerHTML = `Score: ${player2Score}`;
    scoreX.innerHTML = `Score: ${player1Score}`;
}

function renderBoard() {
    board.forEach(function (rowArr, rowIdx) {
        rowArr.forEach(function (playerVal, colIdx) {
            const divId = `c${colIdx}r${rowIdx}`;  // e.g. "c6r5"
            const box = document.getElementById(divId);
            // box.classList.add("occupied");
            let element = board[rowIdx][colIdx];
            box.innerHTML = PLAYERS[element];
            if (box.innerHTML === 'X' || box.innerHTML === 'O') {
                box.classList.add("occupied");
                box.classList.remove("empty");
                //Horizontal
                if(winPattern === 0 && rowIdx === 0){
                    box.classList.add("win");
                }
                if(winPattern === 1 && rowIdx === 1){
                    box.classList.add("win");
                }
                if(winPattern === 2 && rowIdx === 2){
                    box.classList.add("win");
                }
                //Vertical
                if(winPattern === 3 && colIdx === 0){
                    box.classList.add("win");
                }
                if(winPattern === 4 && colIdx === 1){
                    box.classList.add("win");
                }
                if(winPattern === 5 && colIdx === 2){
                    box.classList.add("win");
                }
                //Diagonal
                if(winPattern === 6 && ((rowIdx === 0 && colIdx === 0) || (rowIdx === 1 && colIdx === 1) || (rowIdx === 2 && colIdx === 2))){
                    box.classList.add("win");
                }
                if(winPattern === 7 && ((rowIdx === 0 && colIdx === 2) || (rowIdx === 1 && colIdx === 1) || (rowIdx === 2 && colIdx === 0))){
                    box.classList.add("win");
                }
            } else {
                box.classList.remove("occupied");
                box.classList.add("empty");
                box.classList.remove("win");
            }
        });
    });
}

function renderBoard2() {
    board2.forEach(function (Idx) {
            const divId = `${Idx}`;  // e.g. "5"
            const box = document.getElementById(divId);
            let element = board2[Idx];
            box.innerHTML = PLAYERS[element];
    });
}

function randomIntFromInterval(min, max) {

    // // find diff
    // let difference = max - min;

    // // generate random number 
    // let rand = Math.random();

    // // multiply with difference 
    // rand = Math.floor( rand * difference);

    // // add with min value 
    // rand = rand + min;

    // return rand;

    return Math.floor(Math.random() * (max - min)) + min;

}

function generateRandom(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//Easy Mode
function computerChoice(){
    let boxID;
    let colIdx;
    let rowIdx;
    let currentPos = null;
    do {
        rowIdx = generateRandom(0,2);
        colIdx = generateRandom(0,2);
        currentPos = board[rowIdx][colIdx];
        if(currentPos === ''){
            board[rowIdx][colIdx] = turn;
        }
    } while (currentPos !== '');
    plays += 1;
    winner = getWinner();
    turn *= -1;
    render();
}

//Hard Mode
function computerChoiceSmart(){
    let boxID;
    let colIdx;
    let rowIdx;
    let currentPos = null;
    //Prioritize computer wins first
    //Horizontal
    if(board[0][0] === turn && board[0][1] === turn && board[0][2] === ''){
        board[0][2] = turn;
    } else if(board[0][2] === turn && board[0][1] === turn && board[0][0] === ''){
        board[0][0] = turn;
    } else if(board[0][0] === turn && board[0][2] === turn && board[0][1] === ''){
        board[0][1] = turn;
    } else if(board[1][0] === turn && board[1][1] === turn && board[1][2] === ''){
        board[1][2] = turn;
    } else if(board[1][2] === turn && board[1][1] === turn && board[1][0] === ''){
        board[1][0] = turn;
    } else if(board[1][0] === turn && board[1][2] === turn && board[1][1] === ''){
        board[1][1] = turn;
    } else if(board[2][0] === turn && board[2][1] === turn && board[2][2] === ''){
        board[2][2] = turn;
    } else if(board[2][2] === turn && board[2][1] === turn && board[2][0] === ''){
        board[2][0] = turn;
    } else if(board[2][0] === turn && board[2][2] === turn && board[2][1] === ''){
        board[2][1] = turn;
    //Vertical
    } else if(board[0][0] === turn && board[1][0] === turn && board[2][0] === ''){
        board[2][0] = turn;
    } else if(board[2][0] === turn && board[1][0] === turn && board[0][0] === ''){
        board[0][0] = turn;
    } else if(board[2][0] === turn && board[0][0] === turn && board[1][0] === ''){
        board[1][0] = turn;
    } else if(board[0][1] === turn && board[1][1] === turn && board[2][1] === ''){
        board[2][1] = turn;
    } else if(board[2][1] === turn && board[1][1] === turn && board[0][1] === ''){
        board[0][1] = turn;
    } else if(board[2][1] === turn && board[0][1] === turn && board[1][1] === ''){
        board[1][1] = turn;
    } else if(board[0][2] === turn && board[1][2] === turn && board[2][2] === ''){
        board[2][2] = turn;
    } else if(board[2][2] === turn && board[1][2] === turn && board[0][2] === ''){
        board[0][2] = turn;
    } else if(board[2][2] === turn && board[0][2] === turn && board[1][2] === ''){
        board[1][2] = turn;
    //Diagonal
    } else if(board[0][0] === turn && board[1][1] === turn && board[2][2] === ''){
        board[2][2] = turn;
    } else if(board[2][2] === turn && board[1][1] === turn && board[0][0] === ''){
        board[0][0] = turn;
    } else if(board[2][2] === turn && board[0][0] === turn && board[1][1] === ''){
        board[1][1] = turn;
    } else if(board[0][2] === turn && board[1][1] === turn && board[2][0] === ''){
        board[2][0] = turn;
    } else if(board[2][0] === turn && board[1][1] === turn && board[0][2] === ''){
        board[0][2] = turn;
    } else if(board[2][0] === turn && board[0][2] === turn && board[1][1] === ''){
        board[1][1] = turn;
    //Stop the Player from winning
    //Horizontal
    } else if(board[0][0] === 1 && board[0][1] === 1 && board[0][2] !== turn){
        board[0][2] = turn;
    } else if(board[0][2] === 1 && board[0][1] === 1 && board[0][0] !== turn){
        board[0][0] = turn;
    } else if(board[0][2] === 1 && board[0][0] === 1 && board[0][1] !== turn){
        board[0][1] = turn;
    } else if(board[1][0] === 1 && board[1][1] === 1 && board[1][2] !== turn){
        board[1][2] = turn;
    } else if(board[1][2] === 1 && board[1][1] === 1 && board[1][0] !== turn){
        board[1][0] = turn;
    } else if(board[1][2] === 1 && board[1][0] === 1 && board[1][1] !== turn){
        board[1][1] = turn;
    } else if(board[2][0] === 1 && board[2][1] === 1 && board[2][2] !== turn){
        board[2][2] = turn;
    } else if(board[2][2] === 1 && board[2][1] === 1 && board[2][0] !== turn){
        board[2][0] = turn;
    } else if(board[2][2] === 1 && board[2][0] === 1 && board[2][1] !== turn){
        board[2][1] = turn;
    //Vertical
    } else if(board[0][0] === 1 && board[1][0] === 1 && board[2][0] !== turn){
        board[2][0] = turn;
    } else if(board[2][0] === 1 && board[1][0] === 1 && board[0][0] !== turn){
        board[0][0] = turn;
    } else if(board[2][0] === 1 && board[0][0] === 1 && board[1][0] !== turn){
        board[1][0] = turn;
    } else if(board[0][1] === 1 && board[1][1] === 1 && board[2][1] !== turn){
        board[2][1] = turn;
    } else if(board[2][1] === 1 && board[1][1] === 1 && board[0][1] !== turn){
        board[0][1] = turn;
    } else if(board[2][1] === 1 && board[0][1] === 1 && board[1][1] !== turn){
        board[1][1] = turn;
    } else if(board[0][2] === 1 && board[1][2] === 1 && board[2][2] !== turn){
        board[2][2] = turn;
    } else if(board[2][2] === 1 && board[1][2] === 1 && board[0][2] !== turn){
        board[0][2] = turn;
    } else if(board[2][2] === 1 && board[0][2] === 1 && board[1][2] !== turn){
        board[1][2] = turn;
    //Diagonal
    } else if(board[0][0] === 1 && board[1][1] === 1 && board[2][2] !== turn){
        board[2][2] = turn;
    } else if(board[2][2] === 1 && board[1][1] === 1 && board[0][0] !== turn){
        board[0][0] = turn;
    } else if(board[2][2] === 1 && board[0][0] === 1 && board[1][1] !== turn){
        board[1][1] = turn;
    } else if(board[0][2] === 1 && board[1][1] === 1 && board[2][0] !== turn){
        board[2][0] = turn;
    } else if(board[2][0] === 1 && board[1][1] === 1 && board[0][2] !== turn){
        board[0][2] = turn;
    } else if(board[2][0] === 1 && board[0][2] === 1 && board[1][1] !== turn){
        board[1][1] = turn;
    } else {
        do {
            rowIdx = generateRandom(0,2);
            colIdx = generateRandom(0,2);
            currentPos = board[rowIdx][colIdx];
            if(currentPos === ''){
                board[rowIdx][colIdx] = turn;
            }
        } while (currentPos !== '');
    }
    plays += 1;
    winner = getWinner();
    turn *= -1;
    render();
}

//Insane Mode
function computerChoiceSmartCorners(){
    let boxID;
    let colIdx;
    let rowIdx;
    let currentPos = null;
    //Prioritize computer wins first
    //Horizontal
    if(board[0][0] === turn && board[0][1] === turn && board[0][2] === ''){
        board[0][2] = turn;
    } else if(board[0][2] === turn && board[0][1] === turn && board[0][0] === ''){
        board[0][0] = turn;
    } else if(board[0][0] === turn && board[0][2] === turn && board[0][1] === ''){
        board[0][1] = turn;
    } else if(board[1][0] === turn && board[1][1] === turn && board[1][2] === ''){
        board[1][2] = turn;
    } else if(board[1][2] === turn && board[1][1] === turn && board[1][0] === ''){
        board[1][0] = turn;
    } else if(board[1][0] === turn && board[1][2] === turn && board[1][1] === ''){
        board[1][1] = turn;
    } else if(board[2][0] === turn && board[2][1] === turn && board[2][2] === ''){
        board[2][2] = turn;
    } else if(board[2][2] === turn && board[2][1] === turn && board[2][0] === ''){
        board[2][0] = turn;
    } else if(board[2][0] === turn && board[2][2] === turn && board[2][1] === ''){
        board[2][1] = turn;
    //Vertical
    } else if(board[0][0] === turn && board[1][0] === turn && board[2][0] === ''){
        board[2][0] = turn;
    } else if(board[2][0] === turn && board[1][0] === turn && board[0][0] === ''){
        board[0][0] = turn;
    } else if(board[2][0] === turn && board[0][0] === turn && board[1][0] === ''){
        board[1][0] = turn;
    } else if(board[0][1] === turn && board[1][1] === turn && board[2][1] === ''){
        board[2][1] = turn;
    } else if(board[2][1] === turn && board[1][1] === turn && board[0][1] === ''){
        board[0][1] = turn;
    } else if(board[2][1] === turn && board[0][1] === turn && board[1][1] === ''){
        board[1][1] = turn;
    } else if(board[0][2] === turn && board[1][2] === turn && board[2][2] === ''){
        board[2][2] = turn;
    } else if(board[2][2] === turn && board[1][2] === turn && board[0][2] === ''){
        board[0][2] = turn;
    } else if(board[2][2] === turn && board[0][2] === turn && board[1][2] === ''){
        board[1][2] = turn;
    //Diagonal
    } else if(board[0][0] === turn && board[1][1] === turn && board[2][2] === ''){
        board[2][2] = turn;
    } else if(board[2][2] === turn && board[1][1] === turn && board[0][0] === ''){
        board[0][0] = turn;
    } else if(board[2][2] === turn && board[0][0] === turn && board[1][1] === ''){
        board[1][1] = turn;
    } else if(board[0][2] === turn && board[1][1] === turn && board[2][0] === ''){
        board[2][0] = turn;
    } else if(board[2][0] === turn && board[1][1] === turn && board[0][2] === ''){
        board[0][2] = turn;
    } else if(board[2][0] === turn && board[0][2] === turn && board[1][1] === ''){
        board[1][1] = turn;
    //Stop the Player from winning
    //Horizontal
    } else if(board[0][0] === 1 && board[0][1] === 1 && board[0][2] !== turn){
        board[0][2] = turn;
    } else if(board[0][2] === 1 && board[0][1] === 1 && board[0][0] !== turn){
        board[0][0] = turn;
    } else if(board[0][2] === 1 && board[0][0] === 1 && board[0][1] !== turn){
        board[0][1] = turn;
    } else if(board[1][0] === 1 && board[1][1] === 1 && board[1][2] !== turn){
        board[1][2] = turn;
    } else if(board[1][2] === 1 && board[1][1] === 1 && board[1][0] !== turn){
        board[1][0] = turn;
    } else if(board[1][2] === 1 && board[1][0] === 1 && board[1][1] !== turn){
        board[1][1] = turn;
    } else if(board[2][0] === 1 && board[2][1] === 1 && board[2][2] !== turn){
        board[2][2] = turn;
    } else if(board[2][2] === 1 && board[2][1] === 1 && board[2][0] !== turn){
        board[2][0] = turn;
    } else if(board[2][2] === 1 && board[2][0] === 1 && board[2][1] !== turn){
        board[2][1] = turn;
    //Vertical
    } else if(board[0][0] === 1 && board[1][0] === 1 && board[2][0] !== turn){
        board[2][0] = turn;
    } else if(board[2][0] === 1 && board[1][0] === 1 && board[0][0] !== turn){
        board[0][0] = turn;
    } else if(board[2][0] === 1 && board[0][0] === 1 && board[1][0] !== turn){
        board[1][0] = turn;
    } else if(board[0][1] === 1 && board[1][1] === 1 && board[2][1] !== turn){
        board[2][1] = turn;
    } else if(board[2][1] === 1 && board[1][1] === 1 && board[0][1] !== turn){
        board[0][1] = turn;
    } else if(board[2][1] === 1 && board[0][1] === 1 && board[1][1] !== turn){
        board[1][1] = turn;
    } else if(board[0][2] === 1 && board[1][2] === 1 && board[2][2] !== turn){
        board[2][2] = turn;
    } else if(board[2][2] === 1 && board[1][2] === 1 && board[0][2] !== turn){
        board[0][2] = turn;
    } else if(board[2][2] === 1 && board[0][2] === 1 && board[1][2] !== turn){
        board[1][2] = turn;
    //Diagonal
    } else if(board[0][0] === 1 && board[1][1] === 1 && board[2][2] !== turn){
        board[2][2] = turn;
    } else if(board[2][2] === 1 && board[1][1] === 1 && board[0][0] !== turn){
        board[0][0] = turn;
    } else if(board[2][2] === 1 && board[0][0] === 1 && board[1][1] !== turn){
        board[1][1] = turn;
    } else if(board[0][2] === 1 && board[1][1] === 1 && board[2][0] !== turn){
        board[2][0] = turn;
    } else if(board[2][0] === 1 && board[1][1] === 1 && board[0][2] !== turn){
        board[0][2] = turn;
    } else if(board[2][0] === 1 && board[0][2] === 1 && board[1][1] !== turn){
        board[1][1] = turn;
    } else if(board[0][0] === '' || board[0][2] === '' || board[2][0] === '' || board[2][2] === ''){
        let rand;
        let done = false;
        do {
            rand = generateRandom(0,3);
            console.log(rand);
            if(rand === 0 && board[0][0] === ''){
                board[0][0] = turn;
                done = true;
            }
            if(rand === 1 && board[0][2] === ''){
                board[0][2] = turn;
                done = true;
            }
            if(rand === 2 && board[2][0] === ''){
                board[2][0] = turn;
                done = true;
            }
            if(rand === 3 && board[2][2] === ''){
                board[2][2] = turn;
                done = true;
            }
        } while (!done);
    
    // } else if(board[0][2] === ''){
    //     board[0][2] = turn;
    // } else if(board[2][0] === ''){
    //     board[2][0] = turn;
    // } else if(board[2][2] === ''){
    //     board[2][2] = turn;
    // }
    } else {
        do {
            rowIdx = generateRandom(0,2);
            colIdx = generateRandom(0,2);
            currentPos = board[rowIdx][colIdx];
            // console.log('rowIdx is: ' + rowIdx + ' and colIdx is: ' + colIdx);
            if(currentPos === ''){
                board[rowIdx][colIdx] = turn;
            }
        } while (currentPos !== '');
    }
    plays += 1;
    winner = getWinner();
    turn *= -1;
    render();
}

//Player's Move
//Also controls difficulty levels for the computer
function renderChoice(e){
    let boxID = (e.target.id)
    let box = document.getElementById(boxID);
    let colIdx = boxID[1];
    let rowIdx = boxID[3];
    let currentPos = board[rowIdx][colIdx];
    if (boxID === "board" || winner) return;
    else if (currentPos !== '') return;
    board[rowIdx][colIdx] = turn;
    plays += 1;
    winner = getWinner();
    turn *= -1;
    render();
    if (plays < 9 && !winner){
        setTimeout(function(){
            // return computerChoice();
            // return computerChoiceSmart();
            return computerChoiceSmartCorners();
        }, 500);
    }
}

function renderChoice2(e){
    let boxID = (e.target.id)
    let box = document.getElementById(boxID);
    let Idx = boxID[0];
    let currentPos = board[Idx];
    if (boxID === "board" || winner) return;
    else if (currentPos !== '') return;
    board[Idx] = turn;
    plays += 1;
    winner = getWinner();
    turn *= -1;
    render2();
}
 
function renderMessage(){
    if (winner === "TIE"){
        msgDisp.innerHTML = "It's a Tie! Play again?";
        scoreO.innerHTML = `Score: ${player2Score}`;
        scoreX.innerHTML = `Score: ${player1Score}`;
    } else if (winner){
        msgDisp.innerHTML = `${PLAYERS[winner]} WINS!`;
        scoreO.innerHTML = `Score: ${player2Score}`;
        scoreX.innerHTML = `Score: ${player1Score}`;
    } else {
        msgDisp.innerHTML = `${PLAYERS[turn]}'s TURN!`;
        scoreO.innerHTML = `Score: ${player2Score}`;
        scoreX.innerHTML = `Score: ${player1Score}`;
    }
}

//check if there is a winner
function getWinner(){
    winner = checkWin();
    if (winner === 1) player1Score ++;
    else if (winner === -1) player2Score ++;
    else if (plays === 9 && winner === null) return winner = "TIE";
    return winner;
}

function checkWin(){
    // horizontal
    if (Math.abs(board[0][0] + board[0][1] + board[0][2]) === 3){
        winPattern = 0;
        return winner = turn;
    } 
    if (Math.abs(board[1][0] + board[1][1] + board[1][2]) === 3){
        winPattern = 1;
        return winner = turn;
    }
    if (Math.abs(board[2][0] + board[2][1] + board[2][2]) === 3){
        winPattern = 2;
        return winner = turn;
    }
    //vertical
    if (Math.abs(board[0][0] + board[1][0] + board[2][0]) === 3){
        winPattern = 3;
        return winner = turn;
    }
    if (Math.abs(board[0][1] + board[1][1] + board[2][1]) === 3){
        winPattern = 4;
        return winner = turn;
    }
    if (Math.abs(board[0][2] + board[1][2] + board[2][2]) === 3){
        winPattern = 5;
        return winner = turn;
    }
    // diagonal
    if (Math.abs(board[0][0] + board[1][1] + board[2][2]) === 3){
        winPattern = 6;
        return winner = turn;
    }
    if (Math.abs(board[2][0] + board[1][1] + board[0][2]) === 3){
        winPattern = 7;
        return winner = turn;
    }
    return null;
}



//game3
// const player = "O";
// const computer = "X";

// let board_full = false;
// let board2 = ["", "", "", "", "", "", "", "", ""];

// const board_container = document.querySelector(".play-area");

// const winner_statement = document.getElementById("winner");

// check_board_complete = () => {
//   let flag = true;
//   board2.forEach(element => {
//     if (element != player && element != computer) {
//       flag = false;
//     }
//   });
//   board_full = flag;
// };


// const check_line = (a, b, c) => {
//   return (
//     board2[a] == board2[b] &&
//     board2[b] == board2[c] &&
//     (board2[a] == player || board2[a] == computer)
//   );
// };

// const check_match = () => {
//   for (i = 0; i < 9; i += 3) {
//     if (check_line(i, i + 1, i + 2)) {
//       document.querySelector(`#block_${i}`).classList.add("win");
//       document.querySelector(`#block_${i + 1}`).classList.add("win");
//       document.querySelector(`#block_${i + 2}`).classList.add("win");
//       return board2[i];
//     }
//   }
//   for (i = 0; i < 3; i++) {
//     if (check_line(i, i + 3, i + 6)) {
//       document.querySelector(`#block_${i}`).classList.add("win");
//       document.querySelector(`#block_${i + 3}`).classList.add("win");
//       document.querySelector(`#block_${i + 6}`).classList.add("win");
//       return board2[i];
//     }
//   }
//   if (check_line(0, 4, 8)) {
//     document.querySelector("#block_0").classList.add("win");
//     document.querySelector("#block_4").classList.add("win");
//     document.querySelector("#block_8").classList.add("win");
//     return board2[0];
//   }
//   if (check_line(2, 4, 6)) {
//     document.querySelector("#block_2").classList.add("win");
//     document.querySelector("#block_4").classList.add("win");
//     document.querySelector("#block_6").classList.add("win");
//     return board2[2];
//   }
//   return "";
// };

// const check_for_winner = () => {
//   let res = check_match()
//   if (res == player) {
//     winner.innerText = "Winner is player!!";
//     winner.classList.add("playerWin");
//     board_full = true
//   } else if (res == computer) {
//     winner.innerText = "Winner is computer";
//     winner.classList.add("computerWin");
//     board_full = true
//   } else if (board_full) {
//     winner.innerText = "Draw!";
//     winner.classList.add("draw");
//   }
// };


// const render_board = () => {
//   board_container.innerHTML = ""
//   board2.forEach((e, i) => {
//     board_container.innerHTML += `<div id="block_${i}" class="block" onclick="addPlayerMove(${i})">${board2[i]}</div>`
//     if (e == player || e == computer) {
//       document.querySelector(`#block_${i}`).classList.add("occupied");
//     }
//   });
// };

// const game_loop = () => {
//   render_board();
//   check_board_complete();
//   check_for_winner();
// }

// const addPlayerMove = e => {
//   if (!board_full && board2[e] == "") {
//     board2[e] = player;
//     game_loop();
//     addComputerMove();
//   }
// };

// const addComputerMove = () => {
//   if (!board_full) {
//     do {
//       selected = Math.floor(Math.random() * 9);
//     } while (board2[selected] != "");
//     board2[selected] = computer;
//     game_loop();
//   }
// };

// const reset_board = () => {
//   board2 = ["", "", "", "", "", "", "", "", ""];
//   board_full = false;
//   winner.classList.remove("playerWin");
//   winner.classList.remove("computerWin");
//   winner.classList.remove("draw");
//   winner.innerText = "";
//   render_board();
// };

// //initial render
// render_board();



//Dark mode
const darkBtn = document.querySelector('.darkBtn');
const bodyEl = document.querySelector('body');

const darkMode = () => {
    bodyEl.classList.toggle('dark');
}

darkBtn.addEventListener('click', () => {
    // Get the value of the "dark" item from the local storage on every click
    setDarkMode = localStorage.getItem('dark');

    if(setDarkMode !== "on") {
        darkMode();
        // Set the value of the item to "on" when dark mode is on
        setDarkMode = localStorage.setItem('dark', 'on');
    } else {
        darkMode();
        // Set the value of the item to  "null" when dark mode if off
        setDarkMode = localStorage.setItem('dark', null);
    }
});

// Get the value of the "dark" item from the local storage
let setDarkMode = localStorage.getItem('dark');

// Check dark mode is on or off on page reload
if(setDarkMode === 'on') {
    darkMode();
    // toggleTheme();
}