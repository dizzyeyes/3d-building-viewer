function initFloorGUI(bdList,curBuilding,curFloor,params)
{                
    guiFloor= new dat.GUI();
    bdListGUI(bdList,params);
    buildingGUI(curBuilding,params);
    initModeGUI(params);
    //closeMainUI(params);
    guiFloor.open();
}
function closeMainUI(params)
{
    uiClose = guiFloor.add( params, "close" ).name("关闭所有");
}
function closeSubUI(ui,blockparams)
{
    uiClose = ui.add( blockparams, 'closeSubGUI' ).name("关闭");
}

function initBlockUI(blockparams,op)
{
    for(var item=0;item<3;item++)
    {
        if(item==op)
        {
            if(uilist[item]==null||uilist[item]==undefined)
                uilist[item]= new dat.GUI();
            else return;
        }
        else
        {             
            if(uilist[item]!=undefined&&uilist[item]!=null)
                uilist[item].destroy();
            uilist[item]=null;
        }
    }
    var uiBlock,uiBlockinfo,uiBlockColor,uiBlockBase;    
    var curUI=uilist[op];
    uiBlock=curUI.addFolder(blockparams.title);
    var obj;
    uiBlock.add(blockparams,'ID').listen();
    uiBlock.add(blockparams,'name').listen().onFinishChange(
            function()
            {
                curFloor.getObjectById(blockparams.ID).name=blockparams.name;
                scene.getObjectByModelId(blockparams.ID).modelname=blockparams.name;
                if(oManageDiv.style.display=="block")
                    TableRefresh($table);
            }
    ).name("名称");    
    uiBlockBase=uiBlock.addFolder("基本信息");    
    if(op==1)
        uiBlockBase.add(blockparams,'image').listen().name("贴图");
    if(op==2)
        uiBlockBase.add(blockparams,'mpoint_type').listen().name("标签");
    uiBlockBase.add(blockparams,'model_path').listen().name("模型路径");
    uiBlockBase.add(blockparams,'model_type').listen().name("模型类型");
    uiBlockBase.add(blockparams,'position').listen().onFinishChange( 
        function()
        {
            pos=blockparams.position.split(',');
            for(var key=0; key<3;key++) if(pos[key]==undefined||pos[key]=="") pos[key]=0;
            obj=scene.getObjectByModelId(blockparams.ID);
            objPositionSet(obj,curFloor,pos[0],pos[1],pos[2]);
        }
    ).name("位置");
    uiBlockBase.add(blockparams,'rotation').listen().onFinishChange( 
        function()
        {
            rot=blockparams.rotation.split(',');
            for(var key=0; key<3;key++) if(rot[key]==undefined||rot[key]=="") rot[key]=0;
            obj=scene.getObjectByModelId(blockparams.ID);
            setObjRotation(obj,curFloor,rot[0],rot[1],rot[2]);
        }
    ).name("旋转");
    uiBlockBase.add(blockparams,'scale').listen().onFinishChange( 
        function()
        {
            scal=blockparams.scale.split(',');
            for(var key=0; key<3;key++) if(scal[key]==undefined||scal[key]==""||scal[key]==0) scal[key]=1;
            obj=scene.getObjectByModelId(blockparams.ID);
            setObjScale(obj,curFloor,scal[0],scal[1],scal[2]);
            blockparams.scale=scal.toString();
        }
    ).name("缩放");
    uiBlockColor=uiBlock.addFolder("颜色");
    uiBlockColor.add(blockparams,'red',0,255).listen().name("红").onChange( 
        function()
        {
            var color= new THREE.Color(blockparams.red/255,blockparams.green/255,blockparams.blue/255);
            changeObjColor(scene,curFloor,blockparams.ID,color.getHex());
        }
    );
    uiBlockColor.add(blockparams,'green',0,255).listen().name("绿").onChange( 
        function()
        {            
            var color= new THREE.Color(blockparams.red/255,blockparams.green/255,blockparams.blue/255);
            changeObjColor(scene,curFloor,blockparams.ID,color.getHex());
        }
    );
    uiBlockColor.add(blockparams,'blue',0,255).listen().name("蓝").onChange( 
        function()
        {            
            var color= new THREE.Color(blockparams.red/255,blockparams.green/255,blockparams.blue/255);
            changeObjColor(scene,curFloor,blockparams.ID,color.getHex());
        }
    );
    uiBlockColor.add(blockparams,'temperature',tmpList).listen().name("温度").onChange(        
        function()
        {            
            var color= new THREE.Color(colorlist[blockparams.temperature]/1);
            changeObjColor(scene,curFloor,blockparams.ID,color.getHex());
            blockparams.red=color.r*255;
            blockparams.green=color.g*255;
            blockparams.blue=color.b*255;
        }
    );
    uiBlockColor.add(blockparams,'bar_temp',minTemperature,maxTemperature).listen().name("温度条").onChange(        
        function()
        {                        
            //setObjTemperature(scene,curFloor,blockparams.ID,blockparams.bar_temp);
            if(blockparams.bar_temp<(minTemperature+maxTemperature)/3) blockparams.temperature=0;
            else if(blockparams.bar_temp>(minTemperature+maxTemperature)*2/3) blockparams.temperature=2;
            else blockparams.temperature=1;
            var color= new THREE.Color(colorlist[blockparams.temperature]/1);
            changeObjColor(scene,curFloor,blockparams.ID,color.getHex());
            blockparams.red=color.r*255;
            blockparams.green=color.g*255;
            blockparams.blue=color.b*255;
        }
    );
    uiBlockinfo=uiBlock.addFolder(blockparams.title+"信息");
    uiBlockinfo.add(blockparams,'info').listen().name("备注").onChange( 
        function()
        {            
            var obj=curFloor.getObjectById(blockparams.ID);
            obj.info=blockparams.info;
            if(oManageDiv.style.display=="block")
                TableRefresh($table);
        }
    );
    uiBlock.open();
    uiBlockColor.close();
    uiBlockinfo.close();
    closeSubUI(curUI,blockparams);
    curUI.open();
    guiFloor.close();
}

function fillBlockUI(blockparams,INTERSECTED)
{
    var obj=curFloor.getObjectById(INTERSECTED.parent.modelid);
    blockparams.ID=obj.id;
    blockparams.name=obj.name;
    if(blockparams.title=="测点") 
        blockparams.mpoint_type=obj.type;
    blockparams.model_path=obj.model.path;
    blockparams.model_type=obj.model.type;
    blockparams.position=toFixed(obj.position.x,3)+", "+toFixed(obj.position.y,3)+", "+toFixed(obj.position.z,3);
    blockparams.rotation=toFixed(obj.rotation.x,3)+", "+toFixed(obj.rotation.y,3)+", "+toFixed(obj.rotation.z,3);
    blockparams.scale=toFixed(INTERSECTED.scale.x,3)+", "+toFixed(INTERSECTED.scale.y,3)+", "+toFixed(INTERSECTED.scale.z,3);
    blockparams.red=(new THREE.Color(obj.texture/1).r)*255;
    blockparams.green=(new THREE.Color(obj.texture/1).g)*255;
    blockparams.blue=(new THREE.Color(obj.texture/1).b)*255;   
    blockparams.temperature=null;    
    blockparams.bar_temp=(minTemperature+maxTemperature)/2; 
    if(blockparams.title=="标志牌") 
        blockparams.image=obj.image;
    blockparams.info=obj.info;
    selectObject(INTERSECTED);
}
function initModeGUI(params)
{    
    // uiMode = guiFloor.addFolder("模式选择");
    // uiMode.add( params, 'mode_view' ).onChange( 
        // function()
        // {
            // params.mode_edit=!params.mode_view;            
            // if(params.mode_view==true)
            // {
                // uiBuilding.close();
                // uiFloor.close();
            // }
        // }
    // ).listen().name("浏览模式");
    guiFloor.add( params, 'mode_edit' ).onChange( 
        function()
        {
            if(oManageDiv.style.display=="block")
            {
                var dataJson=getJsonDataOfTable(oManageDiv.tabletype);
                TableLoad($table,dataJson);
            }
            if(osubManageDiv.style.display=="block")
            {                
                var dataJson=getJsonDataOfTable("分组内容");
                TableLoad($sub_table,dataJson);
            }
            flag_moveBlock=params.mode_edit;
            params.mode_view=!flag_moveBlock;
            if(params.mode_edit==true)
            {
                uiBuilding.open();
                uiFloor.open();
            }
            else
            {            
                uiBuilding.close();
                uiFloor.close();
            }
        }
    ).listen().name("编辑模式");
    // uiMode.open();
}
function bdListGUI(bDList,params)
{
    var bdliststr=bDList.getJSONStringofBuildings();
    var bdlist= eval('(' + bdliststr + ')');
    uiBuilding = guiFloor.addFolder("建筑列表");    
    //floorList={'一楼':0,'二楼':1,'三楼':2,'Demo楼':3,'五楼':4};
    uiBuilding.add(params,'building',bdlist).name("建筑").onFinishChange( 
        function()
        {   
            curBuilding = bdList.getAt(params.building);
             var newbd=curBuilding;
            readBuilding(bdList,newbd);            
            var newfloor;
            if((newfloor=change_Floor_Scene(scene,curBuilding,0))!=false)
            {
                curFloor=newfloor;
                closeGuiFloor();  
                uiFloor=null;
                params.floor=0;
                initFloorGUI(bdList,curBuilding,curFloor,params);    
                uiBuilding.open();
                uiFloor.open();
                               
                closesubGUI();
                lastp.floor=params.floor;
                lastp.building=params.building;          
                if(osubManageDiv.style.display=='block')
                {                                    
                    subTableHide($sub_table);
                }
                if(oManageDiv.style.display=='block')
                {
                    var dataJson=getJsonDataOfTable(oManageDiv.tabletype);
                    TableLoad($table,dataJson);
                //    TableRefresh($table);
                }
            }
            else
            {
                params.building=lastp.building;
                params.floor=lastp.floor;
                alertError("所选\"建筑\"不存在");
            }
        }
    );
    uiBuilding.close();
}
function buildingGUI(building,params)
{
    if(building.getCount()==0)
        return;
    var floorListstr=building.getJSONStringofFloors();
    var floorList= eval('(' + floorListstr + ')');
    
    uiFloor = guiFloor.addFolder("建筑");    
    //floorList={'一楼':0,'二楼':1,'三楼':2,'Demo楼':3,'五楼':4};
    uiFloor.add(params,'floor',floorList).name("楼层").onFinishChange( 
        function()
        {
            var newfloor;
            if((newfloor=change_Floor_Scene(scene,curBuilding,params.floor))!=false)
            {
                curFloor=newfloor;                
                closesubGUI();                
                if(osubManageDiv.style.display=='block')
                {                                    
                    subTableHide($sub_table);
                }
                if(oManageDiv.style.display=='block')
                {
                    var dataJson=getJsonDataOfTable(oManageDiv.tabletype);
                    TableLoad($table,dataJson);
                //    TableRefresh($table);
                }
            }
            else
            {
                params.floor=lastp.floor;
                alertError("所选\"楼层\"不存在");
            }
            lastp.floor=params.floor;
        }
    );
    uiFloor.close();
}
