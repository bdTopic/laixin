const transferDate = (timestamp) =>{
    var newDate = new Date();
    newDate.setTime(timestamp * 1000);
    var month = newDate.getMonth()+1;
    var day = newDate.getDate();
    var timeStr = month < 10 ? '0'+ month : month;
    timeStr += '/';
    timeStr += day < 10 ? '0'+ day : day;
    return timeStr;
}
export {transferDate};