
var xmlStringReplace = function(str)
{
    return str.replace(/>/g,'&gt;').replace(/</g,'&lt;').replace(/"/g,'&quot;').replace(/'/g,"&apos;").replace(/&/g,'&amp;');
}
BdViewer.prototype.upCaseFirst = function(str)
{
    return str.toLowerCase().replace(/(\w)/,function(v){return v.toUpperCase()});
}
BdViewer.prototype.toLoadAll = function(path)
{
    var bdList = this.bdList;
    var bdcnt=bdList.getCount();
    if(bdcnt==0)
    {
        bdList.Init();
        this.readBuildingList(path,bdList);
    }
    for(var bdi=0;bdi<bdcnt;bdi++)
    {
        var newbd=bdList.getAt(bdi);
        this.readBuilding(bdList,newbd);
        var flcnt=newbd.getCount();
        for(var fli=0;fli<flcnt;fli++)
        {
            var newfloo=newbd.getAt(fli);
            if(this.readFloor(newbd,newfloo)==false)
            {
                fli--;
                flcnt--;
            }
            
        }
    }
    this.curBuilding=bdList.getAt(0);
    this.curFloor=newbd.getAt(0);
}
BdViewer.prototype.toLoadPart = function(path)
{
    var bdList = this.bdList;
    var bdid = this.params.building;
    var flid = this.params.floor;
    var bdcnt=bdList.getCount();
    var ret=false;
    if(bdcnt>0)
    {
        ret=this.msgToolkit.alertConfirm("是否重新加载整个楼群列表（将会清空所有建筑物及所有楼层）？");
    }
    if(ret==true||bdcnt==0){            
        bdList.Init();
        this.readBuildingList(path,bdList);
    }
     this.curBuilding = bdList.getAt(bdid);
     var newbd=this.curBuilding;
    this.readBuilding(bdList,newbd);
    this.curFloor = newbd.getAt(flid);
     var newfloo=this.curFloor;
    this.readFloor(newbd,newfloo);
}
BdViewer.prototype.toSaveAll = function(type)
{    
    this.toLoadAll(this.BuildingListXML);
    var bdList = this.bdList;
    if(type!="json"&&type!="xml")
    {
        this.toMakeBlob("",type);
        return;
    }
    var zip = new JSZip();
    zip.file("BuildingList."+type,this.toMakeBlobString(bdList,type)[2]);
    var buildingFolder =  zip.folder("buildings");
    var floorFolder =  zip.folder("floors");
    var iamgeFolder =  zip.folder("iamges");
    var modelFolder =  zip.folder("models");
    
    var bdcnt=bdList.getCount();
    for(var bdi=0;bdi<bdcnt;bdi++)
    {
        var newbd=bdList.getAt(bdi);
        // buildingFolder.file(this.upCaseFirst(newbd.id)+"."+type,this.toMakeBlobString(newbd,type)[2]);
        var buildingpathLength="./data/buildings/".length;
        buildingFolder.file(newbd.path.slice(buildingpathLength),this.toMakeBlobString(newbd,type)[2]);
        var flcnt=newbd.getCount();        
        var floorpathLength="./data/floors/".length;
        for(var fli=0;fli<flcnt;fli++)
        {
            var newfloo=newbd.getAt(fli);
            // floorFolder.file(this.upCaseFirst(newfloo.id)+"."+type,this.toMakeBlobString(newfloo,type)[2]);            
            floorFolder.file(newfloo.path.slice(floorpathLength),this.toMakeBlobString(newfloo,type)[2]);
        }
    }
    zip.file("说明.txt","请将文件解压缩到3ddemo/data/路径下");
    var content = zip.generate({type:"blob"});
    // see FileSaver.js
    saveAs(content, "data.zip");
}
BdViewer.prototype.exportFloor = function(type)
{
    this.toSaveFile(this.curFloor,type);
}
BdViewer.prototype.toSaveFile = function(obj,type)
{    
    var outputStr = this.toMakeBlobString(obj,type);
    output=outputStr[2];
    cansave=outputStr[0];
    if(!cansave)
    {
        this.toMakeBlob(obj,type);
        return;
    }

    var zip = new JSZip();
    zip.file(this.upCaseFirst(obj.id)+"."+type,output);
    zip.file("说明.txt","请将文件解压缩到3ddemo/data/路径下");
    var content = zip.generate({type:"blob"});
    // see FileSaver.js
    saveAs(content, this.upCaseFirst(obj.id)+".zip");
}
BdViewer.prototype.toMakeBlobString = function(obj,type)
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
BdViewer.prototype.toMakeBlob = function(obj,type)
{
    var outputStr=this.toMakeBlobString(obj,type);
    this.toShowBlob(outputStr);
}
BdViewer.prototype.toShowBlob = function(outputStr)
{
    output=outputStr[2];
    typetext=outputStr[1];
    var blob = new Blob( [ "\ufeff" +output ], { type: 'text/'+typetext+' ; charset=utf8' } );//ufeff防止utf8 bom，防止中文乱码
    var objectURL = URL.createObjectURL( blob );

    window.open( objectURL, '_blank' );
    window.focus();
}
BdViewer.prototype.toFixed = function(number, digit)
{
    s=1;
    for(var key=0 ; key<digit;key++)
        s=s*10;
    return Math.round(number*s)/s;
}
