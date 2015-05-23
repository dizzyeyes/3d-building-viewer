
THREE.Scene.prototype.getObjectByModelId = function(modelid)
{
    for(var key in this.children)
    {
        if(this.children[key].modelid==modelid)
            return this.children[key];        
    }
    return undefined;    
}
THREE.Scene.prototype.getObjectByModelName = function(modelname)
{    
    for(var key in this.children)
    {
        if(this.children[key].modelname==modelname)
            return this.children[key];        
    }
    return undefined;     
}
