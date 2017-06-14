const fs = require('fs');
const os = require('os');
const clog = console.log;

module.exports = function(allData) {
    return new Promise((resolve, reject) => {
        let path = 'lib/';
        if (os.type() === 'Linux') {
            path = os.homedir() + '/public/files/';
            clog('LOG:\tCurrentEvents.json file written to: ' + path);
        } else {clog('LOG:\tCurrentEvents.json file written to: ' + path)}

        let overwriteJsonFile = fs.truncate(path + 'currentEvents.json', 0, function () {
            fs.writeFile(path + 'currentEvents.json', JSON.stringify(allData), function (err) {
                if (err) {
                    return clog('ERR:\tError writing file::: ' + err);
                }
            });
        });
        resolve(overwriteJsonFile);
    })
}