function Building(id,name,path,info) {
        this.id = id;
        this.name = name;
        this.path = path;
        if(info==undefined)  info="无";
        this.info = info;
        if(info.length>30)
            this.infoShort = info.slice(0,30);
        else this.infoShort = info;
        this.List = new _objList();
    }
Building.prototype.getCount = function()
{
    return this.List.getCount();
}
Building.prototype.getAt = function(itemid)
{
    return this.List.getAt(itemid);
}
Building.prototype.addItem = function(item)
{
    this.List.addItem(item);
}
Building.prototype.removeAt = function(itemid)
{
    return this.List.removeAt(itemid); 
}
Building.prototype.getObjectById = function(id)
{
    var cnt=this.getCount();
    for(var item=0; item<cnt;item++)
    {
        if(this.getAt(item).id==id)
            return this.getAt(item);
    }
    
    return null;
}
Building.prototype.removeItem = function(item)
{
    return this.List.removeItem(item); 
}
Building.prototype.getJSONStringofFloors = function()
{
    var cnt=this.getCount();
    var listStr="{";
    var value;
    for(var key=0; key < cnt; key++)
    {
        value=this.getAt(key).name;
        listStr+="'"+value+"':'"+key+"',";
    }
    listStr=listStr.slice(0,-1);
    listStr+="}"
    return listStr;
}
Building.prototype.serializeXML = function(){        
    var rtn="";
    rtn+="<Building";
    rtn+=" id=\""+this.id+"\"";
    rtn+=" name=\""+xmlStringReplace(this.name)+"\"";
    rtn+=" >";
    var cnt=this.getCount();
    for(var key=0;key<cnt;key++)
    {        
        // rtn+=this.getAt(key).serializeXML();
        rtn+=this.getAt(key).serializeXMLSHORT();
    }
    rtn+="<info>"+xmlStringReplace(this.info)+"</info>";
    rtn+="</Building>";
    return rtn;
    }
Building.prototype.serializeJSON = function(){        
    var rtn="";
    rtn+="{\"Building\":{";
    rtn+="\"-id\":\""+this.id+"\",";
    rtn+="\"-name\":\""+this.name.replace(/"/g,'\\"')+"\",";
    rtn+="\"Floor\":";
    var cnt=this.getCount();    
    rtn+="[";
    for(var key=0;key<cnt;key++)
    {        
        // rtn+=this.getAt(key).serializeJSON().slice(1,-1)+",";
        rtn+=this.getAt(key).serializeJSONSHORT().slice(9,-1)+",";
    }    
    rtn=rtn.slice(0,-1);    
    rtn+="]";
    rtn+=",";    
    rtn+="\"info\":\""+this.info.replace(/"/g,'\\"')+"\"";  
    rtn+="}}";
    return rtn;
    }
Building.prototype.serializeXMLSHORT = function(){        
    var rtn="";
    rtn+="<Building";
    rtn+=" id=\""+this.id+"\"";
    rtn+=" name=\""+xmlStringReplace(this.name)+"\"";
    rtn+=" path=\""+this.path+"\"";
    rtn+=" />";
    return rtn;
    }
Building.prototype.serializeJSONSHORT = function(){        
    var rtn="";
    rtn+="{\"Building\":{";
    rtn+="\"-id\":\""+this.id+"\",";
    rtn+="\"-name\":\""+this.name.replace(/"/g,'\\"')+"\",";
    rtn+="\"-path\":\""+this.path+"\"";
    rtn+="}}";
    return rtn;
    }