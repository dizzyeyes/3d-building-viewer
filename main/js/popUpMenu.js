function popUpMenu(id,obj){
    if(id==undefined) id="menu";
    this.initMenu(id);
    this.visible=false;
    if(obj!=undefined)
        this.obj=obj;
    this.fromMenu=false;
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
                menu.process(name);
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
popUpMenu.prototype.show = function(obj,x,y){    
    this.clearMenu();
    this.obj=obj;
    var data=this.getJsonDataofMenu(obj);
    this.fillMenu(data);
    fadeIn(this.div);
    MoveFloatLayer(this.div.id,x,y);
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
popUpMenu.prototype.getJsonDataofMenu = function(obj)
{
    var popUpFirstlist=new Array();
    if(obj.type=="mpoint")
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
    if(obj.highlighted==true) titlehl="取消高亮";
    popUpFirstlist.push({
                        name: 'menu_highlight',
                        title: '&nbsp;&nbsp;'+titlehl
                    }); 
    var titleinv="显示";
    if(obj.visible==true) titleinv="隐藏";
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