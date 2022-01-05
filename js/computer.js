
let computer = (function(){

    let playEazyMove = function(){
        const currentBoard = board.getBoard();
        let emptyCells = [];
        for(let i=0; i<currentBoard.length; i++){
            for(let j=0; j<currentBoard[i].length; j++){
                if(currentBoard[i][j] === null){
                    emptyCells.push({
                        row: i,
                        col: j
                    })
                }
            }
        }
        let chosenCell = _chooseRandomItem(emptyCells);
        board.cellPlay(chosenCell.row, chosenCell.col);
    }
    let _chooseRandomItem = function(array){
        return array[Math.floor(Math.random() * array.length)];
    }
    let playHardMove = function(previousMove, previousPlayerIndex, originalPlayerIndex){
        const currentBoard = board.getBoard();
        if(board.checkWin() !== -1){
            return previousPlayerIndex == originalPlayerIndex? {res:1, ...previousMove}:{res:-1,...previousMove};
        }else if(board.checkFullBoard()){
            return {res:0, ...previousMove};
        }
        let playerIndex = (previousPlayerIndex + 1) % game.getPlayersNum();
        let best = { res: (playerIndex==originalPlayerIndex? 
                   Number.MIN_SAFE_INTEGER: Number.MAX_SAFE_INTEGER), row: null, col: null};
        for(let i=0; i<currentBoard.length; i++){
            for(let j=0; j<currentBoard[i].length; j++){
                if(currentBoard[i][j] === null){
                    board.simulateCellPlay(i,j, game.getPlayerByIndex(playerIndex).getPlaySymbol());
                    let move = {row:i, col: j};
                    let curr = playHardMove(move, playerIndex, originalPlayerIndex);
                    if((playerIndex !== originalPlayerIndex && best['res'] > curr['res']) ||
                          playerIndex === originalPlayerIndex && best['res'] < curr['res']){
                        best['res'] = curr['res'];
                        best['row'] = i;
                        best['col'] = j;
                    }
                    board.simulateCellPlay(i,j, null);
                }
            }
        }
        return best;
    }

    return {
        playEazyMove,
        playHardMove
    }
})();