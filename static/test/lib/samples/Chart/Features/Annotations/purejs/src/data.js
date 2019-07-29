import * as core from '@grapecity/wijmo';
export function getAnnotation() {
    let data = [
        {
            "type": "Circle",
            "radius": 40,
            "offset": { "x": 0, "y": -15 },
            "seriesIndex": 0,
            "pointIndex": 33,
            "content": "DataIndex",
            "position": 0,
            "attachment": 0,
            "tooltip": "This is a circle annotation. </br> radius: 40 </br> pointIndex: 33 </br> attachment: DataIndex",
            "style": {
                "fill": "#a3d1a7",
                "stroke": "#7b9e7e",
                "fill-opacity": 1,
                "stroke-width": 2,
                "stroke-opacity": 1
            }
        },
        {
            "type": "Square",
            "length": 80,
            "offset": { "x": 0, "y": -15 },
            "seriesIndex": 0,
            "pointIndex": 45,
            "content": "DataIndex",
            "position": 0,
            "attachment": 0,
            "tooltip": "This is a square annotation. </br>length: 80 </br> pointIndex: 45 </br> attachment: DataIndex",
            "style": {
                "fill": "#c4af71",
                "stroke": "#918254",
                "fill-opacity": 1,
                "stroke-width": 2,
                "stroke-opacity": 1
            }
        },
        {
            "type": "Line",
            "content": "Absolute",
            "position": 0,
            "start": { "x": 50, "y": 150 },
            "end": { "x": 350, "y": 300 },
            "tooltip": "This is a line annotation. </br> start: { x: 50, y: 150 } end: { x: 350, y: 300 } </br> attachment: Absolute",
            "style": {
                "fill": "#FE2E2E",
                "stroke": "#01A9DB",
                "fill-opacity": 2,
                "stroke-width": 4,
                "stroke-opacity": 1
            }
        },
        {
            "type": "Text",
            "attachment": 2,
            "text": "Relative",
            "position": 0,
            "point": { "x": 0.55, "y": 0.15 },
            "tooltip": "This is a text annotation.</br>point: { x: 0.55, y: 0.15 }</br> attachment: Relative",
            "style": { "fill": "#bbbbbb", "font-size": "26px"
            }
        },
        {
            "type": "Ellipse",
            "content": "Relative",
            "position": 0,
            "attachment": 2,
            "length": 80,
            "point": { "x": 0.4, "y": 0.5 },
            "seriesIndex": 0,
            "pointIndex": 45,
            "tooltip": "This is an ellipse annotation.</br>point: { x: 0.4, y: 0.45 }</br> attachment: Relative",
            "style": {
                "fill": "#f5bc78",
                "stroke": "#c2955f",
                "fill-opacity": 1,
                "stroke-width": 2,
                "stroke-opacity": 1
            }
        },
        {
            "type": "Rectangle",
            "content": "DataCoordinate",
            "position": 0,
            "attachment": 1,
            "point": { "x": "2014-02-10", "y": 30 },
            "tooltip": "This is a rectangle annotation.</br>point:{ x: new Date(2014, 1, 10), y: 40 }</br> attachment: DataCoordinate",
            "seriesIndex": 0,
            "pointIndex": 45,
            "style": {
                "fill": "#c5aacd",
                "stroke": "#937f99",
                "fill-opacity": 1,
                "stroke-width": 2,
                "stroke-opacity": 1
            }
        },
        {
            "type": "Image",
            "position": 0,
            "attachment": 1,
            "href": "resources/wijmo5-flexible.png",
            "point": { "x": "2014-01-25", "y": 30 },
            "tooltip": "This is an image annotation.</br>point:{x: new Date(2014, 0, 25), y: 20}</br> attachment: DataCoordinate",
            "style": {
                "fill": "#01DFD7",
                "stroke": "#000000",
                "fill-opacity": 1,
                "stroke-width": 1,
                "stroke-opacity": 1
            }
        },
        {
            "type": "Polygon",
            "content": "Absolute",
            "position": 0,
            "tooltip": "This is a polygon annotation.</br>points: [(200,0),(150,50),(175,100),(255,100),(250, 50)]</br> attachment: Absolute",
            "style": {
                "fill": "#FE2E2E",
                "stroke": "#01A9DB",
                "fill-opacity": 2,
                "stroke-width": 4,
                "stroke-opacity": 1
            },
            "points": [
                { "x": 200, "y": 0 },
                { "x": 150, "y": 50 },
                { "x": 175, "y": 100 },
                { "x": 225, "y": 100 },
                { "x": 250, "y": 50 }
            ]
        }
    ];
    for (var i = 0; i < data.length; i++) {
        if (data[i].attachment === 1 && data[i].point && data[i].point.x && isNaN(data[i].point.x)) {
            data[i].point.x = core.Globalize.parseDate(data[i].point.x, 'yyyy-MM-dd');
        }
    }
    return data;
}
//
export function getData() {
    var data = [], sales = [
        96, 19, 54, 83, 15, 56, 36, 4, 29, 93,
        38, 71, 50, 77, 69, 13, 79, 57, 29, 62,
        4, 27, 66, 96, 65, 12, 52, 3, 61, 48, 50,
        70, 39, 33, 25, 49, 69, 46, 44, 40, 35,
        72, 64, 10, 66, 63, 78, 19, 96, 26
    ];
    for (var i = 0; i < 50; i++) {
        data.push({
            sale: sales[i],
            date: new Date(2014, 0, i),
        });
    }
    return data;
}
