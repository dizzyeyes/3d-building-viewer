function importBuildingList_docm(obj)
{    
    console.log("1.开始导入...");
}
function exportBuildingList_docm(obj)
{
    if(lock_dock)
    {
        if(flag_addMPoint==true)
            alertError("添加测点中。。<br>（按下停止添加按钮或ESC键结束添加）");
        return;
    }
    toSaveAll(bdList,'xml');
    console.log("2.开始导出...");
}
function exportSingleFloor_docm(obj)
{
    if(lock_dock)
    {
        if(flag_addMPoint==true)
            alertError("添加测点中。。<br>（按下停止添加按钮或ESC键结束添加）");
        return;
    }
    toSaveFile(curFloor,'xml');
    console.log("3.开始导出当前楼层...");
}
function newBuilding_docm(obj)
{    
    console.log("4.新建建筑...");
    //typeahead初始化
    if(lock_dock)
    {
        if(flag_addMPoint==true)
            alertError("添加测点中。。<br>（按下停止添加按钮或ESC键结束添加）");
        return;
    }
    typeMeAhead('form_add_template','#inputId','./data/json/id/',null,'buildingid');
    typeMeAhead('form_add_template','#inputName','./data/json/name/',null,'buildingname');
    showDialogue('form_add_template',"新建建筑物");
    //弹出添加区块的对话框，输入信息，并添加到建筑物列表里。
}
function newGroup_docm(obj)
{    
    console.log("4.新建分组...");
    //typeahead初始化
    if(lock_dock)
    {
        if(flag_addMPoint==true)
            alertError("添加测点中。。<br>（按下停止添加按钮或ESC键结束添加）");
        return;
    }
    typeMeAhead('form_add_template','#inputId','./data/json/id/',null,'groupid');
    typeMeAhead('form_add_template','#inputName','./data/json/name/',null,'groupname');
    showDialogue('form_add_template',"新建分组");
    //弹出添加区块的对话框，输入信息，并添加到建筑物列表里。
}
function newFloor_docm(obj)
{    
    console.log("5.新建楼层...");
    //typeahead初始化
    if(lock_dock)
    {
        if(flag_addMPoint==true)
            alertError("添加测点中。。<br>（按下停止添加按钮或ESC键结束添加）");
        return;
    }
    typeMeAhead('form_add_template','#inputId','./data/json/id/',null,'floorid');
    typeMeAhead('form_add_template','#inputName','./data/json/name/',null,'floorname');
    typeMeAhead('form_add_template','#inputModel','./data/json/',null,'model'); 
    showDialogue('form_add_template',"新建楼层");
    //弹出添加区块的对话框，输入信息，并添加到楼层列表里。
}
function newBlock_docm(obj)
{      
    // mpointStop_dom();
    //typeahead初始化
    if(lock_dock)
    {
        if(flag_addMPoint==true)
            alertError("添加测点中。。<br>（按下停止添加按钮或ESC键结束添加）");
        return;
    }
    typeMeAhead('form_add_template','#inputId','./data/json/id/',null,'blockid');
    typeMeAhead('form_add_template','#inputName','./data/json/name/',null,'blockname');
    typeMeAhead('form_add_template','#inputModel','./data/json/',null,'model'); 
    showDialogue('form_add_template',"新建区块");
    console.log("6.新建区块...");
    //弹出添加区块的对话框
}
function newBrand_docm(obj)
{       
    // mpointStop_dom();
    //typeahead初始化
    if(lock_dock)
    {
        if(flag_addMPoint==true)
            alertError("添加测点中。。<br>（按下停止添加按钮或ESC键结束添加）");
        return;
    }
    typeMeAhead('form_add_template','#inputId','./data/json/id/',null,'brandid');
    typeMeAhead('form_add_template','#inputName','./data/json/name/',null,'brandname');
    typeMeAhead('form_add_template','#inputModel','./data/json/',null,'model'); 
    typeMeAhead('form_add_template','#inputImage','./data/json/',null,'brandimage'); 
    showDialogue('form_add_template',"新建标志牌");
    console.log("8.新建标志牌...");
    //弹出添加区块的对话框
}
function mpointStop_dom()
{
    if(flag_addMPoint==true)
    {
        var mpointLabel=document.getElementById("mpointLabel");
        var mpointLabelPic=document.getElementById("mpointLabelPic");
        flag_addMPoint=false;
        curMPoint = null;
        mpointLabelPic.src="icons/newMPoint.png";
        mpointLabel.innerHTML="添加测点";
        lock_dock=false;                               
        if(isBuildFromMngList)
        {
           TableShow(oManageDiv.tabletype);
           isBuildFromMngList=false;
        }
        alertInfo("结束添加测点");
        return true;
    }
    return false;
}
function newMPoint_docm(obj,keep)
{    
    if(lock_dock&&!flag_addMPoint) return;
    if(oManageDiv.style.display=="block"&&(keep==undefined||keep==false)) return;
    var mpointLabel=document.getElementById("mpointLabel");    
    if (mpointStop_dom())
    {
        cancelsubmitfun('form_add_template');
        return;
    }
    obj.src="icons/mpointStop.png";
    mpointLabel.innerHTML="停止添加测点";
    //typeahead初始化
    typeMeAhead('form_add_template','#inputId','./data/json/id/',null,'mpointid');
    typeMeAhead('form_add_template','#inputName','./data/json/name/',null,'mpointname');
    typeMeAhead('form_add_template','#inputModel','./data/json/',null,'model'); 
    typeMeAhead('form_add_template','#inputMPointType','./data/json/',null,'mpointtype'); 
    showDialogue('form_add_template',"新建测点");
    flag_addMPoint=true;
    // flag_addMPoint=!flag_addMPoint;
    // console.log("7.新建测点...");
    // //允许连续添加测点，变更button图标  
    // //向场景中添加点后，选择测点ID、名称等信息,代码添加于index.html鼠标事件
}
function manageGroup_docm(obj)
{    
    if(lock_dock)
    {
        if(flag_addMPoint==true)
            alertError("添加测点中。。<br>（按下停止添加按钮或ESC键结束添加）");
        return;
    }
    console.log("9.分组管理...");
    TableShow("分组管理");
    //弹出分组管理框
}
function manageBlock_docm(obj)
{    
    if(lock_dock)
    {
        if(flag_addMPoint==true)
            alertError("添加测点中。。<br>（按下停止添加按钮或ESC键结束添加）");
        return;
    }
    console.log("10.区块管理...");
    TableShow("区块管理");
    //弹出区块管理框
}
function manageMPoint_docm(obj)
{    
    if(lock_dock)
    {
        if(flag_addMPoint==true)
            alertError("添加测点中。。<br>（按下停止添加按钮或ESC键结束添加）");
        return;
    }
    console.log("11.测点管理...");
    TableShow("测点管理");
    //弹出测点管理框
}
function changeMPname_docm(obj,row)
{    
    if(lock_dock&&!popMenu.fromMenu)
    {
        if(flag_addMPoint==true)
            alertError("添加测点中。。<br>（按下停止添加按钮或ESC键结束添加）");
        return;
    }
    console.log("12.更改测点ID...");    
    typeMeAhead('form_add_template','#inputId','./data/json/id/',null,'mpointid');
    oFormDiv.inputId.value=row['id'];
    oFormDiv.inputId.oldid=row['id'];
    typeMeAhead('form_add_template','#inputName','./data/json/name/',null,'mpointname');
    oFormDiv.inputName.value=row['name'];
    showDialogue('form_add_template',"更改测点ID");
    //弹出测点管理框
}
function hideMenu_docm(obj)
{    
    hide_docmenu=!hide_docmenu;    
    if(hide_docmenu==true)
    {        
        hideDocMenu("none");
        console.log("13.隐藏...");
        obj.src="icons/hide.png";
    }
    else
    {        
        hideDocMenu("block");  
        obj.src="icons/show.png";     
    }
}