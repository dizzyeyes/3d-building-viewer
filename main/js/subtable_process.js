function subTableLoad($sub_table,dataJson)
{
    var data = dataJson;
    $sub_table.bootstrapTable('load', data);
    $sub_table.bootstrapTable({data: data});
}
function subTableHideItems($sub_table,vis)
{
    unSelectObject(true);
    var selects = $sub_table.bootstrapTable('getSelections');
   //移除table数据
    ids = $.map(selects, function (row) { 
        objVisibleChange(scene,row['id'],vis);
        return row['id'];
    });    
    console.log("隐藏所选项：",ids);
    //TODO:场景、数据同步
}
function subTableHideItem(row,vis)
{   
    unSelectObject(true);
    objVisibleChange(scene,row['id'],vis);
    INTERSECTED=scene.getObjectByModelId(row['id']).children[0];
    selectObject(INTERSECTED);
}

function subTableAppend($sub_table,id)
{
    //添加addDataJson到Grouplist数据
    //添加到$sub_table中
    if(curGroup.checkById(id))
    {
        alertError(id+" 已存在分组中");
        return;
    }
    curGroup.addItem(id);
    var addDataJson = fromListToJson([id]);
    $sub_table.bootstrapTable('append', addDataJson);
}
function subTableEdit(row,index)
{
    if(!params.mode_edit)
    {
        alertError("当前非编辑模式");
        return;
    }
    // subTableHide($sub_table);
    var id=row['id'];
    console.log("编辑信息");
    var op;
    var obj=scene.getObjectByModelId(id);
    switch(obj.type)
    {
        case "block":
            op=0;                
            blockparams.title="区块";
        break;
        case "brand":
            op=1;  
            blockparams.title="标志牌";
        break;
        case "mpoint":
            op=2;  
            blockparams.title="测点";
        break;
    }
    
    INTERSECTED=obj.children[0];         
    
    fillBlockUI(blockparams,INTERSECTED);
    if(guiBrand==null||guiBrand==undefined)
        initBlockUI(blockparams,op);         
    alertInfo("请在右上角的编辑界面中编辑"+blockparams.title);
}
function subTableRemoveSelected($sub_table)
{
   //根据selects.id为GroupId，删除Grouplist中的数据
    var selects = $sub_table.bootstrapTable('getSelections');
   //移除table数据
    ids = $.map(selects, function (row) {  
        return row['id'];
    });
    if(ids.length==0)
    {
        alertError("未选中任何条目");
        return;
    }
    var ret=alertConfirm("从分组中删除 "+ids+" 吗？");
    if(ret==false) return;
    
    ids = $.map(selects, function (row) {    
        curGroup.removeById(row['id']);   
        return row['id'];
    });
    $sub_table.bootstrapTable('remove', {
        field: 'id',
        values: ids
    });
    console.log("删除所选项：",ids);
    //TODO:场景、数据同步
}
function subTableRemoveById($sub_table,id)
{
    //根据id为GroupId，删除Grouplist中的数据
    //移除table数据
    var ret=alertConfirm("从分组中删除 "+id+" 吗？");
    if(ret==false) return;
    ids = [id];
    $sub_table.bootstrapTable('remove', {
        field: 'id',
        values: ids
    });
    //TODO:数据、场景同步
    console.log("删除选项：",ids);
    curGroup.removeById(id);
}
// 隐藏表格
function subTableHide($sub_table)
{   
    lock_dock=false;
    fadeOut(iBase.Id('subtable_manage' ),1);
    //清理数据
    TableDetory($sub_table);
    TableShow(oManageDiv.tabletype);    
}
// 显示表格
function subTableShow(groupName)
{
    lock_dock=true;
	unSelectObject(true);
    alertInfo("将区块或测点拖拽到列表中实现添加");
    fadeIn(iBase.Id('subtable_manage'));
    MoveFloatLayer('subtable_manage'); 
    osubManageDiv.tabletype=groupName+" 分组";
    var tabletype="分组内容";
    TableDetory($sub_table);
    var columDataFieldStrings=getTableDataField(tabletype);
    var columnNameStrings=getTableColumnNames(tabletype);
    var columNames=iBase.Id('sub_tr_column');
    for(var item=0;item<columNames.childElementCount;item++)
    {
        if(columnNameStrings[item]!=undefined)
            columNames.children[item].innerHTML=columnNameStrings[item];
        if(columDataFieldStrings[item]!=undefined)
            columNames.children[item].setAttribute("data-field",columDataFieldStrings[item]);
    }
    iBase.Id("title-manage-sub").innerHTML=osubManageDiv.tabletype;
    //获取数据
    var dataJson=getJsonDataOfTable(tabletype);
    //填充数据
    subTableLoad($sub_table,dataJson);
    TableDetory($table);
	TableRefresh($sub_table);
    MoveFloatLayer('subtable_manage'); 
}