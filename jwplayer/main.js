/**
 * Created by Administrator on 2016/10/27.
 */
var player = jwplayer("player");
player.setup({
    // file: 'http://img.ksbbs.com/asset/Mon_1605/0ec8cc80112a2d6.mp4',
    // image: 'jwplayer/video/temp.jpg',
    logo: {
        file: 'jwplayer/video/logo.png',
        link: 'http://www.alvye.cn/'
    },
    height:650,
    width: 1200,//可为百分比 "100%"，
    stretching:"fill",

    "playlist": [{
        //文件路径
        // "file": "http://img.ksbbs.com/asset/Mon_1605/0ec8cc80112a2d6.mp4",
        "sources": [{
            "file": "http://img.ksbbs.com/asset/Mon_1605/0ec8cc80112a2d6.mp4", //优先播放，第一选择
            "label": "HD"    //质量切换
        },{
            "file": "http://img.ksbbs.com/asset/Mon_1605/0ec8cc80112a2d6.w3u8",
            "label": "SD"
        },{
            "file": "http://img.ksbbs.com/asset/Mon_1605/0ec8cc80112a2d6.webm"
        }],
        //字幕
        "tracks":[{
            "file":"jwplayer/zimu/zimu.srt",
            "kind":"captions",
            "lable":"index"
        }],
        //分享
        "sharing": {
            "sites": ["reddit","facebook","twitter"]
        },
        "image": "jwplayer/video/1.jpg",//海报
        "title": "我的第一个jwplayer视频",
        "description":"第一个视频描述",
        "mediaid": "ddra573"
    },{
        "file": "jwplayer/video/video.mp4",
        "image": "jwplayer/video/4.jpg",
        "title": "这是第二个jwplayer视频",
        "description":"第二个视频描述",
        "mediaid": "ddrx3v2"
    }]


});




// cookie  视频断点
player.on('time', function(e) {
    $cookie.setItem('resumevideodata', Math.floor(e.position) + ':' + player.getDuration());
});
player.on('ready', function() {
    var cookieData = $cookie.getItem('resumevideodata');
    if(cookieData) {
        var resumeAt = cookieData.split(':')[0],
            videoDur = cookieData.split(':')[1];
        if(parseInt(resumeAt) < parseInt(videoDur)) {
            player.seek(resumeAt);
            logMessage('Resuming at ' + resumeAt); //for demo purposes
        }
        else if(cookieData && !(parseInt(resumeAt) < parseInt(videoDur))) {
            logMessage('Video ended last time! Will skip resume behavior'); //for demo purposes
        }
    }
    else {
        logMessage('No video resume cookie detected. Refresh page.');
    }

    // addButton 下载按钮
    player.addButton(
        //This portion is what designates the graphic used for the button
        "//icons.jwplayer.com/icons/white/download.svg",
        //This portion determines the text that appears as a tooltip
        "Download Video",
        //This portion designates the functionality of the button itself
        function() {
            //With the below code, we're grabbing the file that's currently playing
            window.location.href = player.getPlaylistItem()['file'];
        },
        //And finally, here we set the unique ID of the button itself.
        "download"
    );



    });