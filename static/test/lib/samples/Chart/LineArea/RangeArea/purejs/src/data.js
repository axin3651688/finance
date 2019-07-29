export function getRawData() {
    let data = [];
    for (let d = 1; d <= 7; d++) {
        for (let i = 0; i < 20; i++) {
            data.push({ day: d, time: Math.random() * 60 });
        }
    }
    return data;
}
