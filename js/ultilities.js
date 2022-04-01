export let utilties = (() => {
    let createSpinner = function () {
        const loading = document.createElement("div");
        loading.classList.add("loading");
        const spinner = document.createElement("div");
        spinner.classList.add("spinner");
        loading.append(spinner);
        return loading;
    };
    return {
        createSpinner,
    };
})();
