var minZoomIn=0.5;
var maxZoomIn=15;
var deltaZoom=0.01;
var baseZoom=2;
var curZoom=baseZoom;//初值
function zoomInOut(camera,delta)
{
    var deltaZoomInOut=0;
    deltaZoomInOut=deltaZoom*delta*10;  

    
    curZoom=curZoom+deltaZoomInOut;
    var msg="当前比例："+Math.round(curZoom/baseZoom*100)+" %";
    if(curZoom<minZoomIn)
    { 
        curZoom=minZoomIn;
        msg="不能更小";
    }
    if(curZoom>maxZoomIn)
    {
        curZoom=maxZoomIn;
        msg="不能更大";
    }
    camera.setZoom(curZoom);    
    alertPercent(msg);
}
function selectObject(obj)
{    
    // obj.currentHex = obj.material.color.getHex();
    // obj.currentEmissive = obj.material.emissive.getHex();
    // if(needTemp){
        // if(obj.parent.temperature!=undefined)
            // setObjTemperature(scene,curFloor,obj.parent.modelid,obj.parent.temperature);
        // else
            // setObjTemperature(scene,curFloor,obj.parent.modelid, colorToTemperature(new THREE.Color(obj.material.color.getHex())));
    // }
    // obj.material.emissive.setHex( obj.material.color.getHex());
    selectionBox.update(obj);
    selectionBox.visible=true;
}
function unSelectObject(forceclose)
{    
    // changeObjColor(scene,curFloor,obj.parent.modelid,obj.currentHex); 
    // obj.material.emissive.setHex( obj.currentEmissive);
    if(forceclose==true) closesubGUI();
    if(INTERSECTED!=null)
    {
        INTERSECTED=null;
        selectionBox.visible=false;
        transControl.detach();
    }
}
function isOverDocMenu(x,y)
{
    var dociconNode,firsticon;
    dociconNode=document.getElementsByClassName("dock-item2");
    firsticon=dociconNode[0];
    parenticon=firsticon.parentElement;
    grandparenticon=parenticon.parentElement;
    
    var divx1,divx2,divy1,divy2;
    if(parenticon!=null)
    {
        divx1 =  parenticon.offsetLeft + grandparenticon.offsetLeft;  
        divy1 =  parenticon.offsetTop + grandparenticon.offsetTop;  
        divx2 = divx1 + parenticon.offsetWidth;  
        divy2 = divy1 + parenticon.offsetHeight;        
        if( x > divx1 && x < divx2 && y > divy1 && y < divy2)
        {                     
            //console.log("Mouse: ",x,", ",y," InRectofDoc: ",divx1,divy1,divx2,divy2);
            return true;
        }
    }
    else return false;

    //13 icons
    for (var item = 0; item < dociconNode.length; item++)
    {
        if(dociconNode[item]!=null)
        {
            divx1 = dociconNode[item].offsetLeft + parenticon.offsetLeft + grandparenticon.offsetLeft;  
            divy1 = dociconNode[item].offsetTop + parenticon.offsetTop + grandparenticon.offsetTop;  
            divx2 = divx1 + dociconNode[item].offsetWidth;  
            divy2 = divy1 + dociconNode[item].offsetHeight;        
            if( x > divx1 && x < divx2 && y > divy1 && y < divy2)
            {                     
               // console.log("Mouse: ",x,", ",y," InRectofDoc: ",divx1,divy1,divx2,divy2);
                return true;
            }
        }
    }    
    return false;
}
function hideDocMenu(op)
{
    var dociconNode;
    dociconNode=document.getElementsByClassName("dock-item2");
        //12 icons
    for (var item = 0; item < dociconNode.length-1; item++)
    {
        if(dociconNode[item]!=null)
        {
            dociconNode[item].style.display = op;
        }
    }        
    var parenticon=dociconNode[0].parentElement;
    parenticon.style.display = op;
    return ;
}
function isInDivs(list,x,y)
{
    for(var item=0;item<list.length;item++)
    {
        if(isInDiv(list[item],x,y))
            return true;
    }
    return false;
}
function isInDiv(box,x,y)
{    
    var divx1,divx2,divy1,divy2;
    if(box!=null)
    {
        divx1 = box.offsetLeft;  
        divy1 = box.offsetTop;  
        divx2 = box.offsetLeft + box.offsetWidth;  
        divy2 = box.offsetTop + box.offsetHeight;  
                        
        if( x > divx1 && x < divx2 && y > divy1 && y < divy2)
        {                     
            // console.log("Mouse: ",x,", ",y," Rect: ",divx1,divy1,divx2,divy2);
            return true;
        }
        else
            return false;        
    }
    return false;
}
function setListVis(list,vis)
{    
    var cnt = list.getCount();
    var item;
    for (item=0;item<cnt;item++)
    {
        var id=list.getAt(item).id;
        objVisibleChange(scene,id,vis);
    }
}
function setSceneVis(vis)
{
     setListVis(curFloor.BlockList,vis);
     setListVis(curFloor.MPointList,vis);
     setListVis(curFloor.BrandList,vis);
}
function setListHight(list,highlight)
{    
    var cnt = list.getCount();
    var item;
    for (item=0;item<cnt;item++)
    {
        var id=list.getAt(item).id;
        highlightObject(scene,id,highlight);
    }
}
function openLights(vis)
{
    for(var item=0;item<lights.length;item++)
    {
        lights[item].visible=vis;
    }
}
function setSceneHight(highlight)
{
     setListHight(curFloor.BlockList,false);
     setListHight(curFloor.MPointList,false);
     setListHight(curFloor.BrandList,false);
     openLights(!highlight);
}