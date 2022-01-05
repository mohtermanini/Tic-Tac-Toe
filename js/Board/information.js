import { game } from '../game.js';

export let boardInformation = (function(){

    let checkBoardFull = function(board){
        let n = board.length;
        for(let i=0; i<n; i++){
            for(let j=0; j<n; j++){
                if(board[i][j] === null){
                    return false;
                }
            }
        }
        return true;
    }

    let _getRowWinSymbol = function(board, numToWin = 3){
        let n = board.length;
        for(let i=0; i<n; i++){
            for(let j=0; j<n; j++){
                let count = 1;
                let symbol = board[i][j];
                if(symbol !== null){
                    while(true){
                        if(j+1 == n || board[i][j+1] != symbol){
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

    let _getColumnWinSymbol = function(board, numToWin = 3){
        let n = board.length;
        for(let j=0; j<n; j++){
            for(let i=0; i<n; i++){
                let count = 1;
                let symbol = board[i][j];
                if(symbol !== null){
                    while(true){
                        if(i+1 == n || board[i+1][j] != symbol){
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

    let _getMainDiagonalWinSymbol = function(board, numToWin = 3){
        let n = board.length;
        for(let j=0; j<= n-numToWin; j++){
            for(let i=0; i< n-j; i++){
                let count = 1;
                let symbol = board[i][i+j];
                if(symbol !== null){
                    while(true){
                        if( i+1 == n-j || board[i+1][i+j+1] != symbol){
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
        for(let i=1; i<= n-numToWin; i++){
            for(let j=0; j< n-i; j++){
                let count = 1;
                let symbol = board[i+j][j];
                if(symbol !== null){
                    while(true){
                        if(j+1 ==  n-i || board[i+j+1][j+1] != symbol){
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

    let _getSecondaryDiagonalWinSymbol = function(board, numToWin = 3){
        let n = board.length;
        for(let j= n-1; j>=numToWin-1; j--){
            for(let i=0; i<j+1; i++){
                let count = 1;
                let symbol = board[i][j-i];
                if(symbol !== null){
                    while(true){
                        if(i+1 == j+1 || board[i+1][j-i-1] != symbol){
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
        for(let i=1; i< n; i++){
            for(let j= n-1; j> i-1; j--){
                let count = 1;
                let steps = n - 1 - j;
                let symbol = board[i+steps][j];
                if(symbol !== null){
                    while(true){
                        if(j-1 == i-1 || board[i+steps+1][j-1] != symbol){
                            break;
                        }
                        --j;
                        ++count;
                        if(count == numToWin){
                            return symbol;
                        }
                        steps = n - 1 - j
                    }
                }
            }
        }
        return -1;
    }
    
    let checkWin = function(board, numToWin = 3){
        return getWinSymbol(board, numToWin) !== -1;
    }

    let getWinSymbol = function(board, numToWin = 3){
        let winSymbol = _getRowWinSymbol(board, numToWin);
        if( winSymbol === -1){
            winSymbol = _getColumnWinSymbol(board, numToWin);
        }
        if( winSymbol === -1){
            winSymbol = _getMainDiagonalWinSymbol(board, numToWin);
        }
        if( winSymbol === -1){
            winSymbol = _getSecondaryDiagonalWinSymbol(board, numToWin);
        }
        return winSymbol;
    }

    let checkCellPlayable = function(board, row, column){
        return board[row][column] === null;
    }

    let getConsecutiveSymbolNumberToWin = function(boardSize){
        if(boardSize <= 3){
            return 3;
        }
        if(boardSize == 5){
            return 4;
        }
    }

    let canSetCell = function(board, row, col){
        return game.getCurrentPlayerIndex() !== -1 &&
                boardInformation.checkCellPlayable(board, row,col);
   }

    return {
        checkBoardFull,
        checkWin,
        getWinSymbol,
        getConsecutiveSymbolNumberToWin,
        checkCellPlayable,
        canSetCell
    }
    
})();

