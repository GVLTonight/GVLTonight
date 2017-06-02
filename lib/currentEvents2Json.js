const fs = require('fs');
const os = require('os');

module.exports = function(allData) {
    return new Promise((resolve, reject) => {
        let path = 'lib/';
        if (os.type() === 'Linux') {
            path = os.homedir() + '/public/files/';
            console.log(path);
        } else {console.log(path)}

        let overwriteJsonFile = fs.truncate(path + 'currentEvents.json', 0, function () {
            fs.writeFile(path + 'currentEvents.json', JSON.stringify(allData), function (err) {
                if (err) {
                    return console.log('Error writing file::: ' + err);
                }
            });
        });
        resolve(overwriteJsonFile);
    })
}