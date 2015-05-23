function MPoint(id,name,type, model,position,rotation,scale,texture,info) {
        if(id!=undefined) this.id = id;
        if(name!=undefined) this.name = name;
        if(model!=undefined) this.model=model;
        if(position!=undefined) this.position=position;
        if(rotation!=undefined) this.rotation=rotation;
        if(scale!=undefined) this.scale=scale;
        if(texture!=undefined) this.texture=texture;
        if(type!=undefined) this.type = type;
        if(info==undefined)  info="无";
        this.info = info;
        if(info.length>30)
            this.infoShort = info.slice(0,30);
        else this.infoShort = info;
    }
MPoint.prototype.copy=function(mpoint)
{    
    this.type = mpoint.type;
    this.model=new model();this.model.copy(mpoint.model);
    this.position = new THREE.Vector3(); this.position.copy(mpoint.position);
    this.rotation = new THREE.Vector3(); this.rotation.copy(mpoint.rotation);
    this.scale = new THREE.Vector3(); this.scale.copy(mpoint.scale);
    this.texture=mpoint.texture;
    if(mpoint.info==undefined)  mpoint.info="无";
    this.info = mpoint.info;
    if(this.info.length>30)
        this.infoShort = this.info.slice(0,30);
    else this.infoShort = this.info;
}
MPoint.prototype.serializeXML = function(){        
    var rtn="";
    rtn+="<MPoint";
    rtn+=" id=\""+this.id+"\"";
    rtn+=" name=\""+xmlStringReplace(this.name)+"\"";
    rtn+=" type=\""+this.type+"\"";
    rtn+=" >";
    rtn+=this.model.serializeXML();
    var x = this.position.x - modelbias.x , y = this.position.y - modelbias.y - modelbaseHeight.mpoint, z = this.position.z-modelbias.z;
    rtn+="<position px=\""+ x+"\" py=\""+ y+"\" pz=\""+ z+"\" />";
    rtn+="<rotation px=\""+this.rotation.x+"\" py=\""+this.rotation.y+"\" pz=\""+this.rotation.z+"\" />";
    rtn+="<scale px=\""+this.scale.x+"\" py=\""+this.scale.y+"\" pz=\""+this.scale.z+"\" />";
    rtn+="<texture color=\""+this.texture+"\" />"
    rtn+="<info>"+xmlStringReplace(this.info)+"</info>";
    rtn+="</MPoint>";
    return rtn;
    }
MPoint.prototype.serializeJSON = function(){        
    var rtn="";
    rtn+="{\"MPoint\":{";
    rtn+="\"-id\":\""+this.id+"\",";
    rtn+="\"-name\":\""+this.name.replace(/"/g,'\\"')+"\",";
    rtn+="\"-type\":\""+this.type+"\",";
    rtn+=this.model.serializeJSON().slice(1,-1)+",";
    var x = this.position.x - modelbias.x , y = this.position.y - modelbias.y - modelbaseHeight.mpoint, z = this.position.z-modelbias.z;
    rtn+="\"position\":{\"-px\":\""+x+"\",\"-py\":\""+y+"\",\"-pz\":\""+z+"\"},";
    rtn+="\"rotation\":{\"-px\":\""+this.rotation.x+"\",\"-py\":\""+this.rotation.y+"\",\"-pz\":\""+this.rotation.z+"\"},";
    rtn+="\"scale\":{\"-px\":\""+this.scale.x+"\",\"-py\":\""+this.scale.y+"\",\"-pz\":\""+this.scale.z+"\"},";
    rtn+="\"texture\":{\"-color\":\""+this.texture+"\"},"
    rtn+="\"info\":\""+this.info.replace(/"/g,'\\"')+"\"";
    rtn+="}}";
    return rtn;
    }