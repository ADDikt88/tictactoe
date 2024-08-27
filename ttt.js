/*  First factory function is the gameboard

    It will have a displayBoard, updateBoard, clearBoard, checkBoard, and
    a checkWin return function. It will have two private variables:
    row and col.
*/
const GameBoard = (function (){

    let posXY = [["","",""],
                 ["","",""],
                 ["","",""]];

    let moveCount = 0;
    let gameAvailable = true;

    const displayBoard = () => {
        console.log ("Displaying board");
        let gridSquares = document.querySelectorAll(".grid-square");
                let square = 0;
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                gridSquares[square].textContent = posXY[r][c];
                square++;
            }
        }    
    }

    const updateBoard = (gridSquare, playerMarker) => {
        console.log ("Updating board");
        console.log (gridSquare + playerMarker)
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                let squareID = r*3 + c;
                if (squareID == gridSquare)
                {
                    posXY[r][c] = playerMarker;
                    moveCount++;
                }

            }
        }
        console.log(posXY);
        displayBoard();
    }

    const clearBoard = () => {
        posXY = [["","",""],
                 ["","",""],
                 ["","",""]];
        gameAvailable = true;
        displayBoard();
    }

    const checkValidMove = (gridSquare) => {

        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                let squareID = r*3 + c;
                if (squareID == gridSquare){
                    if (posXY[r][c] == "")
                        return true;
                }
            }
        }
        console.log ("Invalid Move");
        return false;
    }

    const checkGameState = (gridSquare, playerMarker) => {
        //Find x y position
        console.log ("Checking game state");
        let x, y;

        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                let squareID = r*3 + c;
                if (squareID == gridSquare)
                {
                    y = r;
                    x = c;
                }
            }
        }
        console.log(y + ',' + x);
        console.log(posXY);

        //check row win
        for (let c = 0; c < 3; c++) {
            if (!(posXY[y][c] == playerMarker))
                break;
            if (c == 2)
                return true;
        }

        //check col win
        for (let r = 0; r < 3; r++) {
            if (!(posXY[r][x] == playerMarker))
                break;
            if (r == 2)
                return true;
        }
            
        //check diag win
        if (x == y) {
            for (let i = 0; i < 3; i++) {
                if (!(posXY[i][i] == playerMarker))
                    break;
                if (i == 2)
                    return true;
            }
        }

        //check opp-diag win
        if (x + y == 2) {
            for (let i = 0; i < 3; i++) {
                if (!(posXY[i][2-i] == playerMarker))
                    break;
                if (i == 2)
                    return true;
            }
        }

        return false;

    }

    const getMoveCount = () => moveCount;
    

    return {
        displayBoard,
        updateBoard,
        clearBoard,
        checkValidMove,
        checkGameState,
        getMoveCount,
        gameAvailable

    }
})();


/*  Second factory function is the gameflow

    It will have a checkPlayerTurn, 
    checkWin, updateScreen, updatePlayerTurn functions.
*/


const GameFlow = (function(){

    return {

    }
})();

/*  Player object to create 2 players */

function createPlayer(name, marker, playerTurn) {
        
    return {
        name, marker, playerTurn
    }
}

const Player1 = createPlayer("Player 1", "X", true);
const Player2 = createPlayer("Player 2", "O", false);



let gridSquares = document.querySelectorAll(".grid-square");
let clearButton = document.querySelector(".clear-button");
let gameStateText = document.querySelector(".game-state");

gameStateText.textContent = "Player 1 goes first!";

console.log("Player 1 turn: " + Player1.playerTurn);

GameBoard.displayBoard();

for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
        let squareID = r*3 + c;
        gridSquares[squareID].addEventListener('click', (e) => {
            console.log (squareID);
            if(!GameBoard.gameAvailable)
            {
                if(GameBoard.checkValidMove(squareID))
                {
                    console.log("Player 1 turn: " + Player1.playerTurn);
                    if (Player1.playerTurn)
                    {
                        GameBoard.updateBoard(squareID, Player1.marker);
                        if(GameBoard.checkGameState(squareID,Player1.marker)){
                            console.log("Player 1 wins!");
                            gameStateText.textContent = "Player 1 wins!";
                            GameBoard.gameAvailable = false;
                        }
                        else {
    
                            Player1.playerTurn = false;
                            Player2.playerTurn = true;
                            console.log("Player 1 turn: " + Player1.playerTurn);
                            console.log("Player 2 turn: " + Player2.playerTurn);
    
                            gameStateText.textContent = "Player 2's turn";
                        }
                    }
                    else {
                        GameBoard.updateBoard(squareID, Player2.marker);
                        if(GameBoard.checkGameState(squareID,Player2.marker)){
                            console.log("Player 2 wins!");
                            gameStateText.textContent = "Player 2 wins!";
                            GameBoard.gameAvailable = false;
                        }
                        else {
                            Player1.playerTurn = true;
                            Player2.playerTurn = false;
        
                            console.log("Player 1 turn: " + Player1.playerTurn);
                            console.log("Player 2 turn: " + Player2.playerTurn);
        
                            gameStateText.textContent = "Player 1's turn";
                        }
    
    
                    }
    
    
                }

            }
            
        });
    }
}


clearButton.addEventListener('click', (e) => {
    console.log ("Clear");
    GameBoard.clearBoard();
    Player1.playerTurn = true;
    Player2.playerTurn = false;
    gameStateText.textContent = "Player 1 goes first!";

});