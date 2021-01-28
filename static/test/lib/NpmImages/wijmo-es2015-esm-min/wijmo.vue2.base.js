﻿/*!
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

import{isArray,Control,isUndefined,isFunction,Event}from"wijmo/wijmo";import*as VueModule from"vue";import VueModuleDefault from"vue";export var Vue=VueModuleDefault||VueModule;export var WjVueBase=Vue.extend({beforeCreate:function(){let t=this.$options[WjComponentBehavior._behClassProp];t&&(this[WjComponentBehavior._behProp]=t._attach(this))},mounted:function(){this[WjComponentBehavior._behProp].lhMounted()},destroyed:function(){this[WjComponentBehavior._behProp].lhDestroyed()}});export class WjComponentBehavior{constructor(t){this._isMounted=!1,this._mountedCBs=[],this.component=t}static _attach(t){return new this(t)}static register(){let t={data:this.data,extends:WjVueBase,render:this.render,props:_getProps(this.className,this.extraProps),[WjComponentBehavior._behClassProp]:this};return Vue.component(this.tag,t)}lhMounted(){if(this._isChild()){let t=this.component.$parent;t&&(this.parent=t[WjComponentBehavior._behProp],this.parent._mountedCB(()=>{this._prepareControl(),this._initParent()}))}else this._prepareControl()}lhDestroyed(){this._siblingInsertedEH&&this._getElement().removeEventListener("DOMNodeInserted",this._siblingInsertedEH);let t=this.control;if(t)if(this._isChild()){let e=this._getParentProp();if(e){let n=this.parent.control[e];if(isArray(n)){let e=n.indexOf(t);e>-1&&n.splice(e,1)}}}else t instanceof Control&&t.dispose()}_createControl(){let t=this._isChild()?this._isParentInCtor()?this.parent.control:void 0:this._getElement();return new(this.constructor._getControlType())(t)}_initParent(){let t=this._getParentProp();if(t){let e=this.parent.control,n=e[t];if(isArray(n)){let t=this._getSiblingIndex();(t<0||t>=n.length)&&(t=n.length),n.splice(t,0,this.control),this._siblingInsertedEH=this._siblingInserted.bind(this),this._getElement().addEventListener("DOMNodeInserted",this._siblingInsertedEH)}else e[t]=this.control}}_updateControl(t,e){this.control[t]=e}_prepareControl(){let t=this.control=this._createControl(),e=this._getElement(),n=this.constructor;this._siblingId||(null==n.siblingId&&(n.siblingId=++n._siblingDirId+""),this._siblingId=n.siblingId),e.setAttribute(n._typeSiblingIdAttr,this._siblingId),this._isMounted=!0;let i=this._mountedCBs;this._mountedCBs=[];for(let t of i)t();_initialize(this.component,t)}_isChild(){let t=this.constructor;return null!=t.parentProp||null!=t.parentInCtor}_isParentInCtor(){return!0===this.constructor.parentInCtor}_getParentProp(){return this.component.$options.propsData.wjProperty||this.constructor.parentProp}_getSiblingIndex(){var t=this._getElement(),e=t.parentElement;if(!e)return-1;for(var n=e.childNodes,i=-1,r=this._siblingId,o=0;o<n.length;o++){var s=n[o];if(1==s.nodeType&&s.getAttribute(WjComponentBehavior._typeSiblingIdAttr)==r&&(++i,s===t))return i}return-1}_siblingInserted(t){if(t.target===this._getElement()){var e=this._getSiblingIndex(),n=this.control,i=this.parent.control[this._getParentProp()],r=i.indexOf(n);e>=0&&r>=0&&e!==r&&(i.splice(r,1),e=Math.min(e,i.length),i.splice(e,0,n))}}_getElement(){return this.component.$el}static _getControlType(){return this.classCtor()}_mountedCB(t){this._isMounted?t():this._mountedCBs.push(t)}};WjComponentBehavior.render=function(t){return t("div",[this.$slots.default])},WjComponentBehavior._typeSiblingIdAttr="_wjSiblingId",WjComponentBehavior._behClassProp="_wjBehCl",WjComponentBehavior._behProp="__wjBeh",WjComponentBehavior._siblingDirId=0;export function _getProps(t,e){for(var n=window,i=t.split("."),r=0;r<i.length&&null!=n;r++)n=n[i[r]];if(!n)return null;for(var o=["control","initialized","wjProperty","formatItem"],s=n.prototype;s!=Object.prototype;s=Object.getPrototypeOf(s)){var l=Object.getOwnPropertyNames(s);for(r=0;r<l.length;r++){var h=l[r],a=Object.getOwnPropertyDescriptor(s,h),p=h.match(/^on[A-Z]/);(a.set||p)&&(p&&(h=h[2].toLowerCase()+h.substr(3)),o.indexOf(h)<0&&!h.match(/disabled|required|style/)&&o.push(h))}}return e&&Array.prototype.push.apply(o,e),o};export function _initialize(t,e){var n=[];for(var i in t.$options.propsData)n.push(i);n.sort();let r=t[WjComponentBehavior._behProp].constructor.extraProps;var o,s;return n.forEach(n=>{!(n in e||r&&r.indexOf(n)>-1)||e[n]instanceof Event||isUndefined(t[n])||(t[WjComponentBehavior._behProp]._updateControl(n,t[n]),t.$watch(n,function(t){this.cmp[WjComponentBehavior._behProp]._updateControl(this.prop,t)}.bind({cmp:t,prop:n})))}),o=t.$el,s={},"style"in e&&o.style.cssText.length&&(o.style.cssText.split(";").forEach(t=>{var e=t.split(":");2==e.length&&(s[e[0].trim()]=e[1].trim())}),e.style=s),n.forEach(n=>{if(e[n]instanceof Event){var i=e[n];isFunction(t[n])&&i.addHandler(t[n],e)}}),t.control&&t.$parent&&(t.$parent[t.control]=e),isFunction(t.initialized)&&t.initialized(e),e};