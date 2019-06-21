export function getData() {
    var data = [];
    for (var i = 0; i <= 360; i += 10) {
        data.push({
            longitude: i,
            latitude1: Math.ceil(Math.random() * 30) + 60,
            latitude2: Math.ceil(Math.random() * 30) + 30
        });
    }
    return data;
}
