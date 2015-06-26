BdViewer.prototype.change_Scene = function(scene,newFloor)
{	
	this.scope.loadFloor(scene,newFloor);
}
BdViewer.prototype.checkObj_Scene = function(scene,id)
{
    if(scene.getObjectByModelId(id))
        return true;
    else 
        return false;
}
BdViewer.prototype.groupPositionChange_Scene = function(scene,curFloor,groupName,x,y,z)
{
    var objList= new Array();
    var group = this.scope.getGroup_Floor(curFloor,groupName);
    var cnt=group.getCount();
    for(var key=0;key<cnt;key++)
    {
        var obj = scene.getObjectByModelId(group.getAt(key)); 
        this.scope.objPositionChange_Scene(obj,x,y,z);
    }
}
BdViewer.prototype.objPositionChange_Scene = function(obj,x,y,z)
{
    if(obj)
    {
        this.scope.objPositionSet_Scene(obj,obj.position.x/1+x,obj.position.y/1+y,obj.position.z/1+z);
    }
}
BdViewer.prototype.objPositionChangeById_Scene = function(scene,id,x,y,z)
{
    if(obj=scene.getObjectByModelId(id))
    {
        this.scope.objPositionSet_Scene(obj,obj.position.x/1+x,obj.position.y/1+y,obj.position.z/1+z);
    }
}
BdViewer.prototype.objPositionSet_Scene = function(obj,x,y,z)
{
    if(obj)
    {
        obj.position.set(x/1,y/1,z/1);
    }
}
BdViewer.prototype.objPositionSetById_Scene = function(scene,id,x,y,z)
{
    if(obj=scene.getObjectByModelId(id))
    {
        obj.position.set(x/1,y/1,z/1);
    }
}
BdViewer.prototype.highlightGroup_Scene = function(scene,curFloor,groupName,highlight)
{
    var objList= new Array();
    var group = this.scope.getGroup_Floor(curFloor,groupName);
    var cnt=group.getCount();
    for(var key=0;key<cnt;key++)
    {
        var id = group.getAt(key); 
        this.scope.highlight_Scene(scene,id,highlight);
    }
}
BdViewer.prototype.highlight_Scene = function(scene,id,highlight)
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
BdViewer.prototype.groupVisibleChange_Scene = function(scene,curFloor,groupName,vis)
{
    var objList= new Array();
    var group = this.scope.getGroup_Floor(curFloor,groupName);
    var cnt=group.getCount();
    for(var key=0;key<cnt;key++)
    {
        var id = group.getAt(key); 
        this.scope.objVisibleChange_Scene(scene,id,vis);
    }
}
BdViewer.prototype.objVisibleChange_Scene = function(scene,id,vis)
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
BdViewer.prototype.clear_init_Scene = function(scene)
{
    while(scene.children.length>0)
    {
        scene.remove(scene.children[0]);
    }         
    scene.add(this.scope.camera);
    for(var item=0; item<this.scope.lights.length;item++)
    {
        scene.add(this.scope.lights[item]);
        this.scope.lights[item].visible=true;
    }
    scene.add( this.scope.plane );  
    scene.add( this.scope.selectionBox ); 
    scene.add( this.scope.transControl );    
    
}
BdViewer.prototype.removeObjByName_Scene = function(scene,name)
{
    if(obj=scene.getObjectByModelName(name))    
        scene.remove(obj);
}
BdViewer.prototype.removeObjById_Scene = function(scene,id)
{
    if(obj=scene.getObjectByModelId(id))    
        scene.remove(obj);
}
BdViewer.prototype.getGroup_Scene = function(scene,curFloor,groupName)
{
    var objList= new this.scope._objList();
    var group = this.scope.getGroup_Floor(curFloor,groupName);
    var cnt=group.getCount();
    for(var key=0;key<cnt;key++)
    {
        objList.addItem(scene.getObjectByModelId(group.getAt(key)));
    }
    return objList;
}

BdViewer.prototype.setObjTemperature_Scene = function(scene,id,temp)
{
    if(temp>maxTemperature) temp=maxTemperature;
    if(temp<minTemperature) temp=minTemperature;
    var obj = scene.getObjectByModelId(id);
    if(obj)
    {
        obj.temperature=Math.round(temp*100)/100;
    }
    color=this.scope.temperatureToColor(temp);
    return this.scope.changeObjColor_Scene(scene,id,color);
}
BdViewer.prototype.setGroupTemperature_Scene = function(scene,curFloor,groupName,temp)
{    
    color=this.scope.temperatureToColor(temp);
    if(temp>maxTemperature) temp=maxTemperature;
    if(temp<minTemperature) temp=minTemperature;
    var group = this.scope.getGroup_Scene(scene,curFloor,groupName);
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
    return this.scope.changeGroupColor_Scene(scene,curFloor,groupName,color);
}
BdViewer.prototype.changeObjTemperature_Scene = function(scene,id,deltatemp)
{
    var obj = scene.getObjectByModelId(id);
    var baseTemp;
    if(obj.temperature)
        baseTemp=obj.temperature;  
    else        
        baseTemp=this.scope.colorToTemperature(obj.children[0].material.color);
    temp=baseTemp+deltatemp;
    this.scope.setObjTemperature_Scene(scene,id,temp);
}
BdViewer.prototype.changeGroupTemperature_Scene = function(scene,curFloor,groupName,deltatemp)
{
    var group = this.scope.getGroup_Scene(scene,curFloor,groupName);
    var cnt=group.getCount();
    for(var key=0;key<cnt;key++)
    {
        var obj = group.getAt(key); 
        if(obj)
        {            
            this.scope.changeObjTemperature_Scene(scene,obj.id,deltatemp);
        }
        else 
            return false;
    }
    return true;
}
BdViewer.prototype.changeObjColor_Scene = function(scene,id,color)
{
    var obj = scene.getObjectByModelId(id);
    if(obj)
    {
        obj.children[0].material.color.setHex(color.getHex());
        obj.children[0].material.ambient.setHex(color.getHex());
    }
}
BdViewer.prototype.changeGroupColor_Scene = function(scene,curFloor,groupName,color)
{
    var group = this.scope.getGroup_Scene(scene,curFloor,groupName);
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
BdViewer.prototype.setObjScale_Scene = function(obj,x,y,z)
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
BdViewer.prototype.setObjRotation_Scene = function(obj,x,y,z)
{
    if(obj)
    {
        obj.rotation.set(x/1,y/1,z/1);
    }
}