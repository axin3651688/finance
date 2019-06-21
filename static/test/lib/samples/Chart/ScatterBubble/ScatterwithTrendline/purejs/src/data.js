export function getData() {
    let arr = [], cnt = 50, a = Math.random(), b = 0.2 + Math.random();
    //
    for (let i = 1; i < cnt; i++) {
        arr.push({
            x: i,
            y: a + i * b + i * (Math.random() - 0.5)
        });
    }
    //
    return arr;
}
