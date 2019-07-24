/**
 * name: sjz
 * 说明：通用方法
 */
export default  {
    /**
     * 弹出框通用的【拖拽】方法
     * @param {*} event 
     * @param {*} me 
     */
    dragAndDrop(event, me) { //debugger
        let id = "" ;
        if(event.currentTarget.className === "directoryDialog_A_1")id = "A" ;
        if(event.currentTarget.className === "directoryDialog_A_4-1")id = "B" ;
        if(event.currentTarget.className === "directoryDialog_A_5-1")id = "C" ;
        if(event.currentTarget.className === "directoryDialog_A_6-1")id = "D" ;
        if(event.currentTarget.className === "directoryDialog_A_7-1")id = "E" ;
        me.selectElement = document.getElementById(id) ;
        // me.selectElement = document.getElementsByClassName(event.currentTarget.className)[0] ;
        let div1 = me.selectElement
        me.selectElement.style.cursor = 'move'
        me.isDowm = true
        let distanceX = event.clientX - me.selectElement.offsetLeft
        let distanceY = event.clientY - me.selectElement.offsetTop
        document.onmousemove = function (ev) {
            var oevent = ev || event
            div1.style.left = oevent.clientX - distanceX + 'px'
            div1.style.top = oevent.clientY - distanceY + 'px'
        }
        document.onmouseup = function () {
            document.onmousemove = null
            document.onmouseup = null
            div1.style.cursor = 'default'
        }
    },
    /**
     * 月份处理
     * @param {*} $params 
     */
    getPeriod($params) {
        let mm ;
        if($params.month > 0 && $params.month < 10) {
            mm = '0' + $params.month ;
        } else {
            mm = $params.month ;
        }
        return mm ;
    }
}