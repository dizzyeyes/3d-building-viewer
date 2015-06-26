
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


THREE.Vector3.prototype.rounding = function(digits)
{
    this.x=this.toFixed(this.x, digits);
    this.y=this.toFixed(this.y, digits);
    this.z=this.toFixed(this.z, digits);
}
THREE.Vector3.prototype.toFixed = function(number, digit)
{
    s=1;
    for(var key=0 ; key<digit;key++)
        s=s*10;
    return Math.round(number*s)/s;
}