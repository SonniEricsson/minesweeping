//Author: Song

var board = []; // array of arrays, each array represents a row.

var numRows;
var numColumns;

var numMines;
var locationMines = []; // contains the document element of the tiles that have mines.
var minesID = []; // contains the ID of the mines.

var remainingTiles;
var mineFlag = false;
var currentTheme = "light";

var gameOver = false;
var boardType;

window.onload = function() {
    startGame();
}

// generate mines until enough mines have been created.
function generateMines() {
    let iterateMines = numMines;
    while(iterateMines > 0){
        let rowNum = Math.floor(Math.random() * numRows);
        let colNum = Math.floor(Math.random() * numColumns);
        let mine = board[rowNum][colNum];
        
        if(!locationMines.includes(mine)){
            locationMines.push(mine);
            iterateMines--;
        }
    }
    for(let i = 0; i < numMines; i++){
        minesID.push(locationMines[i].id);
    }
}

// change the color of the flag button when it's clicked.
function setFlag() {
    if(gameOver){
        return;
    }
    if(mineFlag){
        mineFlag = false;

        if(currentTheme == "light"){
            document.getElementById("flag").style.borderColor = "lightgray";
        }
        else{
            document.getElementById("flag").style.borderColor = "dimgray";
        }
    }

    else {
        mineFlag = true;
        document.getElementById("flag").style.borderColor = "green";
    }
}

// change the theme of the page.
function changeTheme(){
    let theme = document.getElementById("theme"); // theme button.
    let tileBoard = document.getElementById("board");
    let popups = document.querySelectorAll(".popup"); // select all elements that have the class popup.
    let unclickedTiles = document.querySelectorAll(".tile"); // select all unclicked tiles.
    let clickedTiles = document.querySelectorAll(".tile-clicked"); // select all clicked tiles.
    let buttons = document.querySelectorAll("." + currentTheme + "-button"); // select all buttons.
    let closeButtons = document.querySelectorAll(".close-button"); // select all close buttons from the popups.
    let otherButtons = document.querySelectorAll("." + currentTheme + "-button"); // idk

    if(currentTheme == "light"){
        currentTheme = "dark";
        theme.innerText = "🌙";

        // change theme of the board.
        tileBoard.classList.remove("light");
        tileBoard.classList.add("dark");

        /*
        for(let i = 0; i < unclickedTiles.length; i++){
            unclickedTiles[i].classList.remove("light-tile");
            unclickedTiles[i].classList.add("dark-tile");
        }
        for(let i = 0; i < clickedTiles.length; i++){
            clickedTiles[i].classList.remove("light-tile-clicked");
            clickedTiles[i].classList.add("dark-tile-clicked");
        }*/

        unclickedTiles.forEach(unclickedTile => {
            unclickedTile.classList.remove("light-tile");
            unclickedTile.classList.add("dark-tile");
        })

        clickedTiles.forEach(clickedTile => {
            clickedTile.classList.remove("light-tile-clicked");
            clickedTile.classList.add("dark-tile-clicked");
        })
        /*
        document.getElementById("tut-flag").classList.remove("light-tile");
        document.getElementById("tut-flag").classList.add("dark-tile");
        document.getElementById("tut-tile").classList.remove("light-tile-clicked");
        document.getElementById("tut-tile").classList.add("dark-tile-clicked");*/
        popups.forEach(popup => {
            popup.classList.remove("light-popup");
            popup.classList.add("dark-popup");
        })

        buttons.forEach(button => {
            button.classList.remove("light-button");
            button.classList.add("dark-button");
        })

        // change color of flag button border if it's not active.
        if(!mineFlag){
            document.getElementById("flag").style.borderColor = "dimgray";
        }
        
        //document.getElementById("flag").classList.add("dark-flag");

        // change color of almost all texts.
        document.body.style.color = "white";
        document.body.style.backgroundColor = "black";

        closeButtons.forEach(closeButton => {
            closeButton.style.color = "white";
        })

        otherButtons.forEach(otherButton => {
            otherButton.style.color = "white";
        })
    }

    else{
        currentTheme = "light";
        theme.innerText = "☀️";
        tileBoard.classList.remove("dark");
        tileBoard.classList.add("light");
        /*
        for(let i = 0; i < unclickedTiles.length; i++){
            unclickedTiles[i].classList.remove("dark-tile");
            unclickedTiles[i].classList.add("light-tile");
        }
        for(let i = 0; i < clickedTiles.length; i++){
            clickedTiles[i].classList.remove("dark-tile-clicked");
            clickedTiles[i].classList.add("light-tile-clicked");
        }*/

        unclickedTiles.forEach(unclickedTile => {
            unclickedTile.classList.remove("dark-tile");
            unclickedTile.classList.add("light-tile");
        })

        clickedTiles.forEach(clickedTile => {
            clickedTile.classList.remove("dark-tile-clicked");
            clickedTile.classList.add("light-tile-clicked");
        })
        /*
        document.getElementById("tut-flag").classList.remove("dark-tile");
        document.getElementById("tut-flag").classList.add("light-tile");
        document.getElementById("tut-tile").classList.remove("dark-tile-clicked");
        document.getElementById("tut-tile").classList.add("light-tile-clicked");*/
        popups.forEach(popup => {
            popup.classList.remove("dark-popup");
            popup.classList.add("light-popup");
        })

        buttons.forEach(button => {
            button.classList.remove("dark-button");
            button.classList.add("light-button");
        })

        if(!mineFlag){
            document.getElementById("flag").style.borderColor = "lightgray";
        }
        
        //document.getElementById("flag").classList.add("light-flag");

        document.body.style.color = "black";
        document.body.style.backgroundColor = "white";

        closeButtons.forEach(closeButton => {
            closeButton.style.color = "black";
        })

        otherButtons.forEach(otherButton => {
            otherButton.style.color = "black";
        })
    }
}


function easyDifficulty() {
    numRows = 10;
    numColumns = 10;
    numMines = 15;
    remainingTiles = numRows * numColumns - numMines;
    boardType = "easy-board";
    
    document.getElementById("board").classList.add(boardType);
    document.getElementById("flag-number").innerText = numMines; // show number of mines on the page.
    
    changeScreen("difficulties", false, "block"); // remove the difficulty select screen.
    changeScreen("game-screen", true, "block"); // show game screen.

    createBoard(); //put it in here, otherwise this function is executed before difficulty button is clicked.
}

function mediumDifficulty() {
    numRows = 16;
    numColumns = 16;
    numMines = 40;
    remainingTiles = numRows * numColumns - numMines;
    boardType = "medium-board";

    document.getElementById("board").classList.add(boardType);
    document.getElementById("flag-number").innerText = numMines;

    changeScreen("difficulties", false, "block");
    changeScreen("game-screen", true, "block");

    createBoard();
}

function hardDifficulty() {
    numRows = 20;
    numColumns = 20;
    numMines = 80;
    remainingTiles = numRows * numColumns - numMines;
    boardType = "hard-board";

    document.getElementById("board").classList.add(boardType);
    document.getElementById("flag-number").innerText = numMines;

    changeScreen("difficulties", false, "block");
    changeScreen("game-screen", true, "block");

    createBoard();
}

// remove start screen and show difficulty select screen.
function startup() {
    changeScreen("start-screen", false, "block");
    changeScreen("difficulties", true, "block");
}

function startGame() {
    document.getElementById("flag").addEventListener("click", setFlag); // setFlag when flag button is clicked.
    
    //const openPopupHelp = document.querySelectorAll('[data-help-target]');
    //const closePopupHelp = document.querySelectorAll('[data-help-close]');

    //const openPopupReturn = document.querySelectorAll('[data-return-target]');
    //const closePopupReturn = document.querySelectorAll('[data-return-close]');

    // close current active popup when overlay is clicked.
    document.getElementById("overlay").addEventListener("click", () => {
        const popup = document.querySelector(".popup.active");
        closePopup(popup);
    })

    // open popup when return button is clicked.
    document.getElementById("return").addEventListener("click", () => {
        openPopup(document.getElementById("return-popup"));
    })

    // close popup when close button is clicked.
    document.getElementById("return-close").addEventListener("click", () => {
        closePopup(document.getElementById("return-popup"));
    })

    document.getElementById("help").addEventListener("click", () => {
        openPopup(document.getElementById("help-popup"));
    })

    document.getElementById("help-close").addEventListener("click", () => {
        closePopup(document.getElementById("help-popup"));
    })

    document.getElementById("loss-close").addEventListener("click", () => {
        closePopup(document.getElementById("loss-popup"));
    })

    document.getElementById("win-close").addEventListener("click", () => {
        closePopup(document.getElementById("win-popup"));
    })

    document.getElementById("close-return").addEventListener("click", () => {
        closePopup(document.getElementById("return-popup"));
    })

    /*
    openPopupHelp.forEach(button => {
        button.addEventListener("click", () => {
            const popup = document.querySelector(button.dataset.helpTarget);
            openPopup(popup);
        })
    });

    closePopupHelp.forEach(button => {
        button.addEventListener("click", () => {
            const popup = button.closest(".popup");
            closePopup(popup);
        })
    });*/

/*
    openPopupReturn.forEach(button => {
        button.addEventListener("click", () => {
            const popup = document.querySelector(button.dataset.returnTarget);
            openPopup(popup);
        })
    });

    closePopupReturn.forEach(button => {
        button.addEventListener("click", () => {
            const popup = button.closest(".popup");
            closePopup(popup);
        })
    });

    function openPopup(popup) {
        popup.classList.add("active");
        overlay.classList.add("active");
    }

    function closePopup(popup) {
        popup.classList.remove("active");
        overlay.classList.remove("active");
    }*/
}

// active/deactive the current screen.
function changeScreen(id, swap, type) {
    let element = document.getElementById(id);
    let display = (swap) ? type : "none"; // type "flex" for the div children, type "block" for everything else.
    element.style.display = display;
}


function openPopup(popup) {
    popup.classList.add("active");
    document.getElementById("overlay").classList.add("active");
}

function closePopup(popup) {
    popup.classList.remove("active");
    document.getElementById("overlay").classList.remove("active");
}


function createBoard() {
    for(let i = 0; i < numRows; i++){
        let row = [];
        for(let j = 0; j < numColumns; j++){
            let tile = document.createElement("div");
            tile.id = i.toString() + "-" + j.toString(); // id is "x-y" with x being the row and y the column.
            tile.classList.add("tile", currentTheme + "-tile"); 
            tile.addEventListener("click", tileClicked);
            
            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
    generateMines();
}


function tileClicked() {
    // no tile can be clicked after the game is over.
    if(gameOver){
        return;
    }

    // case if flag is activated.
    if(mineFlag){
        // case if tile is unclicked and has no flag on it.
        if(this.innerText == "" && this.classList.contains(currentTheme + "-tile")){
            // set a flag if available.
            if(document.getElementById("flag-number").innerText != 0){
                this.innerText = "🚩";
                document.getElementById("flag-number").innerText--;
            }
        }
        // remove flag if tile has flag on it.
        else if(this.innerText == "🚩"){
            this.innerText = "";
            document.getElementById("flag-number").innerText++;
        }
    }

    
    // first check if tile has flag on it.
    else if(this.innerText != "🚩") {
        // case if tile is a mine.
        if(locationMines.includes(this)){
            // only change the background color of the clicked tile to red.
            this.style.backgroundColor = "red";
            // reveal all other mines.
            for(let i = 0; i < numMines; i++){
                let mine = locationMines[i];
                revealTile(mine);
                mine.innerText = "💣";
            }
            gameOver = true;
            openPopup(document.getElementById("loss-popup"));
        }

        // case if tile is not a mine.
        else{
            let indices = this.id.split("-");
            let rowNum = indices[0];
            let colNum = indices[1];
            detNumber(parseInt(rowNum), parseInt(colNum));
            
            // victory if no tiles remain.
            if(remainingTiles == 0){
                gameOver = true;
                victory();
            }
        }
        
    }
}

function revealTile(tile){
    tile.classList.remove("tile", currentTheme + "-tile");
    tile.classList.add("tile-clicked", currentTheme + "-tile-clicked");
}

// determine the number of the clicked tile.
function detNumber(rowNum, colNum){
    // base cases.
    if(rowNum < 0 || rowNum >= numRows || colNum < 0 || colNum >= numColumns) {
        return;
    }
    let tile = board[rowNum][colNum];

    // if tile is already clicked then do nothing.
    if(tile.classList.contains(currentTheme + "-tile-clicked") || tile.innerText == "🚩"){
        return;
    }

    revealTile(tile);
    remainingTiles--;
    
    let neighborMines = 0;

    // check after ID to prevent index error.
    if(minesID.includes((rowNum-1).toString() + "-" + (colNum-1).toString())){
        neighborMines++;
    }
    if(minesID.includes((rowNum-1).toString() + "-" + (colNum).toString())){
        neighborMines++;
    }
    if(minesID.includes((rowNum-1).toString() + "-" + (colNum+1).toString())){
        neighborMines++;
    }
    if(minesID.includes((rowNum).toString() + "-" + (colNum-1).toString())){
        neighborMines++;
    }
    if(minesID.includes((rowNum).toString() + "-" + (colNum+1).toString())){
        neighborMines++;
    }
    if(minesID.includes((rowNum+1).toString() + "-" + (colNum-1).toString())){
        neighborMines++;
    }
    if(minesID.includes((rowNum+1).toString() + "-" + (colNum).toString())){
        neighborMines++;
    }
    if(minesID.includes((rowNum+1).toString() + "-" + (colNum+1).toString())){
        neighborMines++;
    }

    if(neighborMines > 0){
       tile.innerText = neighborMines;
       tile.classList.add("tile" + neighborMines);
    }

    // recursively reveal neighboring tiles if current tile has no adjacent mines.
    else if(neighborMines == 0){
        detNumber(rowNum-1,colNum-1);
        detNumber(rowNum-1,colNum);
        detNumber(rowNum-1,colNum+1);
        detNumber(rowNum,colNum-1);
        detNumber(rowNum,colNum+1);
        detNumber(rowNum+1,colNum-1);
        detNumber(rowNum+1,colNum);
        detNumber(rowNum+1,colNum+1);
    }
}

// victory case.
function victory(){
    // put flags on all mines.
    for(let i = 0; i < numMines; i++){
        if(locationMines[i].innerText != "🚩"){
            locationMines[i].innerText = "🚩";
        }
    }
    document.getElementById("flag-number").innerText = 0;
    openPopup(document.getElementById("win-popup"));
}

function restartGame(){
    closePopup(document.querySelector(".popup.active"));
    // remove all tiles.
    for(let i = 0; i < numRows; i++){
        for(let j = 0; j < numColumns; j++){
            board[i][j].remove();
        }
    }
    document.getElementById("board").classList.remove(boardType);
    board = [];
    locationMines = [];
    minesID = [];
    mineFlag = false;
    gameOver = false;
    
    changeScreen("difficulties", true, "block");
    changeScreen("game-screen", false, "block");
}

