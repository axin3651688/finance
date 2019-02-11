let config = {
    comparePeriod:"0&-1",//环比
    tb:"-1&0",
    comparePeriodCount:2,
}

let periodText = {m:"月",q:"季度",h:"半年",nd:"年度"};
let halfPeriod =  [{id:"H1",text:"上半年"},{id:"H2",text:"下半年"}];
let chineseTextArr = ["一","二","三","四","五","六","七","八","九","十"];
function getMonthName (months){
    //  因为这样获取不到，所以注释掉了，直接赋值。
    //  var periodText = periodText;
        var periodText = {m:"月",q:"季度",h:"半年",nd:"年度"};
         if(months.length == 6){
             months = months.substring(4,6);
         }
         var m = "";
        if(!isNaN(months)){
             if(months != "00"){
                 months = months -0;
                 m = months+periodText["m"];
             }
         }else{
             if(months.indexOf("Q") != -1){
                 var sf = months.substring(1,2);
                 m = chineseTextArr[sf - 1]+periodText["q"];
             }else if(months == halfPeriod[0].id){
                 m = halfPeriod[0].text;
             }else if(months ==  halfPeriod[1].id){
                 m =  halfPeriod[1].text;
             }
         }
         return m;
     }
 /**
         * yearBean={id:2015,text:"2015年"}
         * monthBean={id:05,text:"月份"}
         * fomular=-1&0  201505 -->
         * fomular=0&-1
         */
export function  getPeriodByFomualr(year,month,fomular,period){
    if(period && period.length == 6 ){
        year = period.substring(0,4);
        month = period.substring(4,6);
    }
    var arr = fomular.split("&"),yearF = arr[0]-0,monthF = arr[1]-0;
    if(yearF == 0 && monthF == 0){
        return year+""+month;
    }
    var flag = 4,mf = "";
    if(!isNaN(month)){
        month = month -0;flag=12;
    }else{
        mf = month.substring(0,1);
        if(mf == "H"){
            flag = 6;
        }
        month = month.substring(1,2) - 0;
    }
    var newYear = year - 0;//yearF > 0
    var newMonth = month;//monthF > 0
    if(yearF < 0){
        newYear = year - Math.abs(yearF);
    }
    if(monthF <0){
        var tfm = Math.abs(monthF);
        newMonth = month - Math.abs(tfm);
        if(newMonth == 0){//刚好减年的情况
            var iy = tfm/flag;
            if(month >=flag){
                newMonth = month;
            }else{//2,4,12
                newMonth = flag;
                if(flag == 6){
                    newMonth = 12/flag;
                }
            }
            if(month == flag || flag%month==0){
                iy = 1;
            }
            newYear = newYear - iy;
        }else if(newMonth < 0){
            newMonth = flag+monthF+month;
            newYear = newYear - 1;
        }
    }else if(monthF > 0){
        newMonth = monthF;
    }
    if(mf == "H" || mf == "Q"){
        
    }else{
            if(newMonth < 10 && mf == ""){
                newMonth="0"+newMonth;
            }
    }
    /*if(!isNaN(month) && newMonth - 0==0){
        return newYear+mf+newMonth;
    }*/
    return newYear+mf+newMonth;
    };
            /**
             * 
             */
function getPeriodName1(year,month){
        var mId = month.id;
        if(!isNaN(mId)){//如果是数字
            mId = mId - 0;
            if(mId < 1){
                return year.text+month.text;
            }else if(mId == 1){
                return year.text+""+mId+"月";
            
            }else{
                return year.text+"1-"+mId+"月";
            }
        }else{
            return year.text+month.text;
        }
};
/**
 * period = 201502
 */
function getPeriodName(period){
    period = period+"";
    var year = period.substring(0,4),month = period.substring(4,6),text = year+"年";
    var m  = getMonthName(month);
    if(m == ""){
        m =periodText.nd;
    }
    return text+m;
};
/**
	 * 201501--->201401 = newPeriod = Cnbi.getPeriodByFomualr(1,1,Math.periodFomualr.tb,"201501")
	 * 2014年1月 = Cnbi.getPeriodName(newPeriod)
	 */
function getPeriodBean(period,_formualr){
	  if(!_formualr){
	      _formualr  = config.comparePeriod;	
	  }
	  var newPeriod = getPeriodByFomualr(1,1,_formualr,period);//201501
	  var newPeriodText = getPeriodName(newPeriod);//2015nian1yue
	  var temp = {id:newPeriod,text:newPeriodText};
	  return temp;
	}

/**
  * 根据特定的参数获取期间列表
  * count:期数--查几期
  * fomular:同比=  -1&0或环比 = 0&-1
  * year = {id:2017,text:"年"}
  * month = {id:"01","月"}
  */
export function generatePeriod(count,fomular,year,month,reverse){
    if(!fomular)fomular = config.comparePeriod;
    if(!count)count = config.comparePeriodCount;
    var p=year.id+""+month.id;
    var periodName =  year.id+year.text+month.id+month.text;//Cnbi.getPeriodName(p);
    var arr=[{text:periodName,id:p}],fomularArr = fomular.split("&");
    var yearF = fomularArr[0],monthF =fomularArr[1]; 
    var tMonth = month.id,tYear = year.id;
    for(var i=0;i<count-1;i++){
        var _formualr = fomular;
        if(tMonth == "00"){
          _formualr = config.tb;
        }
        var temp = getPeriodBean(arr[i].id,_formualr);
        arr.push(temp);
    }
    var reverse = reverse || config.reverse;
    if(reverse){
        arr = arr.reverse();
    }
    return arr;
}