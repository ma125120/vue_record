var getDateInfo = function(d) {
  var now_date = d || new Date(),
      year = now_date.getFullYear(),
      month = now_date.getMonth() + 1,
      date = now_date.getDate(),
      day = now_date.getDay()
  var obj = {
    year,
    month: month >= 10 ? (month) : ('0' + month),
    date: date >= 10 ? (date) : ('0' + date),
    _month: month,
    _date: date,
    day,
    timestamp: now_date.getTime()
  }
  obj.str = `${obj.year}-${obj.month}-${obj.date}`
  return obj;
}

var getYear = function(year) {
  var arr = [],
      year = year || getDateInfo().year;
  for(let i = 1; i <13 ; i++) {
    let dates = new Date(year,i,0).getDate(),
        obj = {},
        _arr = [];
    for(let j = 0; j < dates; j++) {
      _arr[j] = 0;
    }
    _arr = _arr.map((v,index)=>{
      return getDateInfo( new Date(year, i - 1 , index +1 ));
    });
    arr[i] = _arr;
  }
  return arr.slice(1);
}

export {
  getDateInfo,
  getYear
}