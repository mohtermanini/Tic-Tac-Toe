import { game } from '../game.js';

export let boardView = (function(){

    let editCellContent = (rowId, columnId, content) => {
        let cell = document.querySelector(`.ttc-cell[data-row="${rowId}"][data-column="${columnId}"]`); 
        cell.textContent = content;
        cell.style['color'] = game.getCurrentPlayer().getColor();
    }

    let editResults = function(winnerIndex){
        document.querySelectorAll(".player-area").forEach( item => {
            let resultLabelContainer = item.querySelector(".result .result-label");
            let result;
            if(winnerIndex === -1){
                result = "Tie";
            }
            else if(item.dataset['player'] == winnerIndex){
                result = "Winner";
            }
            else{
                result = "Loser";
            }
            resultLabelContainer.textContent = result;
            resultLabelContainer.classList.add("announced");
        });
    }

    let clearBoard = function(boardElement){
        if(boardElement !== undefined){
            boardElement.innerHTML = "";
        }
    }

    let createRow = function(parent, columnNum){
        let row = document.createElement("div");
        row.style['grid-template-columns'] = `repeat(${columnNum},1fr)`;
        parent.appendChild(row);
        return row;
    }

    let createCell = function(parent, rowId, columnId){
        let cell = document.createElement("div");
        cell.classList.add("ttc-cell");
        cell.dataset['row'] = rowId;
        cell.dataset['column'] = columnId;
        parent.appendChild(cell);
        return cell;
    }

    return {
        createRow,
        createCell,
        editCellContent,
        editResults,
        clearBoard
    }
})();