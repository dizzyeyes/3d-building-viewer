function highlightGroup(scene,curFloor,groupName,highlight)
{
    highlightGroup_Scene(scene,curFloor,groupName,highlight);
}
function highlightObject(scene,id,highlight)
{
    highlight_Scene(scene,id,highlight);
}
function change_Floor_Scene(scene,curBuilding,id)
{
	newFloor=curBuilding.getAt(id);
    if(newFloor==null||newFloor==undefined)
        return false;
	if(change_Floor(curBuilding,newFloor)==false)
        return false;
	change_Scene(scene,newFloor);
	return newFloor;
}
function checkObj(scene,curFloor,id)
{
     return (checkObj_Scene(scene,id)&&checkObj_Floor(curFloor,id));
}
function groupPositionChangePos(scene,curFloor,groupName,pos)
{
    groupPositionChange(scene,curFloor,groupName,pos.x,pos.y,pos.z);
}
function groupPositionChange(scene,curFloor,groupName,x,y,z)
{
    groupPositionChange_Floor(curFloor,groupName,x,y,z);
    groupPositionChange_Scene(scene,curFloor,groupName,x,y,z);
}
function objPositionChangePos(obj,curFloor,pos)
{
    objPositionChange(obj,curFloor,pos.x,pos.y,pos.z);
}
function objPositionChange(obj,curFloor,x,y,z)
{
    if(obj)
    {
        objPositionSet(obj,curFloor,obj.position.x/1+x,obj.position.y/1+y,obj.position.z/1+z);
    }
}
function objPositionChangePosById(scene,curFloor,id,pos)
{
    objPositionChange(scene,curFloor,id,pos.x,pos.y,pos.z);
}
function objPositionChangeById(scene,curFloor,id,x,y,z)
{
    objPositionChangeById_Floor(curFloor,id,x,y,z);
    objPositionChangeById_Scene(scene,id,x,y,z);
}
function objPositionSetPos(obj,pos)
{
    objPositionSet(obj,pos.x,pos.y,pos.z);
}
function objPositionSet(obj,curFloor,x,y,z)
{
    if(obj)
    {        
        objPositionSetById_Floor(curFloor,obj.modelid,x,y,z);
        objPositionSet_Scene(obj,x,y,z);
    }
}
function objPositionSetByIdPos(scene,curFloor,id,pos)
{
    objPositionSetById(scene,curFloor,id,pos.x,pos.y,pos.z);
}
function objPositionSetById(scene,curFloor,id,x,y,z)
{    
    objPositionSetById_Floor(curFloor,id,x,y,z);
    objPositionSetById_Scene(scene,id,x,y,z);
}
function groupVisibleChange(scene,curFloor,groupName,vis)
{
    groupVisibleChange_Scene(scene,curFloor,groupName,vis);
}
function objVisibleChange(scene,id,vis)
{
    objVisibleChange_Scene(scene,id,vis);
}

function clear_init_Scene_Floor(scene,curFloor)
{
    clear_init_Floor(curFloor);
    clear_init_Scene(scene);    
}

function removeObjByName(scene,curFloor,name)
{
    removeObjByName_Floor(curFloor,name);
    removeObjByName_Scene(scene,name);
}
function removeObjById(scene,curFloor,id)
{
    removeObjById_Floor(curFloor,id);
    removeObjById_Scene(scene,id);
}

function setObjTemperature(scene,curFloor,id,temp)
{
    setObjTemperature_Floor(curFloor,id,temp);
    setObjTemperature_Scene(scene,id,temp);
}
function setGroupTemperature(scene,curFloor,groupName,temp)
{    
    color=temperatureToColor(temp);
    return changeGroupColor(scene,curFloor,groupName,color);
}
function changeObjTemperature(scene,curFloor,id,deltatemp)
{
    changeObjTemperature_Floor(curFloor,id,deltatemp);
    changeObjTemperature_Scene(scene,id,deltatemp);
}
function changeGroupTemperature(scene,curFloor,groupName,deltatemp)
{
    changeGroupTemperature_Floor(curFloor,groupName,deltatemp);
    changeGroupTemperature_Scene(scene,curFloor,groupName,deltatemp);
}

function temperatureToColor(temp)
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
function colorToTemperature(color)
{    
    ratio=color.toArray()[0];//red color
    temp=ratio*(maxTemperature-minTemperature)+minTemperature;
    temp=Math.round(temp*100)/100;
    return temp;
}
function changeObjColor(scene,curFloor,id,color)
{
    colorThree=new THREE.Color(color);
    changeObjColor_Floor(curFloor,id,colorThree);
    changeObjColor_Scene(scene,id,colorThree);
}
function changeGroupColor(scene,curFloor,groupName,color)
{
    colorThree=new THREE.Color(color);
    changeGroupColor_Floor(curFloor,groupName,colorThree);
    changeGroupColor_Scene(scene,curFloor,groupName,colorThree);
}
function setObjScale(obj,curFloor,x,y,z)
{
    setObjScaleById_Floor(curFloor,obj.modelid,x,y,z);
    setObjScale_Scene(obj,x,y,z);
}
function setObjRotation(obj,curFloor,x,y,z)
{
    setObjRotationById_Floor(curFloor,obj.modelid,x,y,z);
    setObjRotation_Scene(obj,x,y,z);
}