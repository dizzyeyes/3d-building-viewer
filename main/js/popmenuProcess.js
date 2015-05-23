popUpMenu.prototype.process = function(op)
{      
    console.log("处理操作："+op+" "+this.obj.modelid);
    switch(op)
    {
        case 'menu_changeID':
            var row={}; row.id=this.obj.modelid; row.name=this.obj.modelname;
            this.fromMenu=true;
            changeMPname_docm(obj,row);
        break;
        case 'menu_copy':
            this.copyObject_menu();
        break;
        case 'menu_delete':
            this.delObject_menu();
        break;
        case 'menu_highlight':
            this.setHighLight_menu();
        break;
        case 'menu_invisible':
            this.setVisible_menu();
        break;
        case 'menu_low_tmp':
            blockparams.temperature=0;
            this.updateGUI_temp_menu();            
        break;
        case 'menu_mid_tmp':
            blockparams.temperature=1;
            this.updateGUI_temp_menu();
        break;
        case 'menu_high_tmp':
            blockparams.temperature=2;
            this.updateGUI_temp_menu();
        break;
    }
}
popUpMenu.prototype.setHighLight_menu = function()
{    
    if(this.obj.highlighted)
    {                
        setSceneHight(false);
    }
    else
    {
        setSceneHight(true);
        highlightObject(scene,this.obj.modelid,true);
    }
}
popUpMenu.prototype.setVisible_menu = function()
{    
    if(this.obj.visible)
    {                
        objVisibleChange(scene,this.obj.modelid,false);
    }
    else
    {
        objVisibleChange(scene,this.obj.modelid,true);
    }
}
popUpMenu.prototype.updateGUI_temp_menu = function()
{    
    var color= new THREE.Color(colorlist[blockparams.temperature]/1);
    changeObjColor(scene,curFloor,blockparams.ID,color.getHex());
    blockparams.red=color.r*255;
    blockparams.green=color.g*255;
    blockparams.blue=color.b*255;
}
popUpMenu.prototype.copyObject_menu = function(obj)
{
    var shiftpos=10;
    if(obj==undefined) obj=this.obj;
    var oobj = curFloor.getObjectById(obj.modelid);
    var t_id = oobj.id + " - 副本";
    var t_name = oobj.name + " - 副本";
    var newid = t_id;var newname = t_name;
    var cnt = 0;    
    while(curFloor.getObjectById(newid)!=null)
    {
        cnt++;
        newid = t_id+" ("+cnt+")";
        newname = t_name+" ("+cnt+")";
    }
    
    switch(obj.type)
    {
        case "block":
            var newobj = new Block(newid,newname);
            newobj.copy(oobj);
            newobj.position.x = newobj.position.x + shiftpos;
            newobj.position.z = newobj.position.z + shiftpos;
            curFloor.addBlockItem(newobj);
            loadBlock(scene,newobj,"block",false);
            render();
            if(params.mode_edit)
            {
                INTERSECTED=scene.getObjectByModelId(newobj.id).children[0];                
                blockparams.title="区块";
                fillBlockUI(blockparams,INTERSECTED);                
                if(guiBrand==null||guiBrand==undefined)
                    initBlockUI(blockparams,0); 
            }            
        break;
        case "mpoint":
            var newobj = new MPoint(newid,newname);
            newobj.copy(oobj);
            newobj.position.x = newobj.position.x + shiftpos;
            newobj.position.z = newobj.position.z + shiftpos;
            curFloor.addMPointItem(newobj);
            loadBlock(scene,newobj,"mpoint",false);
            render();
            if(params.mode_edit)
            {
                INTERSECTED=scene.getObjectByModelId(newobj.id).children[0];
                blockparams.title="测点";
                fillBlockUI(blockparams,INTERSECTED);                                    
                if(guiMPoint==null||guiMPoint==undefined)
                    initBlockUI(blockparams,2);   
            }
        break;
        case "brand":
            var newobj = new Brand(newid,newname);
            newobj.copy(oobj);
            newobj.position.x = newobj.position.x + shiftpos;
            newobj.position.z = newobj.position.z + shiftpos;
            curFloor.addBrandItem(newobj);
            loadBrand(scene,newobj,false,false);
            render();
            if(params.mode_edit)
            {
                INTERSECTED=scene.getObjectByModelId(newobj.id).children[0];  
                blockparams.title="标志牌";
                fillBlockUI(blockparams,INTERSECTED);
                if(guiBrand==null||guiBrand==undefined)
                    initBlockUI(blockparams,1);  
            }
        break;
    }
}
function deletObjCallback(confirmed,paramsConfirm)
{    
    if(confirmed)
    {
        unSelectObject(true); 
        removeObjById(scene,curFloor,paramsConfirm.modelid);
        if(osubManageDiv.style.display=='block')
        {                                    
            var dataJson=getJsonDataOfTable("分组内容");
            TableLoad($sub_table,dataJson);
        }
        if(oManageDiv.style.display=='block')
        {
            var dataJson=getJsonDataOfTable(oManageDiv.tabletype);
            TableLoad($table,dataJson);
        }
    }    
    ismodelActivated=false;
    controls.enabled=paramsConfirm.ctrlstat;
}
popUpMenu.prototype.delObject_menu = function(obj)
{
    if(obj==undefined) obj=this.obj;
    var modelid = obj.modelid; 
    var paramsConfirm={}; paramsConfirm.modelid=modelid;paramsConfirm.ctrlstat=controls.enabled;
    ismodelActivated=true;
    controls.enabled=false;
    alertConfirm("确定要删除"+modelid+"吗？",deletObjCallback,paramsConfirm);
}