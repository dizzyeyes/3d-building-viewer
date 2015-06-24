function popUpMenu(id,viewer){
    if(id==undefined) id="popupmenu";
    this.viewer=viewer;
    this.initMenu(id);
    this.visible=false;
    this.fromMenu=false;    
    this.fadeTool= new fadeInOutTool();
    this.enabled = true;
}
popUpMenu.prototype.initMenu = function(id){
    this.div = document.createElement("div");  
    this.div.id=id;  
    this.div.className="bs-menu";
    this.div.style.display="none";  
    this.div.style.zIndex=100;
    document.body.appendChild(this.div);   
}

popUpMenu.prototype.fillMenu = function(dataJson){
        var menu=this;
        $('#'+this.div.id+'').bootstrapMenu({
            width: 180,
            isOpen: true,
            data: dataJson,                        
            onToggle: function(index) {
                console.log(index);
            },
            onSelect: function(name) {
                if(name==undefined) return;
                if(menu.div.id=="popupmenu")
                    menu.process(name);
                if(menu.div.id=="popupmenu-new")
                    menu.processNew(name);
                menu.hide();
            }
        });
}
popUpMenu.prototype.hide = function()
{                
    this.div.style.display="none";
    this.clearMenu();
    this.visible=false;
}
popUpMenu.prototype.selectobj = function(obj)
{          
    this.obj=obj;
}
popUpMenu.prototype.show = function(x,y){
    if(this.enabled==false) return;
    this.clearMenu();
    var data=this.getJsonDataofMenu();
    this.fillMenu(data);
    this.fadeTool.fadeIn(this.div);
    this.fadeTool.MoveFloatLayer(this.div.id,x,y);
    this.visible=true;
}
popUpMenu.prototype.clearMenu = function (){
    this.clearDiv(this.div);
 }
 
popUpMenu.prototype.clearDiv = function (div){
    var chld = div.children;
    for(var item=0;item<chld.length;item++)
    {
        div.removeChild(chld[item]);
    }
 }
popUpMenu.prototype.isInMenu = function(x,y)
{//2级菜单
    if(this.visible==false) return false;
    if(this.isInDiv(this.div,x,y)==true) return true;
    var chld = this.div.children[0];
    x = x-this.div.offsetLeft;
    y = y-this.div.offsetTop;
    x = x-chld.offsetLeft;
    y = y-chld.offsetTop;
    for(var i=0;i<chld.childElementCount;i++)
    {
        var subchild=chld.children[i];
        var subx = x - subchild.offsetLeft;
        var suby = y - subchild.offsetTop;
        for(var j=0;j<subchild.childElementCount;j++)
        {
            if(this.isInDiv(subchild.children[j],subx,suby)==true) return true;
        }
    }
    return false;
}
popUpMenu.prototype.isInDiv = function(div,x,y)
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
popUpMenu.prototype.getJsonDataofMenu = function()
{
    var dataJson="[]";
    switch(this.div.id)
    {
        case 'popupmenu':
            dataJson=this.getJsonDataofPopMenu();
        break;
        case 'popupmenu-new':
            dataJson=this.getJsonDataofNewMenu();
        break;
    }
    return dataJson;
}
popUpMenu.prototype.getJsonDataofNewMenu = function()
{
    var popUpFirstlist=new Array();
    popUpFirstlist.push({
                    name: 'menu_file_exportFloor',
                    title: '&nbsp;&nbsp;导出当前'
                });    
    popUpFirstlist.push({
                        name: 'menu_file_exportAll',
                        title: '&nbsp;&nbsp;导出所有'
                    });
    popUpFirstlist.push({
                        name: 'menu_reload_help',
                        title: '&nbsp;&nbsp;说明'
                    });
    var popUp2ndlist=new Array();
    popUp2ndlist.push({
                    name: 'menu_new_Building',
                    title: '&nbsp;&nbsp;新建建筑物'
                });  
    popUp2ndlist.push({
                    name: 'menu_new_Floor',
                    title: '&nbsp;&nbsp;新建楼层'
                });  
    popUp2ndlist.push({
                    name: 'menu_new_Block',
                    title: '&nbsp;&nbsp;新建区块'
                });  
    popUp2ndlist.push({
                    name: 'menu_new_Brand',
                    title: '&nbsp;&nbsp;新建标志牌'
                });  
    popUp2ndlist.push({
                    name: 'menu_new_MPoint',
                    title: '&nbsp;&nbsp;新建测点'
                });  
    var popUp3rdlist=new Array();
    popUp3rdlist.push({
                    name: 'menu_manage_changeFloor',
                    title: '&nbsp;&nbsp;选择楼层'
                });
    popUp3rdlist.push({
                    name: 'menu_manage_Group',
                    title: '&nbsp;&nbsp;管理分组'
                });  
    popUp3rdlist.push({
                    name: 'menu_manage_Block',
                    title: '&nbsp;&nbsp;管理区块'
                });  
    popUp3rdlist.push({
                    name: 'menu_manage_Brand',
                    title: '&nbsp;&nbsp;管理标志牌'
                });  
    popUp3rdlist.push({
                    name: 'menu_manage_MPoint',
                    title: '&nbsp;&nbsp;管理测点'
                });   
   var dataJson= [{
                    name: 'menu_file',
                    title: '&nbsp;&nbsp;<font color="red">文件</font>',
                    icon: 'icons/Export.png',
                    children: popUpFirstlist
                }, {
                    name: 'menu_new',
                    title: '&nbsp;&nbsp;<font color="red">新建</font>',
                    icon: 'icons/newBlock.png',
                    children: popUp2ndlist
                }, {
                    name: 'menu_manage',
                    title: '&nbsp;&nbsp;<font color="red">管理</font>',
                    icon: 'icons/manageGroup.png',
                    children: popUp3rdlist
                },{
                    name: 'menu_reload',
                    title: '&nbsp;&nbsp;<font color="red">重新加载</font>',
                    icon: 'icons/Import.png',
                    children: [{
                        name: 'menu_reload_reload',
                        title: '&nbsp;&nbsp;重新加载',
                        url: './'
                    } , {
                        name: 'menu_reload_help',
                        title: '&nbsp;&nbsp;说明'
                    }]
                }];
    return dataJson;
}
popUpMenu.prototype.getJsonDataofPopMenu = function()
{
    var popUpFirstlist=new Array();
    popUpFirstlist.push({
                        name: 'menu_changeID',
                        title: '&nbsp;&nbsp;修改ID'
                    });    
    popUpFirstlist.push({
                        name: 'menu_copy',
                        title: '&nbsp;&nbsp;复制'
                    });
    popUpFirstlist.push({
                        name: 'menu_delete',
                        title: '&nbsp;&nbsp;删除'
                    });
    var titlehl="高亮";
    if(this.obj.highlighted==true) titlehl="取消高亮";
    popUpFirstlist.push({
                        name: 'menu_highlight',
                        title: '&nbsp;&nbsp;'+titlehl
                    }); 
    var titleinv="显示";
    if(this.obj.visible==true) titleinv="隐藏";
    popUpFirstlist.push({
                        name: 'menu_invisible',
                        title: '&nbsp;&nbsp;'+titleinv
                    });
   var dataJson= [{
                    name: 'menu_edit',
                    title: '&nbsp;&nbsp;<font color="red">编辑</font>',
                    icon: 'icons/manageBlock.png',
                    children: popUpFirstlist
                }, {
                    name: 'menu_tmp',
                    title: '&nbsp;&nbsp;<font color="red">设置温度</font>',
                    icon: 'icons/manageMPoint.png',
                    children: [{
                        name: 'menu_low_tmp',
                        title: '&nbsp;&nbsp;温度过低'
                    },{
                        name: 'menu_mid_tmp',
                        title: '&nbsp;&nbsp;温度适中'
                    },{
                        name: 'menu_high_tmp',
                        title: '&nbsp;&nbsp;温度过高'
                    }]
                }];
    return dataJson;
}