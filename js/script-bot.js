const selecBox = document.querySelector(".select-box"),
selectXBtn = selecBox.querySelector(".option .playerX"),
selectOBtn = selecBox.querySelector(".option .playerO"),
playBoard = document.querySelector(".play-board"),
allBox = document.querySelectorAll("section span"),
players = document.querySelector(".players"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replayBtn = resultBox.querySelector("button");

let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
let playerSign = "X";
let runBot = true;
let isBotTurn = false; // Variável para controlar o turno do bot

window.onload = ()=> {
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick","clickedBox(this)");
    }

    selectXBtn.onclick = ()=>{
        selecBox.classList.add("hide");
        playBoard.classList.add("show");
    }

    selectOBtn.onclick = ()=>{
        selecBox.classList.add("hide");
        playBoard.classList.add("show");
        players.setAttribute("class","players active player");
    }
}

function clickedBox(element){
    if (!isBotTurn && element.childElementCount == 0) { // Garantir que o jogador não jogue durante o turno do bot
        playerSign = players.classList.contains("player") ? "O" : "X";
        element.innerHTML = `<i class="${playerSign === "X" ? playerXIcon : playerOIcon}"></i>`;
        players.classList.toggle("active");
        element.setAttribute("id", playerSign);
        element.style.pointerEvents = "none";
        selectWinner();

        if (runBot) {
            isBotTurn = true;
            setTimeout(() => {
                bot();
            }, 500); // Reduzi o delay para 500ms para melhor resposta
        }
    }
}

function bot(){
    let availableBoxes = [];
    playerSign = "O";
    for (let i = 0; i < allBox.length; i++) {
        if (allBox[i].childElementCount == 0) {
            availableBoxes.push(i);
        }
    }

    if (availableBoxes.length > 0) {
        let randomBox = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
        let selectedBox = allBox[randomBox];
        playerSign = players.classList.contains("player") ? "X" : "O";
        selectedBox.innerHTML = `<i class="${playerSign === "X" ? playerXIcon : playerOIcon}"></i>`;
        players.classList.toggle("active");
        selectedBox.setAttribute("id", playerSign);
        selectedBox.style.pointerEvents = "none";
        selectWinner();
        isBotTurn = false; // Libera para o jogador jogar novamente
    }
}

function getClass(idname){
    return document.querySelector(".box"+ idname).id;
}

function checkClass(val1, val2, val3, sign){
    return getClass(val1) === sign && getClass(val2) === sign && getClass(val3) === sign;
}

function selectWinner(){
    if(checkClass(1, 2, 3, playerSign) || checkClass(4, 5, 6, playerSign) || checkClass(7, 8, 9, playerSign) || 
       checkClass(1, 4, 7, playerSign) || checkClass(2, 5, 8, playerSign) || checkClass(3, 6, 9, playerSign) || 
       checkClass(1, 5, 9, playerSign) || checkClass(3, 5, 7, playerSign)) {

        runBot = false;
        setTimeout(()=>{
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700);
        wonText.innerHTML = `Jogador <p>${playerSign}</p> Ganhou!`;
    } else if ([...allBox].every(box => box.childElementCount > 0)) {
        runBot = false;
        setTimeout(()=>{
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700);
        wonText.textContent = `Jogo Empatou!`;
    }
}

replayBtn.onclick = ()=>{
    window.location.reload();
}