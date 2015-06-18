BdViewer.Brand= function(id,name,model,position,rotation,scale,texture,image,info,modelbias,modelbaseHeight) {
        if(id!=undefined) this.id = id;
        if(name!=undefined) this.name = name;
        if(model!=undefined) this.model=model;
        if(position!=undefined) this.position=position;
        if(rotation!=undefined) this.rotation=rotation;
        if(scale!=undefined) this.scale=scale;
        if(texture!=undefined) this.texture=texture;
        if(image!=undefined) this.image=image;
        if(info==undefined)  info="无";
        this.info = info;
        if(info.length>30)
            this.infoShort = info.slice(0,30);
        else this.infoShort = info;
        
        if(modelbias==undefined)  modelbias= new THREE.Vector3(0,0,50);
        this.modelbias=modelbias;
        
        if(modelbaseHeight==undefined)  modelbaseHeight= {block:2,mpoint:0,brand:30};
        this.modelbaseHeight=modelbaseHeight;
    }
BdViewer.Brand.prototype.copy=function(brand)
{    
    this.model=new BdViewer.model();this.model.copy(brand.model);
    this.position = new THREE.Vector3(); this.position.copy(brand.position);
    this.rotation = new THREE.Vector3(); this.rotation.copy(brand.rotation);
    this.scale = new THREE.Vector3(); this.scale.copy(brand.scale);
    this.texture=brand.texture;
    this.image=brand.image;
    if(brand.info==undefined)  brand.info="无";
    this.info = brand.info;
    if(this.info.length>30)
        this.infoShort = this.info.slice(0,30);
    else this.infoShort = this.info;
}
BdViewer.Brand.prototype.serializeXML = function(){        
    var rtn="";
    rtn+="<Brand";
    rtn+=" id=\""+this.id+"\"";
    rtn+=" name=\""+xmlStringReplace(this.name)+"\"";
    rtn+=" >";
    rtn+=this.model.serializeXML();
    var x = this.position.x - this.modelbias.x , y = this.position.y - this.modelbias.y - this.modelbaseHeight.brand, z = this.position.z-this.modelbias.z;
    rtn+="<position px=\""+ x+"\" py=\""+ y+"\" pz=\""+ z+"\" />";
    rtn+="<rotation px=\""+this.rotation.x+"\" py=\""+this.rotation.y+"\" pz=\""+this.rotation.z+"\" />";
    rtn+="<scale px=\""+this.scale.x+"\" py=\""+this.scale.y+"\" pz=\""+this.scale.z+"\" />";
    rtn+="<texture color=\""+this.texture+"\" />"
    rtn+="<image path=\""+this.image+"\" />"
    rtn+="<info>"+xmlStringReplace(this.info)+"</info>";
    rtn+="</Brand>";
    return rtn;
    }
BdViewer.Brand.prototype.serializeJSON = function(){        
    var rtn="";
    rtn+="{\"Brand\":{";
    rtn+="\"-id\":\""+this.id+"\",";
    rtn+="\"-name\":\""+this.name.replace(/"/g,'\\"')+"\",";
    rtn+=this.model.serializeJSON().slice(1,-1)+",";
    var x = this.position.x - this.modelbias.x , y = this.position.y - this.modelbias.y - this.modelbaseHeight.brand, z = this.position.z-this.modelbias.z;
    rtn+="\"position\":{\"-px\":\""+x+"\",\"-py\":\""+y+"\",\"-pz\":\""+z+"\"},";
    rtn+="\"rotation\":{\"-px\":\""+this.rotation.x+"\",\"-py\":\""+this.rotation.y+"\",\"-pz\":\""+this.rotation.z+"\"},";
    rtn+="\"scale\":{\"-px\":\""+this.scale.x+"\",\"-py\":\""+this.scale.y+"\",\"-pz\":\""+this.scale.z+"\"},";
    rtn+="\"texture\":{\"-color\":\""+this.texture+"\"},"
    rtn+="\"image\":{\"-path\":\""+this.image+"\"},"
    rtn+="\"info\":\""+this.info.replace(/"/g,'\\"')+"\"";
    rtn+="}}";
    return rtn;
    }