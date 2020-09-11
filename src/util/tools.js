function isNumber(value) {
    return typeof value === 'number' && isFinite(value);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function isValidURL(u) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (!regex.test(u)) {
        return false;
    } else {
        return true;
    }
}


module.exports = {
    isNumber,
    getRandomInt,
    isValidURL
}