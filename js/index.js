

import { game } from './game.js';

window.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".form-grid-size").addEventListener("submit", (e) => {
        e.preventDefault();
        e.target.querySelector(".submit-group").classList.add("v-hidden");
        game.start(e.target['grid-size'].value, e.target['computerOrHuman'].checked);
    });
    
    document.querySelectorAll('input[name="grid-size"]').forEach( (item) => {
        item.addEventListener("change", () => {
            item.parentElement.parentElement.querySelectorAll("label").forEach((label) => {
                label.classList.remove("selected");
            });
            item.parentElement.classList.add("selected");
        })
    })

    document.querySelector("input[name='computerOrHuman']").addEventListener("change", (e) => {
        let label = e.target.parentElement;
        label.classList.toggle("selected");
    });
    
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

    game.init();
 })



