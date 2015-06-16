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
            this.viewer.blockparams.temperature=0;
            this.updateGUI_temp_menu();            
        break;
        case 'menu_mid_tmp':
            this.viewer.blockparams.temperature=1;
            this.updateGUI_temp_menu();
        break;
        case 'menu_high_tmp':
            this.viewer.blockparams.temperature=2;
            this.updateGUI_temp_menu();
        break;
    }
}
popUpMenu.prototype.setHighLight_menu = function()
{    
    if(this.obj.highlighted)
    {                
        this.viewer.setSceneHight(false);
    }
    else
    {
        this.viewer.setSceneHight(true);
        this.viewer.highlightObject(this.viewer.scene,this.obj.modelid,true);
    }
}
popUpMenu.prototype.setVisible_menu = function()
{    
    if(this.obj.visible)
    {                
        this.viewer.objVisibleChange(this.viewer.scene,this.obj.modelid,false);
    }
    else
    {
        this.viewer.objVisibleChange(this.viewer.scene,this.obj.modelid,true);
    }
}
popUpMenu.prototype.updateGUI_temp_menu = function()
{    
    var color= new THREE.Color(this.viewer.colorlist[this.viewer.blockparams.temperature]/1);
    this.viewer.changeObjColor(this.viewer.scene,this.viewer.curFloor,this.viewer.blockparams.ID,color.getHex());
    this.viewer.blockparams.red=color.r*255;
    this.viewer.blockparams.green=color.g*255;
    this.viewer.blockparams.blue=color.b*255;
}
popUpMenu.prototype.copyObject_menu = function(obj)
{
    var shiftpos=10;
    if(obj==undefined) obj=this.obj;
    var oobj = this.viewer.curFloor.getObjectById(obj.modelid);
    var t_id = oobj.id + " - 副本";
    var t_name = oobj.name + " - 副本";
    var newid = t_id;var newname = t_name;
    var cnt = 0;    
    while(this.viewer.curFloor.getObjectById(newid)!=null)
    {
        cnt++;
        newid = t_id+" ("+cnt+")";
        newname = t_name+" ("+cnt+")";
    }
    
    switch(obj.type)
    {
        case "block":
            var newobj = new BdViewer.Block(newid,newname);
            newobj.copy(oobj);
            newobj.position.x = newobj.position.x + shiftpos;
            newobj.position.z = newobj.position.z + shiftpos;
            this.viewer.curFloor.addBlockItem(newobj);
            this.viewer.loadBlock(this.viewer.scene,newobj,"block",false);
            this.viewer.render();
            if(this.viewer.params.mode_edit)
            {
                this.viewer.INTERSECTED=this.viewer.scene.getObjectByModelId(newobj.id).children[0];
                console.log("区块右键选中："+this.viewer.INTERSECTED.parent.modelid);
            }            
        break;
        case "mpoint":
            var newobj = new BdViewer.MPoint(newid,newname);
            newobj.copy(oobj);
            newobj.position.x = newobj.position.x + shiftpos;
            newobj.position.z = newobj.position.z + shiftpos;
            this.viewer.curFloor.addMPointItem(newobj);
            this.viewer.loadBlock(this.viewer.scene,newobj,"mpoint",false);
            this.viewer.render();
            if(this.viewer.params.mode_edit)
            {
                this.viewer.INTERSECTED=this.viewer.scene.getObjectByModelId(newobj.id).children[0];
                console.log("测点右键选中："+this.viewer.INTERSECTED.parent.modelid);
            }
        break;
        case "brand":
            var newobj = new BdViewer.Brand(newid,newname);
            newobj.copy(oobj);
            newobj.position.x = newobj.position.x + shiftpos;
            newobj.position.z = newobj.position.z + shiftpos;
            this.viewer.curFloor.addBrandItem(newobj);
            this.viewer.loadBrand(this.viewer.scene,newobj,false,false);
            this.viewer.render();
            if(this.viewer.params.mode_edit)
            {
                this.viewer.INTERSECTED=this.viewer.scene.getObjectByModelId(newobj.id).children[0];  
                console.log("标志牌右键选中："+this.viewer.INTERSECTED.parent.modelid);
            }
        break;
    }
}
popUpMenu.prototype.delObject_menu = function(obj)
{    
    if(obj==undefined) obj=this.obj;
    var modelid = obj.modelid; 
    
    this.viewer.unSelectObject(true); 
    this.viewer.removeObjById(this.viewer.scene,this.viewer.curFloor,modelid);
}