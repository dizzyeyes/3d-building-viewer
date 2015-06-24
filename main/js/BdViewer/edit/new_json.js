BdViewer.prototype.newBuilding_json = function(dataJson)
{    
    console.log('new_building',dataJson);
    var id = dataJson.id;
    var name = dataJson.name;
    var info = dataJson.info;
    
    var bd= new BdViewer.Building(id, name, "./data/buildings/"+this.upCaseFirst(id)+".xml",info);
    if(this.bdList==null||this.bdList==undefined) 
    {
        this.msgToolkit.alertError("./data/buildinglist.xml加载错误，不能添加建筑物");
        return;
    }
    this.bdList.addItem(bd);
    this.curBuilding = bd;
    this.curFloor = null;
    this.clear_init_Scene(this.scene);
    this.params.building = this.bdList.getCount()-1;
}
BdViewer.prototype.newFloor_json = function(dataJson)
{        
    console.log('new_floor',dataJson);
    var id = dataJson.id;
    var name = dataJson.name;
    var info = dataJson.info;
    var modelpath = dataJson.model;
    
    var texture=Math.random()*0xffffff;
    var rot = new THREE.Vector3(0,0,0);
    
    var newfloor = new BdViewer.Floor(id, name, "./data/floors/"+this.upCaseFirst(id)+".xml",info);
    if(this.curBuilding==null||this.curBuilding==undefined) 
    {
        this.msgToolkit.alertError("请先添加建筑物，再添加楼层");
        return;
    }
    this.curBuilding.addItem(newfloor);
    this.curFloor = newfloor;
    var scale = new THREE.Vector3(1,1,1); 
    var pos = new THREE.Vector3(this.modelbias.x,this.modelbias.y,this.modelbias.z);
    var modelElement = new BdViewer.model(modelpath,"obj");
    var block = new BdViewer.Block("BOARD", "地板", modelElement,pos,rot,scale,texture,info);
    this.curFloor.addBlockItem(block);
    this.clear_init_Scene(this.scene);
    this.loadBlock(this.scene,block,"block");
    this.render();           
    this.params.floor = this.curBuilding.getCount()-1;
    if(this.params.mode_edit)
    {
        this.INTERSECTED=this.scene.getObjectByModelId("BOARD").children[0];
        this.blockparams.title="区块";
        this.selectObject(this.INTERSECTED);
        console.log("选中区块"+this.INTERSECTED.parent.modelid);
    }
}
BdViewer.prototype.newBlock_json = function(dataJson)
{    
    console.log('new_block',dataJson);  
    var id = dataJson.id;
    var name = dataJson.name;
    var info = dataJson.info;
    var modelpath = dataJson.model;
    
    var texture=Math.random()*0xffffff;
    var rot = new THREE.Vector3(0,0,0);
    
    var scale = new THREE.Vector3(1,10,1); 
    var pos = new THREE.Vector3(this.modelbias.x,this.modelbias.y+this.modelbaseHeight.block,this.modelbias.z);
    var modelElement = new BdViewer.model(modelpath,"obj");
    var block = new BdViewer.Block(id, name, modelElement,pos,rot,scale,texture,info);
    if(this.curFloor==null||this.curFloor==undefined) 
    {
        this.msgToolkit.alertError("请先添加楼层");
        return;
    }
    this.curFloor.addBlockItem(block);
    this.loadBlock(this.scene,block,"block");
    this.render();
    if(this.params.mode_edit)
    {
        this.INTERSECTED = this.scene.getObjectByModelId(id).children[0];                
        this.blockparams.title="区块";
        this.selectObject(this.INTERSECTED);
        console.log("选中区块"+this.INTERSECTED.parent.modelid);
    }
}
BdViewer.prototype.newBrand_json = function(dataJson)
{        
    console.log('new_brand',dataJson);
    var id = dataJson.id;
    var name = dataJson.name;
    var info = dataJson.info;
    var modelpath = dataJson.model;
    var imagePath = dataJson.image;
    
    var texture=0x0;
    var rot = new THREE.Vector3(0,0,0);
    
    var scale = new THREE.Vector3(1,1,1); 
    var pos = new THREE.Vector3(this.modelbias.x,this.modelbias.y + this.modelbaseHeight.brand,this.modelbias.z);
    var modelElement = new BdViewer.model(modelpath,"obj");
    var brand = new BdViewer.Brand(id, name, modelElement,pos,rot,scale,texture,imagePath,info);
    if(this.curFloor==null||this.curFloor==undefined) 
    {
        this.msgToolkit.alertError("请先添加楼层");
        return;
    }
    this.curFloor.addBrandItem(brand);
    this.loadBrand(this.scene,brand);
    this.render();
    if(this.params.mode_edit)
    {
        this.INTERSECTED=this.scene.getObjectByModelId(id).children[0];  
        this.blockparams.title="标志牌";
        this.selectObject(this.INTERSECTED);
        console.log("选中标志牌"+this.INTERSECTED.parent.modelid);
    }
}
BdViewer.prototype.newMPoint_json = function(dataJson)
{        
    console.log('new_mpoint',dataJson);
    var id = dataJson.id;
    var name = dataJson.name;
    var info = dataJson.info;
    var modelpath = dataJson.model;
    var mpointType = dataJson.tag;
    
    var texture=0x0;
    var rot = new THREE.Vector3(0,0,0);
    
    var scale = new THREE.Vector3(0.01,0.01,0.01); 
    var pos = new THREE.Vector3(this.modelbias.x,this.modelbias.y + this.modelbaseHeight.mpoint,this.modelbias.z);
    var modelElement = new BdViewer.model(modelpath,"obj");
    var mpoint = new BdViewer.MPoint(id, name, mpointType, modelElement,pos,rot,scale,texture,info);
    if(this.curFloor==null||this.curFloor==undefined) 
    {
        this.msgToolkit.alertError("请先添加楼层");
        return;
    }
    this.flag_addMPoint=true;
    this.curMPoint=mpoint;
    this.msgToolkit.alertInfo('开始添加测点，按"ESC"键结束添加');
}
BdViewer.prototype.newGroup_json = function(dataJson)
{        
    console.log('new_group',dataJson);
    var group=new BdViewer.Group(dataJson.id,dataJson.name,new Array(),dataJson.info);
    this.curFloor.addGroupItem(group);
}
BdViewer.prototype.changeID_json = function(dataJson)
{        
    console.log('changeID_json',dataJson);
    var oldid = dataJson.oldid;
    var id = dataJson.id;
    var name = dataJson.name;
    var info = dataJson.info;
    
    var block = this.curFloor.getObjectById(oldid);
    this.curFloor.changeObjectId(oldid,id);
    block.name = name;
    block.info = info;
    //update GUI
    this.blockparams.ID = id;
    this.blockparams.name = name;
    //update scene
    var obj = this.scene.getObjectByModelId(oldid);
    obj.modelid = id;obj.modelname = name;obj.info = info;
}