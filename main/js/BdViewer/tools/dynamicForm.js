function dynamicForm(viewer,title,id){    
    if(id==undefined) id="form-new";
    this.viewer=viewer;
    this.initForm(id);
    this.fadeTool= new fadeInOutTool();
    if(title==undefined) title='untitled';
    this.title=title;
    
    this.floor="";
    this.building="";
    
    this.init();
    
    document.dynamicform = this;
    window.dynamicform = this;
   
    document.addEventListener( 'mousemove', this.onMouseMove, false );
    window.addEventListener( 'resize', this.onWindowResize, false );
}

dynamicForm.prototype.init = function()
{    
    this.enabled = true;
    this.visible = false;   
    this.obj = {id:"",name:"",info:"",model:"",image:"",tag:""};
}
dynamicForm.prototype.onMouseMove = function(event)
{
    this.dynamicform.fadeTool.onMoveDiv(event);
}
dynamicForm.prototype.onWindowResize = function(event)
{
    this.dynamicform.fadeTool.MoveFloatLayer(this.dynamicform.div.id);
}

dynamicForm.prototype.initForm = function(id){
    this.div = document.createElement("div");  
    this.div.id=id;  
    this.div.className="bs-form";
    this.div.style.display="none";  
    this.div.style.zIndex=100;
    this.div.style.position="absolute";
    document.body.appendChild(this.div);   
}


dynamicForm.prototype.fillForm = function(dataJson){
        var form=this;
        $('#'+this.div.id+'').bootstrapForm({
            width: 340,
            data: dataJson,
            onSelect: function(name) {
                if(name==undefined) return;
                form.process(name);
                form.hide();
            }
        });
}
dynamicForm.prototype.hide = function()
{                
    this.div.style.display="none";
    this.clearForm();
    this.init();
    this.visible=false;
}
dynamicForm.prototype.getBdFloo = function(){    
    if(this.floor==="")
    {        
        if(this.viewer.curFloor!=undefined)
            this.floor=this.viewer.curBuilding.getPosById(this.viewer.curFloor.id);
    }
    if(this.building==="")
    {        
        if(this.viewer.curBuilding!=undefined)
            this.building=this.viewer.bdList.getPosById(this.viewer.curBuilding.id);
    }
}
dynamicForm.prototype.show = function(x,y){
    if(this.enabled==false) return;
    this.clearForm();    
    this.getBdFloo();
    var data=this.getJsonDataofForm();
    this.fillForm(data);
    this.fillActioin();
    this.fadeTool.fadeIn(this.div);
    if(x==undefined)
        this.fadeTool.MoveFloatLayer(this.div.id);
    else
        this.fadeTool.MoveFloatLayer(this.div.id,x,y);
    this.visible=true;
}
dynamicForm.prototype.clearForm = function (){
    this.clearDiv(this.div);
 }
 
dynamicForm.prototype.clearDiv = function (div){
    var chld = div.children;
    for(var item=0;item<chld.length;item++)
    {
        div.removeChild(chld[item]);
    }
 }
 
dynamicForm.prototype.isInForm = function(x,y)
{
    return this.isInDiv(this.div,x,y);
}
dynamicForm.prototype.isInDiv = function(div,x,y)
{
    var divx1,divx2,divy1,divy2;
    if(div!=null)
    {
        divx1 = div.offsetLeft;  
        divy1 = div.offsetTop;  
        divx2 = div.offsetLeft + div.offsetWidth;  
        divy2 = div.offsetTop + div.offsetHeight;  
                        
        if( x > divx1 && x < divx2 && y > divy1 && y < divy2)
        {                     
            // console.log("Mouse: ",x,", ",y," Rect: ",divx1,divy1,divx2,divy2);
            return true;
        }
        else
            return false;        
    }
    return false;
} 
 
dynamicForm.prototype.getJsonDataofForm = function()
{
    var dataJson="[]";
    switch(this.div.id)
    {
        case 'form-new':
            dataJson=this.getJsonDataofFormNew();
        break;
    }
    return dataJson;
}

dynamicForm.prototype.getJsonDataofFormDefault = function()
{
    var formFirstlist=new Array();
    formFirstlist.push({
                        id: 'form_input_ID',
                        name: 'id',
                        title: 'ID',
                        holder: '请输入ID...',
                        divName: 'input',
                        type: 'text',
                        className: 'span4'
                    });
    formFirstlist.push({
                        id: 'form_input_Name',
                        name: 'name',
                        title: '名称',
                        holder: '请输入名称...',
                        divName: 'input',
                        type: 'text',
                        className: 'span4'
                    });
    formFirstlist.push({
                        id: 'form_input_Model',
                        name: 'model',
                        title: '模型文件',
                        holder: '请输入模型文件名称...',
                        divName: 'input',
                        type: 'text',
                        className: 'span4'
                    });
    formFirstlist.push({
                        id: 'form_input_Info',
                        name: 'info',
                        title: '信息',
                        holder: '请输入信息...',
                        divName: 'textarea',
                        type: 'textarea',
                        className: '"span4 area"'
                    });
    var buttonlist=new Array();
    buttonlist.push({
                    id: 'form_button_ok',
                    name: 'form_button_ok',
                    title: '确定',
                    divName: 'button',
                    className: '"btn btn-info"'
                });
    buttonlist.push({
                    id: 'form_button_cancel',
                    name: 'form_button_cancel',
                    title: '取消',
                    divName: 'button',
                    className: '"btn btn-warning"'
                });
    formFirstlist.push({
                    id: 'form_buttons',
                    name: 'form_buttons',
                    divName: 'buttons',
                    children: buttonlist,
                });
   var dataJson= [{
                    id: 'menu_edit',
                    name: 'menu_edit',
                    title: this.title,
                    divName: 'div',
                    children: formFirstlist,
                    className: '"well span4"'
                }];
    return dataJson;
}