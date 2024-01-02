/*constants*/
const PLAYERS = {
    '': '',
    '1': 'X',
    '-1': 'O'
 };
 
/*variables*/
let board;
let turn;
let winner;
let plays;
let player1Score = 0;
let player2Score = 0;
let winPattern;
 
/*cached element references*/
let button = document.getElementById('play');
let reset = document.getElementById('reset')
let msgDisp = document.querySelector('h2');
let scoreX = document.getElementById('ScoreX');
let scoreO = document.getElementById('ScoreO');
    


/*event listeners*/
button.addEventListener('click', init);
document.getElementById('board').addEventListener('click', renderChoice);
reset.addEventListener('click', resetScore)

/*functions*/
init();

function init(){
    board = [
        ['','',''],
        ['','',''],
        ['','','']
    ];

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
            const divId = `c${colIdx}r${rowIdx}`; 
            const box = document.getElementById(divId);
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
            const divId = `${Idx}`;
            const box = document.getElementById(divId);
            let element = board2[Idx];
            box.innerHTML = PLAYERS[element];
    });
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandom(min, max) {
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

//Dark mode
const darkBtn = document.querySelector('.darkBtn');
const bodyEl = document.querySelector('body');

const darkMode = () => {
    bodyEl.classList.toggle('dark');
}

darkBtn.addEventListener('click', () => {
    setDarkMode = localStorage.getItem('dark');
    if(setDarkMode !== "on") {
        darkMode();
        setDarkMode = localStorage.setItem('dark', 'on');
    } else {
        darkMode();
        setDarkMode = localStorage.setItem('dark', null);
    }
});

let setDarkMode = localStorage.getItem('dark');

if(setDarkMode === 'on') {
    darkMode();
}