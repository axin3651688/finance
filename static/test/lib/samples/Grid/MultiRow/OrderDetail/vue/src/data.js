export function getOrderDetail(count){
    let orderDetails = [],
        parts = ['Widget', 'Gadget', 'Doohickey'],
        companies = ['Alfreds Futterkiste', 'Ernst Handel', 'Eastern Connection', 'Du monde entier', 'Consolidated Holdings', 'Chop-suey Chinese'],
        persons = ['Laurence Lebihan', 'Elizabeth Lincoln', 'Victoria Ashworth', 'Patricio Simpson'];

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
        }
    }
    return orderDetails;
}

export function generateLayoutDef(){
    return [
        {
            colspan: 6,
            cells: [
                { binding: 'orderId', width: 90, header: 'Order ID' },
                { binding: 'partId', width: 80, header: 'Part ID' },
                { binding: 'handlingId', width: 100, header: 'Handling ID' },
                { binding: 'processingStatus', width: 125, header: 'Processing Status' },
                { binding: 'purchaseId', width: 100, header: 'Purchase ID' },
                { binding: 'completed', width: 100, header: 'Completed' },
                { binding: 'orderDate', width: 90, header: 'Order Date' },
                { binding: 'partName', header: 'Part Name', colspan: 5, align: 'center' },
                { binding: 'company', header: 'Company', colspan: 3, align: 'center' },
                { binding: 'person', header: 'Person', colspan: 2, align: 'center' },
                { binding: 'accepted', width: 100, header: 'Accepted' }
            ]
        },
        {
            cells: [
                { binding: 'quantity1', width: 90, header: 'Quantity 1' },
                { binding: 'quantity2', width: 90, header: 'Quantity 2' },
                { binding: 'quantity3', width: 90, header: 'Quantity 3' },
            ]
        },
        {
            cells: [
                { binding: 'unit', width: 60, header: 'Unit' },
            ]
        },
        {
            cells: [
                { binding: 'deliveryDate', width: 120, header: 'Delivery Date', format: 'yyyy/MM/dd' },
                { binding: 'processingDate', width: 120, header: 'Processing Date', format: 'yyyy/MM/dd' },
                { binding: 'shippingDate', width: 120, header: 'Shipping Date', format: 'yyyy/MM/dd' }
            ]
        },
        {
            cells: [
                { binding: 'packingRequest', header: 'Packing Request' }
            ]
        }
    ];
}

function randBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}