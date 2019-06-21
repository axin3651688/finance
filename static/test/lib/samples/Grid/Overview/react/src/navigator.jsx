import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
import './app.css';
//
import * as React from 'react';
//
// CollectionView navigator component
export class Navigator extends React.Component {
    //
    constructor(props) {
        super(props);
        this.BtnFirstStyle = { marginRight: '-4px' };
        this.BtnLastStyle = { marginLeft: '-4px' };
    }
    //
    moveCurrentToFirst() {
        this.props.view.moveCurrentToFirst();
        this.forceUpdate();
    }
    //
    moveCurrentToPrevious() {
        this.props.view.moveToPreviousPage();
        this.forceUpdate();
    }
    //
    moveCurrentToNext() {
        this.props.view.moveCurrentToNext();
        this.forceUpdate();
    }
    //
    moveCurrentToLast() {
        this.props.view.moveCurrentToLast();
        this.forceUpdate();
    }
    //
    render() {
        return <div className='wj-control wj-content wj-pager'>
            <div className='wj-input-group'>
                <span className='wj-input-group-btn'>
                    <button type='button' className='wj-btn wj-btn-default' onClick={this.moveCurrentToFirst.bind(this)} disabled={this.props.view.currentPosition <= 0}>
                        <span className='wj-glyph-left' style={this.BtnFirstStyle}></span>
                        <span className='wj-glyph-left'></span>
                    </button>
                </span>

                <span className='wj-input-group-btn'>
                    <button type='button' className='wj-btn wj-btn-default' onClick={this.moveCurrentToPrevious.bind(this)} disabled={this.props.view.currentPosition <= 0}>
                        <span className='wj-glyph-left'></span>
                    </button>
                </span>

                <input type='text' className='wj-form-control' value={this.props.view.currentPosition + 1 + ' / ' + this.props.view.itemCount} disabled/>

                <span className='wj-input-group-btn'>
                    <button type='button' className='wj-btn wj-btn-default' onClick={this.moveCurrentToNext.bind(this)} disabled={this.props.view.currentPosition >= this.props.view.itemCount - 1}>
                        <span className='wj-glyph-right'></span>
                    </button>
                </span>

                <span className='wj-input-group-btn'>
                    <button type='button' className='wj-btn wj-btn-default' onClick={this.moveCurrentToLast.bind(this)} disabled={this.props.view.currentPosition >= this.props.view.itemCount - 1}>
                            <span className='wj-glyph-right'></span>
                            <span className='wj-glyph-right' style={this.BtnLastStyle}></span>
                    </button>
                </span>
            </div>
        </div>;
    }
}
