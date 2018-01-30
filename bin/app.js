'use strict';

var fs= require('fs');
var path = require('path');

var lanList = {
    'en-au.html':['au','en-au','EN','AU','AUD'],
    'en-us.html':['en','en-us','EN','EN','USD'],
    'en-hk.html':['hken','en-hk','EN','HK','HKD'],
    'en-sg.html':['sg','en-sg','EN','SG','SGD'],
    'de-de.html':['de','de-de','DE','DE','EUR'],
    'es-es.html':['es','es-es','ES','ES','EUR'],
    'id-id.html':['id','id-id','ID','ID','IDR'],
    'fr-fr.html':['fr','fr-fr','FR','FR','EUR'],
    'ja-jp.html':['jp','ja-jp','JP','JP','JPY'],
    'ko-kr.html':['kr','ko-kr','KR','KR','KRW'],
    'ms-my.html':['my','ms-my','MY','MY','MYR'],
    'ru-ru.html':['ru','ru-ru','RU','RU','RUB'],
    'th-th.html':['th','th-th','TH','TH','THD'],
    'zh-hk.html':['hk','zh-hk','TC','HK','HKD']
};

var style = '.pm-lang-en{font:12px/1.5 BlinkMacSystemFont,-apple-system, Helvetica, Arial, sans-serif;}\n' +
    '.pm-lang-hk{font:12px/1.5 "Microsoft Jhenghei", "PingFang HK", "STHeitiTC-Light", tahoma, arial, sans-serif;}\n' +
    '.pm-lang-hken{font:12px/1.5 BlinkMacSystemFont,-apple-system, Helvetica, Arial, sans-serif;}\n' +
    '.pm-lang-sg{font:12px/1.5 BlinkMacSystemFont,-apple-system, Helvetica, Arial, sans-serif;}\n' +
    '.pm-lang-kr{font:12px/1.5 "나눔바른고딕",Nanum Barun Gothic,"나눔 고딕","Nanum Gothic","맑은 고딕","Malgun Gothic","돋움",dotum,tahoma,arial,sans-serif;}\n' +
    '.pm-lang-jp{font:12px/1.5 Meiryo UI,Meiryo, "MS PGothic", "Helvetica Neue", Helvetica, Osaka, Tahoma, Arial, Sans-serif;}\n' +
    '.banner-con{background:url(./images/banner-en.jpg) no-repeat 50% 0;padding-top:400px;}\n' +
    '.pm-lang-hk .banner-con{background-image:url(./images/banner-hk.jpg)}\n' +
    '.pm-lang-hken .banner-con{background-image:url(./images/banner-en.jpg)}\n' +
    '.pm-lang-jp .banner-con{background-image:url(./images/banner-jp.jpg)}\n' +
    '.pm-lang-kr .banner-con{background-image:url(./images/banner-kr.jpg)}\n' +
    '.pm-lang-sg .banner-con{background-image:url(./images/banner-en.jpg)}\n' +
    '.pm-lang-de .banner-con{background-image:url(./images/banner-de.jpg)}\n' +
    '.pm-lang-es .banner-con{background-image:url(./images/banner-es.jpg)}\n' +
    '.pm-lang-fr .banner-con{background-image:url(./images/banner-fr.jpg)}\n' +
    '.pm-lang-ru .banner-con{background-image:url(./images/banner-ru.jpg)}\n' +
    '.pm-lang-th .banner-con{background-image:url(./images/banner-th.jpg)}\n' +
    '.pm-lang-id .banner-con{background-image:url(./images/banner-id.jpg)}\n' +
    '.pm-lang-my .banner-con{background-image:url(./images/banner-m-y.jpg)}\n' +
    '\n' +
    '\n' +
    '@media screen and (max-width: 640px) {\n' +
    '.banner-con{padding-top:50%;background:url(./images/banner-m-en.jpg) no-repeat 0 0;background-size:contain;}\n' +
    '.pm-lang-en .banner-con{background-image:url(./images/banner-m-en.jpg)}\n' +
    '.pm-lang-sg .banner-con{background-image:url(./images/banner-m-en.jpg)}\n' +
    '.pm-lang-hken .banner-con{background-image:url(./images/banner-m-en.jpg)}\n' +
    '.pm-lang-hk .banner-con{background-image:url(./images/banner-m-hk.jpg)}\n' +
    '.pm-lang-jp .banner-con{background-image:url(./images/banner-m-jp.jpg)}\n' +
    '.pm-lang-kr .banner-con{background-image:url(./images/banner-m-kr.jpg)}\n' +
    '.pm-lang-de .banner-con{background-image:url(./images/banner-m-de.jpg)}\n' +
    '.pm-lang-es .banner-con{background-image:url(./images/banner-m-es.jpg)}\n' +
    '.pm-lang-fr .banner-con{background-image:url(./images/banner-m-fr.jpg)}\n' +
    '.pm-lang-ru .banner-con{background-image:url(./images/banner-m-ru.jpg)}\n' +
    '.pm-lang-th .banner-con{background-image:url(./images/banner-m-th.jpg)}\n' +
    '.pm-lang-id .banner-con{background-image:url(./images/banner-m-id.jpg)}\n' +
    '.pm-lang-my .banner-con{background-image:url(./images/banner-m-my.jpg)}\n' +
    '}\n' +
    '\n' +
    '.pm-info p{line-height:1.3;margin-bottom:4px;}\n' +
    '.pm-terms{font-size:12px;padding:25px 0;background-color:#f5f5f5;}\n' +
    '.pm-terms .tit{font-size:14px;margin-bottom:10px;font-weight:bold;}\n' +
    '.pm-terms .list{list-style:decimal;padding-left:30px;}\n' +
    '.pm-terms ol li ul{padding-left:20px;}\n' +
    '.pm-terms ol li ul li{list-style:initial;}\n' +
    '.pm-info{background-color:#3b7ac0;color:#fff;font-size:16px;line-height:1;}\n' +
    '\n';

function make() {
    mkdir('images');
    createStyle('style.css');
    for (var page in lanList){
        createHtml(page,lanList[page]);
    }
}

function mkdir(dirpath) {
    if (!fs.existsSync(dirpath)){
        fs.mkdirSync(dirpath);
    }
}

function handelModel(lan) {
    return '<!DOCTYPE HTML>\n' +
        '<html lang="en-US">\n' +
        '<head>\n' +
        '    <meta charset="UTF-8">\n' +
        '    <title></title>\n' +
        '    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n' +
        '    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />\n' +
        '\t<link rel="stylesheet" href="//pages.trip.com/css/v3/pm-base.css"/>\n' +
        '    <link rel="stylesheet" href="//pages.trip.com/css/v4/global-s.css"/>\n' +
        '    <link rel="stylesheet" href="style.css" />\n' +
        '    <script type="text/javascript" src="//pages.trip.com/js/lib/jquery-1.11.3.min.js"></script>\n' +
        '    <script type="text/javascript" src="//pages.trip.com/js/v4/header/header-' + lan[0] + '.js"></script>\n' +
        '    <script type="text/javascript" src="//pages.trip.com/js/market/tab-hotel-gallery.js"></script>\n' +
        '    <script type="text/javascript" src="//pages.trip.com/js/market/tab-flight-gallery.js"></script>\n' +
        '</head>\n' +
        '<body>\n' +
        '<div class="pm-lang-' + lan[0] + '">\n' +
        '\n' +
        '\t<div class="pm-banner-con banner-con"></div>\n' +
        '\n' +
        '\t<div class="pm-info">\n' +
        '\t\t<div class="pm-inner">\n' +
        '\t\t\t<p>Bring in the Lunar New Year in the best possible way - with a holiday! Trip.com has some great deals on flights and hotels but these prices can\'t last!</p>\n' +
        '\t\t</div>\n' +
        '\t</div>\n' +
        '\t\n' +
        '\t<h2 class="title flight-tit" id="flight-tit">Hot Return Flight Deals</h2>\n' +
        '\t<div class="pm-flight-block" id="pm-flight-block-0000001">\n' +
        '\t\t<div class="pm-center"><div class="pm-block-loading"><span class="mc-loading-36-blue"></span></div></div>\n' +
        '\t\t<script type="text/javascript">\n' +
        '            (new TabFlightGallery({\n' +
        '                promoID: 130,\n' +
        '                locale: \''+lan[1]+'\',\n' +
        '                rootId: \'pm-flight-block-0000001\'\n' +
        '            })).init();\n' +
        '\t\t</script>\n' +
        '\t</div>\n' +
        '\t<h2 class="title hotel-tit">Popular hotel deals</h2>\n' +
        '\t<div class="pm-hotel-block" id="pm-hotel-block-0000001">\n' +
        '\t\t<div class="pack-loading pm-center"><span class="mc-loading-36-blue"></span></div>\n' +
        '\t\t<script type="text/javascript">\n' +
        '            (new TabHotelGallery({\n' +
        '                promoID: 130,\n' +
        '                language: \'' + lan[2] + '\',\n' +
        '                market: \'' + lan[3] + '\',\n' +
        '                currency: \'' + lan[4] + '\',\n' +
        '                checkIn: \'2018-05-01\',\n' +
        '                checkOut: \'2018-05-31\',\n' +
        '                rootId: \'pm-hotel-block-0000001\'\n' +
        '            })).init();\n' +
        '\t\t</script>\n' +
        '\t</div>\n'+
        '\t<div class="pm-terms">\n' +
        '\t\t<div class="pm-inner">\n' +
        '\t\t\t<h2 class="pm-terms__tit">Terms & Conditions</h2>\n' +
        '\t\t\t<ol class="pm-terms__list">\n' +
        '\t\t\t\t<li>Promo period: Jan 8 to Feb 28, 2018</li>\n' +
        '\t\t\t\t<li>Prices are correct at time of publication and are subject to availability and change. Please see trip.com to confirm availability, prices and applicable terms and conditions.</li>\n' +
        '\t\t\t\t<li>Hotel cancellation and prepayment policies may vary according to room type. Please refer to the room policies upon reservation.</li>\n' +
        '\t\t\t\t<li>Airlines reserve the right to adjust prices and control seat availability according to sales situation. Final fare based on airline\'s actual sale price. Seat availability subject to airlines.</li>\n' +
        '\t\t\t\t<li>Special fares may be subject to strict change, refund and endorsement conditions. Please refer to conditions of confirmed booking for details.</li>\n' +
        '\t\t\t\t<li>Trip.com reserves all rights of final interpretation.</li>\n' +
        '\t\t\t</ol>\n' +
        '\t\t</div>\n' +
        '\t</div>\n' +
        '\t\n' +
        '</div>\n' +
        '\n' +
        '<script type="text/javascript" src="//webresource.english.c-ctrip.com/resaresenglish/ibu/fe-market/js/cquery-with-pro.bc62000a.js"></script>\n' +
        '<script type="text/javascript" src="//pages.trip.com/js/v4/footer/footer-' + lan[0] + '.js"></script>\n' +
        '<input id="page_id" type="hidden" value="" />\n' +
        '\n' +
        '</body>\n' +
        '</html>';
}

function createHtml(name,lan) {
    if (!fs.exists(name)){
        var handeledModel = handelModel(lan);
        fs.writeFile(name,handeledModel,function (err) {
            if (err) return console.log(err);
            console.log('模板'+name+'生成成功');
        })
    }
}

function createStyle(name) {
    if (!fs.exists(name)){
        fs.writeFile(name,style,function (err) {
            if (err) return console.log(err);
            console.log('style.css生成成功');
        })
    }
}

make();
console.log(path.resolve());