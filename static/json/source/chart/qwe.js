{
    "dd": "this.item.text",
    "title": {
        "text": "this.item.text",
        "x": "center"
    },
    "tooltip": {
        "trigger": "item",
        "formatter": "{a} <br/>{b} : {c} ({d}%)"
    },

    "series": [{
        "name": "风险类别",
        "type": "pie",
        "radius": "55%",
        "center": ["50%", "60%"],
        "data": [],
        "itemStyle": {
            "emphasis": {
                "shadowBlur": 10,
                "shadowOffsetX": 0,
                "shadowColor": "rgba(0, 0, 0, 0.5)"
            }
        }
    }],
    "legend": {
        "orient": "vertical",
        "left": "5%",
        "top": "10%",
        "data": []
    }
}