
var brower = {
	v:function(){
		let nav = navigator;
		let ua = nav.userAgent;
		let app = nav.appVersion;

		return {
			isIE:ua.indexOf('Trident') > -1,//IE 内核
			isOpera:ua.indexOf('Presto')>-1,//Opera 内核
			webKit:ua.indexOf('AppleWebkit')>-1,//Apple or Chrome 内核
			isFireFox:ua.indexOf('Gecko')>-1 && ua.indexOf('KHTML') == -1,//firefox 内核
			isPC:!(/Android|webOS|iPhone|iPod|BlackBerry/i.test(ua)),
			ios:!!ua.match(/\(i[^;]+;( U;)?CPU.+Mac OS X/),//ios
			android:ua.indexOf('Android')>-1 || ua.indexOf('Adr') >-1,//Android
			isWx:ua.match(/MicroMessenger/i) == 'micromessenger',//weichat Browser
			isQq:ua.indexOf('mqqbrowser') >-1 && ua.indexOf(' qq')<0
		};
	}(),
	language:(navigator.browserLanguage || navigator.language).toLowerCase()
}

module.exports = brower