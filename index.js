#!/usr/bin/env node
var app = require('./bin/app.js');
var program = require('commander');

function image(url) {
    app.image(url);
}

program.option('-u,--url <value>','url of image dictionary',image)
    .command('init')
    .action(function () {
        app.init();
    })

program.parse(process.argv);