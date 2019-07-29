let holidays = {
    '1/1': 'New Year\'s Day',
    '6/14': 'Flag Day',
    '7/4': 'Independence Day',
    '11/11': 'Veteran\'s Day',
    '12/25': 'Christmas Day',
    '1/3/1': 'Martin Luther King\'s Birthday',
    '2/3/1': 'Washington\'s Birthday',
    '5/3/6': 'Armed Forces Day',
    '9/1/1': 'Labor Day',
    '10/2/1': 'Columbus Day',
    '11/4/4': 'Thanksgiving Day' // fourth Thursday in November
};
//
// gets the holiday for a given date
export function getHoliday(date) {
    let day = date.getDate(), month = date.getMonth() + 1, holiday = holidays[month + '/' + day];
    //
    if (!holiday) {
        let weekDay = date.getDay(), weekNum = Math.floor((day - 1) / 7) + 1;
        //
        holiday = holidays[month + '/' + weekNum + '/' + weekDay];
    }
    //
    return holiday;
}
