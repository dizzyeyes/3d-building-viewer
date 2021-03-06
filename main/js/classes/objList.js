   
function _objList(listname){
    if(listname==undefined) listname="unkownList"
    this.listname=listname;
    this.List = new Array();
}
_objList.prototype.getObjectById = function(id)
{        
        var cnt=this.getCount();
        for(var key=0;key<cnt;key++)
        {
            if(this.getAt(key).id==id)
                return this.getAt(key);
        }
        return null;
}
_objList.prototype.getCount = function()
{
    return this.List.length;
}
_objList.prototype.getAt = function(itemid)
{
    return this.List[itemid];
}
_objList.prototype.addItem = function(item)
{
    this.List.push(item);
}
_objList.prototype.removeAt = function(itemid)
{
    this.List.splice(itemid, 1); 
    return true; 
}
_objList.prototype.removeItem = function(item)
{
    var a = this.List.indexOf(item); 
    if (a >= 0) { 
        this.removeAt(a); 
        return true; 
    } 
    return false; 
}
_objList.prototype.serializeXML = function(){        
    var rtn="";
    rtn+="<"+this.listname+">";
    var cnt=this.getCount();
    for(var key=0;key<cnt;key++)
    {        
        rtn+=this.getAt(key).serializeXML();
    }
    rtn+="</"+this.listname+">";
    return rtn;
    }
_objList.prototype.serializeJSON = function(){        
    var rtn="";
    rtn+="{\""+this.listname+"\":{";
    rtn+="\""+this.listname.slice(0,-4)+"\":";
    var cnt=this.getCount();    
    rtn+="[";
    for(var key=0;key<cnt;key++)
    {        
        rtn+=this.getAt(key).serializeJSON().slice(this.listname.length,-1)+",";
    }    
    rtn=rtn.slice(0,-1);        
    rtn+="]";
    rtn+="}}";
    return rtn;
    }
    