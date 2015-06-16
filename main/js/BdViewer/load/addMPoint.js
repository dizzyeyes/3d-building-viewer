BdViewer.prototype.newMPoint3 = function(scene,floor,x,y,z)
{
    return this.scope.newMPoint(scene,floor,new THREE.Vector3(x,y,z));
}
BdViewer.prototype.newMPoint = function(scene,floor,pos)
{  
    var mpoint=initBall(floor,pos);
    if(mpoint==null)
    {
        return "";
    }
    floor.addMPointItem(mpoint);
    this.scope.loadBlock(scene,mpoint,"mpoint");
    return mpoint.id;
}