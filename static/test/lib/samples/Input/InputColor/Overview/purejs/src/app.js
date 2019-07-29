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
    // InputColor
    let theInputColor = new input.InputColor('#theInputColor', {
        placeholder: 'Select the color',
        valueChanged: (sender) => setBackground(sender.value)
    });
    //
    // Custom InputColor
    let theInputColorCst = new input.InputColor('#theInputColorCst', {
        valueChanged: (sender) => setBackground(sender.value)
    });
    //
    // customization
    document.querySelector('#showAlphaChannel').addEventListener('click', e => {
        theInputColorCst.colorPicker.showAlphaChannel = e.target.checked;
    });
    //
    let thePalette = new input.ComboBox('#thePalette', {
        itemsSource: getPalettes(),
        displayMemberPath: 'name',
        selectedIndexChanged: (sender) => {
            theInputColorCst.colorPicker.palette = sender.selectedValue.colors;
        }
    });
    //
    // show the color that was selected
    function setBackground(color) {
        document.getElementById('output').style.background = color;
        theInputColor.value = color;
        theInputColorCst.value = color;
    }
}
