
function readBuildingList(filename,bdList)
{
    var xmlDoc = xml_loadFile(filename,null);
    if(xmlDoc==null) return bdList=null;
    var items = xmlDoc.getElementsByTagName("Building");
    // document.write("<table  border=1>");
    // alert(items.length);
    for(i=0;i<items.length;i++)
    {
        var id=items[i].getAttribute("id") ;
        var name=items[i].getAttribute("name");
        var path=items[i].getAttribute("path");
        var bd= new Building(id, name, path);
        bdList.addItem(bd);
        // alert(bd.name);
    }    
    var infoItem= xmlDoc.getElementsByTagName("info");
    var info= infoItem[0].childNodes[0].nodeValue;
    bdList.info=info;
}
function readBuilding(bdList,building)
{
    if(building.getCount()>0)
    {
        ret=alertConfirm("要重新加载 "+building.name+" 吗？已有"+building.getCount()+"个floor");
        if(ret==false)  
            return building;
    }
    var xmlDoc = xml_loadFile(building.path,null);
    if(xmlDoc==null)
    {
        bdList.removeItem(building);
        return building=null;
    }
    var items = xmlDoc.getElementsByTagName("Floor");
    for(i=0;i<items.length;i++)
    {
        var id=items[i].getAttribute("id") ;
        var name=items[i].getAttribute("name");
        var path=items[i].getAttribute("path");
        var floo= new Floor(id, name, path);
        building.addItem(floo);
    }
    var infoItem= xmlDoc.getElementsByTagName("info");
    var info= infoItem[0].childNodes[0].nodeValue;
    building.info=info;
}
function readFloor(curBuilding,floor)
{
    if(floor.getCount()>0)
    {
        ret=alertConfirm("要重新加载 "+curBuilding.name+"-"+floor.name+" 吗？已经有"+floor.getCount()+"个模型");
        if(ret==false)  
            return floor;
    }
    
    var xmlDoc = xml_loadFile(floor.path,null);
    if(xmlDoc==null)
    {
        curBuilding.removeItem(floor);
        return floor=false;
    }
    
    floor.Init();
    
    var infoItem= xmlDoc.getElementsByTagName("floorInfo");
    var info= infoItem[0].childNodes[0].nodeValue;
    floor.info=info;
    
    var cameraUtile = xmlDoc.getElementsByTagName("camera");
    if(cameraUtile.length>0)
    {
        var cpos=cameraUtile[0].getAttribute("pos");
        var vv=cpos.split(",");
        floor.camerapos=new THREE.Vector3(vv[0],vv[1],vv[2]);
    }
    
    readGroupList(floor,xmlDoc);
    readBlockList(floor,xmlDoc);
    readMPointList(floor,xmlDoc);
    readBrandList(floor,xmlDoc);
    return true;
}
function readGroupList(floor,xmlDoc)
{
    var items = xmlDoc.getElementsByTagName("Group");
    for(i=0;i<items.length;i++)
    {
        var id=items[i].getAttribute("id") ;
        var name=items[i].getAttribute("name");
        var list=items[i].getAttribute("list").split(";");
        var info=items[i].getAttribute("info");
        
        var group= new Group(id, name, list,info);
        floor.addGroupItem(group);
    }
}
function readBlockList(floor,xmlDoc)
{
    readList(floor,xmlDoc,"Block");
}
function readMPointList(floor,xmlDoc)
{    
    readList(floor,xmlDoc,"MPoint");
}
function readBrandList(floor,xmlDoc)
{
    readList(floor,xmlDoc,"Brand");
}
function readList(floor,xmlDoc,op)
{
    var items = xmlDoc.getElementsByTagName(op);
    for(i=0;i<items.length;i++)
    {
        var id=items[i].getAttribute("id") ;
        var name=items[i].getAttribute("name");
        var type;
        if(op=="MPoint") type=items[i].getAttribute("type");
        
        var modelNode=items[i].getElementsByTagName("model");
        var modelElement = new model(modelNode[0].getAttribute("path"),modelNode[0].getAttribute("type"));
        
        var posNode=items[i].getElementsByTagName("position");
        // var posElement = new THREE.Vector3(posNode[0].getAttribute("px"),posNode[0].getAttribute("py"),posNode[0].getAttribute("pz"));
        //addBias
        var rotNode=items[i].getElementsByTagName("rotation");
        var rotElement = new THREE.Vector3(rotNode[0].getAttribute("px"),rotNode[0].getAttribute("py"),rotNode[0].getAttribute("pz"));
        var scaleNode=items[i].getElementsByTagName("scale");
        var scaleElement = new THREE.Vector3(scaleNode[0].getAttribute("px"),scaleNode[0].getAttribute("py"),scaleNode[0].getAttribute("pz"));
        
        var textureNode=items[i].getElementsByTagName("texture");
        var textureElement=textureNode[0].getAttribute("color");
        var imageNode,imageElement;
        if(op=="Brand")
        {
            imageNode=items[i].getElementsByTagName("image");
            imageElement=imageNode[0].getAttribute("path");
        }
        var infoNode=items[i].getElementsByTagName("info");
        var info= infoNode[0].childNodes[0].nodeValue;
        if(op=="Block")
        {
            var posElement = new THREE.Vector3(posNode[0].getAttribute("px")/1+modelbias.x,posNode[0].getAttribute("py")/1+modelbias.y+modelbaseHeight.block,posNode[0].getAttribute("pz")/1+modelbias.z);
            var block= new Block(id, name, modelElement,posElement,rotElement,scaleElement,textureElement,info);
            floor.addBlockItem(block);
        }
        if(op=="MPoint")
        {
            var posElement = new THREE.Vector3(posNode[0].getAttribute("px")/1+modelbias.x,posNode[0].getAttribute("py")/1+modelbias.y+modelbaseHeight.mpoint,posNode[0].getAttribute("pz")/1+modelbias.z);
            var mpoint= new MPoint(id, name, type, modelElement,posElement,rotElement,scaleElement,textureElement,info);
            floor.addMPointItem(mpoint);
        }
        if(op=="Brand")
        {
            var posElement = new THREE.Vector3(posNode[0].getAttribute("px")/1+modelbias.x,posNode[0].getAttribute("py")/1+modelbias.y+modelbaseHeight.brand,posNode[0].getAttribute("pz")/1+modelbias.z);
            var brand= new Brand(id, name, modelElement,posElement,rotElement,scaleElement,textureElement,imageElement,info);
            floor.addBrandItem(brand);
        }
    }
}
function xml_loadFile(xmlUrl, funcAsync) {
    var xmlDoc = null;
    var isChrome = false;
    var asyncIs = (null != funcAsync); // 是否是异步加载。当funcAsync不为空时，使用异步加载，否则是同步加载。 
    // 检查参数 
    if ("" == xmlUrl) return null;
    if (asyncIs) {
        if ("function" != typeof(funcAsync)) return null;
    }
    // 创建XML对象 
    try {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM"); // Support IE 
    } catch(ex) {}
    if (null == xmlDoc) {
        try {
            // Support Firefox, Mozilla, Opera, etc 
            xmlDoc = document.implementation.createDocument("", "", null); // 创建一个空的 XML 文档对象。 
        } catch(ex) {}
    }
    if (null == xmlDoc) return null;
    // 加载XML文档 
    xmlDoc.async = asyncIs;
    if (asyncIs) {
        if (window.ActiveXObject) {
            xmlDoc.onreadystatechange = function() {
                if (xmlDoc.readyState == 4) {
                    var isError = false;
                    if (null != xmlDoc.parseError) {
                        isError = (0 != xmlDoc.parseError.errorCode); // 0成功, 非0失败。 
                    }
                    funcAsync(xmlDoc, isError);
                }
            }
        } else {
            xmlDoc.onload = function() {
                funcAsync(xmlDoc, false);
            }
        }
    }
    try {
        xmlDoc.load(xmlUrl);
    } catch(ex) {
        // alert(ex.message) // 如果浏览器是Chrome，则会catch这个异常：Object # (a Document) has no method "load" 
        isChrome = true;
        xmlDoc = null;
    }
    if (isChrome) {
        var xhr = new XMLHttpRequest();
        if (asyncIs) // 异步 
        {
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    funcAsync(xhr.responseXML, xhr.status != 200);
                }
            }
            xhr.open("GET", xmlUrl, true);
            try // 异步模式下，由回调函数处理错误。 
            {
                xhr.send(null);
            } catch(ex) {
                funcAsync(null, true);
                return null;
            }
            return xhr; // 注意：返回的是XMLHttpRequest。建议异步模式下仅用null测试返回值。 
        } else // 同步 
        {
            xhr.open("GET", xmlUrl, false);
            xhr.send(null); // 同步模式下，由调用者处理异常 
            xmlDoc = xhr.responseXML;
        }
    }
    return xmlDoc;
}