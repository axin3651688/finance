import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as input from '@grapecity/wijmo.input';
import { getPalettes } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    // ColorPicker
    let theColorPicker = new input.ColorPicker('#theColorPicker', {
        showAlphaChannel: true,
        showColorString: true,
        valueChanged: (sender) => setBackground(sender.value)
    });
    //
    // customization
    document.querySelector('#showAlphaChannel').addEventListener('click', e => {
        theColorPicker.showAlphaChannel = e.target.checked;
    });
    document.querySelector('#showColorString').addEventListener('click', e => {
        theColorPicker.showColorString = e.target.checked;
    });
    //
    let thePalette = new input.ComboBox('#thePalette', {
        itemsSource: getPalettes(),
        displayMemberPath: 'name',
        selectedIndexChanged: (sender) => {
            theColorPicker.palette = sender.selectedValue.colors;
        }
    });
    //
    // show the color that was selected
    function setBackground(color) {
        document.getElementById('output').style.background = color;
        theColorPicker.value = color;
    }
}
