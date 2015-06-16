BdViewer.prototype.change_Floor = function(curBuilding,newFloor)
{	
	return this.scope.readFloor(curBuilding,newFloor);
}
BdViewer.prototype.checkObj_Floor = function(curFloor,id)
{
    if(curFloor.getObjectById(id))
        return true;
    else 
        return false;
}
BdViewer.prototype.groupPositionChange_Floor = function(curFloor,groupName,x,y,z)
{
    var objList= new Array();
    var group = this.scope.getGroup_Floor(curFloor,groupName);
    var cnt=group.getCount();
    for(var key=0;key<cnt;key++)
    {
        var obj = curFloor.getObjectById(group.getAt(key)); 
        this.scope.objPositionChange_Floor(obj,x,y,z);
    }
}
BdViewer.prototype.objPositionChange_Floor = function(obj,x,y,z)
{
    if(obj)
    {
        this.scope.objPositionSet_Floor(obj,obj.position.x/1+x,obj.position.y/1+y,obj.position.z/1+z);
    }
}

BdViewer.prototype.objPositionChangeById_Floor = function(curFloor,id,x,y,z)
{
    var obj;
    if(obj=curFloor.getObjectById(id))
    {
        this.scope.objPositionSet_Floor(obj,obj.position.x/1+x,obj.position.y/1+y,obj.position.z/1+z);
    }
}
BdViewer.prototype.objPositionSet_Floor = function(obj,x,y,z)
{
    if(obj)
    {
        obj.position=new THREE.Vector3(x/1,y/1,z/1);
    }
}
BdViewer.prototype.objPositionSetById_Floor = function(curFloor,id,x,y,z)
{
    var obj;
    if(obj=curFloor.getObjectById(id))
    {
        obj.position=new THREE.Vector3(x/1,y/1,z/1);
    }
}
BdViewer.prototype.clear_init_Floor = function(curFloor)
{
    curFloor.Init();     
}
BdViewer.prototype.removeObjByName_Floor = function(curFloor,name)
{
    return curFloor.removeByName(name);
}
BdViewer.prototype.removeObjById_Floor = function(curFloor,id)
{
    return curFloor.removeById(id);
}

BdViewer.prototype.getGroup_Floor = function(curFloor,groupName)
{
    return curFloor.getGroupByName(groupName);
}


BdViewer.prototype.setObjTemperature_Floor = function(curFloor,id,temp)
{
    if(temp>maxTemperature) temp=maxTemperature;
    if(temp<minTemperature) temp=minTemperature;
    
    var obj = curFloor.getObjectById(id);
    if(obj)
    {
        obj.temperature=Math.round(temp*100)/100;
    }
    color=this.scope.temperatureToColor(temp);
    return this.scope.changeObjColor_Floor(curFloor,id,color);
}
BdViewer.prototype.setGroupTemperature_Floor = function(curFloor,groupName,temp)
{    
    if(temp>maxTemperature) temp=maxTemperature;
    if(temp<minTemperature) temp=minTemperature;
    color=this.scope.temperatureToColor(temp);    
    var group = this.scope.getGroup_Floor(curFloor,groupName);
    var cnt=group.getCount();
    for(var key=0;key<cnt;key++)
    {
        var obj = curFloor.getObjectById(group.getAt(key)); 
        if(obj)
        {
            obj.temperature=Math.round(temp*100)/100;  
        }
        else
            return false;
    }
    return this.scope.changeGroupColor_Floor(curFloor,groupName,color);
}
BdViewer.prototype.changeObjTemperature_Floor = function(curFloor,id,deltatemp)
{
    var obj = curFloor.getObjectById(id);
    var baseTemp;
    if(obj.temperature)
        baseTemp=obj.temperature;  
    else
        baseTemp=this.scope.colorToTemperature(new THREE.Color(obj.texture));
    temp=baseTemp+deltatemp;
    this.scope.setObjTemperature_Floor(curFloor,id,temp);
}
BdViewer.prototype.changeGroupTemperature_Floor = function(curFloor,groupName,deltatemp)
{
    var group = this.scope.getGroup_Floor(curFloor,groupName);
    var cnt=group.getCount();
    for(var key=0;key<cnt;key++)
    {
        var obj = group.getAt(key); 
        if(obj)
        {            
            this.scope.changeObjTemperature_Floor(curFloor,obj.id,deltatemp);
        }
        else 
            return false;
    }
    return true;
}
BdViewer.prototype.changeObjColor_Floor = function(curFloor,id,color)
{
    var obj = curFloor.getObjectById(id);
    if(obj)
    {
        obj.texture=color.getHex();
        return true;
    }
    return false
}
BdViewer.prototype.changeGroupColor_Floor = function(curFloor,groupName,color)
{
    var group = this.scope.getGroup_Floor(curFloor,groupName);
    var cnt=group.getCount();
    for(var key=0;key<cnt;key++)
    {
        var obj = curFloor.getObjectById(group.getAt(key)); 
        if(obj)
        {
            obj.texture=color.getHex();  
        }
        else
            return false;
    }
    return true;
}
BdViewer.prototype.setObjScaleById_Floor = function(curFloor,id,x,y,z)
{
    var obj = curFloor.getObjectById(id);
    if(obj)
    {
         obj.scale=new THREE.Vector3(x/1,y/1,z/1);
        return true;
    }
    return false
}
BdViewer.prototype.setObjRotationById_Floor = function(curFloor,id,x,y,z)
{
    var obj = curFloor.getObjectById(id);
    if(obj)
    {
         obj.rotation=new THREE.Vector3(x/1,y/1,z/1);
        return true;
    }
    return false
}