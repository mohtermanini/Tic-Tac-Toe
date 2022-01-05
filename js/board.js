
let board = (function(doc){
    let _n;
    const _moves = [];
    let _boardElement;

    let setBoardElement = function(element){
        _boardElement = element;
    }

    let createBoard = (n) => {
        if(n<3 || n>10){
            throw new Error("Illegal argument Exception");
        }
        _n = n;
        let grid = _boardElement;
        grid.style['grid-template-rows'] = `repeat(${n},1fr)`;
        for(let i=0; i<n; i++){
            let row = doc.createElement("div");
            row.style['grid-template-columns'] = `repeat(${n},1fr)`;
            _moves.push([]);
            for(let j=0; j<n; j++){
                let cell = doc.createElement("div");
                cell.classList.add("ttc-cell");
                cell.dataset['row'] = i;
                cell.dataset['column'] = j;
                cell.addEventListener("click", clickCellPlay);
                row.appendChild(cell);
                _moves[i].push(null);
            }
            grid.appendChild(row);
        } 
    }
    
    let getBoardSize = function(){
        return _n;
    }

    let clickCellPlay = (e) => {
        cellPlay(e.target.dataset.row, e.target.dataset.column)
    }

    let simulateCellPlay = function(row, col, playSymbol){
        _moves[row][col] = playSymbol;
    }

    let cellPlay = function(row, col){
        if(game.getCurrentPlayerIndex() === -1 || !_canCellPlay(row,col)){
            return;
        }
        const playSymbol = game.getCurrentPlayer().getPlaySymbol();
        _editCellContent(row, col, playSymbol);
       _moves[row][col] = playSymbol;
       let cell = document.querySelector(`.ttc-cell[data-row="${row}"][data-column="${col}"]`);
       
       cell.style['color'] = game.getCurrentPlayer().getColor();
       let winSymbol = checkWin();
       if(winSymbol !== -1){
           let winnerIndex = game.getPlayerIndexBySymbol(winSymbol);
           _editResults(winnerIndex);
           game.end();
           return;
       }
       if(checkFullBoard()){
            _editResults(-1);
            game.end();
            return;
       }
       game.changeTurn(1);
   }

    let _editCellContent = (row, column, content) => {
        let cell = doc.querySelector(`.ttc-cell[data-row="${row}"][data-column="${column}"]`); 
        cell.textContent = content;
    }

    let _canCellPlay = function(row, column){
        return _moves[row][column] === null;
    }

    let _editResults = function(winnerIndex){
        document.querySelectorAll(".player-area").forEach( item => {
            let resultLabelContainer = item.querySelector(".result .result-label");
            resultLabelContainer.classList.add("announced");
            if(winnerIndex === -1){
                resultLabelContainer.textContent = "Tie";
                return;
            }
            if(item.dataset['player'] == winnerIndex){
                resultLabelContainer.textContent = "Winner";
            }else{
                resultLabelContainer.textContent = "Loser";
            }
        });
    }
   
    let clearBoard = function(){
        if(_boardElement !== undefined){
            _boardElement.innerHTML = "";
        }
        _moves.length = 0;
    }

    let _getRowWinSymbol = function(numToWin){
        for(let i=0; i<_n; i++){
            for(let j=0; j<_n; j++){
                let count = 1;
                let symbol = _moves[i][j];
                if(symbol !== null){
                    while(true){
                        if(j+1 == _n || _moves[i][j+1] != symbol){
                            break;
                        }
                        ++j;
                        ++count;
                        if(count == numToWin){
                            return symbol;
                        }
                    }
                }
            }
        }
        return -1;
    }

    let _getColumnWinSymbol = function(numToWin){
        for(let j=0; j<_n; j++){
            for(let i=0; i<_n; i++){
                let count = 1;
                let symbol = _moves[i][j];
                if(symbol !== null){
                    while(true){
                        if(i+1 == _n || _moves[i+1][j] != symbol){
                            break;
                        }
                        ++i;
                        ++count;
                        if(count == numToWin){
                            return symbol;
                        }
                    }
                }
            }
        }
        return -1;
    }

    let _getMainDiagonalWinSymbol = function(numToWin){
        for(let j=0; j<=_n-numToWin; j++){
            for(let i=0; i<_n-j; i++){
                let count = 1;
                let symbol = _moves[i][i+j];
                if(symbol !== null){
                    while(true){
                        if( i+1 == _n-j || _moves[i+1][i+j+1] != symbol){
                            break;
                        }
                        ++i;
                        ++count;
                        if(count == numToWin){
                           return symbol;
                        }
                    }
                }
            }
        }
        for(let i=1; i<=_n-numToWin; i++){
            for(let j=0; j<_n-i; j++){
                let count = 1;
                let symbol = _moves[i+j][j];
                if(symbol !== null){
                    while(true){
                        if(j+1 == _n-i || _moves[i+j+1][j+1] != symbol){
                            break;
                        }
                        ++j;
                        ++count;
                        if(count == numToWin){
                            return symbol;
                        }
                    }
                }
            }
        }
     return -1;
    }

    let _getSecondaryDiagonalWinSymbol = function(numToWin){
        for(let j=_n-1; j>=numToWin-1; j--){
            for(let i=0; i<j+1; i++){
                let count = 1;
                let symbol = _moves[i][j-i];
                if(symbol !== null){
                    while(true){
                        if(i+1 == j+1 || _moves[i+1][j-i-1] != symbol){
                            break;
                        }
                        ++i;
                        ++count;
                        if(count == numToWin){
                            return symbol;
                        }
                    }
                }
            }
        }
        for(let i=1; i<_n; i++){
            for(let j=_n-1; j> i-1; j--){
                let count = 1;
                let steps = _n - 1 - j;
                let symbol = _moves[i+steps][j];
                if(symbol !== null){
                    while(true){
                        if(j-1 == i-1 || _moves[i+steps+1][j-1] != symbol){
                            break;
                        }
                        --j;
                        ++count;
                        if(count == numToWin){
                            return symbol;
                        }
                        steps = _n - 1 - j
                    }
                }
            }
        }
        return -1;
    }
    
    let checkWin = function(){
        let numToWin = 3;
        let winSymbol = _getRowWinSymbol(numToWin);
        if( winSymbol === -1){
            winSymbol = _getColumnWinSymbol(numToWin);
        }
        if( winSymbol === -1){
            winSymbol = _getMainDiagonalWinSymbol(numToWin);
        }
        if( winSymbol === -1){
            winSymbol = _getSecondaryDiagonalWinSymbol(numToWin);
        }
        return winSymbol;
    }

    let checkFullBoard = function(){
        for(let i=0; i<_n; i++){
            for(let j=0; j<_n; j++){
                if(_moves[i][j] === null){
                    return false;
                }
            }
        }
        return true;
    }

    let getBoard = function(){
        return _moves;
    }

    return {
        createBoard,
        setBoardElement,
        clearBoard,
        cellPlay,
        simulateCellPlay,
        getBoard,
        checkWin,
        getBoardSize,
        checkFullBoard
    }
})(document);