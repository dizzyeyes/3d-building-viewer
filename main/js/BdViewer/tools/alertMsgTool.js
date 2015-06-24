function alertMsgTool(viewer) {
    this.viewer=viewer;
    this.fadeTool= new fadeInOutTool();
    this.myMessages = ['menuDinfo','menuDwarning','menuDerror','menuDsuccess']; // define the messages types		 
    this.ismenuDShow=false;
    this.jqTool = new JQTool();
    this.init();
}
alertMsgTool.prototype.init = function()
{
    this.createMenuDs();
}
alertMsgTool.prototype.alertMsg = function(message)
{    
    if(this.viewer.msgTool=="humane") this.humaneMsg(message);
    if(this.viewer.msgTool=="jqTooltip") this.jqToolTipMsg(message);
    if(this.viewer.msgTool=="menuD") this.menuDInfo(message);    
}
alertMsgTool.prototype.getMsg = function(obj,curFloor)
{
    var msg="",msg2="",msg3="",msg4="",msg5="",msg6="";
    if(obj.modelname =="地板")
    {
        msg = curFloor.name;
        msg2 = "简介："+curFloor.info;
    }
    else
    {
        msg = obj.modelname;
         msg2= "<strong>ID：</strong>" + this.breakLongMsg("ID："+obj.modelid);
        msg3 = "<strong>位置: </strong>"+Math.round(obj.position.x*1000)/1000+", "+Math.round(obj.position.y*1000)/1000+", "+Math.round(obj.position.z*1000)/1000;        
         msg4= "<strong>简介：</strong>"+obj.info;
        if(obj.temperature!=undefined)
            msg5 = "温度："+obj.temperature;
        msg6 = obj.children[0].material.color.getHexString();
    }
    return new Array(msg,msg2,msg3,msg4,msg5,msg6);
}
alertMsgTool.prototype.breakLongMsg = function(msg)
{
    var minlen=15;
    var ret="";
    var len = msg.length;
    if(len>minlen)
    {
        var cnt = msg.length/minlen;
        for(var item=0;item<cnt;item++)
        {
            ret += msg.substr(minlen*item, minlen) + "<br>";
        }
        ret = ret.slice(3,-4);
        return ret;
    }
    return msg = msg.slice(3);;
}
alertMsgTool.prototype.inputMsg = function(info,defaultValue)
{    
    return prompt(info,defaultValue);
}
alertMsgTool.prototype.alertConfirm = function(info,process,params)
{       
    if(process!=undefined)
        confirm(info,process,params);
    else 
        return _originalConfirm(info);
}
alertMsgTool.prototype.alertSuccess = function(message)
{    
    this.menuDSuccess(this.prepareMsgStr(message));
}
alertMsgTool.prototype.alertWarning = function(message)
{    
    this.menuDWarning(this.prepareMsgStr(message));
}
alertMsgTool.prototype.alertError = function(message)
{    
    this.menuDError(this.prepareMsgStr(message));
}
alertMsgTool.prototype.alertInfo = function(message)
{
    this.menuDInfo(this.prepareMsgStr(message));
}
alertMsgTool.prototype.alertPercent = function(message)
{    
    humane.timeout = 500;
    humane.waitForMove = true;
    humane.forceNew = true;
    humane.clickToClose=true;
    humane.error(message);    
}
alertMsgTool.prototype.hideMsg = function()
{
    if(this.viewer.msgTool=="jqTooltip")   this.jqTool.hide();
}
alertMsgTool.prototype.humaneMsg = function(message)
{
    humane.timeout = 500;
    humane.waitForMove = true;
    humane.forceNew = false;
    humane.clickToClose=true;
    humane.success(message);
}
alertMsgTool.prototype.prepareMsgStr = function(message)
{
    var msg; 
    var pxil=4;   
    msg="<h3 align='center'><font color='";
    msg+="white";    
    msg+="' size='"+pxil+"px' ><strong>"+message+"</strong></font></h3>";
    return msg;
}
alertMsgTool.prototype.prepareMsgString = function(message)
{    
    var pxil=window.innerHeight/200;
    var msg="";
    var cnt=message.length;
    msg="<h3 align='center'><font color='";
    if(message[5]!=""&&message[5]!=undefined)
    {
        msg+=message[5];
    }
    else msg+="bisque";    
    cnt=5;
    msg+="' size='"+pxil+"px' face='arial'><strong>"+message[0]+"</strong></font></h3><p style='line-height:200%'>";
    pxil-=1;
    for(var key=1;key<cnt;key++)
    {
        if(message[key]!=""&&message[key]!=undefined)
        {
            msg+="<font size='"+pxil+"px' face='Times New Roman'>"
            msg+=message[key]+"</font><br>";
        }
    }
    msg+="</p>";
    return msg;
}
alertMsgTool.prototype.bubleMsg = function(message)
{
    msg=this.prepareMsgString(message);
    if(msg!="")
        this.jqTool.show(event,msg);
}
alertMsgTool.prototype.jqToolTipMsg = function(message)
{
    msg=this.prepareMsgString(message);
    if(msg!="")
        this.jqTool.show(event,msg);
}