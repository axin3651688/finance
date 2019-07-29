let products = [
    { id: 'D0001', name: 'Chai', unitPrice: 12, profitUnitPrice: 3.11 },
    { id: 'D0002', name: 'Chang', unitPrice: 8.5, profitUnitPrice: 2.03 },
    { id: 'D0003', name: 'Aniseed Syrup', unitPrice: 6.85, profitUnitPrice: 2.35 },
    { id: 'D0004', name: 'Chef Anton\'s Gumbo Mix', unitPrice: 17.25, profitUnitPrice: 3.3 },
    { id: 'D0005', name: 'Ikura', unitPrice: 20, profitUnitPrice: 2.95 },
    { id: 'D0006', name: 'Mishi Kobe Niku', unitPrice: 14, profitUnitPrice: 3 },
];
export function getSalesSlip(count) {
    let salseSlip = [];
    for (let i = 0; i < count; i++) {
        let product = products[Math.floor(Math.random() * 6)], quantity = randBetween(10, 50), profitUnitPrice = product.profitUnitPrice * 10, unitPrice = product.unitPrice * 10, salesAmount = unitPrice * quantity, totalProfit = profitUnitPrice * quantity;
        salseSlip[i] = {
            id: i + 1,
            productId: product.id,
            productName: product.name,
            quantity: quantity,
            profitUnitPrice: profitUnitPrice,
            unitPrice: unitPrice,
            totalProfit: totalProfit,
            salesAmount: salesAmount,
            profitRate: totalProfit / salesAmount,
            unit: 'box',
            marker: ''
        };
    }
    return salseSlip;
}
function randBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateLayoutDef(){
    return [
        {
            cells: [
                { binding: 'id', header: 'No.', width: 60 }
            ]
        },
        {
            colspan: 5,
            cells: [
                { binding: 'productId', header: 'Product ID', width: 80 },
                { binding: 'productName', header: 'Product Name', colspan: 3 },
                { binding: 'marker', header: 'Marker', align: 'center' },
                { binding: 'quantity', header: 'Quantity', width: 80, align: 'right' },
                { binding: 'unit', header: 'Unit' },
                { binding: 'unitPrice', header: 'Unit Price', format: 'c2', colspan: 2 },
                { binding: 'salesAmount', header: 'Sales Amount', format: 'c2', isReadOnly: true },
                { binding: 'profitUnitPrice', header: 'Profit Unit Price', format: 'c2', colspan: 2 },
                { binding: 'totalProfit', header: 'Total Profit', format: 'c2', colspan: 2, isReadOnly: true, cssClass: 'profit-cell' },
                { binding: 'profitRate', header: 'Profit Rate', format: 'p2', isReadOnly: true, cssClass: 'profit-cell' }
            ]
        }
    ];
}
