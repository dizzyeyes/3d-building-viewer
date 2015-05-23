function BuildingList(info) {
     if(info==undefined)  info="无";
     this.info = info;
    if(info.length>30)
        this.infoShort = info.slice(0,30);
    else this.infoShort = info;
     this.Init();
}
BuildingList.prototype.Init = function()
{
     this.List = new _objList();
}
BuildingList.prototype.getCount = function()
{
    return this.List.getCount();
}
BuildingList.prototype.getAt = function(itemid)
{
    return this.List.getAt(itemid);
}
BuildingList.prototype.addItem = function(item)
{
    this.List.addItem(item);
}
BuildingList.prototype.removeAt = function(itemid)
{
    return this.List.removeAt(itemid); 
}
BuildingList.prototype.removeItem = function(item)
{
    return this.List.removeItem(item); 
}
BuildingList.prototype.getObjectById = function(id)
{
    var cnt=this.getCount();
    for(var item=0; item<cnt;item++)
    {
        if(this.getAt(item).id==id)
            return this.getAt(item);
    }
    
    return null;
}
BuildingList.prototype.getJSONStringofBuildings = function()
{
    var cnt=this.getCount();
    var bdlistString="{";
    var value;
    for(var key=0; key < cnt; key++)
    {
        value=this.getAt(key).name;
        bdlistString+="'"+value+"':'"+key+"',";
    }
    bdlistString=bdlistString.slice(0,-1);
    bdlistString+="}"
    return bdlistString;
}
BuildingList.prototype.serializeXML = function(){        
    var rtn="";
    rtn+="<BuildingList";
    rtn+=" >";
    var cnt=this.getCount();
    for(var key=0;key<cnt;key++)
    {        
        // rtn+=this.getAt(key).serializeXML();
        rtn+=this.getAt(key).serializeXMLSHORT();
    }
    rtn+="<info>"+xmlStringReplace(this.info)+"</info>";
    rtn+="</BuildingList>";
    return rtn;
    }
BuildingList.prototype.serializeJSON = function(){        
    var rtn="";
    var cnt=this.getCount();
    rtn+="{\"BuildingList\":{";
    rtn+="\"Building\":";
    rtn+="[";
    for(var key=0;key<cnt;key++)
    {        
        // rtn+=this.getAt(key).serializeJSON().slice(1,-1)+",";
        rtn+=this.getAt(key).serializeJSONSHORT().slice(12,-1)+",";
    }    
    rtn=rtn.slice(0,-1);    
    rtn+="]";
    rtn+=",";    
    rtn+="\"info\":\""+this.info.replace(/"/g,'\\"')+"\"";
    rtn+="}}";
    return rtn;
    }
    