function alertMsg(message)
{    

    if(msgTool=="humane") humaneMsg(message);
    if(msgTool=="buble") bubleMsg(message);
    if(msgTool=="jqTooltip") jqToolTipMsg(message);
    if(msgTool=="menuD") menuDInfo(message);
    
}
function getMsg(obj,curFloor)
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
         msg2= "<strong>ID：</strong>"+breakLongMsg("ID："+obj.modelid);
        msg3 = "<strong>位置: </strong>"+Math.round(obj.position.x*1000)/1000+", "+Math.round(obj.position.y*1000)/1000+", "+Math.round(obj.position.z*1000)/1000;        
         msg4= "<strong>简介：</strong>"+obj.info;
        if(obj.temperature!=undefined)
            msg5 = "温度："+obj.temperature;
        msg6 = obj.children[0].material.color.getHexString();
    }
    return new Array(msg,msg2,msg3,msg4,msg5,msg6);
}
function breakLongMsg(msg)
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
function inputMsg(info,defaultValue)
{    
    return prompt(info,defaultValue);
}
function alertConfirm(info,process,params)
{       
    if(process!=undefined)
        confirm(info,process,params);
    else 
        return _originalConfirm(info);
}
function alertError(message)
{    
    menuDError(prepareMsgStr(message));
}
function alertInfo(message)
{
    menuDInfo(prepareMsgStr(message));
}
function alertPercent(message)
{    
    humane.timeout = 500;
    humane.waitForMove = true;
    humane.forceNew = true;
    humane.clickToClose=true;
    humane.error(message);    
}
function hideMsg()
{
    if(msgTool=="buble")   hideToolTip();
    if(msgTool=="jqTooltip")   hideJQTooltip();
}
function humaneMsg(message)
{
    humane.timeout = 500;
    humane.waitForMove = true;
    humane.forceNew = false;
    humane.clickToClose=true;
    humane.success(message);
}
function prepareMsgStr(message)
{
    var msg; 
    var pxil=4;   
    msg="<h3 align='center'><font color='";
    msg+="white";    
    msg+="' size='"+pxil+"px' ><strong>"+message+"</strong></font></h3>";
    return msg;
}
function prepareMsgString(message)
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
function bubleMsg(message)
{
    msg=prepareMsgString(message);
    if(msg!="")
        showToolTip(event,msg);
}
function jqToolTipMsg(message)
{
    msg=prepareMsgString(message);
    if(msg!="")
        showJQTooltip(event,msg);
}