

import { game } from './game.js';

window.addEventListener("DOMContentLoaded", () => {

    let gameOptionsForm = document.querySelector("#form-game-options");
    let gameOptionsModal = document.querySelector("#modal-game-options");

    function attachEventsListeners(){
        document.querySelectorAll('input[name="grid-size"]').forEach( item => {
            item.addEventListener("change",labelChange); 
        });
        document.querySelectorAll('input[name="computerOrHuman"]').forEach( item => {
            item.addEventListener("change" ,labelChange);
        });
        gameOptionsForm.addEventListener("submit", startNewGame);
        document.querySelector(".btn-new-game").addEventListener("click", () => {
            openModal(gameOptionsModal);
        })
        document.querySelectorAll(".btn-modal-close").forEach( item => {
            item.addEventListener("click", ()=>{
                closeModal(document.querySelector(item.dataset['target']));
            });
        });
        document.querySelector(".btn-restart-game").addEventListener("click", restartGame);
    }

    function labelChange(e){
        let target = e.target;
        target.parentElement.parentElement.querySelectorAll("label").forEach((label) => {
            label.classList.remove("selected");
        });
        target.parentElement.classList.add("selected");
    }

    function startNewGame(e){
        e.preventDefault();
        const form = e.target;
        closeModal(form.closest(".modal"))
        game.createGame(form['grid-size'].value, form['computerOrHuman'].value,
            [form['player1-name'].value, form['player2-name'].value]
        );
    }

    function restartGame(){
        game.restart();
    }

    function closeModal(modalElement){
        modalElement.classList.add("d-none");
        document.body.classList.remove("active-modal")
    }
    
    function openModal(modalElement){
        modalElement.classList.remove("d-none");
        document.body.classList.add("active-modal");
    }
    
    document.querySelectorAll(".player-area form").forEach( (form) => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            let player = game.getPlayerByIndex(form.dataset['player']);
            player.setName(form.name.value);
            form.previousElementSibling.style['display'] = 'inline-block';
            form.style['display'] = 'none';
        });
    });
    
    document.querySelectorAll(".btn-change-name").forEach( item => {
        item.addEventListener("click", () => {
            let form = item.nextElementSibling;
            form.style['display'] = 'flex';
            form.name.focus();
            item.style['display'] = 'none';
        })
    });
    function loadApp(){
        openModal(gameOptionsModal);
        attachEventsListeners();
    }
    loadApp();
 })



