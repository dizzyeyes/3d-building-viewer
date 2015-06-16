BdViewer.prototype.newBlock3 = function(scene,floor,x,y,z)
{
    return this.scope.newBlock(scene,floor,new THREE.Vector3(x,y,z));
}
BdViewer.prototype.newBlock = function(scene,floor,pos)
{  
    var block=initBlock(floor,pos);
    if(block==null) 
    {
        return "";
    }
    floor.addBlockItem(block);
    this.scope.loadBlock(scene,block,"block");
    return block.id;
}
