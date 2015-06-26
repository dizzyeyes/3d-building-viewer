BdViewer.prototype.changeBdFloo = function(bid,fid)
{    
    this.params.building = bid;
    this.params.floor = fid;
    this.curBuilding = this.bdList.getAt(this.params.building);
    if(this.curBuilding.getCount()==0)
        this.readBuilding(this.bdList,this.curBuilding); 
    var rtn = this.change_Floor_Scene(this.scene,this.curBuilding,this.params.floor);
    this.curFloor = (rtn===1||rtn===2)?null:rtn;
    if(this.curFloor==null)
    {        
        this.clear_init_Scene(this.scene);
    }
}
BdViewer.prototype.highlightGroup = function(scene,curFloor,groupName,highlight)
{
    this.scope.highlightGroup_Scene(scene,curFloor,groupName,highlight);
}
BdViewer.prototype.highlightObject = function(scene,id,highlight)
{
    this.scope.highlight_Scene(scene,id,highlight);
}
BdViewer.prototype.change_Floor_Scene = function(scene,curBuilding,id)
{
	var newFloor=this.curBuilding.getAt(id);
    if(newFloor==null||newFloor==undefined)
        return 1;
	if(this.scope.change_Floor(this.curBuilding,newFloor)==false)
        return 2;
	this.scope.change_Scene(this.scene,newFloor);
	return newFloor;
}
BdViewer.prototype.checkObj = function(scene,curFloor,id)
{
     return (this.scope.checkObj_Scene(scene,id)&&this.scope.checkObj_Floor(curFloor,id));
}
BdViewer.prototype.groupPositionChangePos = function(scene,curFloor,groupName,pos)
{
    this.scope.groupPositionChange(scene,curFloor,groupName,pos.x,pos.y,pos.z);
}
BdViewer.prototype.groupPositionChange = function(scene,curFloor,groupName,x,y,z)
{
    this.scope.groupPositionChange_Floor(curFloor,groupName,x,y,z);
    this.scope.groupPositionChange_Scene(scene,curFloor,groupName,x,y,z);
}
BdViewer.prototype.objPositionChangePos = function(obj,curFloor,pos)
{
    this.scope.objPositionChange(obj,curFloor,pos.x,pos.y,pos.z);
}
BdViewer.prototype.objPositionChange = function(obj,curFloor,x,y,z)
{
    if(obj)
    {
        this.scope.objPositionSet(obj,curFloor,obj.position.x/1+x,obj.position.y/1+y,obj.position.z/1+z);
    }
}
BdViewer.prototype.objPositionChangePosById = function(scene,curFloor,id,pos)
{
    this.scope.objPositionChange(scene,curFloor,id,pos.x,pos.y,pos.z);
}
BdViewer.prototype.objPositionChangeById = function(scene,curFloor,id,x,y,z)
{
    this.scope.objPositionChangeById_Floor(curFloor,id,x,y,z);
    this.scope.objPositionChangeById_Scene(scene,id,x,y,z);
}
BdViewer.prototype.objPositionSetPos = function(obj,pos)
{
    this.scope.objPositionSet(obj,pos.x,pos.y,pos.z);
}
BdViewer.prototype.objPositionSet = function(obj,curFloor,x,y,z)
{
    if(obj)
    {        
        this.scope.objPositionSetById_Floor(curFloor,obj.modelid,x,y,z);
        this.scope.objPositionSet_Scene(obj,x,y,z);
    }
}
BdViewer.prototype.objPositionSetByIdPos = function(scene,curFloor,id,pos)
{
    this.scope.objPositionSetById(scene,curFloor,id,pos.x,pos.y,pos.z);
}
BdViewer.prototype.objPositionSetById = function(scene,curFloor,id,x,y,z)
{    
    this.scope.objPositionSetById_Floor(curFloor,id,x,y,z);
    this.scope.objPositionSetById_Scene(scene,id,x,y,z);
}
BdViewer.prototype.groupVisibleChange = function(scene,curFloor,groupName,vis)
{
    this.scope.groupVisibleChange_Scene(scene,curFloor,groupName,vis);
}
BdViewer.prototype.objVisibleChange = function(scene,id,vis)
{
    this.scope.objVisibleChange_Scene(scene,id,vis);
}

BdViewer.prototype.clear_init_Scene_Floor = function(scene,curFloor)
{
    this.scope.clear_init_Floor(curFloor);
    this.scope.clear_init_Scene(scene);    
}

BdViewer.prototype.removeObjByName = function(scene,curFloor,name)
{
    this.scope.removeObjByName_Floor(curFloor,name);
    this.scope.removeObjByName_Scene(scene,name);
}
BdViewer.prototype.removeObjById = function(scene,curFloor,id)
{
    this.scope.removeObjById_Floor(curFloor,id);
    this.scope.removeObjById_Scene(scene,id);
}

BdViewer.prototype.setObjTemperature = function(scene,curFloor,id,temp)
{
    this.scope.setObjTemperature_Floor(curFloor,id,temp);
    this.scope.setObjTemperature_Scene(scene,id,temp);
}
BdViewer.prototype.setGroupTemperature = function(scene,curFloor,groupName,temp)
{    
    color=temperatureToColor(temp);
    return this.scope.changeGroupColor(scene,curFloor,groupName,color);
}
BdViewer.prototype.changeObjTemperature = function(scene,curFloor,id,deltatemp)
{
    this.scope.changeObjTemperature_Floor(curFloor,id,deltatemp);
    this.scope.changeObjTemperature_Scene(scene,id,deltatemp);
}
BdViewer.prototype.changeGroupTemperature = function(scene,curFloor,groupName,deltatemp)
{
    this.scope.changeGroupTemperature_Floor(curFloor,groupName,deltatemp);
    this.scope.changeGroupTemperature_Scene(scene,curFloor,groupName,deltatemp);
}

BdViewer.prototype.temperatureToColor = function(temp)
{    
    var ratio=(temp-minTemperature)/(maxTemperature-minTemperature);
    if(ratio<0) ratio=0;
    if(ratio>1) ratio=1;
    var green=1-ratio;
    var red=ratio;
    var blue=0;
    color=new THREE.Color(red,green,blue);
    return color;
}
BdViewer.prototype.colorToTemperature = function(color)
{    
    ratio=color.toArray()[0];//red color
    temp=ratio*(maxTemperature-minTemperature)+minTemperature;
    temp=Math.round(temp*100)/100;
    return temp;
}
BdViewer.prototype.changeObjColor = function(scene,curFloor,id,color)
{
    colorThree=new THREE.Color(color);
    this.scope.changeObjColor_Floor(curFloor,id,colorThree);
    this.scope.changeObjColor_Scene(scene,id,colorThree);
}
BdViewer.prototype.changeGroupColor = function(scene,curFloor,groupName,color)
{
    colorThree=new THREE.Color(color);
    this.scope.changeGroupColor_Floor(curFloor,groupName,colorThree);
    this.scope.changeGroupColor_Scene(scene,curFloor,groupName,colorThree);
}
BdViewer.prototype.setObjScale = function(obj,curFloor,x,y,z)
{
    this.scope.setObjScaleById_Floor(curFloor,obj.modelid,x,y,z);
    this.scope.setObjScale_Scene(obj,x,y,z);
}
BdViewer.prototype.setObjRotation = function(obj,curFloor,x,y,z)
{
    this.scope.setObjRotationById_Floor(curFloor,obj.modelid,x,y,z);
    this.scope.setObjRotation_Scene(obj,x,y,z);
}