export function getData() {
    let arr = [],
        today = new Date(),
        sales = 1000;
    //
    for (let i = 100; i >= 0; i--) {
        arr.push({
            date: wijmo.DateTime.addDays(today, -i),
            sales: sales
        });
        //
        sales += Math.round(Math.random() * 300 - 130);
    }
    //
    return arr;
}
