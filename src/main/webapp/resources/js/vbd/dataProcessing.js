/*
 * In this file we have all auxiliary functions in order to prepare data sets before applying visualization techniques.
 */

function prepareDataA1(file) {
    var model = {
        x : [],
        y : []
    }
    var averagePriceByRoomType = {};
    var priceSum = {};
    var roomCounter = {}
    d3.csv(file, function(err, data) {
        data.map(function(d) {
            var roomType = d.room_type;
            var price = d.price;
            var storedPrice = priceSum[roomType];
            if (storedPrice == undefined) {
                roomCounter[roomType] = 1
                priceSum[roomType] = price;
                averagePriceByRoomType[roomType] = price;
            } else {
                var counter = parseInt(roomCounter[roomType]) + 1;
                storedPrice = parseFloat(storedPrice);
                price = parseFloat(price);

                priceSum[roomType] = storedPrice + price;
                roomCounter[roomType] = counter;
                averagePriceByRoomType[roomType] = priceSum[roomType] / roomCounter[roomType];
            }
        });

        var j = 0;
        for ( var i in averagePriceByRoomType) {
            model.x[j] = i;
            model.y[j] = averagePriceByRoomType[i];
            ++j;
        }
        return model;
    });
}