$(document).ready(function() {    
    //Run player
    playMusic.run();
    
    //Event chose song to play
    $('.list').click(function() {
       playMusic.chose(this); 
    });
    
    //Event button play/pause
    $('#play-btn').click(function() {
        playMusic.controlPlay();
    });
    
    //Event click on status bar
    playMusic.clickBar();
    
    //
    $("#hide-mini").click(function() {
        $(".controls").css("display", "none");
        $(".container-player").css("display", "block");
    });
    
    $("#hide-player").click(function() {
        $(".controls").css("display", "block");
        $(".container-player").css("display", "none");
    });
});

var playMusic = (function() {
    var list = $('.list');
    var sound;
    var audio = $('.audio');
    var flag = true;
    var _play = false;
    var myAudio = document.getElementsByClassName('audio');
    var progress = $("#progress-bar").width();
    var progressBar = Math.floor(progress);
    var tmpSize = 0;
    var tmpLength = 0;
    var size = 0;
    var updateLength = 0;
    var lengthOfSecond = 0;
    var curr;
    var dur;
    
    /**
    * Add source url to tag audio and play
    * @param: {srcUrl} music url
    */
    function changeSource(srcUrl) {
        $('#mp3-src').attr('src', srcUrl);
        audio[0].pause();
        audio[0].load();
        audio[0].play();
        $("#play-btn").css("background-image","url(icon/pause.png)");
        _play = true;
    }

    /**
    * Set url when click
    * @param: {index} name music
    */
    function setMusic(index) {
        var number = list.index(index);
        var url = "lib/" + list[number].innerHTML + ".mp3";
        changeSource(url);
        $('#name-song').html(list[number].innerHTML); 
    }
    
    /**
    * Play or Pause
    */
    function play_stop() {
        if (flag && _play) {
            console.log("play");
            flag = false;
            audio[0].pause();
            $("#play-btn").css("background-image","url(icon/play.png)");
        } else
        if (flag == false) {
            console.log("pause");
            audio[0].play();
            $("#play-btn").css("background-image","url(icon/pause.png)");
            flag = true;
        }
    }
    
    /**
    * Play music
    * @param: {currentTime} current time music
    * @param: {duration} duration music
    */
    function onTrackedVideoFrame(currentTime, duration) {
        var current;
        var min = 0;
        var dur = 1;
        
        if (duration > 0) {
            dur = Math.floor(duration)
        }
        var minDur = 0;
        var num = Math.floor(currentTime);
        
        //Time start song
        if (num < 10) {
            current = min + ":" + "0" + num;
        } else {
            current = min + ":" + num;
        }
        
        if (num > 59) {
            min = Math.floor(num / 60);
            var tmp = num - (60 * min);
            if (tmp < 10) {
                current = min + ":" + "0" + tmp;
            } else {
                current = min + ":" + tmp;
            }
        }
        
        //Time end song
        if (dur > 59) {
            minDur = Math.floor(dur / 60);
            var tmp = dur - (60 * minDur);
            duration = "| " + minDur + ":" + tmp;
        }
        
        //Set value
        $("#playback-time").text(current);
        $("#song-duration").text(duration);
        lengthOfSecond = progressBar / dur; //calculator ?pixel each second play music
        if (size != 0) {
            $("#fader").width(size);
        }
        updateLength = map(currentTime, 0, dur, 0, progressBar);
        $("#fader").width(updateLength);
    }
    
    /**
    * Return value after change
    */
    function map (x, in_min, in_max, out_min, out_max) {
        return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }
    
    /**
    * Get mouse position
    */
    function setPosition() {
        $("#track-bar").click(function(e) {
            size = e.pageX;
            setTimeRun();
        });
    }
    
    /**
    * Set time and continuse play music
    */
    function setTimeRun() {
        if (size != 0) {
            $("#timeRun").val(size);
            var tmp = size / lengthOfSecond;
            audio[0].currentTime = tmp;
            size = 0;
        }
    }
    
    function autoPlay() {
        $(".audio").on(
        "timeupdate", 
        function(event) {
            curr = this.currentTime;
            dur = this.duration;
            onTrackedVideoFrame(curr, dur);
        });
    }
    
    return {
        chose: setMusic,
        ple: changeSource,
        controlPlay: play_stop,
        onTrack: onTrackedVideoFrame,
        clickBar: setPosition,
        setTime: setTimeRun,
        run: autoPlay,
    }
})();
