const fs = require('fs');
const home_dir = require('os').homedir();

module.exports = function(){
    return new Promise((resolve, reject) => {
        fs.readFile(home_dir + '/keys', 'utf8', (err, data) => {
            if (err) {
                reject(err); return;
            }
            let key = JSON.parse(data).mlab;
            resolve(key);
        });
        console.log('LOG:\tRetrieved mlab key');
    });
}