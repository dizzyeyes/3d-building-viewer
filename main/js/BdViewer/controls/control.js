
BdViewer.prototype.zoomInOut = function(delta)
{
    var deltaZoomInOut=0;
    deltaZoomInOut=this.deltaZoom*delta*10;  

    
    this.curZoom=this.curZoom+deltaZoomInOut;
    var msg="当前比例："+Math.round(this.curZoom/this.baseZoom*100)+" %";
    if(this.curZoom<this.minZoomIn)
    { 
        this.curZoom=this.minZoomIn;
        msg="不能更小";
    }
    if(this.curZoom>this.maxZoomIn)
    {
        this.curZoom=this.maxZoomIn;
        msg="不能更大";
    }
    this.camera.setZoom(this.curZoom);    
    this.msgToolkit.alertPercent(msg);
}
BdViewer.prototype.selectObject = function(obj)
{    
    this.selectionBox.update(obj);
    this.selectionBox.visible=true;
}
BdViewer.prototype.unSelectObject = function(forceclose)
{    
    if(this.INTERSECTED!=null)
    {
        this.INTERSECTED=null;
        this.selectionBox.visible=false;
        this.transControl.detach();
    }
}
 
BdViewer.prototype.setListVis = function(list,vis)
{    
    var cnt = list.getCount();
    var item;
    for (item=0;item<cnt;item++)
    {
        var id=list.getAt(item).id;
        this.objVisibleChange(this.scene,id,vis);
    }
}
BdViewer.prototype.setSceneVis = function(vis)
{
    this.setListVis(this.curFloor.BlockList,vis);
    this.setListVis(this.curFloor.MPointList,vis);
    this.setListVis(this.curFloor.BrandList,vis);
}
BdViewer.prototype.setListHight = function(list,highlight)
{    
    var cnt = list.getCount();
    var item;
    for (item=0;item<cnt;item++)
    {
        var id=list.getAt(item).id;
        this.highlightObject(this.scene,id,highlight);
    }
}
BdViewer.prototype.openLights = function(vis)
{
    for(var item=0;item<this.lights.length;item++)
    {
        this.lights[item].visible=vis;
    }
}
BdViewer.prototype.setSceneHight = function(highlight)
{
     this.setListHight(this.curFloor.BlockList,false);
     this.setListHight(this.curFloor.MPointList,false);
     this.setListHight(this.curFloor.BrandList,false);
     this.openLights(!highlight);
}