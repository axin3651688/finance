export function getOrderDetail(count) {
    let orderDetails = [], parts = ['Widget', 'Gadget', 'Doohickey'], companies = ['Alfreds Futterkiste', 'Ernst Handel', 'Eastern Connection', 'Du monde entier', 'Consolidated Holdings', 'Chop-suey Chinese'], persons = ['Laurence Lebihan', 'Elizabeth Lincoln', 'Victoria Ashworth', 'Patricio Simpson'];
    for (let i = 0; i < count; i++) {
        let orderDate = new Date(2016, i % 12, i % 28);
        orderDetails[i] = {
            orderId: 'PT-0000' + (i + 1),
            partId: randBetween(10000, 99999).toString(),
            handlingId: randBetween(100, 999).toString(),
            processingStatus: 'Testing',
            purchaseId: randBetween(1000, 9999).toString(),
            completed: '',
            orderDate: orderDate,
            partName: parts[Math.floor(Math.random() * 3)],
            company: companies[Math.floor(Math.random() * 6)],
            person: persons[Math.floor(Math.random() * 4)],
            accepted: 1 % 3 === 0 ? true : false,
            quantity1: randBetween(100, 999),
            quantity2: randBetween(100, 999),
            quantity3: randBetween(100, 999),
            unit: 'copy',
            deliveryDate: new Date(2016, orderDate.getMonth() + 1, orderDate.getDate() + 15),
            processingDate: new Date(2016, orderDate.getMonth(), orderDate.getDate() + 15),
            shippingDate: new Date(2016, orderDate.getMonth() + 1, orderDate.getDate()),
            packingRequest: ''
        };
    }
    return orderDetails;
}
function randBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
