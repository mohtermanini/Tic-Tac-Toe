import { player } from "./player.js";
import { computer } from "./computer.js";
import { board } from "./Board/board.js";
import { utilties } from "./ultilities.js";

export let game = (function () {
    let _players = [];
    let _currentPlayerIndex;
    let _board;
    let _difficulty;
    let _gameExist;
    let _ttcGrid = document.querySelector(".ttc-grid");

    let _setDifficulty = function (difficulty) {
        _difficulty = difficulty;
    };

    let createPlayer = function (name, color, playSymbol, type) {
        let newPlayer = player();
        newPlayer.init(_players.length, name, color, playSymbol, type);
        _players.push(newPlayer);
    };

    let _createPlayers = function (secondType, playersNames) {
        if (secondType == "computer") {
            createPlayer(playersNames[0], "red", "X", "human");
            createPlayer("Computer", "blue", "O", "computer");
        } else if (secondType == "human") {
            createPlayer(playersNames[0], "red", "X", "human");
            createPlayer(playersNames[1], "blue", "O", "human");
        }
    };

    let createGame = function (gridSize, secondType, difficulty, playersNames) {
        _clearGame();
        _clearPlayers();
        _createPlayers(secondType, playersNames);
        _setDifficulty(difficulty);
        _gameExist = true;
        _launch(gridSize);
    };

    let _clearGame = function () {
        _clearResults();
        board.clearBoard();
        board.setBoardElement(document.querySelector(".ttc-grid"));
    };

    let _launch = function (gridSize) {
        _board = board.createBoard(gridSize);
        _currentPlayerIndex = 0;
        changeTurn(0);
    };

    let restart = function () {
        if (!_gameExist) {
            return;
        }
        _clearGame();
        _launch(board.getBoardSize());
    };

    let end = function () {
        _currentPlayerIndex = -1;
        _clearTurnLabels();
    };

    let getCurrentPlayer = function () {
        return getPlayerByIndex(_currentPlayerIndex);
    };

    let getCurrentPlayerIndex = function () {
        return _currentPlayerIndex;
    };

    let _setCurrentPlayerIndex = function (index) {
        return (_currentPlayerIndex = index);
    };

    let getPlayerByIndex = function (index) {
        return _players[index];
    };

    let getPlayerIndexBySymbol = function (symbol) {
        let playerIndex = -1;
        _players.forEach((item, index) => {
            if (item.getPlaySymbol() === symbol) {
                playerIndex = index;
                return;
            }
        });
        return playerIndex;
    };

    let changeTurn = function (increment) {
        _changeTurnLabel(_currentPlayerIndex, "");
        let oldPlayerIndex = _currentPlayerIndex;
        let newPlayerIndex = (oldPlayerIndex + increment) % _players.length;
        _setCurrentPlayerIndex(newPlayerIndex);
        _changeTurnLabel(newPlayerIndex, "(Your Turn)");

        if (getCurrentPlayer().getType() === "computer") {
            let chosenCell;
            if (_difficulty === "easy") {
                chosenCell = computer.getEazyAIMove(_board);
            } else if (_difficulty === "hard") {
                if (_board.length === 4) {
                    _playHeavyComputeMove(oldPlayerIndex, newPlayerIndex);
                    return;
                } else {
                    chosenCell = computer.getHardAIMove(null, oldPlayerIndex, newPlayerIndex);
                }
            }
            board.cellPlay(chosenCell.row, chosenCell.col);
        }
    };

    let _playHeavyComputeMove = function (oldPlayerIndex, newPlayerIndex) {
        const spinner = utilties.createSpinner();
        _ttcGrid.prepend(spinner);
        setTimeout(() => {
            new Promise((resolve) => {
                const chosenCell = computer.getHardAIMove(null, oldPlayerIndex, newPlayerIndex);
                resolve(chosenCell);
            }).then((chosenCell) => {
                board.cellPlay(chosenCell.row, chosenCell.col);
                spinner.remove();
            });
        }, 0);
    };

    let _changeTurnLabel = function (playerIndex, label) {
        document.querySelector(`[data-player="${playerIndex}"] .turn-label`).textContent = label;
    };

    let _clearTurnLabels = function () {
        _changeTurnLabel(0, "");
    };

    let _clearPlayers = function () {
        _players = [];
    };

    let _clearResults = function () {
        document.querySelectorAll(".player-area").forEach((item) => {
            let resultLabelContainer = item.querySelector(".result .result-label");
            resultLabelContainer.textContent = "";
            resultLabelContainer.classList.remove("announced");
        });
    };

    let getPlayersNum = function () {
        return _players.length;
    };

    return {
        createPlayer,
        createGame,
        restart,
        end,
        getCurrentPlayer,
        getCurrentPlayerIndex,
        getPlayerByIndex,
        getPlayerIndexBySymbol,
        changeTurn,
        getPlayersNum,
    };
})();
