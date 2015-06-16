
alertMsgTool.prototype.menuDInfo = function(msg)
{
    this.tiggerMenuDNotice('menuDinfo',msg);
}
alertMsgTool.prototype.menuDError = function(msg)
{
    this.tiggerMenuDNotice('menuDerror',msg);
}
alertMsgTool.prototype.menuDWarning = function(msg)
{
    this.tiggerMenuDNotice('menuDwarning',msg);
}
alertMsgTool.prototype.menuDSucess = function(msg)
{
    this.tiggerMenuDNotice('menuDsuccess',msg);
}

alertMsgTool.prototype.tiggerMenuDNotice = function(type,info)
{
    $('.'+type)[0].innerHTML="<center>"+info+"</center>";
    this.hideMenuD();
    this.fadeTool.fadeIn(iBase.Id(type));
    this.ismenuDShow=true;
}
alertMsgTool.prototype.hideMenuD = function()
{   
    if(this.ismenuDShow==false) return;
    for (i=0; i<this.myMessages.length; i++)
    {
        var obj = iBase.Id(this.myMessages[i]);
        if(obj.style.display=="block")
        {
            obj.style.display="none";                    
            this.ismenuDShow = false;            
        }
    }
}
