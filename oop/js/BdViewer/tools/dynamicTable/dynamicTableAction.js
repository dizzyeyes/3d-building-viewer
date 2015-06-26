
///////////////////////////////////TableAction.js///////////////////////////////////////////

dynamicTable.prototype.fillAction = function (){
    var titleButton = document.getElementById('table_title_new');
    var closeButton = document.getElementById('table_Close');
    titleButton.parent = this;
    closeButton.parent = this;
    
    closeButton.onclick = this.closeTable;
    titleButton.onmousedown = this.DragTitle;
    titleButton.onmouseup = this.unDragTitle;
    titleButton.onmouseover = this.focusTitle;
    titleButton.onmouseout = this.unfocusTitle;    
    
    
    var appendButton = document.getElementById('append_data');
    appendButton.parent = this;    
    appendButton.onclick = this.appendData;
    var removeButton = document.getElementById('remove_data');
    removeButton.parent = this;    
    removeButton.onclick = this.removeData;
    var showButton = document.getElementById('show_data');
    showButton.parent = this;    
    showButton.onclick = this.showData;
    var hideButton = document.getElementById('hide_data');
    hideButton.parent = this;    
    hideButton.onclick = this.hideData;
    var highlightButton = document.getElementById('highlight_data');
    highlightButton.parent = this;    
    highlightButton.onclick = this.highlightData;
    var chighlightButton = document.getElementById('chighlight_data');
    chighlightButton.parent = this;    
    chighlightButton.onclick = this.chighlightData;
    
 }
 
 
dynamicTable.prototype.appendData = function(event)
{
    console.log('添加 ');
    this.parent.TableAppend();
}
dynamicTable.prototype.removeData = function(event)
{
    console.log('删除所选 ');
    this.parent.TableRemoveSelected();
}
dynamicTable.prototype.showData = function(event)
{
    console.log('显示 ');
    this.parent.TableHideItems(true);
}
dynamicTable.prototype.hideData = function(event)
{
    console.log('隐藏 ');
    this.parent.TableHideItems(false);
}
dynamicTable.prototype.highlightData = function(event)
{
    console.log('高亮 ');
    this.parent.TableHighLightItems(true);
}
dynamicTable.prototype.chighlightData = function(event)
{
    console.log('恢复 ');
    this.parent.TableHighLightItems(false);
}
dynamicTable.prototype.closeTable = function(event)
{
    console.log('关闭 ');
    this.parent.TableHide();
}
dynamicTable.prototype.DragTitle = function(event)
{
    this.style.cursor="move";
    this.parent.fadeTool.clickOnDiv(this.parent.div,event);
    // console.log('点击: ');
}
dynamicTable.prototype.focusTitle = function(event)
{
    this.style.cursor="move";
    // console.log('移动: ');
}
dynamicTable.prototype.unfocusTitle = function(event)
{
    this.style.cursor="default";
    // console.log('进入: ');
}
dynamicTable.prototype.unDragTitle = function()
{
    this.parent.fadeTool.onUpDiv();
    this.style.cursor="default";
    // console.log('释放: ');
}