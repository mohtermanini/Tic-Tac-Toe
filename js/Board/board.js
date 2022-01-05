
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
            let newRow = boardView.createRow(grid, n);
            _moves.push([]);
            for(let j=0; j<n; j++){
                let newCell = boardView.createCell(newRow, i, j);
                newCell.addEventListener("click", clickCellPlay);
                _moves[i].push(null);
            }
        } 
        return _moves;
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
        
        if(!boardInformation.canSetCell(_moves, row, col)){
            return;
        }
        let symbol = game.getCurrentPlayer().getPlaySymbol();
        setCell(_moves, row, col, symbol);
        boardView.editCellContent(row, col, symbol);

       let numToWin = boardInformation.getConsecutiveSymbolNumberToWin(_n);
       let winSymbol = boardInformation.getWinSymbol(_moves, numToWin);
       if(winSymbol !== -1){
           let winnerIndex = game.getPlayerIndexBySymbol(winSymbol);
           boardView.editResults(winnerIndex);
           game.end();
           return;
       }
       if(boardInformation.checkBoardFull(_moves)){
            boardView.editResults(-1);
            game.end();
            return;
       }
       game.changeTurn(1);
   }

   let setCell = function(board, row, col, symbol){
        board[row][col] = symbol;
   }
   
    let clearBoard = function(){
        boardView.clearBoard(_boardElement);
        _moves.length = 0;
    }

    let getBoard = function(){
        return _moves;
    }

    return {
        createBoard,
        setBoardElement,
        setCell,
        clearBoard,
        cellPlay,
        simulateCellPlay,
        getBoard,
        getBoardSize,
    }
})(document);