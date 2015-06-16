function fadeInOutTool(){
    this.scope=this;
}
	//底层共用
    var iBase = {
        Id: function(name,parent){
            if(parent==null||parent==undefined)                
                return document.getElementById(name);
            return document.getElementById(parent).name;
        },
		//设置元素透明度,透明度值按IE规则计,即0~100
        SetOpacity: function(ev, v){
            ev.filters ? ev.style.filter = 'alpha(opacity=' + v + ')' : ev.style.opacity = v / 100;
        }
    }
	//淡入效果(含淡入到指定透明度)
fadeInOutTool.prototype.fadeIn = function(elem, speed, opacity){
		/*
		 * 参数说明
		 * elem==>需要淡入的元素
		 * speed==>淡入速度,正整数(可选)
		 * opacity==>淡入到指定的透明度,0~100(可选)
		 */
	    speed = speed || 20;
	    opacity = opacity || 100;
		//显示元素,并将元素值为0透明度(不可见)
	    elem.style.display = 'block';
	    iBase.SetOpacity(elem, 0);
		//初始化透明度变化值为0
	    var val = 0;
		//循环将透明值以5递增,即淡入效果
	    (function(){
	        iBase.SetOpacity(elem, val);
	        val += 5;
	        if (val <= opacity) {
	            setTimeout(arguments.callee, speed)
	        }
	    })();
	}
	
	//淡出效果(含淡出到指定透明度)
fadeInOutTool.prototype.fadeOut = function(elem, speed, opacity){
		/*
		 * 参数说明
		 * elem==>需要淡入的元素
		 * speed==>淡入速度,正整数(可选)
		 * opacity==>淡入到指定的透明度,0~100(可选)
		 */
	    speed = speed || 20;
	    opacity = opacity || 0;
	    //初始化透明度变化值为0
	    var val = 100;
		//循环将透明值以5递减,即淡出效果
	    (function(){
	        iBase.SetOpacity(elem, val);
	        val -= 5;
	        if (val >= opacity) {
	            setTimeout(arguments.callee, speed);
	        }else if (val < 0) {
				//元素透明度为0后隐藏元素
	            elem.style.display = 'none';
	        }
	    })();
	}

    //floatDiv.js
fadeInOutTool.prototype.MoveFloatLayer = function(divid,x,y) {
        
        var divTopBar = document.getElementById(divid);
        if(x==undefined)
        {
            x =  window.innerWidth / 2 ;
            y = window.innerHeight / 2;
            x = x - divTopBar.offsetWidth/2;
            y =  y- divTopBar.offsetHeight/2;
        }        
        if(x<0) x=0;
        if(x+divTopBar.offsetWidth>window.innerWidth-20) x=window.innerWidth - divTopBar.offsetWidth;
        if(y+divTopBar.offsetHeight>window.innerHeight-20) y=window.innerHeight -divTopBar.offsetHeight;
        if(y<0) y=0;
        divTopBar.style.left = x+"px";
        divTopBar.style.top = y+"px";
    }
    
fadeInOutTool.prototype.clickOnDiv = function(oDiv,event) {
        myDragDiv = oDiv;
        begin = true;
        oDiv.style.cursor = "hand";
        pxDrag = oDiv.style.left.slice(0,-2)/1 - event.clientX;
        pyDrag = oDiv.style.top.slice(0,-2)/1 - event.clientY;
    }
fadeInOutTool.prototype.onMoveDiv = function(event) {
        if (myDragDiv != null && typeof (myDragDiv) != "undefined") {
            if (begin) {
                if (enableOpacity) { myDragDiv.style.filter = "Alpha(opacity=30)"; }  // 滤镜 
                myDragDiv.style.left = pxDrag + event.clientX+'px';
                myDragDiv.style.top = pyDrag + event.clientY+'px';
            }
        }
    }
fadeInOutTool.prototype.onUpDiv = function() {
        if (myDragDiv != null && typeof (myDragDiv) != "undefined") {
            begin = false;
            if (enableOpacity) { myDragDiv.style.filter = "Alpha(opacity=100)"; } // 滤镜 
            myDragDiv.style.cursor = "default";
            myDragDiv = null;
        }
    }
