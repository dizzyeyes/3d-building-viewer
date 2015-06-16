BdViewer.Floor= function(id,name,path,info,cpos) {
        this.id = id;
        this.name = name;
        this.path = path;
        if(info==undefined)  info="无";
        this.info = info;
        if(info.length>30)
            this.infoShort = info.slice(0,30);
        else this.infoShort = info;
        this.Init();
        this.safe=true;   
        if(cpos!=undefined)
            this.camerapos=cpos;
    }
BdViewer.Floor.prototype.Init = function(){        
        this.BlockList=new BdViewer._objList("BlockList");
        this.MPointList=new BdViewer._objList("MPointList");
        this.BrandList=new BdViewer._objList("BrandList");
        this.GroupList=new BdViewer._objList("GroupList");
    }
BdViewer.Floor.prototype.getCount = function(){
    return this.getBlockCount()+this.getMPointCount()+this.getBrandCount();
}
BdViewer.Floor.prototype.removeById = function(id){
    return (this.removeBrandById(id)||this.removeBlockById(id)||this.removeMPointById(id));
}  
BdViewer.Floor.prototype.removeByName = function(name){
    return (this.removeBrandByName(name)||this.removeBlockByName(name)||this.removeMPointByName(name));
}   
BdViewer.Floor.prototype.getObjectById = function(id){
    if(obj=this.getBrandById(id))
        return obj;
    if(obj=this.getBlockById(id))
        return obj;
    if(obj=this.getMPointById(id))
        return obj;
    return null;
}    
BdViewer.Floor.prototype.getObjectByName = function(name){
    if(obj=this.getBrandByName(name))
        return obj;
    if(obj=this.getBlockByName(name))
        return obj;
    if(obj=this.getMPointByName(name))
        return obj;
    return null;
}    
BdViewer.Floor.prototype.changeObjectId = function(idold,id)
{
    if(this.getObjectById(id)!=null) return false;//id查重    
    var obj=this.getObjectById(idold);
    if(obj==null) return false;//查无此物
    for(var item=0;item<this.GroupList.getCount();item++)
    {
        var group=this.GroupList.getAt(item);
        group.changeId(idold,id);
    }
    obj.id = id;
    return true;
}

BdViewer.Floor.prototype.removeObjectFromGroups = function(obj){    
        for(var item=0;item<this.GroupList.getCount();item++)
        {
            var group=this.GroupList.getAt(item);
            if(group.checkById(obj.id))
                group.removeById(obj.id);            
        }
}
BdViewer.Floor.prototype.getGroupCount = function(){
        return this.GroupList.getCount();
    }
BdViewer.Floor.prototype.getGroupAt = function(itemid){
        return this.GroupList.getAt(itemid);
    }
BdViewer.Floor.prototype.removeGroupAt = function(itemid){
        return this.GroupList.removeAt(itemid);
    }
BdViewer.Floor.prototype.getGroupByName= function(name){
        for(var item=0;item<this.GroupList.getCount();item++)
        {
            if(this.GroupList.getAt(item).name==name)
                return this.GroupList.getAt(item);
        }
        return null;
    }
BdViewer.Floor.prototype.getGroupById = function(id){
        var cnt=this.getGroupCount();
        for(var key=0;key<cnt;key++)
        {
            if(this.getGroupAt(key).id==id)
                return this.getGroupAt(key);
        }
        return null;
    } 
BdViewer.Floor.prototype.addGroupItem = function(group){
        this.GroupList.addItem(group);
    }
BdViewer.Floor.prototype.removeGroup = function(group){
        return this.GroupList.removeItem(group);
    }
BdViewer.Floor.prototype.removeGroupByName = function(name){
        if(group=this.getGroupByName(name))
            return this.removeGroup(group);
        return false;
    }
BdViewer.Floor.prototype.removeGroupById = function(id){
        if(group=this.getGroupById(id))
            return this.removeGroup(group);
        return false;
    }
   
BdViewer.Floor.prototype.getBlockCount = function(){
        return this.BlockList.getCount();
    }
BdViewer.Floor.prototype.getBlockAt = function(itemid){
        return this.BlockList.getAt(itemid);
    }
BdViewer.Floor.prototype.getBlockByName = function(name){
        var cnt=this.getBlockCount();
        for(var key=0;key<cnt;key++)
        {
            if(this.getBlockAt(key).name==name)
                return this.getBlockAt(key);
        }
        return null;
    }
BdViewer.Floor.prototype.getBlockById = function(id){
        var cnt=this.getBlockCount();
        for(var key=0;key<cnt;key++)
        {
            if(this.getBlockAt(key).id==id)
                return this.getBlockAt(key);
        }
        return null;
    }
BdViewer.Floor.prototype.removeBlockAt = function(itemid){
        return this.BlockList.removeAt(itemid);
    }
BdViewer.Floor.prototype.removeBlockByName = function(name){
        if(block=this.getBlockById(name))
            return this.removeBlock(block);
        return false;
    }
BdViewer.Floor.prototype.removeBlockById = function(id){
        if(block=this.getBlockById(id))
            return this.removeBlock(block);
        return false;
    }
BdViewer.Floor.prototype.addBlockItem = function(block){
        this.BlockList.addItem(block);
    }
BdViewer.Floor.prototype.removeBlock = function(block){
       if(this.safe) this.removeObjectFromGroups(block);
       return this.BlockList.removeItem(block);
    }
    
BdViewer.Floor.prototype.getMPointCount = function(){
        return this.MPointList.getCount();
    }
BdViewer.Floor.prototype.getMPointAt = function(itemid){
        return this.MPointList.getAt(itemid);
    }
BdViewer.Floor.prototype.getMPointByName = function(name){
        var cnt=this.getMPointCount();
        for(var key=0;key<cnt;key++)
        {
            if(this.getMPointAt(key).name==name)
                return this.getMPointAt(key);
        }
        return null;
    }
BdViewer.Floor.prototype.getMPointById = function(id){
        var cnt=this.getMPointCount();
        for(var key=0;key<cnt;key++)
        {
            if(this.getMPointAt(key).id==id)
                return this.getMPointAt(key);
        }
        return null;
    }
BdViewer.Floor.prototype.removeMPointAt = function(itemid){
        return this.MPointList.removeAt(itemid);
    }
BdViewer.Floor.prototype.removeMPointByName = function(name){
        if(mpoint=this.getMPointById(name))
            return this.removeMPoint(mpoint);
        return false;
    }
BdViewer.Floor.prototype.removeMPointById = function(id){
        if(mpoint=this.getMPointById(id))
            return this.removeMPoint(mpoint);
        return false;
    }
BdViewer.Floor.prototype.addMPointItem = function(mpoint){
        this.MPointList.addItem(mpoint);
    }
BdViewer.Floor.prototype.removeMPoint = function(mpoint){
        if(this.safe) this.removeObjectFromGroups(mpoint);
        return this.MPointList.removeItem(mpoint);
    }
    
BdViewer.Floor.prototype.getBrandCount = function(){
        return this.BrandList.getCount();
    }
BdViewer.Floor.prototype.getBrandByName = function(name){
        var cnt=this.getBrandCount();
        for(var key=0; key<cnt;key++)
        {
            if(this.getBrandAt(key).name==name)
                return this.getBrandAt(key);
        }
        return null;
    }
BdViewer.Floor.prototype.getBrandById = function(id){
        var cnt=this.getBrandCount();
        for(var key=0; key<cnt;key++)
        {
            if(this.getBrandAt(key).id==id)
                return this.getBrandAt(key);
        }
        return null;
    }
BdViewer.Floor.prototype.getBrandAt = function(itemid){
        return this.BrandList.getAt(itemid);
    }
BdViewer.Floor.prototype.removeBrandByName = function(name){
        if(brand=this.getBrandById(name))
            return this.removeBrand(brand);
        return false;
    }
BdViewer.Floor.prototype.removeBrandById = function(id){
        if(brand=this.getBrandById(id))
            return this.removeBrand(brand);
        return false;
    }
BdViewer.Floor.prototype.removeBrandAt = function(itemid){
        return this.BrandList.removeAt(itemid);
    }
BdViewer.Floor.prototype.addBrandItem = function(brand){
        this.BrandList.addItem(brand);
    }
BdViewer.Floor.prototype.removeBrand = function(brand){
        if(this.safe) this.removeObjectFromGroups(brand);
        return this.BrandList.removeItem(brand);
    }

BdViewer.Floor.prototype.serializeXML = function(){
    if(this.camerapos==undefined) this.camerapos=camera.position;
    var rtn="";
    rtn+="<Floor";
    rtn+=" id=\""+this.id+"\"";
    rtn+=" name=\""+xmlStringReplace(this.name)+"\"";
    rtn+=" >";    
    rtn+="<camera pos=\""+this.camerapos.toArray().toString()+"\"/>";
    rtn+=this.BlockList.serializeXML();
    rtn+=this.MPointList.serializeXML();
    rtn+=this.BrandList.serializeXML();
    rtn+=this.GroupList.serializeXML();    
    rtn+="<floorInfo>"+xmlStringReplace(this.info)+"</floorInfo>";
    rtn+="</Floor>";
    return rtn;
    }
BdViewer.Floor.prototype.serializeJSON = function(){    
    if(this.camerapos==undefined) this.camerapos=camera.position;    
    var rtn="";
    rtn+="{\"Floor\":{";
    rtn+="\"-id\":\""+this.id+"\",";
    rtn+="\"-name\":\""+this.name.replace(/"/g,'\\"')+"\",";
    rtn+="\"camerapos\":{\"-pos\":\""+this.camerapos.toArray().toString()+"\"},";
    rtn+=this.BlockList.serializeJSON().slice(1,-1)+",";
    rtn+=this.MPointList.serializeJSON().slice(1,-1)+",";
    rtn+=this.BrandList.serializeJSON().slice(1,-1)+",";
    rtn+=this.GroupList.serializeJSON().slice(1,-1)+",";
    rtn+="\"floorinfo\":\""+this.info.replace(/"/g,'\\"')+"\"";
    rtn+="}}";
    return rtn;
    }
BdViewer.Floor.prototype.serializeXMLSHORT = function(){        
    var rtn="";
    rtn+="<Floor";
    rtn+=" id=\""+this.id+"\"";
    rtn+=" name=\""+xmlStringReplace(this.name)+"\"";
    rtn+=" path=\""+this.path+"\"";
    rtn+=" />";
    return rtn;
    }
BdViewer.Floor.prototype.serializeJSONSHORT = function(){        
    var rtn="";
    rtn+="{\"Floor\":{";
    rtn+="\"-id\":\""+this.id+"\",";
    rtn+="\"-name\":\""+this.name.replace(/"/g,'\\"')+"\",";
    rtn+="\"-path\":\""+this.path+"\"";
    rtn+="}}";
    return rtn;
    }
 
BdViewer.model = function(path,type) {
    this.type = type;
    this.path = path;
}
BdViewer.model.prototype.copy = function(md){     
    this.type = md.type;
    this.path = md.path;
}       
BdViewer.model.prototype.serializeXML = function(){        
    var rtn="";
    rtn+="<model";
    rtn+=" path=\""+this.path+"\"";
    rtn+=" type=\""+this.type+"\"";
    rtn+=" />";
    return rtn;
    }
BdViewer.model.prototype.serializeJSON = function(){        
    var rtn="";
    rtn+="{\"model\":{";
    rtn+="\"-path\":\""+this.path+"\",";
    rtn+="\"-type\":\""+this.type+"\"";
    rtn+="}}";
    return rtn;
    }
