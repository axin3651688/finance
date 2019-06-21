import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './styles.css';
//
import * as input from '@grapecity/wijmo.input';
import * as chart from '@grapecity/wijmo.chart';
import * as chartAnimation from '@grapecity/wijmo.chart.animation';
import { getData, getRandomData } from './data';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let insertPieIdx = 1;
    //
    let flexPie = new chart.FlexPie('#chart', {
        bindingName: 'id',
        binding: 'y0',
        innerRadius: 0,
        palette: getRandomPalette(),
        itemsSource: getData()
    });
    //
    //Pie Easing
    let pieEasing = new input.Menu('#pieEasing', {
        itemsSource: [
            'Linear', 'Swing', 'EaseInQuad', 'EaseOutQuad', 'EaseInOutQuad', 'EaseInCubic', 'EaseOutCubic',
            'EaseInOutCubic', 'EaseInQuart', 'EaseOutQuart', 'EaseInOutQuart', 'EaseInQuint', 'EaseOutQuint',
            'EaseInOutQuint', 'EaseInSine', 'EaseOutSine', 'EaseInOutSine', 'EaseInExpo', 'EaseOutExpo',
            'EaseInOutExpo', 'EaseInCirc', 'EaseOutCirc', 'EaseInOutCirc', 'EaseInBack', 'EaseOutBack',
            'EaseInOutBack', 'EaseInBounce', 'EaseOutBounce', 'EaseInOutBounce', 'EaseInElastic',
            'EaseOutElastic', 'EaseInOutElastic'
        ],
        selectedValue: 'Swing',
        itemClicked: (sender) => {
            pieAnimation.easing = sender.selectedValue;
            pieAnimation.animate();
            updateMenuHeader(pieEasing, '<b>Easing</b>: ' + sender.text);
        }
    });
    updateMenuHeader(pieEasing, '<b>Easing</b>: ' + pieEasing.text);
    //
    //Pie Duration
    let pieDuration = new input.InputNumber('#pieDuration', {
        value: 400,
        min: 200,
        max: 5000,
        step: 200,
        format: 'n0',
        valueChanged: (sender) => {
            pieAnimation.duration = sender.value;
            pieAnimation.animate();
        }
    });
    //
    // Pie Inner Radius
    let pieInnerRadius = new input.InputNumber('#pieInnerRadius', {
        min: 0,
        max: 1,
        step: 0.1,
        format: 'n1',
        valueChanged: (sender) => {
            if (sender.value < sender.min || sender.value > sender.max) {
                return;
            }
            flexPie.innerRadius = sender.value;
        }
    });
    //
    // Pie Animation
    let pieAnimation = new chartAnimation.ChartAnimation(flexPie, {
        animationMode: chartAnimation.AnimationMode.All,
        easing: chartAnimation.Easing.Swing,
        duration: 400
    });
    //
    //Pie Animation Mode
    let pieAnimationMode = new input.Menu('#pieAnimationMode', {
        itemsSource: ['Point', 'Series', 'All'],
        selectedValue: 'All',
        itemClicked: (sender) => {
            pieAnimation.animationMode = sender.selectedValue;
            pieAnimation.animate();
            updateMenuHeader(pieAnimationMode, '<b>Animation Mode</b>: ' + sender.text);
        }
    });
    updateMenuHeader(pieAnimationMode, '<b>Animation Mode</b>: ' + pieAnimationMode.text);
    //
    //Pie Reset Data
    document.querySelector('#pieResetData').addEventListener('click', () => {
        flexPie.itemsSource = getData();
        insertPieIdx = 1;
    });
    //
    //Pie Add Slice
    document.querySelector('#pieAddSlice').addEventListener('click', () => {
        flexPie.itemsSource.push(getRandomData('added' + insertPieIdx));
        insertPieIdx++;
    });
    //
    //Pie Remove Slice
    document.querySelector('#pieRemoveSlice').addEventListener('click', () => {
        if (flexPie.itemsSource.length) {
            flexPie.itemsSource.pop();
            insertPieIdx = insertPieIdx <= 1 ? 1 : insertPieIdx--;
        }
    });
    //
    function updateMenuHeader(menu, value) {
        menu.header = value;
    }
}
//
function getRandomPalette() {
    let palettes = Object.getOwnPropertyNames(chart.Palettes)
        .filter(prop => typeof chart.Palettes[prop] === 'object' && prop !== 'prototype');
    let rand = Math.floor(Math.random() * palettes.length);
    //
    return chart.Palettes[palettes[rand]];
}
