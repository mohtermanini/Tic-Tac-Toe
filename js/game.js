import { player } from './player.js';
import { computer } from './computer.js';
import { board } from './Board/board.js';

export let game = (function(){
            
    let _players = [];
    let _currentPlayerIndex;
    let _board;
    
    let createPlayer = function(name, color, playSymbol, type){
        let newPlayer = player();
        newPlayer.init(_players.length, name, color, playSymbol, type);
        _players.push(newPlayer);
    }

    let _createPlayers = function(secondType, playersNames){
        if(secondType=="computer"){
            createPlayer(playersNames[0], "red", "X", "human");
            createPlayer("Computer", "blue", "O", "computer");
        }else if(secondType == "human"){
            createPlayer(playersNames[0], "red", "X", "human");
            createPlayer(playersNames[1], "blue", "O", "human");
        }
    }
   
    let createGame = function(gridSize, secondType, playersNames){
        _clearGame();
        _clearPlayers();
        _createPlayers(secondType, playersNames);
        _launch(gridSize);
    }

    let _clearGame = function(){
        _clearResults();
        board.clearBoard();
        board.setBoardElement(document.querySelector(".ttc-grid"));
    }

    let _launch = function(gridSize){
        _board = board.createBoard(gridSize);
        _currentPlayerIndex = 0;
        changeTurn(0);
    }

  

    let restart = function(){
        _clearGame();
        _launch(board.getBoardSize());
    }

    let end = function(){
        _currentPlayerIndex = -1;
        _clearTurnLabels();
    }

    let getCurrentPlayer = function(){
        return getPlayerByIndex(_currentPlayerIndex);
    }

    let getCurrentPlayerIndex = function(){
        return _currentPlayerIndex;
    }
    
    let _setCurrentPlayerIndex = function(index){
        return _currentPlayerIndex = index;
    }

    let getPlayerByIndex = function(index){
        return _players[index];
    }

    let getPlayerIndexBySymbol = function(symbol){
        let playerIndex = -1;
        _players.forEach( (item, index) => {
            if(item.getPlaySymbol() === symbol){
                playerIndex = index;
                return;
            }
        });
        return playerIndex;
    }
    
    let changeTurn = function(increment){
        _changeTurnLabel(_currentPlayerIndex, "");
        let oldPlayerIndex = _currentPlayerIndex;
        let newPlayerIndex = (oldPlayerIndex + increment)%(_players.length);
        _setCurrentPlayerIndex(newPlayerIndex);
        _changeTurnLabel(newPlayerIndex, "(Your Turn)");

        if(getCurrentPlayer().getType() === "computer"){
            let chosenCell;
            if(board.getBoardSize() == 3){
                chosenCell  = computer.getHardAIMove(null, oldPlayerIndex, newPlayerIndex);
            }else{
                chosenCell = computer.getEazyAIMove(_board);
            }
            board.cellPlay(chosenCell.row, chosenCell.col);
        }
    }

    let _changeTurnLabel = function(playerIndex, label){
        document.querySelector(`[data-player="${playerIndex}"] .turn-label`).textContent = label;
    }

    let _clearTurnLabels = function(){
        _changeTurnLabel(0,"");
    }

    let _clearPlayers = function(){
        _players = [];
    }

    let _clearResults = function(winnerIndex){
        document.querySelectorAll(".player-area").forEach( item => {
            let resultLabelContainer = item.querySelector(".result .result-label");
            resultLabelContainer.textContent = "";
            resultLabelContainer.classList.remove("announced");
        });
    }
   
    let getPlayersNum = function(){
        return _players.length;
    }

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
        getPlayersNum
    }
})();