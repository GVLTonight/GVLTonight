const request = require('request');
const util = require('util');
const clog = console.log;
const mongodb = require('mongodb');
const getMLabKey = require('./getMLabKey');

let arr = [];

module.exports = function(){
    Promise.all([
        logger(),
        mLab()
    ]).then(items => {
        return arr.concat(items[0], items[1])
    })
}

function logger(){
    return ['hi']
}

function mLab(){
    getMLabKey().then(x => {clog(x)})
}