const selecBox = document.querySelector(".select-box");
const selectXBtn = selecBox.querySelector(".playerX");
const selectOBtn = selecBox.querySelector(".playerO");
const playVsBotBtn = selecBox.querySelector(".play-vs-bot");
const playVsPlayerBtn = selecBox.querySelector(".play-vs-player");
const playBoard = document.querySelector(".play-board");
const allBox = document.querySelectorAll("section span");
const players = document.querySelector(".players");
const resultBox = document.querySelector(".result-box");
const wonText = resultBox.querySelector(".won-text");
const replayBtn = resultBox.querySelector("button");

let currentPlayer = "X"; // Começa com X
let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
let playerSign = "X";
let playMode = "bot"; // "bot" ou "player"
let runGame = true;

window.onload = () => {
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }

    selectXBtn.onclick = () => {
        selecBox.classList.add("hide");
        playBoard.classList.add("show");
        players.setAttribute("class", "players active playerX");
        playerSign = "X";
        currentPlayer = "X";
    }

    selectOBtn.onclick = () => {
        selecBox.classList.add("hide");
        playBoard.classList.add("show");
        players.setAttribute("class", "players active playerO");
        playerSign = "O";
        currentPlayer = "O";
    }

    playVsBotBtn.onclick = () => {
        playMode = "bot";
        selecBox.classList.add("hide");
        playBoard.classList.add("show");
    }

    playVsPlayerBtn.onclick = () => {
        playMode = "player";
        selecBox.classList.add("hide");
        playBoard.classList.add("show");
    }
}

function clickedBox(element) {
    if (element.innerHTML === "" && runGame) {
        element.innerHTML = `<i class="${currentPlayer === "X" ? playerXIcon : playerOIcon}"></i>`;
        element.setAttribute("id", currentPlayer);
        selectWinner();
        element.style.pointerEvents = "none";
        if (playMode === "bot" && currentPlayer === "X") {
            // Alterna o jogador para "O" e faz a jogada do bot
            currentPlayer = "O";
            setTimeout(() => bot(), 500); // Pequeno delay para o bot jogar
        } else if (playMode === "player") {
            // Alterna o jogador
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            players.classList.toggle("playerX");
            players.classList.toggle("playerO");
        }
    }
}

function bot() {
    if (runGame && playMode === "bot") {
        let array = [];
        for (let i = 0; i < allBox.length; i++) {
            if (allBox[i].childElementCount === 0) {
                array.push(i);
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)];
        if (array.length > 0) {
            allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
            allBox[randomBox].setAttribute("id", "O");
            selectWinner();
            allBox[randomBox].style.pointerEvents = "none";
            currentPlayer = "X"; // Alterna de volta para o jogador
            players.classList.toggle("playerX");
            players.classList.toggle("playerO");
        }
    }
}

function getClass(idname) {
    return document.querySelector(".box" + idname).id;
}

function checkClass(val1, val2, val3, sign) {
    return getClass(val1) === sign &&
           getClass(val2) === sign &&
           getClass(val3) === sign;
}

function selectWinner() {
    if (checkClass(1, 2, 3, currentPlayer) ||
        checkClass(4, 5, 6, currentPlayer) ||
        checkClass(7, 8, 9, currentPlayer) ||
        checkClass(1, 4, 7, currentPlayer) ||
        checkClass(2, 5, 8, currentPlayer) ||
        checkClass(3, 6, 9, currentPlayer) ||
        checkClass(1, 5, 9, currentPlayer) ||
        checkClass(3, 5, 7, currentPlayer)) {
        
        runGame = false;
        setTimeout(() => {
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
            wonText.innerHTML = `Jogador <p>${currentPlayer}</p> Ganhou!`;
        }, 700);
        
    } else if (Array.from(allBox).every(box => box.innerHTML !== "")) {
        runGame = false;
        setTimeout(() => {
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
            wonText.textContent = "Jogo Empatou!";
        }, 700);
    }
}

replayBtn.onclick = () => {
    window.location.reload();
}