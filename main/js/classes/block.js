function Block(id,name,model,position,rotation,scale,texture,info) {
        if(id!=undefined) this.id = id;
        if(name!=undefined) this.name = name;
        if(model!=undefined) this.model=model;
        if(position!=undefined) this.position=position;
        if(rotation!=undefined) this.rotation=rotation;
        if(scale!=undefined) this.scale=scale;
        if(texture!=undefined) this.texture=texture;
        if(info==undefined)  info="无";
        this.info = info;
        if(info.length>30)
            this.infoShort = info.slice(0,30);
        else this.infoShort = info;
    }
Block.prototype.copy=function(block)
{    
    this.model=new model();this.model.copy(block.model);
    this.position = new THREE.Vector3(); this.position.copy(block.position);
    this.rotation = new THREE.Vector3(); this.rotation.copy(block.rotation);
    this.scale = new THREE.Vector3(); this.scale.copy(block.scale);
    this.texture=block.texture;
    if(block.info==undefined)  block.info="无";
    this.info = block.info;
    if(this.info.length>30)
        this.infoShort = this.info.slice(0,30);
    else this.infoShort = this.info;
}
Block.prototype.serializeXML = function(){        
    var rtn="";
    rtn+="<Block";
    rtn+=" id=\""+this.id+"\"";
    rtn+=" name=\""+xmlStringReplace(this.name)+"\"";
    rtn+=" >";
    rtn+=this.model.serializeXML();
    var x = this.position.x - modelbias.x , y = this.position.y - modelbias.y - modelbaseHeight.block, z = this.position.z-modelbias.z;
    rtn+="<position px=\""+ x+"\" py=\""+ y+"\" pz=\""+ z+"\" />";
    rtn+="<rotation px=\""+this.rotation.x+"\" py=\""+this.rotation.y+"\" pz=\""+this.rotation.z+"\" />";
    rtn+="<scale px=\""+this.scale.x+"\" py=\""+this.scale.y+"\" pz=\""+this.scale.z+"\" />";
    rtn+="<texture color=\""+this.texture+"\" />"
    rtn+="<info>"+xmlStringReplace(this.info)+"</info>";
    rtn+="</Block>";
    return rtn;
    }
Block.prototype.serializeJSON = function(){        
    var rtn="";
    rtn+="{\"Block\":{";
    rtn+="\"-id\":\""+this.id+"\",";
    rtn+="\"-name\":\""+this.name.replace(/"/g,'\\"')+"\",";
    rtn+=this.model.serializeJSON().slice(1,-1)+",";
    var x = this.position.x - modelbias.x , y = this.position.y - modelbias.y - modelbaseHeight.block, z = this.position.z-modelbias.z;
    rtn+="\"position\":{\"-px\":\""+x+"\",\"-py\":\""+y+"\",\"-pz\":\""+z+"\"},";
    rtn+="\"rotation\":{\"-px\":\""+this.rotation.x+"\",\"-py\":\""+this.rotation.y+"\",\"-pz\":\""+this.rotation.z+"\"},";
    rtn+="\"scale\":{\"-px\":\""+this.scale.x+"\",\"-py\":\""+this.scale.y+"\",\"-pz\":\""+this.scale.z+"\"},";
    rtn+="\"texture\":{\"-color\":\""+this.texture+"\"},"
    rtn+="\"info\":\""+this.info.replace(/"/g,'\\"')+"\"";
    rtn+="}}";
    return rtn;
    }