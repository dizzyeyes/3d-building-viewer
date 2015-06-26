
dynamicForm.prototype.fillActioin = function (){
    var okButton = document.getElementById('form_button_ok');
    var cancelButton = document.getElementById('form_button_cancel');
    var titleButton = document.getElementById('form_title_new');
    okButton.parent = this;
    cancelButton.parent = this;
    titleButton.parent = this;
    
    okButton.onclick = this.process;
    cancelButton.onclick = this.cancel;
    titleButton.onmousedown = this.DragTitle;
    titleButton.onmouseup = this.unDragTitle;
    titleButton.onmouseover = this.focusTitle;
    titleButton.onmouseout = this.unfocusTitle;    
    
    var listBuilding = document.getElementById('form_input_List_Building');
    var listFloor = document.getElementById('form_input_List_Floor');
    
    if(listBuilding!=null)
    {
        listBuilding.parent = this;
        listBuilding.floor = listFloor.value;
        listBuilding.onchange = this.changeBuidlingList;
    }
    
    if(listFloor!=null)
    {
        listFloor.parent = this;
        listFloor.building = listBuilding.value;
        listFloor.onchange = this.changeFloorList;
    }
    
 }
dynamicForm.prototype.changeBuidlingList = function(event)
{    
    this.parent.viewer.changeBdFloo(this.value,0);
    this.parent.show();
}
dynamicForm.prototype.changeFloorList = function(event)
{    
    this.parent.viewer.changeBdFloo(this.building,this.value);
    this.parent.show();
}
dynamicForm.prototype.DragTitle = function(event)
{
    this.style.cursor="move";
    this.parent.fadeTool.clickOnDiv(this.parent.div,event);
    // console.log('点击: ');
}
dynamicForm.prototype.focusTitle = function(event)
{
    this.style.cursor="move";
    // console.log('移动: ');
}
dynamicForm.prototype.unfocusTitle = function(event)
{
    this.style.cursor="default";
    // console.log('进入: ');
}
dynamicForm.prototype.unDragTitle = function()
{
    this.parent.fadeTool.onUpDiv();
    this.style.cursor="default";
    // console.log('释放: ');
}
dynamicForm.prototype.defaultStyle = function(event)
{
    if(event.type=='blur')
        this.isFocused=false;
    if(this.isFocused==true) return;
    this.style.border = "#ccc 1px solid";
}
dynamicForm.prototype.prettyStyle = function(event)
{
    if(event.type=='focus')
        this.isFocused=true;
    this.style.border = "#56b4ef 1px solid";
}
dynamicForm.prototype.process = function()
{
    var outputobj=this.parent.div.getElementsByTagName('input');
    var outputobjtextarea=this.parent.div.getElementsByTagName('textarea');
    var outputobjSelect=this.parent.div.getElementsByTagName('select');
    var data = {};
    for(var item=0;item<outputobj.length;item++)
    {
        var inputItem = outputobj.item(item);
        if(inputItem.type!='hidden')
        {
            if(inputItem.value=="")
            {
                this.parent.wrongInputHighLight([inputItem.name,"输入不能为空"]);
                return;
            }
        }
        data[inputItem.name] = inputItem.value;
    }
    for(var item=0;item<outputobjtextarea.length;item++)
    {
        var inputItem = outputobjtextarea.item(item); 
        if(inputItem.value=="")
        {
            this.parent.wrongInputHighLight([inputItem.name,"输入不能为空"]);
            return;
        }
        data[inputItem.name] = inputItem.value;
    }
    for(var item=0;item<outputobjSelect.length;item++)
    {
        var inputItem = outputobjSelect.item(item); 
        data[inputItem.name] = inputItem.value;
    }
    var output = {};
    output.title = this.parent.title;
    output.data = data;
    console.log('处理: ',output);
    var rtn = this.parent.postprocess(output);
    if(rtn[0]===true)
    {
        this.parent.hide();
    }
    else if(rtn[0]==="Floor")
    {
        this.parent.viewer.msgToolkit.alertError("请先添加楼层");
    }
    else
    {
        console.log(rtn);
        this.parent.wrongInputHighLight(rtn);
    }
}
dynamicForm.prototype.wrongInputHighLight = function(rtn)
{
    var name = rtn[0];
    var errmsg = rtn[1];
    var form = this.div.children[0];
    var inputItem = form[name];
    
    inputItem.style.border = "2px solid #ed2d11";
    inputItem.placeholder = errmsg;
    inputItem.onblur = this.defaultStyle;
    inputItem.onmouseout = this.defaultStyle;
    inputItem.onmouseover = this.prettyStyle;
    inputItem.onfocus = this.prettyStyle;
    
    this.viewer.msgToolkit.alertError(errmsg);
}
dynamicForm.prototype.cancel = function()
{
    console.log('取消: ');
    if(this.parent.title=="更换楼层")
    {        
        var outputobjSelect=this.parent.div.getElementsByTagName('select');
        var data = {};
        for(var item=0;item<outputobjSelect.length;item++)
        {
            var inputItem = outputobjSelect.item(item); 
            data[inputItem.name] = inputItem.value;
        }
        if(!(this.parent.building/1===data.Building/1&&this.parent.floor/1===data.Floor/1))
            this.parent.viewer.changeBdFloo(this.parent.building,this.parent.floor);
    }
    this.parent.hide();
}