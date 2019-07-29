import { Injectable } from '@angular/core';
//
@Injectable()
export class DataService {
    // Get random data
    getData() {
        let data: any[] = [],
            times = [['Jan', 'Feb', 'Mar'], ['Apr', 'May', 'June'], ['Jul', 'Aug', 'Sep'], ['Oct', 'Nov', 'Dec']],
            years = [],
            year = new Date().getFullYear(),
            yearLen = Math.max(Math.round(Math.abs(5 - Math.random() * 10)), 3),
            quarterAdded = false;
        //
        for (let i = yearLen; i > 0; i--) {
            years.push(year - i);
        }
        //
        years.forEach((y, yIndex) => {
            let addQuarter = Math.random() > 0.5;
            if (!quarterAdded && yIndex === years.length - 1) {
                addQuarter = true;
            }
            let year: any = {
                year: y.toString(),
            };
            if (addQuarter) {
                let quarters: any[] = [];
                quarterAdded = true;
                times.forEach((q, qIndex) => {
                    let addMonth = Math.random() > 0.5,
                        quarter: any = {
                            quarter: 'Q' + (qIndex + 1)
                        };
                    if (addMonth) {
                        let months: any[] = [];
                        q.forEach(m => {
                            months.push({
                                month: m,
                                value: Math.round(Math.random() * 100)
                            });
                        });
                        quarter.items = months;
                    } else {
                        quarter.value = Math.round(Math.random() * 400);
                    }
                    quarters.push(quarter);
                });
                year.items = quarters;
            } else {
                year.value = Math.round(Math.random() * 1200)
            }
            data.push(year);
        });
        //
        return data;
    }
}