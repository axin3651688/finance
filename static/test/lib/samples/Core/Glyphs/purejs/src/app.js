import 'bootstrap.css';
import '@grapecity/wijmo.styles/wijmo.css';
//
document.readyState === 'complete' ? init() : window.onload = init;
//
function init() {
    let glyphs = ['asterisk', 'calendar', 'check', 'circle', 'clock', 'diamond', 'down',
        'down-left', 'down-right', 'file', 'filter', 'left', 'minus', 'pencil', 'plus', 'right',
        'square', 'step-backward', 'step-forward', 'up', 'up-left', 'up-right'];
    //
    let rowTemplate = '<tr>' +
        '<td>{glyph}</td>' +
        '<td style="font-size:125%;"><span class="wj-glyph-{glyph}"></span></td>' +
        '<td><code>&lt;span class="wj-glyph-{glyph}"&gt;&lt;/span&gt;</code></td>' +
        '</tr>';
    //
    let tBody = '';
    glyphs.forEach(item => {
        tBody += rowTemplate.replace(/\{glyph\}/g, item);
    });
    //
    document.querySelector('tbody').innerHTML = tBody;
}
