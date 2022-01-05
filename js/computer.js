import { game } from './game.js';
import { board } from './Board/board.js';
import { boardInformation } from './Board/information.js';


export let computer = (function(){

    let _chooseRandomItem = function(array){
        return array[Math.floor(Math.random() * array.length)];
    }

    let getEazyAIMove = function(board){
        let emptyCells = [];
        for(let i=0; i< board.length; i++){
            for(let j=0; j< board[i].length; j++){
                if(board[i][j] === null){
                    emptyCells.push({
                        row: i,
                        col: j
                    })
                }
            }
        }
        let chosenCell = _chooseRandomItem(emptyCells);
        return chosenCell;
    }

    let getHardAIMove = function(previousMove, previousPlayerIndex, originalPlayerIndex){
        const currentBoard = board.getBoard();
        if(boardInformation.checkWin(currentBoard)){
            return previousPlayerIndex == originalPlayerIndex? {res:1, ...previousMove}:{res:-1,...previousMove};
        }else if(boardInformation.checkBoardFull(currentBoard)){
            return {res:0, ...previousMove};
        }
        let playerIndex = (previousPlayerIndex + 1) % game.getPlayersNum();
        let bestMove = { res: (playerIndex==originalPlayerIndex? 
                   Number.MIN_SAFE_INTEGER: Number.MAX_SAFE_INTEGER), row: null, col: null};
        for(let i=0; i<currentBoard.length; i++){
            for(let j=0; j<currentBoard[i].length; j++){
                if(boardInformation.canSetCell(currentBoard, i, j)){
                    board.setCell(currentBoard, i,j, game.getPlayerByIndex(playerIndex).getPlaySymbol());
                    let move = {row:i, col: j};
                    let curr = getHardAIMove(move, playerIndex, originalPlayerIndex);
                    if((playerIndex !== originalPlayerIndex && bestMove['res'] > curr['res']) ||
                            playerIndex === originalPlayerIndex && bestMove['res'] < curr['res']){
                        bestMove['res'] = curr['res'];
                        bestMove['row'] = i;
                        bestMove['col'] = j;
                    }
                    board.setCell(currentBoard,i,j, null);
                }
            }
        }
        return bestMove;
    }

    return {
        getEazyAIMove,
        getHardAIMove
    }
})();
