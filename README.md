# marketing-project-maker
此包用于初始化市场前端项目，git地址[marketing-project-maker](https://github.com/thatWzh/marketing-project-maker).<br>
使用方法：<br>
>`maker -h`、`maker --help`:获取帮助信息<br><br>
>`maker -v`、`maker --version`：获取版本信息<br><br>
>`maker init`:初始化项目目录（生成model文件夹、images文件夹、style.css）<br><br>
>`maker -u <url>`、`maker --url <url>`:根据输入的url将图片存入images文件夹<br>
```
    例如：maker -u "https://github.com/thatWzh/marketing-project-maker"
```
>`maker make`:根据模板数据生成html文件<br><br>
>`maker remake`:根据模板数据重新生成html文件并覆盖已有文件<br><br>
* html模板文件`model.html`、模板数据`data.json`放于model目录下
