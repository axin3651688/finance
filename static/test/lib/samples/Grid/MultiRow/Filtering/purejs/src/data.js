import * as wjCore from '@grapecity/wijmo';
import * as wjGrid from '@grapecity/wijmo.grid';
export function generateAppData() {
    // create some data
    let appData = {}, customers = [], firstNames = 'Aaron,Paul,John,Mark,Sue,Tom,Bill,Joe,Tony,Brad,Frank,Chris,Pat'.split(','), lastNames = 'Smith,Johnson,Richards,Bannon,Wong,Peters,White,Brown,Adams,Jennings'.split(','), cities = 'York,Paris,Rome,Cairo,Florence,Sidney,Hamburg,Vancouver'.split(','), states = 'SP,RS,RN,SC,CS,RT,BC'.split(',');
    for (let i = 0; i < 50; i++) {
        let first = firstNames[randBetween(0, firstNames.length - 1)], last = lastNames[randBetween(0, lastNames.length - 1)];
        customers.push({
            id: i,
            name: first + ' ' + last,
            address: randBetween(100, 10000) + ' ' + lastNames[randBetween(0, lastNames.length - 1)] + ' St.',
            city: cities[randBetween(0, cities.length - 1)],
            state: states[randBetween(0, states.length - 1)],
            zip: wjCore.format('{p1:d5}-{p2:d3}', {
                p1: randBetween(10000, 99999),
                p2: randBetween(100, 999)
            }),
            email: first + '.' + last + '@gmail.com',
            phone: wjCore.format('{p1:d3}-{p2:d4}', {
                p1: randBetween(100, 999),
                p2: randBetween(1000, 9999)
            })
        });
    }
    let cityMap = new wjGrid.DataMap(cities);
    let shippers = [
        { id: 0, name: 'Speedy Express', email: 'speedy@gmail.com', phone: '431-3234', express: true },
        { id: 1, name: 'Flash Delivery', email: 'flash@gmail.com', phone: '431-6563', express: true },
        { id: 2, name: 'Logitrax', email: 'logitrax@gmail.com', phone: '431-3981', express: false },
        { id: 3, name: 'Acme Inc', email: 'acme@gmail.com', phone: '431-3113', express: false }
    ];
    let orders = [];
    let today = new Date();
    for (let i = 0; i < 20; i++) {
        let shipped = wjCore.DateTime.addDays(today, -randBetween(1, 3000));
        orders.push({
            id: i,
            date: wjCore.DateTime.addDays(shipped, -randBetween(1, 5)),
            shippedDate: shipped,
            amount: randBetween(10000, 500000) / 100,
            customer: customers[randBetween(0, customers.length - 1)],
            shipper: shippers[randBetween(0, shippers.length - 1)]
        });
    }
    function randBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    // expose orders CollectionView to the app
    appData.orders = new wjCore.CollectionView(orders);
    // expose grouped orders CollectionView to the app
    appData.groupedOrders = new wjCore.CollectionView(orders, {
        groupDescriptions: [
            'customer.city'
        ]
    });
    // expose paged orders CollectionView to the app
    appData.pagedOrders = new wjCore.CollectionView(orders, {
        pageSize: 4
    });
    // expose addNew oders CollectionView to the app
    appData.addNewOrders = new wjCore.CollectionView(orders, {
        newItemCreator: function () {
            return {
                customer: {},
                shipper: {}
            };
        },
    });
    appData.addNewOrders.moveCurrentToLast();
    // refresh views when data source changes
    let ordersRefreshing = false;
    appData.orders.collectionChanged.addHandler(function () {
        ordersRefreshing = true;
        if (!pagedOrdersRefreshing) {
            appData.pagedOrders.refresh();
        }
        if (!groupedOrdersRefreshing) {
            appData.groupedOrders.refresh();
        }
        if (!addNewOrdersRefreshing) {
            appData.addNewOrders.refresh();
        }
        ordersRefreshing = false;
    });
    // addNew orders
    let addNewOrdersRefreshing = false;
    appData.addNewOrders.collectionChanged.addHandler(function () {
        addNewOrdersRefreshing = true;
        if (!ordersRefreshing) {
            appData.orders.refresh();
        }
        if (!pagedOrdersRefreshing) {
            appData.pagedOrders.refresh();
        }
        if (!groupedOrdersRefreshing) {
            appData.groupedOrders.refresh();
        }
        addNewOrdersRefreshing = false;
    });
    // grouped orders
    let groupedOrdersRefreshing = false;
    appData.groupedOrders.collectionChanged.addHandler(function () {
        groupedOrdersRefreshing = true;
        if (!ordersRefreshing) {
            appData.orders.refresh();
        }
        if (!pagedOrdersRefreshing) {
            appData.pagedOrders.refresh();
        }
        if (!addNewOrdersRefreshing) {
            appData.addNewOrders.refresh();
        }
        groupedOrdersRefreshing = false;
    });
    // paged orders
    let pagedOrdersRefreshing = false;
    appData.pagedOrders.collectionChanged.addHandler(function () {
        pagedOrdersRefreshing = true;
        if (!ordersRefreshing) {
            appData.orders.refresh();
        }
        if (!addNewOrdersRefreshing) {
            appData.addNewOrders.refresh();
        }
        if (!groupedOrdersRefreshing) {
            appData.groupedOrders.refresh();
        }
        pagedOrdersRefreshing = false;
    });
    // sample layout definitions
    appData.ldOneLine = [
        { cells: [{ binding: 'id', header: 'ID', cssClass: 'id', isReadOnly: true }] },
        { cells: [{ binding: 'date', header: 'Ordered' }] },
        { cells: [{ binding: 'shippedDate', header: 'Shipped' }] },
        { cells: [{ binding: 'amount', header: 'Amount', format: 'c', cssClass: 'amount' }] },
        { cells: [{ binding: 'customer.name', header: 'Customer' }] },
        { cells: [{ binding: 'customer.address', header: 'Address', wordWrap: true }] },
        { cells: [{ binding: 'customer.city', header: 'City', dataMap: cityMap }] },
        { cells: [{ binding: 'customer.state', header: 'State', width: 45 }] },
        { cells: [{ binding: 'customer.zip', header: 'Zip' }] },
        { cells: [{ binding: 'customer.email', header: 'Customer Email', cssClass: 'email' }] },
        { cells: [{ binding: 'customer.phone', header: 'Customer Phone' }] },
        { cells: [{ binding: 'shipper.name', header: 'Shipper' }] },
        { cells: [{ binding: 'shipper.email', header: 'Shipper Email', cssClass: 'email' }] },
        { cells: [{ binding: 'shipper.phone', header: 'Shipper Phone' }] },
        { cells: [{ binding: 'shipper.express', header: 'Express' }] }
    ];
    appData.ldTwoLines = [
        {
            header: 'Order', colspan: 2, cells: [
                { binding: 'id', header: 'ID', cssClass: 'id', isReadOnly: true },
                { binding: 'date', header: 'Ordered' },
                { binding: 'amount', header: 'Amount', format: 'c', cssClass: 'amount' },
                { binding: 'shippedDate', header: 'Shipped' }
            ]
        },
        {
            header: 'Customer', colspan: 3, cells: [
                { binding: 'customer.name', header: 'Name' },
                { binding: 'customer.email', header: 'EMail', colspan: 2, cssClass: 'email' },
                { binding: 'customer.address', header: 'Address' },
                { binding: 'customer.city', header: 'City', dataMap: cityMap },
                { binding: 'customer.state', header: 'State', width: 45 }
            ]
        },
        {
            header: 'Shipper', cells: [
                { binding: 'shipper.name', header: 'Shipper', colspan: 2 },
                { binding: 'shipper.email', header: 'EMail', cssClass: 'email' },
                { binding: 'shipper.express', header: 'Express' }
            ]
        }
    ];
    appData.ldThreeLines = [
        {
            header: 'Order', colspan: 2, cells: [
                { binding: 'id', header: 'ID', colspan: 2, cssClass: 'id' },
                { binding: 'amount', header: 'Amount', format: 'c', colspan: 2, cssClass: 'amount' },
                { binding: 'date', header: 'Ordered' },
                { binding: 'shippedDate', header: 'Shipped' }
            ]
        },
        {
            header: 'Customer', colspan: 3, cells: [
                { binding: 'customer.name', header: 'Name' },
                { binding: 'customer.email', header: 'EMail', colspan: 2, cssClass: 'email' },
                { binding: 'customer.address', header: 'Address', colspan: 2 },
                { binding: 'customer.phone', header: 'Phone' },
                { binding: 'customer.city', header: 'City', dataMap: cityMap },
                { binding: 'customer.state', header: 'State', width: 45 },
                { binding: 'customer.zip', header: 'Zip' },
            ]
        },
        {
            header: 'Shipper', cells: [
                { binding: 'shipper.name', header: 'Shipper' },
                { binding: 'shipper.email', header: 'EMail', cssClass: 'email' },
                { binding: 'shipper.express', header: 'Express' }
            ]
        }
    ];
    appData.layoutDefs = new wjCore.CollectionView([
        {
            name: 'Traditional',
            description: 'Traditional grid view, with one row per record. The user must scroll horizontally to see the whole record.',
            def: appData.ldOneLine
        },
        {
            name: 'Compact',
            description: 'This view uses two rows per record. The layout is divided into three groups: order, customer, and shipper',
            def: appData.ldTwoLines
        },
        {
            name: 'Detailed',
            description: 'This view uses three rows per record. The layout is divided into three groups: order, customer, and shipper',
            def: appData.ldThreeLines
        }
    ]);
    return appData;
}
