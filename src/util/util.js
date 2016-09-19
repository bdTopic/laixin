const transferDate = (timestamp) =>{
    var newDate = new Date();
    newDate.setTime(timestamp * 1000);
    var month = newDate.getMonth()+1;
    var day = newDate.getDate();
    var hour= newDate.getHours();
    var minute = newDate.getMinutes();
    var timeStr = month < 10 ? '0'+ month : month;
    timeStr += '-';
    timeStr += day < 10 ? '0'+ day : day;
    timeStr += " ";
    timeStr +=  hour  < 10 ? '0'+hour : hour;
    timeStr +=  ":";
    timeStr += minute < 10 ? '0'+minute : minute;
    return timeStr;
}
const getBrowserInfo = () =>{
  return{
        versions:function(){
            var u = navigator.userAgent, app = navigator.appVersion;
            var obj={//移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQ HD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                weiChart: u.toLowerCase().match(/MicroMessenger/i)=="micromessenger"
            };

            return obj;
        }(),
        language:(navigator.browserLanguage || navigator.language).toLowerCase()
    }
}

const getStatistics = ()=>{
    (function() {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?20894e1cb6050fe94b58b57981cdee86";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();

    // return _hmt;
}

const getVersion = ()=>{
    var back = 0;
    if (window.baiduboxapp_version) {
        back = window.baiduboxapp_version;
    } else {
        var str = navigator.userAgent;
        var a;

        if (a = /([\d+.]+)_(?:diordna|enohpi)_/.exec(str)) {
            a = a[1].split('.');
            back = a.reverse().join('.');
        } else if (a = /baiduboxapp\/([\d+.]+)/.exec(str)) {
            back = a[1];
        }
    }
    return back;
}
const cmpVersion = (version1,version2)=>{
    //version1==version2返回0；
    //version1>version2返回1；
    //小于返回-1
    version2 += '';
    version1 += '';

    var a = version1.split('.'),
        b = version2.split('.'),
        i = 0,
        len = Math.max(a.length, b.length);

    for (; i < len; i++) {
        if ((a[i] && !b[i] && parseInt(a[i]) > 0) || (parseInt(a[i]) > parseInt(b[i]))) {
            return 1;
        } else if ((b[i] && !a[i] && parseInt(b[i]) > 0) || (parseInt(a[i]) < parseInt(b[i]))) {
            return -1;
        }
    }
    return 0;
}


export {transferDate,getBrowserInfo,getVersion,cmpVersion};
