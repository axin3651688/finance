import * as wjCore from '@grapecity/wijmo';
let products = [
    { id: 'D0001', name: 'Chai', unitPrice: 12, profitUnitPrice: 3.11 },
    { id: 'D0002', name: 'Chang', unitPrice: 8.5, profitUnitPrice: 2.03 },
    { id: 'D0003', name: 'Aniseed Syrup', unitPrice: 6.85, profitUnitPrice: 2.35 },
    { id: 'D0004', name: 'Chef Anton\'s Gumbo Mix', unitPrice: 17.25, profitUnitPrice: 3.3 },
    { id: 'D0005', name: 'Ikura', unitPrice: 20, profitUnitPrice: 2.95 },
    { id: 'D0006', name: 'Mishi Kobe Niku', unitPrice: 14, profitUnitPrice: 3 },
];
export function getOrders(count) {
    let orders = [];
    for (let i = 0; i < count; i++) {
        let product = products[Math.floor(Math.random() * 6)], quantity = randBetween(100, 999), orderDate = new Date(2016, i % 12, i % 28);
        orders[i] = {
            orderId: 'C' + wjCore.Globalize.format(i + 1, 'd4'),
            productId: product.id,
            productName: product.name,
            specialNote: '',
            quantity: quantity,
            unitPrice: product.unitPrice,
            shippingWarehouse: Math.floor(Math.random() * 4),
            amount: quantity * product.unitPrice,
            onHold: Math.random() > 0.5,
            orderDate: orderDate,
            deliveryDate: new Date(2016, orderDate.getMonth() + 1, orderDate.getDate() + 15)
        };
    }
    return orders;
}
function randBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
