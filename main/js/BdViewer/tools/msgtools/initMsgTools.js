
alertMsgTool.prototype.createMenuDs = function()
{
    this.createMenuD({id:"menuDinfo",className:"menuDinfo menuDMessage"});
    this.createMenuD({id:"menuDerror",className:"menuDerror menuDMessage"});
    this.createMenuD({id:"menuDwarning",className:"menuDwarning menuDMessage"});
    this.createMenuD({id:"menuDsuccess",className:"menuDsuccess menuDMessage"});
}
alertMsgTool.prototype.createMenuD = function(jsonData)
{
    var div = document.createElement('div');
    div.id = jsonData.id;
    div.className = jsonData.className;
    div.parent = this;
    div.onmouseover = this.hideMenuDCallback;
    document.body.appendChild(div);
}
alertMsgTool.prototype.hideMenuDCallback = function()
{
    this.parent.hideMenuD();
}