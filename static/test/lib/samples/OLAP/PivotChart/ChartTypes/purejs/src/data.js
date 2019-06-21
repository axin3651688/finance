export function getData() {
    var yr = new Date().getFullYear();
    return [{
            date: new Date(yr, 0, 1),
            buyer: 'Mom',
            type: 'Fuel',
            amount: 74
        },
        {
            date: new Date(yr, 0, 15),
            buyer: 'Mom',
            type: 'Food',
            amount: 235
        },
        {
            date: new Date(yr, 0, 17),
            buyer: 'Dad',
            type: 'Sports',
            amount: 20
        },
        {
            date: new Date(yr, 0, 21),
            buyer: 'Kelly',
            type: 'Books',
            amount: 125
        },
        {
            date: new Date(yr, 1, 2),
            buyer: 'Mom',
            type: 'Food',
            amount: 235
        },
        {
            date: new Date(yr, 1, 20),
            buyer: 'Kelly',
            type: 'Music',
            amount: 20
        },
        {
            date: new Date(yr, 1, 25),
            buyer: 'Kelly',
            type: 'Tickets',
            amount: 125
        },
    ];
}
