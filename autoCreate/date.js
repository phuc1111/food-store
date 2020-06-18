module.exports.getCurrentDay = function () {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    return date;
}

module.exports.getTimes = function (time) {
    var h = new Date(time).getHours();
    var m = new Date(time).getMinutes();

    h = (h < 10) ? '0' + h : h;
    m = (m < 10) ? '0' + m : m;

    var realTime = h + ':' + m;

    return realTime;
}
module.exports.getDateTimes = function (time) {
    var today = new Date(time);
    //var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    var h = today.getHours();
    var m = today.getMinutes();
    h = (h < 10) ? '0' + h : h;
    m = (m < 10) ? '0' + m : m;

    var result = h + ':' + m
    return result;
}