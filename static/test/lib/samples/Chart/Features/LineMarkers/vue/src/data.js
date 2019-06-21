export function getData() {
    let arr = [],
        value = 100,
        date = new Date();
    //
    for (let i = 0; i < 100; i++) {
        arr.push({
            date: date,
            value: value + Math.random() * 10 - 4
        });
        //
        date = wijmo.DateTime.addDays(date, -1);
    }
    //
    return arr;
}