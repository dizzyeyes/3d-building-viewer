function newBlock3(scene,floor,x,y,z)
{
    newBlock(scene,floor,new THREE.Vector3(x,y,z));
}
function newBlock(scene,floor,pos)
{  
    var block=initBlock(floor,pos);
    if(block==null) 
    {
        //controls.enabled=true;
        return "";
    }
    floor.addBlockItem(block);
    loadBlock(scene,block,"block");
    //controls.enabled=true;
    return block.id;
}
function forceInput(tag,defaultValue)
{
    var ret="";
    while(ret=="")
    {
        ret = inputMsg("请输入"+tag,defaultValue);
        if(ret==null)
            return null;            
        ret=ret.trim();
    }
    return ret;
}
function checkCancel(name)
{
    if(name==null)
    {
        alertError("取消输入");
        return true;
    }
    return false;
}
function checkColor(num)
{
    if(num>1)
        return 1;
    else 
        return num;
}
function initBlock(floor,position)
{
    var id,name,path,modeltype,modelElement,textureString,texture;
    // var id = "NEWPOINT";
    // var name = "NEWPOINT";  
    // var path = "./data/models/mpoint.obj";     
    // var modeltype="obj";
    // var modelElement = new model(path,modeltype);    
    // var texture = 0x123556;  
    if(checkCancel(id = forceInput("模型ID","NEWBLOCK"))) return null;
    var obj=floor.getObjectById(id);
    if(obj!=null)
    {
        alertError("模型ID已存在");
        return null;
    }
    if(checkCancel(name = forceInput("模型名称","新模型"))) return null;
    var r=alertConfirm("是否使用默认的模型?");
    var path;
    if (r==true)
    {        
        path = "./data/models/bai01.obj"; 
    }
    else
    {    
        if(checkCancel(path = forceInput("模型路径","./data/models/bai01.obj"))) return null;
    }   
    modeltype="obj";
    modelElement = new model(path,modeltype);    
    if(checkCancel(textureString = forceInput("模型颜色","255,220,0"))) return null;  
    var tSp = textureString.split(",");  
    var textureColor=new THREE.Color(checkColor(tSp[0]/255),checkColor(tSp[1]/255),checkColor(tSp[2]/255) );
    var texture=textureColor.getHex();
    var pos = position;
    var rot = new THREE.Vector3(0,0,0);
    var scale = new THREE.Vector3(1,10,1); 
    r=alertConfirm("是否输入模型信息?");
    var info;
    if (r==true)
    {               
        info = forceInput("模型信息","这是"+name);
    }
    if(info==undefined||info==null) info="这是"+name+"（默认信息）";
    var block =  new Block(id, name, modelElement,pos,rot,scale,texture,info);
    return block;
}