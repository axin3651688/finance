/*!
    *
    * Wijmo Library 5.20191.603
    * http://wijmo.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    *
    * Licensed under the GrapeCity Commercial License.
    * sales@wijmo.com
    * wijmo.com/products/wijmo-5/license/
    *
    */

import{ComponentBase}from"wijmo/wijmo.react.base";import*as React from"react";import*as wjcInput from"wijmo/wijmo.input";export class ListBox extends ComponentBase{constructor(e){super(e,wjcInput.ListBox,{objectProps:["itemsSource","selectedItem","selectedValue","checkedItems"]})}};export class ComboBox extends ComponentBase{constructor(e){super(e,wjcInput.ComboBox,{objectProps:["itemsSource","selectedItem","selectedValue"]})}};export class AutoComplete extends ComponentBase{constructor(e){super(e,wjcInput.AutoComplete,{objectProps:["itemsSource","selectedItem","selectedValue"]})}};export class Calendar extends ComponentBase{constructor(e){super(e,wjcInput.Calendar)}};export class ColorPicker extends ComponentBase{constructor(e){super(e,wjcInput.ColorPicker,{objectProps:["palette"]})}};export class InputMask extends ComponentBase{constructor(e){super(e,wjcInput.InputMask)}};export class InputColor extends ComponentBase{constructor(e){super(e,wjcInput.InputColor)}};export class MultiSelect extends ComponentBase{constructor(e){super(e,wjcInput.MultiSelect,{objectProps:["itemsSource","selectedItem","selectedValue","checkedItems"]})}};export class MultiAutoComplete extends ComponentBase{constructor(e){super(e,wjcInput.MultiAutoComplete,{objectProps:["itemsSource","selectedItem","selectedValue","selectedItems"]})}};export class InputNumber extends ComponentBase{constructor(e){super(e,wjcInput.InputNumber)}};export class InputDate extends ComponentBase{constructor(e){super(e,wjcInput.InputDate)}};export class InputTime extends ComponentBase{constructor(e){super(e,wjcInput.InputTime,{objectProps:["itemsSource","selectedItem","selectedValue"]})}};export class InputDateTime extends ComponentBase{constructor(e){super(e,wjcInput.InputDateTime)}};export class Menu extends ComponentBase{constructor(e){super(e,wjcInput.Menu,{objectProps:["itemsSource","selectedItem","selectedValue","value"]})}};export class Popup extends ComponentBase{constructor(e){super(e,wjcInput.Popup)}render(){return React.createElement("div",null,this.props.children)}};