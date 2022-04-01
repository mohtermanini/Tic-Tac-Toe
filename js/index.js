import { game } from "./game.js";
import { boardInformation } from "./Board/information.js";

window.addEventListener("DOMContentLoaded", () => {
    const gameOptionsForm = document.querySelector("#form-game-options");
    const gameOptionsModal = document.querySelector("#modal-game-options");
    const player2InputContainer = gameOptionsModal.querySelector(
        ".name-input-container:nth-child(2)",
    );

    function attachEventsListeners() {
        document.querySelectorAll('input[name="grid-size"]').forEach((item) => {
            item.addEventListener("change", labelChange);
            item.addEventListener("change", gridSizeChange);
        });
        document.querySelectorAll('input[name="computerOrHuman"]').forEach((item) => {
            item.addEventListener("change", labelChange);
            item.addEventListener("change", gameTypeChange);
        });
        document.querySelectorAll('input[name="difficulty"]').forEach((item) => {
            item.addEventListener("change", labelChange);
            item.addEventListener("change", renderDifficulty);
        });
        gameOptionsForm.addEventListener("submit", startNewGame);
        document.querySelector(".btn-new-game").addEventListener("click", () => {
            openModal(gameOptionsModal);
        });
        document.querySelectorAll(".btn-modal-close").forEach((item) => {
            item.addEventListener("click", () => {
                closeModal(document.querySelector(item.dataset["target"]));
            });
        });
        document.querySelector(".btn-restart-game").addEventListener("click", restartGame);
    }

    /* Grid Size */
    const numberToPlaceSpan = gameOptionsModal.querySelector(".size-info");
    function gridSizeChange(e) {
        const newSize = parseInt(e.target.value, 10);
        numberToPlaceSpan.textContent = boardInformation.getConsecutiveSymbolNumberToWin(newSize);
        renderDifficulty();
    }
    /* ==================== */

    /* Game Type */
    function gameTypeChange(e) {
        const type = e.target.value;
        if (type === "computer") {
            player2InputContainer.style["max-height"] = "0";
        } else {
            player2InputContainer.style["max-height"] = `${player2InputContainer.scrollHeight}px`;
        }
        player2InputContainer.classList.remove("mh-0");
        renderDifficulty();
    }
    /* ==================== */

    /* Difficulty */
    const difficultyOption = gameOptionsModal.querySelector(".difficulty-option");
    const difficultyInfo = gameOptionsModal.querySelector(".difficulty-info .info");
    const easyDifficultyLabel = difficultyOption.querySelector(".label-difficulty-easy");
    const easyDifficultyInput = easyDifficultyLabel.firstElementChild;
    const hardDifficultyLabel = difficultyOption.querySelector(".label-difficulty-hard");
    function initDifficultyOptions() {
        difficultyOption.style["max-height"] = `${difficultyOption.scrollHeight}px`;
    }

    function hideDifficultyOptions() {
        difficultyOption.style["max-height"] = "0";
        difficultyOption.classList.add("p-0");
        difficultyOption.classList.add("bd-0");
    }

    function showDifficultyOptions() {
        difficultyOption.style["max-height"] = `${difficultyOption.scrollHeight}px`;
        setTimeout(() => {
            difficultyOption.style["max-height"] = `${difficultyOption.scrollHeight}px`;
        }, 150);
        difficultyOption.classList.remove("p-0");
        difficultyOption.classList.remove("bd-0");
    }

    function disableHardDifficulty() {
        easyDifficultyInput.checked = true;
        easyDifficultyLabel.classList.add("selected");
        hardDifficultyLabel.classList.remove("selected");
        hardDifficultyLabel.classList.add("disabled");
    }

    function enableHardDifficulty() {
        hardDifficultyLabel.classList.remove("disabled");
    }

    function showHardDifficultyInfo() {
        difficultyInfo.textContent = "First move may take up to 1.30 minutes";
    }

    function hideDifficultyInfo() {
        difficultyInfo.textContent = "";
    }

    function renderDifficultyInfo() {
        const gridSize = parseInt(gameOptionsForm["grid-size"].value, 10);
        if (easyDifficultyInput.checked || gridSize === 3) {
            hideDifficultyInfo();
        } else {
            showHardDifficultyInfo();
        }
    }

    function renderDifficulty() {
        if (gameOptionsForm["computerOrHuman"].value === "human") {
            hideDifficultyOptions();
            return;
        }
        const gridSize = parseInt(gameOptionsForm["grid-size"].value, 10);
        if (gridSize === 5) {
            disableHardDifficulty();
        } else {
            enableHardDifficulty();
        }
        renderDifficultyInfo();
        showDifficultyOptions();
    }
    /* ==================== */

    function labelChange(e) {
        let target = e.target;
        target.parentElement.parentElement.querySelectorAll("label").forEach((label) => {
            label.classList.remove("selected");
        });
        target.parentElement.classList.add("selected");
    }

    function startNewGame(e) {
        e.preventDefault();
        const form = e.target;
        closeModal(form.closest(".modal"));
        game.createGame(
            form["grid-size"].value,
            form["computerOrHuman"].value,
            form["difficulty"].value,
            [form["player1-name"].value, form["player2-name"].value],
        );
    }

    function restartGame() {
        game.restart();
    }

    function closeModal(modalElement) {
        modalElement.classList.add("d-none");
        document.body.classList.remove("active-modal");
    }

    function openModal(modalElement) {
        modalElement.classList.remove("d-none");
        document.body.classList.add("active-modal");
    }

    document.querySelectorAll(".player-area form").forEach((form) => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            let player = game.getPlayerByIndex(form.dataset["player"]);
            player.setName(form.name.value);
            form.previousElementSibling.style["display"] = "inline-block";
            form.style["display"] = "none";
        });
    });

    document.querySelectorAll(".btn-change-name").forEach((item) => {
        item.addEventListener("click", () => {
            let form = item.nextElementSibling;
            form.style["display"] = "flex";
            form.name.focus();
            item.style["display"] = "none";
        });
    });
    function loadApp() {
        openModal(gameOptionsModal);
        initDifficultyOptions();
        attachEventsListeners();
    }
    loadApp();
});
