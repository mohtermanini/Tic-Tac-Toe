
let player = () => {
    let _id;
    let _name;
    let _color;
    let _playSymbol;
    let _type;

    let init = function(id, name, color, playSymbol, type){
        _id = id;
        _color = color;
        _playSymbol = playSymbol;
        _type = type;
        this.setName(name);
    }

    let getId = function(){
        return _id;
    }

    let setName = function(name){
        _name = name + " (" + this.getPlaySymbol() + ")";
        this.changePlayerNameLabel();
    }

    let getName = function(){
        return _name;
    }

    let setColor = function(color){
        _color = color;
    }

    let getColor = function(){
        return _color;
    }

    let setPlaySymbol = function(playSymbol){
        _playSymbol = playSymbol;
    }

    let getPlaySymbol = function(){
        return _playSymbol;
    }

    let setType = function(type){
        _type = type;
    }

    let getType = function(){
        return _type;
    }

    let changePlayerNameLabel = function(){
        document.querySelector(`[data-player="${this.getId()}"] .name-label`).textContent = this.getName();
    }

    return{
        init,
        getId,
        setName,
        getName,
        setColor,
        getColor,
        setPlaySymbol,
        getPlaySymbol,
        changePlayerNameLabel,
        setType,
        getType
    }
}