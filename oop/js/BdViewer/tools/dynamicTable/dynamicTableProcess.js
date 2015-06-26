

///////////////////////////////////TableProcess.js///////////////////////////////////////////

dynamicTable.prototype.TableLoad = function(dataJson)
{
    var data = dataJson;
	this.table.bootstrapTable('load', data);
    this.table.bootstrapTable({data: data});    
}
// 获取表格数据
dynamicTable.prototype.TableGetData = function()
{
    alert(JSON.stringify(this.table.bootstrapTable('getData')));
    return JSON.stringify(this.table.bootstrapTable('getData'));
}
//获取row的数据
dynamicTable.prototype.TableGetByRow = function(row)
{
    alert(JSON.stringify(row));
    return JSON.stringify(row);
}
//
dynamicTable.prototype.TableGetSelections = function()
{
    alert('getSelections: ' + JSON.stringify(this.table.bootstrapTable('getSelections')));
}

dynamicTable.prototype.TableHideItems = function(vis)
{
    var selects = this.table.bootstrapTable('getSelections');
    var scope = this;
    if(selects.length==0)
    {
        this.viewer.msgToolkit.alertError("未选中任何条目");
        return;
    }
    this.unselectObjectInTable();
   //移除table数据
    ids = $.map(selects, function(row) { 
        if(scope.title==="分组管理")
        {
            //group operation
            console.log('hiding group:',row['id']);
            var group = scope.viewer.curFloor.getGroupById(row['id']);
            scope.viewer.groupVisibleChange(scope.viewer.scene,scope.viewer.curFloor,group.name,vis);
        }
        else
        {
            //single operation
            console.log('hiding item:',row['id']);
            scope.viewer.objVisibleChange(scope.viewer.scene,row['id'],vis);
        }
        return row['id'];
    });    
    console.log("hidden items: ",ids);
    //TODO:场景、数据同步
}
dynamicTable.prototype.TableHideItem = function(row,vis)
{        
    this.unselectObjectInTable();
    if(this.title==="分组管理")
    {
        //group operation
        console.log('hide group',row['id'],vis);
        var group = this.viewer.curFloor.getGroupById(row['id']);
        this.viewer.groupVisibleChange(this.viewer.scene,this.viewer.curFloor,group.name,vis);  
    }
    else
    {
        //single operation
        console.log('hide item',row['id'],vis);
        this.viewer.objVisibleChange(this.viewer.scene,row['id'],vis);             
        this.selectObjectInTable(row['id']);   
    }
}

dynamicTable.prototype.TableHighLightItems = function(highlight)
{
    var mode="no";
    var scope = this;
    if(highlight==false)
    {
        this.unselectObjectInTable();
        //open light
        console.log('open light');
        if(mode=="vis") this.viewer.setSceneVis(true);
        else this.viewer.setSceneHight(false);
        return;
    }
    var selects = this.table.bootstrapTable('getSelections');
    if(selects.length==0)
    {
        this.viewer.msgToolkit.alertError("未选中任何条目");
        return;
    }
    this.unselectObjectInTable();
    //close light    
    console.log('close light');    
    if(this.closelight)
    {
        if(mode=="vis") this.viewer.setSceneVis(false);
        else this.viewer.setSceneHight(true);
    }
   //移除table数据
    ids = $.map(selects, function(row) { 
        if(scope.title==="分组管理")
        {
            //group operation
            console.log('highlighting group',row['id']);
            var group = scope.viewer.curFloor.getGroupById(row['id']);
            if(mode=="vis") scope.viewer.groupVisibleChange(scope.viewer.scene,scope.viewer.curFloor,group.name,true);
            else scope.viewer.highlightGroup(scope.viewer.scene,scope.viewer.curFloor,group.name,true);
        }
        else
        {
            //single operation
            console.log('highlighting item',row['id']);
            if(mode=="vis") scope.viewer.objVisibleChange(scope.viewer.scene,row['id'],true);
            else scope.viewer.highlightObject(scope.viewer.scene,row['id'],true)
        }
        return row['id'];
    });  
    console.log("highlighted items: ",ids);
}
dynamicTable.prototype.TableHighLightItem = function(row,highlight)
{     
    var mode="no";    
    this.unselectObjectInTable();
    //open light
    console.log((highlight)?'close light':'open light');
    if(highlight==false)
    {
        if(mode=="vis") this.viewer.setSceneVis(!highlight);
        else this.viewer.setSceneHight(highlight);
        return;        
    }
    if(this.closelight)
    {
        if(mode=="vis") this.viewer.setSceneVis(!highlight);
        else this.viewer.setSceneHight(highlight);
    }
    if(this.title==="分组管理")
    {
        //group option
        console.log('highlighting group',row['id']);
        var group = this.viewer.curFloor.getGroupById(row['id']);
        if(mode=="vis") this.viewer.groupVisibleChange(this.viewer.scene,this.viewer.curFloor,group.name,true);  
        else this.viewer.highlightGroup(this.viewer.scene,this.viewer.curFloor,group.name,true);
    }
    else
    {
        //single option
        console.log('highlighting item',row['id']);
        if(mode=="vis") this.viewer.objVisibleChange(this.viewer.scene,row['id'],true);
        else this.viewer.highlightObject(this.viewer.scene,row['id'],true);
        this.selectObjectInTable(row['id']);        
    }
}

dynamicTable.prototype.TableAppend = function(id)
{
    this.unselectObjectInTable();
    if(this.title.substr(-4)=="分组详情")
    {
        if(id==undefined) 
            this.viewer.msgToolkit.alertInfo('拖拽物体到表格中，以实现添加');
        else
        {            
            if(this.viewer.curGroup.checkById(id))
            {
                this.viewer.msgToolkit.alertError(id+" 已存在分组中");
                return;
            }
            this.viewer.curGroup.addItem(id);
            var addDataJson = this.fromListToJson([id]);
            this.table.bootstrapTable('append', addDataJson);
        }
    }
    else
    {
        this.TableHide();
        this.viewer.isFromTable = true;
        switch(this.title)
        {
            case "例子管理":
                console.log("添加数据");
            break;
            case "分组管理":
                this.viewer.newGroup_Form();
            break;
            case "区块管理":
                this.viewer.newBlock_Form();
            break;
            case "测点管理":
                this.viewer.newMPoint_Form();
            break;
            case "标志牌管理":
                this.viewer.newBrand_Form();
            break;
        }
    }
    //TODO:弹框
    //添加addDataJson到Grouplist数据
    //添加到$table中
    // this.table.bootstrapTable('append', addDataJson);
    // TableShow();
}
dynamicTable.prototype.TableDetail = function(row,index)
{
    // this.viewer.msgToolkit.alertError("开发中。。");
    // return;
    this.unselectObjectInTable();
    var id=row['id'];
    console.log("查看信息");
    switch(this.title)
    {
        case "分组管理":    
            //this.viewer.msgToolkit.alertError("开发中。。");
            var group = this.viewer.curFloor.getGroupById(row['id']);
            this.viewer.msgToolkit.alertMsg(["",group.info]);
        return;
        break;
        case "区块管理":
        case "测点管理":
        case "测点管理":
                var obj = this.viewer.curFloor.getObjectById(row['id']);
                this.viewer.msgToolkit.alertMsg(["",obj.info]);
        break;        
        default:
            if(this.title.substr(-4)=="分组详情")
            {
                var obj = this.viewer.curFloor.getObjectById(row['id']);
                this.viewer.msgToolkit.alertMsg(["",obj.info]);
            }
        break;
        
    }
}
dynamicTable.prototype.TableEdit = function(row,index)
{    
    this.unselectObjectInTable();
    var id=row['id'];
    console.log("编辑信息");
    switch(this.title)
    {
        case "例子管理":
            console.log('editing item',id);
        break;
        case "分组管理":  
            this.TableHide();
            this.viewer.manageSubGroup(id);
        break;
        case "区块管理":
        case "测点管理":   
        case "标志牌管理":
                this.selectObjectInTable(row['id']);
        break;
        default:
            if(this.title.substr(-4)=="分组详情")
                this.selectObjectInTable(row['id']);
        break;
    }
}
dynamicTable.prototype.selectObjectInTable = function(id)
{
    //select obj
    this.viewer.INTERSECTED = this.viewer.scene.getObjectByModelId(id).children[0]; 
    this.viewer.selectObject(this.viewer.INTERSECTED);
}
dynamicTable.prototype.unselectObjectInTable = function()
{
    this.viewer.unSelectObject(true);
}
dynamicTable.prototype.TableRemoveSelected = function()
{
    this.unselectObjectInTable();
   //根据selects.id为GroupId，删除Grouplist中的数据
    var selects = this.table.bootstrapTable('getSelections');
    var scope = this;
   //移除table数据
    if(selects.length==0)
    {
        this.viewer.msgToolkit.alertError("未选中任何条目");
        return;
    }
    ids = $.map(selects, function(row) { 
        return row['id'];
    });
    var ret = confirm("删除 "+ids+" 吗？");
    if(ret==false) return;
    
    ids = $.map(selects, function(row) {        
        if(scope.title=="分组管理")
        {
            //group option
            console.log('removing group:',row['id']);
            scope.viewer.curFloor.removeGroupById(row['id']);
        }
        else if(scope.title.substr(-4)=="分组详情")
        {
            scope.viewer.curGroup.removeById(row['id']);
        }
        else
        {
            //remove every sigle
            console.log('removing item:',row['id']);
            scope.viewer.removeObjById(scope.viewer.scene,scope.viewer.curFloor,row['id']);
        }
        return row['id'];
    });
    
    this.table.bootstrapTable('remove', {
        field: 'id',
        values: ids
    });
    console.log("removed items:",ids);
    //TODO:场景、数据同步
}
dynamicTable.prototype.TableRemoveById = function(id)
{
    this.unselectObjectInTable();
    //根据id为GroupId，删除Grouplist中的数据
    //移除table数据
    var ret=confirm("删除 "+id+" 吗？");
    if(ret==false) return;
    ids = [id];
    this.table.bootstrapTable('remove', {
        field: 'id',
        values: ids
    });
    //TODO:数据、场景同步
    console.log("item removed:",ids);
    if(this.title==="分组管理")
    {
        //group option
        console.log('removing group',id);
        this.viewer.curFloor.removeGroupById(id);
    }
    else if(this.title.substr(-4)=="分组详情")
    {        
        this.viewer.curGroup.removeById(id);
    }
    else
    {
        //single option
        console.log('removing item',id);
        this.viewer.removeObjById(this.viewer.scene,this.viewer.curFloor,id);
    }
}
//刷新表格
dynamicTable.prototype.TableRefresh = function()
{
    console.log("刷新列表");
    this.table.bootstrapTable('refresh', {silent: true});
}

dynamicTable.prototype.TableDetory = function()
{
    this.table.bootstrapTable('destroy');
}
// 隐藏表格
dynamicTable.prototype.TableHide = function()
{   
    this.TableDetory();
    this.hide();
    //清理数据
    this.viewer.unlockMenu(true);
}
// 显示表格
dynamicTable.prototype.TableShow = function()
{    
    this.viewer.unlockMenu(false);
    this.unselectObjectInTable();
    
    this.construct();    
    this.table = $('#'+this.id); 
    
    var tabletype = this.title;
    this.TableDetory();
    this.fadeTool.fadeIn(this.div);
    this.fadeTool.MoveFloatLayer(this.div.id); 
    var columDataFieldStrings = this.getTableDataField(tabletype);
    var columnNameStrings = this.getTableColumnNames(tabletype);
    var columNames = iBase.Id('tr_column');
    for(var item=0;item<columNames.childElementCount;item++)
    {
        if(columnNameStrings[item]!=undefined)
            columNames.children[item].innerHTML=columnNameStrings[item];
        if(columDataFieldStrings[item]!=undefined)
            columNames.children[item].setAttribute("data-field",columDataFieldStrings[item]);
    }
    //获取数据
    var dataJson=this.getJsonDataOfTable(tabletype);
    //填充数据
    this.TableLoad(dataJson);
    this.fadeTool.MoveFloatLayer(this.div.id); 
}
dynamicTable.prototype.duplicateId = function(submitValue)
{
    var ret = null;
    switch(this.title)
    {
        case "例子管理":
           ret= null;
        break;
        case "标志牌管理":
        case "测点管理":
        case "区块管理":
           ret = this.viewer.curFloor.getObjectById(submitValue);
        break;
        case "分组管理":
           ret = this.viewer.curFloor.getGroupById(submitValue);
        break;
    }
    if(ret==null)
        return false;
    return true;
}
dynamicTable.prototype.asynTableData = function(row,field,submitValue)
{
    if(this.title.substr(-4)=="分组详情")
    {
            if(field=='id')
            {
                var alertmsg;
                if(this.viewer.params.mode_edit==true)
                {
                    if(this.viewer.curGroup.getObjectById(submitValue)==null)
                    {
                        if(this.viewer.curFloor.getObjectById(submitValue)!=null)
                        {                        
                            this.viewer.curGroup.removeById(row[field]);
                            this.viewer.curGroup.addItem(submitValue);
                            return true;
                        }
                        else alertmsg="ID不存在";
                    }
                    else alertmsg="ID不能重复"; 
                }                    
                else alertmsg="当前非编辑模式";  
                var dataJson = this.getJsonDataOfTable(this.title);
                this.TableLoad(dataJson);
                this.viewer.msgToolkit.alertError(alertmsg);
                return false;
            }
    }
    else
    {
            if(this.viewer.params.mode_edit==false)
            {
                var dataJson = this.getJsonDataOfTable(this.title);
                this.TableLoad(dataJson);
                this.viewer.msgToolkit.alertError("当前非编辑模式");
                return false;
            }
            var title = this.title;
            if(field=='id')//改ID
            {
                if(this.duplicateId(submitValue)==true)
                {
                    var dataJson = this.getJsonDataOfTable(this.title);
                    this.TableLoad(dataJson);
                    this.viewer.msgToolkit.alertError("ID不能重复");
                    return false;
                }
                else
                {
                    if(title=="分组管理")
                    {
                        var obj = this.viewer.curFloor.getGroupById(row[field]);
                        obj.id = submitValue;
                    }
                    else
                    {
                        if(this.viewer.curFloor.changeObjectId(row[field],submitValue)==false)
                        {
                            var dataJson = this.getJsonDataOfTable(this.title);
                            this.TableLoad(dataJson);
                            this.viewer.msgToolkit.alertError("ID不能重复");
                            return false;
                        }
                        var objsc = this.viewer.scene.getObjectByModelId(row[field]);
                        objsc.modelid = submitValue;                        
                    }
                }
            }
            else if(field=='infoShort')
            {
                if(title=="分组管理")
                {
                    var obj = this.viewer.curFloor.getGroupById(row['id']);
                    obj['info'] = submitValue;
                    obj['infoShort'] = submitValue.slice(0,30);
                }
                else
                {
                    var obj = this.viewer.curFloor.getObjectById(row['id']);
                    obj['info'] = submitValue; 
                    obj['infoShort'] = submitValue.slice(0,30); 
                    var objsc = this.viewer.scene.getObjectByModelId(row['id']);
                    objsc['info'] = submitValue;                    
                }                
                var dataJson = this.getJsonDataOfTable(this.title);
                this.TableLoad(dataJson);
            }
            else//改其他
            {
                if(title=="分组管理")
                {
                    var obj = this.viewer.curFloor.getGroupById(row['id']);
                    obj[field] = submitValue;
                }
                else
                {
                    var obj = this.viewer.curFloor.getObjectById(row['id']);
                    obj[field] = submitValue; 
                    var objsc = this.viewer.scene.getObjectByModelId(row['id']);
                    if(field=="name") field="model"+field;
                    objsc[field] = submitValue;                    
                }
            }            
    }
    return true;
}
dynamicTable.prototype.getTableDataField = function(tabletype)
{
    var columDataField;
    switch(tabletype)
    {
        case "分组管理":
        case "例子管理":
            columDataField={
                    1: "id",
                    2: "name",
                    3: "info"
                };
        break;
        case "区块管理":
            columDataField={
                    1: "id",
                    2: "name",
                    3: "info"
                };
        break;
        case "测点管理":
            columDataField={
                    1: "id",
                    2: "name",
                    3: "type"
                };
        break;
        case "标志牌管理":
            columDataField={
                    1: "id",
                    2: "name",
                    3: "info"
                };
        break;
        default:        
            if(this.title.substr(-4)=="分组详情")
                columDataField={
                        1: "id"
                    };
        break;
    }
    return columDataField;
}
dynamicTable.prototype.getTableColumnNames = function(tabletype)
{
    var columnNames;
    switch(tabletype)
    {
        case "分组管理":
        case "例子管理":
            columnNames={
                    1: "ID",
                    2: "组名",
                    3: "分组信息"
                };
        break;
        case "区块管理":
            columnNames={
                    1: "ID",
                    2: "区块名称",
                    3: "区块信息"
                };
        break;
        case "测点管理":
            columnNames={
                    1: "ID",
                    2: "测点名称",
                    3: "标签"
                };
        break;  
        case "标志牌管理":
            columnNames={
                    1: "ID",
                    2: "标志牌名称",
                    3: "标志牌信息"
                };
        break;
        default:
            if(this.title.substr(-4)=="分组详情")
                columnNames={
                        1: "ID"
                    };
        break;        
    }
    return columnNames;
}
dynamicTable.prototype.fromListToJson = function(list)
{
    var jsonString="[";
    var jsonbody="";
    for(var item=0;item<list.length;item++)
    {        
        jsonbody+="{ 'id':'"+list[item];
        jsonbody+="'},";
    }
    jsonString+=jsonbody.slice(0,-1);
    jsonString+="]";
    return eval("("+jsonString+")");
}
dynamicTable.prototype.getDefaultJson = function()
{
    var dataJson=new Array();
    dataJson.push({
            id:"1",
            name:"哈哈",
            info:"信息为空"
    });
    dataJson.push({
            id:"2",
            name:"哈哈2",
            info:"信息为空2"
    });
    dataJson.push({
            id:"3",
            name:"哈哈2",
            info:"信息为空2"
    });
    dataJson.push({
            id:"4",
            name:"哈哈2",
            info:"信息为空2"
    });
    return dataJson;
}
dynamicTable.prototype.getJsonDataOfTable = function(tabletype)
{
    var jsonString;
    var dataJsontmp,dataJson;
    switch(tabletype)
    {
        case "例子管理":
            dataJson = this.getDefaultJson();
        break;
        case "分组管理":
            // jsonString=curFloor.GroupList.serializeJSON();
            jsonString= JSON.stringify(this.viewer.curFloor.GroupList,null, '    ' );
            dataJsontmp = eval("("+jsonString+")");
            dataJson = dataJsontmp.List;
        break;
        case "区块管理":
            // jsonString=curFloor.BlockList.serializeJSON();
            jsonString=JSON.stringify(this.viewer.curFloor.BlockList,null, '    ' );
            dataJsontmp = eval("("+jsonString+")");
            dataJson = dataJsontmp.List;
        break;
        case "测点管理":
            // jsonString=curFloor.MPointList.serializeJSON();
            jsonString= JSON.stringify(this.viewer.curFloor.MPointList,null, '    ' );
            dataJsontmp = eval("("+jsonString+")");
            dataJson = dataJsontmp.List;
        break;
        case "标志牌管理":
            jsonString= JSON.stringify(this.viewer.curFloor.BrandList,null, '    ' );
            dataJsontmp = eval("("+jsonString+")");
            dataJson = dataJsontmp.List;
        break;
        default:
            if(this.title.substr(-4)=="分组详情")
                dataJson=this.fromListToJson(this.viewer.curGroup.List);
        break;            
    }    
    return dataJson;
}
