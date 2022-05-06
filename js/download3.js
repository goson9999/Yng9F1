(function ($) { 
    var $settings = {
        downAdroidBtnId: "downAdroidBtn",
        downAdroidTvBtnId: "downAdroidTvBtn",
        downIosBtnId: "downIosBtn",
        appKey: "ec22b9",
        androidVersion: "敬请期待", 
        androidTvVersion: "敬请期待",
        iosVersion: "敬请期待",
        downAdroidUrl: "",
        downAdroidTvUrl: "",
        downIosUrl: "" 
    } 
    var $clientDrive = getMobileOperatingSystem();  
    $.fn.download = function (options) {
        if (options) {
            $.extend($settings, options);
        };   
        if($clientDrive === "pc"){ 
            showQr(true);
        } else{
            showQr(false);
        }
        action($("#"+$settings.downAdroidBtnId),"android");
        action($("#"+$settings.downAdroidTvBtnId),"androidTV");
        action($("#"+$settings.downIosBtnId),"ios");
    }


    function action($btn,type){ 
        var $btnDrive = type; 
        switch($btnDrive){
            case "android":  
                $($btn).find(".bottom").html("("+$settings.androidVersion+")"); 
                $($btn).click(function(){
                    showImg("adnroidPic");
                    downloadLog("Android");
                    if($clientDrive !== 'android'){
                        if(!isEmpty($settings.downAdroidUrl)){
                            var form=document.createElement("form");
                            form.action=$settings.downAdroidUrl;document.getElementsByTagName("body")[0].appendChild(form);
                            form.submit(); 
                         }else{
                             alert('提供安卓下载地址为空');
                         }
                    }else{
                        var data = OpenInstall.parseUrlParams(); 
                        new OpenInstall({
                            appKey: $settings.appKey,
                            onready: function () {
                                this.schemeWakeup(); 
                                this.wakeupOrInstall();
                                return false;
                            }
                        }, data);
                    }
                }); 
                break; 
            case "androidTV": 
                $($btn).find(".bottom").html("("+$settings.androidTvVersion+")"); 
                $($btn).click(function(){
                     showImg("adnroidTvPic");    
                     downloadLog("Tv") 
                     if(!isEmpty($settings.downAdroidTvUrl)){
                        var form=document.createElement("form");
                        form.action=$settings.downAdroidTvUrl;document.getElementsByTagName("body")[0].appendChild(form);
                        form.submit(); 
                     }else{
                         alert('提供安卓TV下载地址为空');
                     }
                }); 
            break 
            case "ios": 
                $($btn).find(".bottom").html("("+$settings.iosVersion+")"); 
                $($btn).click(function(){
                    showImg("iosPic");
                    downloadLog("Ios");
                    if(!isEmpty($settings.downIosUrl)){
                        // var form=document.createElement("form");
                        // form.action=$settings.downIosUrl;document.getElementsByTagName("body")[0].appendChild(form);
                        // form.submit(); 
                        window.location.href = $settings.downIosUrl;
                     }else{
                         alert('提供IOS下载地址为空');
                     }
                    // if($clientDrive !== 'ios'){
                    //     if(!isEmpty($settings.downIosUrl)){
                    //         var form=document.createElement("form");
                    //         form.action=$settings.downIosUrl;document.getElementsByTagName("body")[0].appendChild(form);
                    //         form.submit(); 
                    //      }else{
                    //          alert('提供安卓下载地址为空');
                    //      }
                    // }else{
                    //     var data = OpenInstall.parseUrlParams(); 
                    //     new OpenInstall({
                    //         appKey: $settings.appKey,
                    //         onready: function () {
                    //             this.schemeWakeup(); 
                    //             this.wakeupOrInstall();
                    //             return false;
                    //         }
                    //     }, data);
                    // }
                }); 
            break
        }
    }

    function isEmpty(obj){
        if(typeof obj =="undefined" || obj  == null || obj == ""){
            return true;
        }else{
            return false;
        } 
    }
 
    function downloadLog(type) {
        try{  $.post('/api/v1.0/request/downloadLog', {agentCode: $settings.agentCode, type: type}, function (result) {}); }catch(e){ }
    }

    function showImg(type){
        try {
            $('.img').hide()
            $('#'+type).show()
            $('#mySwiperData').hide()
        } catch(e) {
           console.log(e)
        }
    }

    function getMobileOperatingSystem() { 
        if(isMobile()){
            var userAgent = navigator.userAgent || navigator.vendor || window.opera; 
            if (/windows phone/i.test(userAgent)) {
                return "Windows Phone";
            } 
            if (/android/i.test(userAgent)) {
                return "android";
            }  
            if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                return "ios";
            } 
            return "unknown";
        } else{ 
            return "pc";
        } 
    }

    function isMobile() {
        let flag = navigator.userAgent.match(
            /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        );
        return flag;
    } 

    function showQr(status){
        if (status) {
            var text = window.location.href;
            new QRCode(document.getElementById("qrcode"), {
                text: text,
                width: 180,
                height: 180,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            })
            document.getElementById("qrcodeInfo").style.display = "block"
            document.getElementById("titleBox").style.display = "block"
        } else {
            document.getElementById("qrcodeInfo").style.display = "none"
            document.getElementById("titleBox").style.display = "none"
        }
    }

})(jQuery);

 