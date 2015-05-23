function change_Scene(scene,newFloor)
{	
	loadFloor(scene,newFloor);
}
function checkObj_Scene(scene,id)
{
    if(scene.getObjectByModelId(id))
        return true;
    else 
        return false;
}
function groupPositionChange_Scene(scene,curFloor,groupName,x,y,z)
{
    var objList= new Array();
    var group = getGroup_Floor(curFloor,groupName);
    var cnt=group.getCount();
    for(var key=0;key<cnt;key++)
    {
        var obj = scene.getObjectByModelId(group.getAt(key)); 
        objPositionChange_Scene(obj,x,y,z);
    }
}
function objPositionChange_Scene(obj,x,y,z)
{
    if(obj)
    {
        objPositionSet_Scene(obj,obj.position.x/1+x,obj.position.y/1+y,obj.position.z/1+z);
    }
}
function objPositionChangeById_Scene(scene,id,x,y,z)
{
    if(obj=scene.getObjectByModelId(id))
    {
        objPositionSet_Scene(obj,obj.position.x/1+x,obj.position.y/1+y,obj.position.z/1+z);
    }
}
function objPositionSet_Scene(obj,x,y,z)
{
    if(obj)
    {
        obj.position.set(x/1,y/1,z/1);
    }
}
function objPositionSetById_Scene(scene,id,x,y,z)
{
    if(obj=scene.getObjectByModelId(id))
    {
        obj.position.set(x/1,y/1,z/1);
    }
}
function highlightGroup_Scene(scene,curFloor,groupName,highlight)
{
    var objList= new Array();
    var group = getGroup_Floor(curFloor,groupName);
    var cnt=group.getCount();
    for(var key=0;key<cnt;key++)
    {
        var id = group.getAt(key); 
        highlight_Scene(scene,id,highlight);
    }
}
function highlight_Scene(scene,id,highlight)
{
    if(obj=scene.getObjectByModelId(id))
    {
        var cnt=obj.children.length;
        obj.highlighted=false;
        for(var key=0;key<cnt;key++)
        {
            if(highlight==true)
            {
                // if(obj.children[key].material.color.getHex()<0x0A)
                    // obj.children[key].material.emissive.setHex( 0xA0A0A0);
                // else
                obj.children[key].material.emissive.setHex( obj.children[key].material.color.getHex());
                obj.highlighted=true;
            }
            else if(highlight==undefined||highlight==false)
                obj.children[key].material.emissive.setHex(0x0);
            else
                obj.children[key].material.emissive.setHex(highlight);
        }
    }
}
function groupVisibleChange_Scene(scene,curFloor,groupName,vis)
{
    var objList= new Array();
    var group = getGroup_Floor(curFloor,groupName);
    var cnt=group.getCount();
    for(var key=0;key<cnt;key++)
    {
        var id = group.getAt(key); 
        objVisibleChange_Scene(scene,id,vis);
    }
}
function objVisibleChange_Scene(scene,id,vis)
{
    if(obj=scene.getObjectByModelId(id))
    {
        obj.visible=vis;
        var cnt=obj.children.length;
        for(var key=0;key<cnt;key++)
        {
            obj.children[key].visible=vis;
        }
    }
}
function clear_init_Scene(scene)
{
    while(scene.children.length>0)
    {
        scene.remove(scene.children[0]);
    }         
    scene.add(camera);
    for(var item=0; item<lights.length;item++)
    {
        scene.add(lights[item]);
        lights[item].visible=true;
    }
    scene.add( plane );  
    scene.add( selectionBox ); 
    scene.add( transControl );    
    
}
function removeObjByName_Scene(scene,name)
{
    if(obj=scene.getObjectByModelName(name))    
        scene.remove(obj);
}
function removeObjById_Scene(scene,id)
{
    if(obj=scene.getObjectByModelId(id))    
        scene.remove(obj);
}
function getGroup_Scene(scene,curFloor,groupName)
{
    var objList= new _objList();
    var group = getGroup_Floor(curFloor,groupName);
    var cnt=group.getCount();
    for(var key=0;key<cnt;key++)
    {
        objList.addItem(scene.getObjectByModelId(group.getAt(key)));
    }
    return objList;
}

function setObjTemperature_Scene(scene,id,temp)
{
    if(temp>maxTemperature) temp=maxTemperature;
    if(temp<minTemperature) temp=minTemperature;
    var obj = scene.getObjectByModelId(id);
    if(obj)
    {
        obj.temperature=Math.round(temp*100)/100;
    }
    color=temperatureToColor(temp);
    return changeObjColor_Scene(scene,id,color);
}
function setGroupTemperature_Scene(scene,curFloor,groupName,temp)
{    
    color=temperatureToColor(temp);
    if(temp>maxTemperature) temp=maxTemperature;
    if(temp<minTemperature) temp=minTemperature;
    var group = getGroup_Scene(scene,curFloor,groupName);
    var cnt=group.getCount();
    for(var key=0;key<cnt;key++)
    {
        var obj = group.getAt(key); 
        if(obj)
        {
            obj.temperature=Math.round(temp*100)/100;          
        }
        else 
            return false;
    }    
    return changeGroupColor_Scene(scene,curFloor,groupName,color);
}
function changeObjTemperature_Scene(scene,id,deltatemp)
{
    var obj = scene.getObjectByModelId(id);
    var baseTemp;
    if(obj.temperature)
        baseTemp=obj.temperature;  
    else        
        baseTemp=colorToTemperature(obj.children[0].material.color);
    temp=baseTemp+deltatemp;
    setObjTemperature_Scene(scene,id,temp);
}
function changeGroupTemperature_Scene(scene,curFloor,groupName,deltatemp)
{
    var group = getGroup_Scene(scene,curFloor,groupName);
    var cnt=group.getCount();
    for(var key=0;key<cnt;key++)
    {
        var obj = group.getAt(key); 
        if(obj)
        {            
            changeObjTemperature_Scene(scene,obj.id,deltatemp);
        }
        else 
            return false;
    }
    return true;
}
function changeObjColor_Scene(scene,id,color)
{
    var obj = scene.getObjectByModelId(id);
    if(obj)
    {
        obj.children[0].material.color.setHex(color.getHex());
        obj.children[0].material.ambient.setHex(color.getHex());
    }
}
function changeGroupColor_Scene(scene,curFloor,groupName,color)
{
    var group = getGroup_Scene(scene,curFloor,groupName);
    var cnt=group.getCount();
    for(var key=0;key<cnt;key++)
    {
        var obj = group.getAt(key); 
        if(obj)
        {
            obj.children[0].material.color.setHex(color.getHex());
            obj.children[0].material.ambient.setHex(color.getHex());             
        }
        else 
            return false;
    }
    return true;
}
function setObjScale_Scene(obj,x,y,z)
{    
    if(obj)
    {
        obj.traverse(function(child) {                 
            if ( child instanceof THREE.Mesh ) {
                    child.scale.set(x/1,y/1,z/1);  
                }                
        }); 
    }
}
function setObjRotation_Scene(obj,x,y,z)
{
    if(obj)
    {
        obj.rotation.set(x/1,y/1,z/1);
    }
}