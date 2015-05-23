function newMPoint3(scene,floor,x,y,z)
{
    newMPoint(scene,floor,new THREE.Vector3(x,y,z));
}
function newMPoint(scene,floor,pos)
{  
    var mpoint=initBall(floor,pos);
    if(mpoint==null)
    {
        //controls.enabled=true;
        return "";
    }
    floor.addMPointItem(mpoint);
    loadBlock(scene,mpoint,"mpoint");
    return mpoint.id;
    //controls.enabled=true;
}
function initBall(floor,position)
{
    var id,name,type,path,modeltype,modelElement,textureString,texture;
    // var id = "NEWPOINT";
    // var name = "NEWPOINT";
    // var type = "";   
    // var path = "./data/models/mpoint.obj";     
    // var modeltype="obj";
    // var modelElement = new model(path,modeltype);    
    // var texture = 0x123556;  
    if(checkCancel(id = forceInput("请输入测点ID","NEWPOINT"))) return null;
    var obj=floor.getObjectById(id);
    if(obj!=null)
    {
        alertError("测点ID已存在");
        return null;
    }
    if(checkCancel(name = forceInput("测点名","新测点"))) return null;
    if(checkCancel(type = forceInput("标签","Temperature"))) return null;
    var r=alertConfirm("是否使用默认的测点模型!");
    var path;
    if (r==true)
    {        
        path = "./data/models/mpoint.obj"; 
    }
    else
    {    
         if(checkCancel(path = forceInput("测点模型路径","./data/models/mpoint.obj"))) return null;
    }   
    modeltype="obj";
    modelElement = new model(path,modeltype);    
    if(checkCancel(textureString = forceInput("测点颜色","255,220,0"))) return null;  
    var tSp = textureString.split(",");  
    var textureColor=new THREE.Color(checkColor(tSp[0]/255),checkColor(tSp[1]/255),checkColor(tSp[2]/255) );
    var texture=textureColor.getHex();
    var pos = position;
    var rot = new THREE.Vector3(0,0,0);
    var scale = new THREE.Vector3(0.01,0.01,0.01);   
    var mpoint =  new MPoint(id, name, type, modelElement,pos,rot,scale,texture);
    return mpoint;
}