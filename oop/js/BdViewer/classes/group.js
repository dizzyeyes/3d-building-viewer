BdViewer.Group= function(id,name,list,info) {
        this.id = id;
        this.name = name;
        this.List= list;
        if(info==undefined)  info="无";
        this.info = info;
        if(info.length>30)
            this.infoShort = info.slice(0,30);
        else this.infoShort = info;
    }
    
BdViewer.Group.prototype.getCount = function(){
        return this.List.length;
    }
BdViewer.Group.prototype.getAt = function(itemid){
        return this.List[itemid];
    }
BdViewer.Group.prototype.addItem = function(Item){
        this.List.push(Item);
    }    
BdViewer.Group.prototype.removeAt = function(itemid){
        this.List.splice(itemid, 1);
        return true;
    }  
BdViewer.Group.prototype.checkById = function(id){        
        var a = this.List.indexOf(id); 
        if (a >= 0) { 
            return true; 
        } 
        return false; 
    }
BdViewer.Group.prototype.getObjectById = function(id){        
        var a = this.List.indexOf(id); 
        if (a >= 0) { 
            return this.getAt(a); 
        } 
        return null; 
    }
BdViewer.Group.prototype.changeId = function(target,value){
        var a = this.List.indexOf(target); 
        if (a >= 0) { 
            this.List.splice(a,1,value);
            return true;
        } 
        return false;
}

    
BdViewer.Group.prototype.removeById = function(id){        
        var a = this.List.indexOf(id); 
        if (a >= 0) { 
            this.removeAt(a); 
            return true; 
        } 
        return false; 
    }
BdViewer.Group.prototype.serializeXML = function(){        
    var rtn="";
    rtn+="<Group";
    rtn+=" id=\""+this.id+"\"";
    rtn+=" name=\""+xmlStringReplace(this.name)+"\"";
    rtn+=" list=\""+this.List.toString().replace(/,/g,";")+"\"";
    rtn+=" info=\""+xmlStringReplace(this.info)+"\"";//引号转换
    rtn+=" />";
    return rtn;
    }
BdViewer.Group.prototype.serializeJSON = function(){        
    var rtn="";
    rtn+="{\"Group\":{";
    rtn+="\"-id\":\""+this.id+"\",";
    rtn+="\"-name\":\""+this.name.replace(/"/g,'\\"')+"\",";
    rtn+="\"-list\":\""+this.List.toString().replace(/,/g,";")+"\",";
    rtn+="\"-info\":\""+this.info.replace(/"/g,'\\"')+"\"";//引号转换
    rtn+="}}";
    return rtn;
    }