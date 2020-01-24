"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var startDate = new Date("2017-01-01"); //YYYY-MM-DD
var endDate = new Date("2018-12-31"); //YYYY-MM-DD
var getDateArray = function (start, end) {
    var arr = new Array();
    var dt = new Date(start);
    while (dt <= end) {
        arr.push(new Date(dt));
        dt.setDate(dt.getDate() + 1);
    }
    return arr;
};
var dateArr = getDateArray(startDate, endDate);
// export const dataFromStash = {};
exports.dataFrom0100 = {};
exports.dataFrom6040 = {};
// Output
for (var i = 0; i < dateArr.length; i++) {
    var percent = parseFloat((Math.random() * (0.5 - (-0.23)) + (-0.23)).toFixed(4));
    // dataFromStash[dateArr[i]] = percent;
    exports.dataFrom6040[dateArr[i]] = [percent, percent - (0.06)];
    exports.dataFrom0100[dateArr[i]] = [percent, percent + (0.13)];
}
