function xmlStringReplace(str)
{
    return str.replace(/>/g,'&gt;').replace(/</g,'&lt;').replace(/"/g,'&quot;').replace(/'/g,"&apos;").replace(/&/g,'&amp;');
}
function upCaseFirst(str)
{
    return str.toLowerCase().replace(/(\w)/,function(v){return v.toUpperCase()});
}
function toLoadAll(bdList,path)
{
    var bdcnt=bdList.getCount();
    if(bdcnt==0)
    {
        bdList.Init();
        readBuildingList(path,bdList);
    }
    for(var bdi=0;bdi<bdcnt;bdi++)
    {
        var newbd=bdList.getAt(bdi);
        readBuilding(bdList,newbd);
        var flcnt=newbd.getCount();
        for(var fli=0;fli<flcnt;fli++)
        {
            var newfloo=newbd.getAt(fli);
            if(readFloor(newbd,newfloo)==false)
            {
                fli--;
                flcnt--;
            }
            
        }
    }
    curBuilding=bdList.getAt(0);
    curFloor=newbd.getAt(0);
}
function toLoadPart(bdList,path,bdid,flid)
{
    var bdcnt=bdList.getCount();
    var ret=false;
    if(bdcnt>0)
    {
        ret=alertConfirm("是否重新加载整个楼群列表（将会清空所有建筑物及所有楼层）？");
    }
    if(ret==true||bdcnt==0){            
        bdList.Init();
        readBuildingList(path,bdList);
    }
     curBuilding = bdList.getAt(bdid);
     var newbd=curBuilding;
    readBuilding(bdList,newbd);
     curFloor = newbd.getAt(flid);
     var newfloo=curFloor;
    readFloor(newbd,newfloo);
}
function toSaveAll(bdList,type)
{    
    if(type!="json"&&type!="xml")
    {
        toMakeBlob("",type);
        return;
    }
    var zip = new JSZip();
    zip.file("BuildingList."+type,toMakeBlobString(bdList,type)[2]);
    var buildingFolder =  zip.folder("buildings");
    var floorFolder =  zip.folder("floors");
    var iamgeFolder =  zip.folder("iamges");
    var modelFolder =  zip.folder("models");
    
    var bdcnt=bdList.getCount();
    for(var bdi=0;bdi<bdcnt;bdi++)
    {
        var newbd=bdList.getAt(bdi);
        // buildingFolder.file(upCaseFirst(newbd.id)+"."+type,toMakeBlobString(newbd,type)[2]);
        var buildingpathLength="./data/buildings/".length;
        buildingFolder.file(newbd.path.slice(buildingpathLength),toMakeBlobString(newbd,type)[2]);
        var flcnt=newbd.getCount();        
        var floorpathLength="./data/floors/".length;
        for(var fli=0;fli<flcnt;fli++)
        {
            var newfloo=newbd.getAt(fli);
            // floorFolder.file(upCaseFirst(newfloo.id)+"."+type,toMakeBlobString(newfloo,type)[2]);            
            floorFolder.file(newfloo.path.slice(floorpathLength),toMakeBlobString(newfloo,type)[2]);
        }
    }
    zip.file("说明.txt","请将文件解压缩到3ddemo/data/路径下");
    var content = zip.generate({type:"blob"});
    // see FileSaver.js
    saveAs(content, "data.zip");
}
function toSaveFile(obj,type)
{    
    var outputStr=toMakeBlobString(obj,type);
    output=outputStr[2];
    cansave=outputStr[0];
    if(!cansave)
    {
        toMakeBlob(obj,type);
        return;
    }

    var zip = new JSZip();
    zip.file(upCaseFirst(obj.id)+"."+type,output);
    zip.file("说明.txt","请将文件解压缩到3ddemo/data/路径下");
    var content = zip.generate({type:"blob"});
    // see FileSaver.js
    saveAs(content, upCaseFirst(obj.id)+".zip");
}
function toMakeBlobString(obj,type)
{        
    var typetext="plain";
    var cansave=true;
    if(type=="xml")
    {
        output=obj.serializeXML();
        typetext=type;
    }
    else if(type=="json")
    {
        if((obj instanceof Building)||(obj instanceof BuildingList))
        {
            output=obj.serializeJSON();
        }
        else 
        {            
            output=JSON.stringify(obj,null, '    ' );
            output = output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );
        }
         
    }
    else 
    {
        output="错误格式："+type;
        cansave=false;
    }
    return new Array(cansave,typetext,output);
}
function toMakeBlob(obj,type)
{
    var outputStr=toMakeBlobString(obj,type);
    toShowBlob(outputStr);
}
function toShowBlob(outputStr)
{
    output=outputStr[2];
    typetext=outputStr[1];
    var blob = new Blob( [ "\ufeff" +output ], { type: 'text/'+typetext+' ; charset=utf8' } );//ufeff防止utf8 bom，防止中文乱码
    var objectURL = URL.createObjectURL( blob );

    window.open( objectURL, '_blank' );
    window.focus();
}
function toFixed(number, digit)
{
    s=1;
    for(var key=0 ; key<digit;key++)
        s=s*10;
    return Math.round(number*s)/s;
}

THREE.Vector3.prototype.rounding = function(digits)
{
    this.x=toFixed(this.x, digits);
    this.y=toFixed(this.y, digits);
    this.z=toFixed(this.z, digits);
}