const fs = require('fs');

module.exports = function(allData) {
    return new Promise((resolve, reject) => {
        let overwriteJsonFile = fs.truncate('src/currentEvents.json', 0, function () {
            fs.writeFile('src/currentEvents.json', JSON.stringify(allData), function (err) {
                if (err) {
                    return console.log('Error writing file::: ' + err);
                }
            });
        });
        resolve(overwriteJsonFile);
    })
}