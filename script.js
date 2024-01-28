const gameBoard = (function () {
    const board = [];

    const makeBoard = () => {
        for (let i = 0; i < 3; i++) {
            board[i] = [];
            for (let j = 0; j< 3; j++){
                board[i].push(cell());
            };
        };
    };

    const getBoard = () => board;

    const markBoard = (row, column, player) => {
        board[row][column].putPiece(player);
    }

    const checkSpace = (row, column) => {
        return board[row][column].getPiece();
    }

    const checkStatus = () => {
        if (
            board[0][0].getPiece() == board[1][1].getPiece() && board[0][0].getPiece() == board[2][2].getPiece() && board[0][0].getPiece() !="-"||
            board[2][0].getPiece() == board[1][1].getPiece() && board[2][0].getPiece() == board[0][2].getPiece() && board[2][0].getPiece() !="-"||
            board[0][0].getPiece() == board[0][1].getPiece() && board[0][0].getPiece() == board[0][2].getPiece() && board[0][0].getPiece() !="-"||
            board[1][0].getPiece() == board[1][1].getPiece() && board[1][0].getPiece() == board[1][2].getPiece() && board[1][0].getPiece() !="-"||
            board[2][0].getPiece() == board[2][1].getPiece() && board[2][0].getPiece() == board[2][2].getPiece() && board[2][0].getPiece() !="-"||
            board[0][0].getPiece() == board[1][0].getPiece() && board[0][0].getPiece() == board[2][0].getPiece() && board[0][0].getPiece() !="-"||
            board[0][1].getPiece() == board[1][1].getPiece() && board[0][1].getPiece() == board[2][1].getPiece() && board[0][1].getPiece() !="-"||
            board[0][2].getPiece() == board[1][2].getPiece() && board[0][2].getPiece() == board[2][2].getPiece() && board[0][2].getPiece() !="-"
            ) {
                return "won";
            } else if (
                board[0][0].getPiece() !== "-" && board[0][1].getPiece() !== "-" && board[0][2].getPiece() !== "-" && 
                board[1][0].getPiece() !== "-" && board[1][1].getPiece() !== "-" && board[1][2].getPiece() !== "-" &&
                board[2][0].getPiece() !== "-" && board[2][1].getPiece() !== "-" && board[2][2].getPiece() !== "-"
                ) {
                    return "tie";
                }
    }

    const printValues = () => {
        console.log(board[0][0].getPiece(),board[0][1].getPiece(),board[0][2].getPiece());
        console.log(board[1][0].getPiece(),board[1][1].getPiece(),board[1][2].getPiece());
        console.log(board[2][0].getPiece(),board[2][1].getPiece(),board[2][2].getPiece());
    }

    makeBoard();

    return {getBoard, markBoard, checkStatus, printValues, checkSpace, makeBoard};
});

const cell = (function () {
    let value = "-";

    const putPiece = (player) => {
        value = player;
    }

    const getPiece = () => {
        return value;
    }

    return {putPiece, getPiece};
});

const gameController = (function () {

    const board = gameBoard();
    
    let activePlayer = "Tic Tac";
    let ticPoints = 0;
    let toePoints = 0;
    let ladyPoints = 0;
    let message = "It's Tic Tac turn.";

    const switchPlayer = () => {
        if (activePlayer == "Tic Tac") {
            activePlayer = "Toe";
        } else {
            activePlayer = "Tic Tac";
        }
    }

    const getActivePlayer = () => {
    return activePlayer;
    }

    const playRound = (row, column) => {
        if (board.checkSpace(row, column) == "-" && board.checkStatus() !== "won" && board.checkStatus() !== "tie") {
            board.markBoard(row, column, activePlayer);
            if (board.checkStatus() == "won" ) {
                message = `${activePlayer} won!`;
                givePlayerPoints(activePlayer);
            } else if (board.checkStatus() == "tie") {
                message = "The old lady won!";
                givePlayerPoints("lady");
            } else {
                switchPlayer();
                message = `It's ${activePlayer} turn.`;
            }
        }
    }

    const getPlayerPoints = (player) => {
        if ( player === "Tic Tac" ) {
            return ticPoints;
        } else if (player === "Toe") {
            return toePoints;
        } else {
            return ladyPoints;
        }
    }

    const givePlayerPoints = (player) => {
        if (player === "Tic Tac") {
            ticPoints += 1;
        } else if (player === "Toe") {
            toePoints += 1;
        } else {
            ladyPoints +=1;
        }
    }
    const getMessage = () => {
        return message
    }

    const selectPiece = (row, column) => {
        return board.checkSpace(row, column);
    }

    const resetGame = () => {
        board.makeBoard();
        activePlayer = "Tic Tac";
        message = "It's Tic Tac turn."
    }

    return {playRound, getActivePlayer, getPlayerPoints, givePlayerPoints, resetGame, getMessage, selectPiece};
})();

const screenController = (function () {
    const board = gameBoard();
    const game = gameController;

    const buttons = document.querySelector('#buttons');
    const ticPoints = document.querySelector('#ticPoints');
    const toePoints = document.querySelector('#toePoints');
    const text = document.querySelector('#text');
    const gameTable = document.querySelector('#gameTable');

    const updateScreen = () => {
        gameTable.textContent = "";
        buttons.textContent = "";

        text.textContent = game.getMessage();
        ticPoints.textContent = `${game.getPlayerPoints("Tic Tac")} Points`;
        toePoints.textContent = `${game.getPlayerPoints("Toe")} Points`;

        // display table and make buttons 

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j< 3; j++){
                const square = document.createElement('button');
                if ( game.selectPiece(i,j) == "Tic Tac" ) {  
                    const img = document.createElement('img');
                    img.setAttribute("src", "./Tic-Tac.jpg");
                    img.setAttribute("alt", "Tic-Tac piece");
                    square.appendChild(img);
                } else if (game.selectPiece(i,j) == "Toe") {
                    const img = document.createElement('img');
                    img.setAttribute("src", "./Toe.png");
                    img.setAttribute("alt", "Toe piece");
                    square.appendChild(img);
                }

                square.addEventListener('click', function(event) { 
                    game.playRound(i, j);
                    updateScreen();
                }) 
                gameTable.appendChild(square);
            };
        };
        const reset = document.createElement('button');
        reset.innerText = "Reset";
        reset.addEventListener('click', function(event) { 
            game.resetGame();
            updateScreen();
        })
        buttons.appendChild(reset);

        // Show old lady's points

        if (game.getPlayerPoints("lady") > 0) {
            const lady = document.createElement('div');
            lady.textContent = `Old Lady: ${game.getPlayerPoints("lady")} points`;
            buttons.appendChild(lady);
        }
    };

    updateScreen();
})();
