export function getEmployee() {
    return {
        id: 'E892659',
        name: 'Robert King',
        department: 'Sales',
        position: 'Sales Representative',
        ssn: 'A37830',
        manager: 'Andrew Fuller',
        purpose: 'On business',
        attachment: true,
        advance: 1000,
        expenses: getExpenses()
    };
}

function getExpenses(){
    // [5; 10]
    let count = 5 + Math.round(Math.random() * 5),
        ret = {
            items: [],
            totals: { hotel: 0, transport: 0, fuel: 0, meal: 0, misc: 0, total: 0 }
        },
        msPerDay = 1000 * 24 * 60 * 60,
        curDate = Date.now() - 60 * msPerDay;
    //
    for (let i = 0; i < count; i++) {
        let item = {
            date: new Date(curDate),
            description: 'Customer visit',
            hotel: 30 + Math.random() * 200,
            transport: 10 + Math.random() * 150,
            fuel: Math.random() * 50,
            meal: 30 + Math.random() * 170,
            misc: Math.random() * 220,
            total: 0
        };
        //
        item.total = item.hotel + item.transport + item.fuel + item.meal + item.misc;
        //
        ret.totals.fuel += item.fuel;
        ret.totals.hotel += item.hotel;
        ret.totals.meal += item.meal;
        ret.totals.misc += item.misc;
        ret.totals.total += item.total;
        ret.totals.transport += item.transport;
        //
        ret.items.push(item);
        //
        curDate += msPerDay * Math.round(Math.random() * 4);
    }
    //
    return ret;
}