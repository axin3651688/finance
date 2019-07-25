import {getClientParams} from './index';

let urlParams = getClientParams();
let config = {
  comparePeriod: '0&-1',//环比
  tb: '-1&0',
  comparePeriodCount: 2,
};
let yearText = '年';
let periodText = {m: '月', q: '季度', h: '半' + yearText, nd: yearText + '度'};
let halfPeriod = [{id: 'H1', text: '上半' + yearText}, {id: 'H2', text: '下半' + yearText}];
let chineseTextArr = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
let monthCount = urlParams.month_count||12;
let yearCount = urlParams.year_count||6;
/**
 * 获取月份集合
 */
export function getMonthList(monthCount){
  let months = [];
  for (let i = 1; i <= monthCount; i++) {
    if (monthCount == 4) {
      months.push(i + periodText.q);
    } else if (monthCount >= 12) {
      if (i <= 13) {
        months.push(i + periodText.m);
      } else if (i < 17) {
        months.push(monthCount + 1 - i + periodText.q);
      }
    }
  }
}

/**
 * 获取年份集合
 */
export function getYearList(yearCount){
    let years = [],year = new Date().getFullYear();
    for (let i = year; i > year -  yearCount; i--) {
        years.push(i + yearText);
    }
    return years;
}

/**
 * 获取月份名称
 */
export function getMonthName(months) {
  if (months.length == 6) {
    months = months.substring(4, 6);
  }
  var m = '';
  if (!isNaN(months)) {
    if (months != '00') {
      months = months - 0;
      m = months + periodText['m'];
    }
  } else {
    if (months.indexOf('Q') != -1) {
      var sf = months.substring(1, 2);
      m = chineseTextArr[sf - 1] + periodText['q'];
    } else if (months == halfPeriod[0].id) {
      m = halfPeriod[0].text;
    } else if (months == halfPeriod[1].id) {
      m = halfPeriod[1].text;
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
export function getPeriodByFomualr(year, month, fomular, period) {
  if (period && period.length == 6) {
    year = period.substring(0, 4);
    month = period.substring(4, 6);
  }
  var arr = fomular.split('&'), yearF = arr[0] - 0, monthF = arr[1] - 0;
  if (yearF == 0 && monthF == 0) {
    return year + '' + month;
  }
  var flag = 4, mf = '';
  if (!isNaN(month)) {
    month = month - 0;
    flag = 12;
  } else {
    mf = month.substring(0, 1);
    if (mf == 'H') {
      flag = 6;
    }
    month = month.substring(1, 2) - 0;
  }
  var newYear = year - 0;//yearF > 0
  var newMonth = month;//monthF > 0
  if (yearF < 0) {
    newYear = year - Math.abs(yearF);
  }
  if (monthF < 0) {
    var tfm = Math.abs(monthF);
    newMonth = month - Math.abs(tfm);
    if (newMonth == 0) {//刚好减年的情况
      var iy = tfm / flag;
      if (month >= flag) {
        newMonth = month;
      } else {//2,4,12
        newMonth = flag;
        if (flag == 6) {
          newMonth = 12 / flag;
        }
      }
      if (month == flag || flag % month == 0) {
        iy = 1;
      }
      newYear = newYear - iy;
    } else if (newMonth < 0) {
      newMonth = flag + monthF + month;
      newYear = newYear - 1;
    }
  } else if (monthF > 0) {
    newMonth = monthF;
  }
  if (mf == 'H' || mf == 'Q') {

  } else {
    if (newMonth < 10 && mf == '') {
      newMonth = '0' + newMonth;
    }
  }
  /*if(!isNaN(month) && newMonth - 0==0){
      return newYear+mf+newMonth;
  }*/
  return newYear + mf + newMonth;
};

/**
 *
 */
function getPeriodName1(year, month) {
  var mId = month.id;
  if (!isNaN(mId)) {//如果是数字
    mId = mId - 0;
    if (mId < 1) {
      return year.text + month.text;
    } else if (mId == 1) {
      return year.text + '' + mId + periodText.m;

    } else {
      return year.text + '1-' + mId + periodText.m;
    }
  } else {
    return year.text + month.text;
  }
};

/**
 * period = 201502
 */
function getPeriodName(period) {
  period = period + '';
  var year = period.substring(0, 4), month = period.substring(4, 6), text = year + yearText;
  var m = getMonthName(month);
  if (m == '') {
    m = periodText.nd;
  }
  return text + m;
};

/**
 * 201501--->201401 = newPeriod = Cnbi.getPeriodByFomualr(1,1,Math.periodFomualr.tb,"201501")
 * 2014年1月 = Cnbi.getPeriodName(newPeriod)
 */
function getPeriodBean(period, _formualr) {
  if (!_formualr) {
    _formualr = config.comparePeriod;
  }
  var newPeriod = getPeriodByFomualr(1, 1, _formualr, period);//201501
  var newPeriodText = getPeriodName(newPeriod);//2015nian1yue
  var temp = {id: newPeriod, text: newPeriodText};
  return temp;
}

/**
 * 根据特定的参数获取期间列表
 * count:期数--查几期
 * fomular:同比=  -1&0或环比 = 0&-1
 * year = {id:2017,text:"年"}
 * month = {id:"01","月"}
 * urlParams= 浏览器的查询参数
 */
export function generatePeriod(count, fomular, year, month, reverse, urlParams) {
  if (!fomular) fomular = config.comparePeriod;
  //test start...
  if (fomular == 1) {
    fomular = config.comparePeriod;
  } else if (fomular == 2) {
    fomular = config.tb;
  }
  //test end...
  if (!count) count = config.comparePeriodCount;
  if (!year && urlParams && urlParams.year) {
    year = {id: urlParams.year, text: urlParams.year + yearText};
  }
  if (!month && urlParams && urlParams.month) {
    month = {id: urlParams.month, text: urlParams.month + periodText.m};
  }
  if (!year) {
    let date = new Date(), yearId = date.getFullYear();
    year = {id: yearId, text: yearId + yearText};
  }
  if (!month) {
    let date = new Date(), monthId = date.getMonth() + 1;
    month = {id: monthId, text: monthId + periodText.m};
  }
  if (month.id - 0 < 10) {
    month.id = '0' + (month.id - 0);
  }
  var p = year.id + '' + month.id;
  var periodName = year.text + month.text;//Cnbi.getPeriodName(p);
  var arr = [{text: periodName, id: p}], fomularArr = fomular.split('&');
  //var yearF = fomularArr[0],monthF =fomularArr[1];
  var tMonth = month.id, tYear = year.id;
  for (var i = 0; i < count - 1; i++) {
    var _formualr = fomular;
    if (tMonth == '00') {
      _formualr = config.tb;
    }
    var temp = getPeriodBean(arr[i].id, _formualr);
    arr.push(temp);
  }
  var reverse = reverse || config.reverse;
  if (reverse) {
    arr = arr.reverse();
  }
  return arr;
}
