import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
import * as wijmo from '@grapecity/wijmo';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // first example
    document.querySelector('#btnFormat1').addEventListener('click', () => {
        let msg = wijmo.format('Welcome {name}! You have {miles:n0} miles in your account.', {
            name: 'Joe',
            miles: 2332123
        });
        alert(msg);
    });
    //
    // second example
    document.querySelector('#btnFormat2').addEventListener('click', () => {
        let msg = wijmo.format('{name}, thanks for being a customer since {date:D}.', {
            name: 'Joe',
            date: new Date()
        });
        alert(msg);
    });
}
