import { DateTime } from '@grapecity/wijmo';
import { Injectable } from '@angular/core';
//
export type TCalendarEvent = {
    id: number;
    date: Date;
    type: string;
    msg: string;
}
//
@Injectable()
export class DataService {
    getEvents() {
        let arr: TCalendarEvent[] = [],
            types = ['Maintenance', 'Incident', 'Notice', 'Outage'],
            messages = ['Connectivity Issues', 'ISP Reported Problem', 'Message Server Overflow', 'Security Alert', 'Email Failure', 'Power Instability', 'Power Outage'];
        //
        for (let i = 0; i < 120; i++) {
            let dt = DateTime.addDays(new Date(), -Math.round(Math.random() * 365));
            arr.push({
                id: i,
                date: dt,
                type: types[Math.floor(Math.random() * types.length)],
                msg: messages[Math.floor(Math.random() * messages.length)]
            });
        }
        //
        return arr;
    }
}