function dynamicTable(viewer,title,divid,tableid){     
    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['zh-CN']); 
    if(divid==undefined) divid="table-manage";
    if(tableid==undefined) tableid="manage-table";
    this.id = tableid;
    this.viewer=viewer;
    this.createTable(divid);
    this.fadeTool= new fadeInOutTool();
    if(title==undefined) title='untitled';
    this.title=title;  
    this.floor="";
    this.building="";
    this.parents = new Array();
    this.closelight = true;
    this.init();
    
    document.dynamictable = this;
    window.dynamictable = this;
   
    document.addEventListener( 'mousemove', this.onMouseMove, false );
    window.addEventListener( 'resize', this.onWindowResize, false );    
    
    this.operateEvents1 = {
        'click .detail': function (e, value, row, index) {
            // 弹出查看分组框
            dynamictable.TableDetail(row,index);
        },
        'click .edit': function (e, value, row, index) {
            // 弹出编辑框
            dynamictable.TableEdit(row,index);
        },
        'click .remove': function (e, value, row, index) {
            // 直接删除
            dynamictable.TableRemoveById(row['id']);
        }
    };        
    this.operateEvents2 = {
        'click .toshow': function (e, value, row, index) {
            // 显示
            dynamictable.TableHideItem(row,true);
        },
        'click .tohide': function (e, value, row, index) {
            // 隐藏
            dynamictable.TableHideItem(row,false);
        }
    };        
    this.operateEvents3 = {
        'click .tohighlight': function (e, value, row, index) {
            // 高亮
            dynamictable.TableHighLightItem(row,true);
        },
        'click .toopenlight': function (e, value, row, index) {
            // 高亮
            dynamictable.TableHighLightItem(row,false);
        }
    };
}

dynamicTable.prototype.init = function()
{    
    this.enabled = true;
    this.visible = false;   
}
dynamicTable.prototype.onMouseMove = function(event)
{
    // if(this.dynamictable.isInTable(event.x,event.y)) console.log('在里边');
    // else console.log('出来了');
    this.dynamictable.fadeTool.onMoveDiv(event);
}
dynamicTable.prototype.onWindowResize = function(event)
{
    this.dynamictable.fadeTool.MoveFloatLayer(this.dynamictable.div.id);
}

dynamicTable.prototype.createTable = function(id){
    this.div = document.createElement("div");  
    this.div.id=id;  
    this.div.className="container";
    this.div.style.display="none";  
    this.div.style.zIndex=100;
    this.div.style.position="absolute";
    document.body.appendChild(this.div);   
}

dynamicTable.prototype.fillTable = function(dataJson){
        var table=this;
        $('#'+this.div.id+'').bootstrapTabledy({
            width: 820,
            data: dataJson
        });
}
dynamicTable.prototype.hide = function(deeper)
{                
    this.div.style.display="none";
    this.clearTable();
    this.init();
    if(deeper==undefined)
        this.recoverParentTable();
}
dynamicTable.prototype.recoverParentTable = function()
{     
    if(this.parents.length==0) return;
    var parent = this.parents.pop();
    this.title = parent;
    this.TableShow();
}
dynamicTable.prototype.getBdFloo = function(){    
    if(this.floor==="")
    {        
        if(this.viewer.curFloor!=undefined)
            this.floor=this.viewer.params.floor;
    }
    if(this.building==="")
    {        
        if(this.viewer.curBuilding!=undefined)
            this.building=this.viewer.params.building;
    }
}
dynamicTable.prototype.construct = function(x,y){
    if(this.enabled==false) return;
    this.clearTable();    
    this.getBdFloo();
    var data=this.getJsonDataofTable();
    this.fillTable(data);
    this.fillAction();
    this.fadeTool.fadeIn(this.div);
    if(x==undefined)
        this.fadeTool.MoveFloatLayer(this.div.id);
    else
        this.fadeTool.MoveFloatLayer(this.div.id,x,y);
    this.visible=true;
}
dynamicTable.prototype.clearTable = function (){
    this.clearDiv(this.div);
 }
 
dynamicTable.prototype.clearDiv = function (div){
    var chld = div.children;
    for(var item=0;item<chld.length;item++)
    {
        div.removeChild(chld[item]);
    }
 }
 
dynamicTable.prototype.isInTable = function(x,y)
{
    return this.isInDiv(this.div,x,y);
}
dynamicTable.prototype.isInDiv = function(div,x,y)
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
 
dynamicTable.prototype.getJsonDataofTable = function()
{
    var dataJson="[]";
    switch(this.div.id)
    {
        case 'table-manage':
            dataJson=this.getJsonDataofTableDefault();
        break;
    }
    return dataJson;
}

dynamicTable.prototype.getJsonDataofTableDefault = function()
{
    var tableBody=new Array();
    var tableHeader=new Array();
    var toolbarlist=new Array();
    toolbarlist.push({
                    id: 'append_data',
                    name: 'append_data',
                    title: '添加',
                    divName: 'button',
                    className: '"btn btn-default btn-small"'
                });
    toolbarlist.push({
                    id: 'remove_data',
                    name: 'remove_data',
                    title: '删除',
                    divName: 'button',
                    className: '"btn btn-default btn-small"'
                });
    toolbarlist.push({
                    id: 'show_data',
                    name: 'show_data',
                    title: '显示',
                    divName: 'button',
                    className: '"btn btn-default btn-small"'
                });
    toolbarlist.push({
                    id: 'hide_data',
                    name: 'hide_data',
                    title: '隐藏',
                    divName: 'button',
                    className: '"btn btn-default btn-small"'
                });
    toolbarlist.push({
                    id: 'highlight_data',
                    name: 'highlight_data',
                    title: '高亮',
                    divName: 'button',
                    className: '"btn btn-default btn-small"'
                });
    toolbarlist.push({
                    id: 'chighlight_data',
                    name: 'chighlight_data',
                    title: '恢复',
                    divName: 'button',
                    className: '"btn btn-default btn-small"'
                });
    tableHeader.push({
                    id: 'form-inline',
                    name: 'form-inline',
                    divName: 'div',
                    children: toolbarlist,
                    className: 'form-inline',
                    role: "form",
                    style: '"float: left"'
                });
    tableBody.push({
                    id: 'toolbar',
                    name: 'toolbar',
                    divName: 'div',
                    children: tableHeader
                });
                
    var tableMainBody=new Array();
    var tableTheadlist=new Array();
    var tableTRlist=new Array();
    
    tableTRlist.push({
                    id: 'state',
                    divName: 'th',
                    checkbox: true
                    });
    tableTRlist.push({
                    id: 'id',
                    divName: 'th',
                    edit: true,
                    sort: true,
                    checkbox: false,
                    innerHTML: 'ID'
                    });    
    if(this.title.substr(-4)!="分组详情")
    {
        tableTRlist.push({
                        id: 'name',
                        divName: 'th',
                        edit: true,
                        sort: true,
                        checkbox: false,
                        innerHTML: '组名'
                        });
        tableTRlist.push({
                        id: 'info',
                        divName: 'th',
                        edit: true,
                        sort: false,
                        checkbox: false,
                        innerHTML: '信息'
                        });
    }
    tableTRlist.push({
                    id: 'operate1',
                    divName: 'th',
                    dataformatter: 'window.dynamictable.operateFormatter1',
                    dataevents: 'window.dynamictable.operateEvents1',
                    width: '70',
                    innerHTML: '编辑'
                    });
    tableTRlist.push({
                    id: 'operate2',
                    divName: 'th',
                    dataformatter: 'window.dynamictable.operateFormatter2',
                    dataevents: 'window.dynamictable.operateEvents2',
                    width: '70',
                    innerHTML: '隐藏'
                    });
    tableTRlist.push({
                    id: 'operate3',
                    divName: 'th',
                    dataformatter: 'window.dynamictable.operateFormatter3',
                    dataevents: 'window.dynamictable.operateEvents3',
                    width: '70',
                    innerHTML: '高亮'
                    });
    tableTheadlist.push({
                    id: 'tr_column',
                    name: 'tr_column',
                    divName: 'tr',
                    children: tableTRlist
                    });
    tableMainBody.push({
                    id: 'thead',
                    name: 'thead',
                    divName: 'thead',
                    children: tableTheadlist
                });
    tableBody.push({
                    id: this.id,
                    name: this.id,
                    divName: 'table',
                    className: '"table table-striped"',                    
                   data_toolbar: "#toolbar",
                   data_pagination:"true",
                   data_show_export:"true",
                   data_search:"true",
                   data_search_align:"right",
                   data_show_columns:"true",
                   data_page_list:"[5,10,20,50,100]",
                   data_page_size:"5",
                   data_key_events:"false",
                    data_sort_name:"id",
                    data_click_to_select:"true",
                    data_height:"295",
                    children: tableMainBody
                });
   var dataJson= [{
                    id: 'menu_edit',
                    name: 'menu_edit',
                    title: this.title,
                    divName: 'div',
                    children: tableBody,
                    className: '"well span10"'
                }];
    return dataJson;
}

dynamicTable.prototype.operateFormatter1 = function(value, row, index) {
    var iconstyle="icon-map-marker";
    if( window.dynamictable.title=="分组管理")
        iconstyle="icon-list";
        
    return [
        '<a class="edit" href="javascript:void(0)" title="编辑">',
        '<i class="'+iconstyle+'"></i>',
        '</a>&nbsp;',
        '<a class="remove" href="javascript:void(0)" title="删除">',
        '<i class="icon-trash"></i>',
        '</a>'
    ].join('');
}
dynamicTable.prototype.operateFormatter2 = function(value, row, index) {
    return [
        '<a class="toshow" href="javascript:void(0)" title="显示">',
        '<i class="icon-eye-open"></i>',
        '</a>&nbsp;&nbsp;',
        '<a class="tohide" href="javascript:void(0)" title="隐藏">',
        '<i class="icon-eye-close"></i>',
        '</a>'
    ].join('');
}
dynamicTable.prototype.operateFormatter3 = function(value, row, index) {
    return [
        '<a class="tohighlight" href="javascript:void(0)" title="高亮">',
        '<i class="icon-fire"></i>',
        '</a>&nbsp;&nbsp;',
        '<a class="toopenlight" href="javascript:void(0)" title="开灯">',
        '<i class="icon-refresh"></i>',
        '</a>'
    ].join('');
}
