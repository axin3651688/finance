export function getEmployeesWithExpences() {
    return [
        {
            Id: 'E892659',
            Name: 'Robert King',
            Department: 'Sales',
            Position: 'Sales Representative',
            SSN: 'A37830',
            Manager: 'Andrew Fuller',
            Purpose: 'On business',
            Attachment: true,
            Advance: 1000,
            Expenses: _getExpenseItems()
        },
        {
            Id: 'E3667093',
            Name: 'John Taylor',
            Department: 'Sales',
            Position: 'Sales Representative',
            SSN: 'A83745',
            Manager: 'Andrew Fuller',
            Purpose: 'On business',
            Attachment: false,
            Advance: 800,
            Expenses: _getExpenseItems()
        },
        {
            Id: 'E294989',
            Name: 'Gregory Allen',
            Department: 'Sales',
            Position: 'Sales Representative',
            SSN: 'A23927',
            Manager: 'Andrew Fuller',
            Purpose: 'On business',
            Attachment: true,
            Advance: 1200,
            Expenses: _getExpenseItems()
        },
    ];
}
function _getExpenseItems() {
    let count = 5 + Math.round(Math.random() * 5), ret = [], msPerDay = 1000 * 24 * 60 * 60, curDate = Date.now() - 60 * msPerDay;
    for (let i = 0; i < count; i++) {
        ret.push({
            Date: new Date(curDate),
            Decsription: 'Customer visit',
            Hotel: 30 + Math.random() * 200,
            Transport: 10 + Math.random() * 150,
            Fuel: Math.random() * 50,
            Meal: 30 + Math.random() * 170,
            ParkingRate: 3.75,
            ParkingHours: 8 + Math.round(Math.random() * 16),
            Misc: Math.random() * 220
        });
        curDate += msPerDay * Math.round(Math.random() * 4);
    }
    return ret;
}
