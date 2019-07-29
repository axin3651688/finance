export function getData() {
    var data = [],
        numCount = 100;

    for (var i = 0; i < numCount; i++) {
        data.push({
            x: getRandomValue(100),
            y: getRandomValue(1000)
        });
    }
    return data;
}
//
function getRandomValue(max) {
    return Math.round(Math.random() * max);
}