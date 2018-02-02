#!/usr/bin/env node
var app = require('./bin/app.js');
var program = require('commander');

function image(url) {
    app.image(url);
}

program.option('-u,--url <value>','url of image dictionary',image);
program.command('init')
    .description('init project dictionary')
    .action(function () {
        app.init();
    });
program.command('make')
    .description('create htmls by model')
    .action(function () {
        app.make();
    });
program.command('remake')
    .description('refresh htmls by model')
    .action(function () {
        app.remake();
    });
program.parse(process.argv);