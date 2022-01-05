let game = (function(){
            
    const _players = [];
    let _currentPlayerIndex;
    
    let init = function(){
        createPlayer("Player1", "red", "X", "human");
        createPlayer("Player2", "blue", "O", "human");
    }
    
    let createPlayer = function(name, color, playSymbol, type){
        let newPlayer = player();
        newPlayer.init(_players.length, name, color, playSymbol, type);
        _players.push(newPlayer);
    }

   
    let start = function(gridSize, secondIsComputer){
        _clearResults();
        board.clearBoard();
        board.setBoardElement(document.querySelector(".ttc-grid"));
        board.createBoard(gridSize);
        if(secondIsComputer && getPlayerByIndex(1).getType() !== "computer"){
            _players.splice(1, 1);
            createPlayer("Computer", "blue", "O", "computer");
        }else if(!secondIsComputer && getPlayerByIndex(1).getType() !== "human"){
            _players.splice(1, 1);
            createPlayer("Player2", "blue", "O", "human");
        }
        
        _currentPlayerIndex = 0;
        changeTurn(0);
    }

    let end = function(){
        document.querySelector(".form-grid-size .submit-group").classList.remove("v-hidden");
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
            if(board.getBoardSize() == 3){
                let chosenCell  = computer.playHardMove(null, oldPlayerIndex, newPlayerIndex);
                board.cellPlay(chosenCell.row, chosenCell.col);
            }else{
                computer.playEazyMove();
            }
            
        }
    }

    let _changeTurnLabel = function(playerIndex, label){
        document.querySelector(`[data-player="${playerIndex}"] .turn-label`).textContent = label;
    }

    let _clearTurnLabels = function(){
        _changeTurnLabel(0,"");
    }

    let _clearResults = function(winnerIndex){
        document.querySelectorAll(".player-area").forEach( item => {
            let resultLabelContainer = item.querySelector(".result .result-label");
            resultLabelContainer.textContent = "";
            resultLabelContainer.classList.remove("announced");
        });
    }

    let _clearPlayers = function(){
        _players.length = 0;
    }
   
    let getPlayersNum = function(){
        return _players.length;
    }

    return {
        init,
        createPlayer,
        start,
        end,
        getCurrentPlayer,
        getCurrentPlayerIndex,
        getPlayerByIndex,
        getPlayerIndexBySymbol,
        changeTurn,
        getPlayersNum
    }
})();