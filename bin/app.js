const fs = require('fs');
const path = require('path');
const image = require('imageinfo');
const filePath = path.resolve();
const chalk = require('chalk');
const data = require('./data');
const lanList = (fsExistsSync(filePath+'/model/data.json')&&require(filePath+'/model/data.json').lanList)||data.lanList
const html = (fsExistsSync(filePath+'/model/model.html')&&fs.readFileSync(filePath+'/model/model.html','utf-8'))||data.html;
const htmlModel = '\`'+html+'\`';
const str = 'return ' + htmlModel;

function fsExistsSync(path) {
    try{
        fs.accessSync(path,fs.F_OK);
    }catch(e){
        return false;
    }
    return true;
}

function array_contain(array,obj) {
    for (var i = 0;i<array.length;i++){
        if (array[i] == obj)
            return true;
    }
    return false;
}

function mkdir(dirpath) {
    if (!fs.existsSync(dirpath)){
        fs.mkdirSync(dirpath);
    }
}

function travel(dir,callback) {
    fs.readdirSync(dir).forEach(function(file) {
        var pathname = path.join(dir,file);
        if(fs.statSync(pathname).isDirectory()) {
            if (array_contain(data.dicList,file)){
                travel(pathname,callback);
            }
        }else {
            callback(pathname,file);
        }
    });
}

function handelImage(pathname,filename)
{
    fs.writeFileSync(filename,fs.readFileSync(pathname))
    console.log(chalk.green('图片'+filename+'生成成功'));
}

function handelModel(name) {
    let key=[];
    let value=[];
    for (let i in lanList[name]){
        key.push(i);
        value.push(lanList[name][i]);
    }
    let func = new Function(...key,str)
    return func(...value);
}

function createStyle(name) {
    if (!fsExistsSync(name)){
        fs.writeFile(name,data.style,function (err) {
            if (err) return console.log(err);
            console.log(chalk.green('style.css生成成功'));
        })
    }
}
function createDirectory(name) {
    if (!fsExistsSync(name)){
        mkdir(name);
        console.log(chalk.green(name+'目录生成成功'))
    }
}

function createHtml(name) {
    if (!fsExistsSync(name)){
        let handeledModel = handelModel(name);
        fs.writeFile(name,handeledModel,function (err) {
            if (err) return console.log(err);
            console.log(chalk.green('模板'+name+'生成成功'));
        })
    }
}

function recreateHtml(name) {
    let handeledModel = handelModel(name);
    fs.writeFile(name,handeledModel,function (err) {
        if (err) return console.log(err);
        console.log(chalk.green('模板'+name+'重新生成成功'));
    })
}

function init() {
    createDirectory('images');
    createDirectory('model');
    createStyle('style.css');
}

module.exports={
    init:init,
    image:function (url) {
        travel(url,function (pathname,file) {
            let ms = image(fs.readFileSync(pathname));
            let filename = filePath+'/images/'+file;
            ms.mimeType && handelImage(pathname,filename);
        })
    },
    make:function () {
        for (let name in lanList){
            createHtml(name);
        }
    },
    remake:function () {
        for (let name in lanList){
            recreateHtml(name);
        }
    }
}

