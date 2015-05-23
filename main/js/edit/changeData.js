function change_Floor(curBuilding,newFloor)
{	
	return readFloor(curBuilding,newFloor);
}
function checkObj_Floor(curFloor,id)
{
    if(curFloor.getObjectById(id))
        return true;
    else 
        return false;
}
function groupPositionChange_Floor(curFloor,groupName,x,y,z)
{
    var objList= new Array();
    var group = getGroup_Floor(curFloor,groupName);
    var cnt=group.getCount();
    for(var key=0;key<cnt;key++)
    {
        var obj = curFloor.getObjectById(group.getAt(key)); 
        objPositionChange_Floor(obj,x,y,z);
    }
}
function objPositionChange_Floor(obj,x,y,z)
{
    if(obj)
    {
        objPositionSet_Floor(obj,obj.position.x/1+x,obj.position.y/1+y,obj.position.z/1+z);
    }
}

function objPositionChangeById_Floor(curFloor,id,x,y,z)
{
    if(obj=curFloor.getObjectById(id))
    {
        objPositionSet_Floor(obj,obj.position.x/1+x,obj.position.y/1+y,obj.position.z/1+z);
    }
}
function objPositionSet_Floor(obj,x,y,z)
{
    if(obj)
    {
        obj.position=new THREE.Vector3(x/1,y/1,z/1);
    }
}
function objPositionSetById_Floor(curFloor,id,x,y,z)
{
    if(obj=curFloor.getObjectById(id))
    {
        obj.position=new THREE.Vector3(x/1,y/1,z/1);
    }
}
function clear_init_Floor(curFloor)
{
    curFloor.Init();     
}
function removeObjByName_Floor(curFloor,name)
{
    return curFloor.removeByName(name);
}
function removeObjById_Floor(curFloor,id)
{
    return curFloor.removeById(id);
}

function getGroup_Floor(curFloor,groupName)
{
    return curFloor.getGroupByName(groupName);
}


function setObjTemperature_Floor(curFloor,id,temp)
{
    if(temp>maxTemperature) temp=maxTemperature;
    if(temp<minTemperature) temp=minTemperature;
    
    var obj = curFloor.getObjectById(id);
    if(obj)
    {
        obj.temperature=Math.round(temp*100)/100;
    }
    color=temperatureToColor(temp);
    return changeObjColor_Floor(curFloor,id,color);
}
function setGroupTemperature_Floor(curFloor,groupName,temp)
{    
    if(temp>maxTemperature) temp=maxTemperature;
    if(temp<minTemperature) temp=minTemperature;
    color=temperatureToColor(temp);    
    var group = getGroup_Floor(curFloor,groupName);
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
    return changeGroupColor_Floor(curFloor,groupName,color);
}
function changeObjTemperature_Floor(curFloor,id,deltatemp)
{
    var obj = curFloor.getObjectById(id);
    var baseTemp;
    if(obj.temperature)
        baseTemp=obj.temperature;  
    else
        baseTemp=colorToTemperature(new THREE.Color(obj.texture));
    temp=baseTemp+deltatemp;
    setObjTemperature_Floor(curFloor,id,temp);
}
function changeGroupTemperature_Floor(curFloor,groupName,deltatemp)
{
    var group = getGroup_Floor(curFloor,groupName);
    var cnt=group.getCount();
    for(var key=0;key<cnt;key++)
    {
        var obj = group.getAt(key); 
        if(obj)
        {            
            changeObjTemperature_Floor(curFloor,obj.id,deltatemp);
        }
        else 
            return false;
    }
    return true;
}
function changeObjColor_Floor(curFloor,id,color)
{
    var obj = curFloor.getObjectById(id);
    if(obj)
    {
        obj.texture=color.getHex();
        return true;
    }
    return false
}
function changeGroupColor_Floor(curFloor,groupName,color)
{
    var group = getGroup_Floor(curFloor,groupName);
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
function setObjScaleById_Floor(curFloor,id,x,y,z)
{
    var obj = curFloor.getObjectById(id);
    if(obj)
    {
         obj.scale=new THREE.Vector3(x/1,y/1,z/1);
        return true;
    }
    return false
}
function setObjRotationById_Floor(curFloor,id,x,y,z)
{
    var obj = curFloor.getObjectById(id);
    if(obj)
    {
         obj.rotation=new THREE.Vector3(x/1,y/1,z/1);
        return true;
    }
    return false
}