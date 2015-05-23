    function submitfun(formid)
    {    
        var form1 = iBase.Id(formid);
        var title = iBase.Id("title-new").innerHTML;
        var ret;
        switch(title)
        {
            case "新建建筑物" :
               ret= validInputContent(form1,'bdList');
            break;           
            case "新建楼层":
               ret= validInputContent(form1,'curBuilding');
            break;
            case "新建区块":  
               ret= validInputContent(form1,'curFloor');
            break; 
            case "新建测点":
            case "更改测点ID":
               ret= validInputContent(form1,'curFloor');
            break;
            case "新建标志牌":
               ret= validInputContent(form1,'curFloor');
            break;
            case "新建分组":
               ret= validInputContent(form1,'curFloor.GroupList');
            break;
        }      
        //验证ID的有效性,是否为空，是否可以添加到列表中（唯一性）
        //如果可以，就隐藏对话框，并改变对应的数据。
        if(ret==false)
        //如果不可以添加，alert并返回。
        {           
            return false;
        }
        else
        {
           hideDialogue(formid);
           processFormData(formid,title);
           clearFormData(formid);
           lock_dock=flag_addMPoint;
           if(isBuildFromMngList&&title!="新建测点")
           {
               TableShow(oManageDiv.tabletype);
               isBuildFromMngList=false;
           }
           return true;
        }
    }
    function validInputContent(form,fromWherestr)
    {
        var inputId = form.inputId;
        var inputIdContent = inputId.value; 
        if(assertDuplicateId(inputIdContent,fromWherestr)==false&&inputId.oldid!=inputIdContent) return false;
        if(chkinput(form)==false) return false;
        return true;
    }
    function alertInputForm(msg)
    {
        // $('.alert').show().html(' <strong>' + msg + '</strong>');
        alertError(msg);
    }
    function checkNullInput(form,item)
    {
        var formItem=eval("form."+item);
        if(formItem.style.display=="none"||formItem.value!="")
            return true;
        else return false;
    }
    function chkinput(form)
    {
        if(form.inputId.value=="")
        {
            alertInputForm("请输入ID");
            form.inputId.select();
            showWrongImg('inputIdIcon');
            return(false);
        }
        else 
            showYesImg('inputIdIcon');
        if(form.inputName.value=="")
        {
            alertInputForm("请输入名称");
            form.inputName.select();
            showWrongImg('inputNameIcon');
            return(false);
        }
        else            
            showYesImg('inputNameIcon');
        if(checkNullInput(form,"inputMPointType")==false)
        {
            alertInputForm("请输入标签内容");
            form.inputMPointType.select();
            showWrongImg('inputMPointTypeIcon');
            return(false);
        }
        else            
            showYesImg('inputMPointTypeIcon');
        if(checkNullInput(form,"inputImage")==false)
        {
            alertInputForm("请输入贴图文件");
            form.inputImage.select();
            showWrongImg('inputImageIcon');
            return(false);
        }
        else            
            showYesImg('inputImageIcon');
        if(checkNullInput(form,"inputModel")==false)
        {
            alertInputForm("请输入模型文件");
            form.inputModel.select();
            showWrongImg('inputModelIcon');
            return(false);
        }
        else            
            showYesImg('inputModelIcon');
        if(assertValidModelType(form.inputModel)==false)
            return false;        
        alertInputForm("信息提交中。。");
        return(true);
    }

    function cancelsubmitfun(formid)
    {       
        hideDialogue(formid);
        clearFormData(formid);        
        iBase.Id("inputModelFake").value="";
        toClearImagePreview();
        mpointStop_dom();     
       //隐藏对话框，并清空表。
        if(isBuildFromMngList)
        {
           TableShow(oManageDiv.tabletype);
           isBuildFromMngList=false;
        }
        else
            lock_dock=false;
        return true;
    }
    function hideDialogue(formid)
    {        
        fadeOut(iBase.Id(formid));
        // var form1 = document.getElementById(formid);
        // form1.style.display = 'none';
    }
    function showDialogue(formid,title)
    {              
        lock_dock=true;
        oManageDiv.style.zIndex=1;
        oNewDiv.style.zIndex=2;
        if(title!=null&&title!=undefined)
            iBase.Id("title-new").innerHTML=title;
        switch(title)
        {
            case "新建建筑物" :            
            case "更改测点ID" :            
                iBase.Id(formid).inputId.fromWhere="bdList";
                iBase.Id(formid).getElementsByClassName("labelMPointType")[0].style.display="none";
                iBase.Id(formid).inputMPointType.style.display="none";
                iBase.Id(formid).getElementsByClassName("labelImage")[0].style.display="none";
                iBase.Id(formid).inputImage.style.display="none";
                iBase.Id(formid).getElementsByClassName("labelModel")[0].style.display="none";
                iBase.Id(formid).inputModel.style.display="none";
            break;
            case "新建分组" :            
                iBase.Id(formid).inputId.fromWhere="curFloor.GroupList";
                iBase.Id(formid).getElementsByClassName("labelMPointType")[0].style.display="none";
                iBase.Id(formid).inputMPointType.style.display="none";
                iBase.Id(formid).getElementsByClassName("labelImage")[0].style.display="none";
                iBase.Id(formid).inputImage.style.display="none";
                iBase.Id(formid).getElementsByClassName("labelModel")[0].style.display="none";
                iBase.Id(formid).inputModel.style.display="none";
            break;
            case "新建区块":            
            case "新建楼层":
                if(title=="新建区块")   iBase.Id(formid).inputId.fromWhere="curFloor";
                else   iBase.Id(formid).inputId.fromWhere="curBuilding";
                iBase.Id(formid).getElementsByClassName("labelMPointType")[0].style.display="none";
                iBase.Id(formid).inputMPointType.style.display="none";
                iBase.Id(formid).getElementsByClassName("labelImage")[0].style.display="none";
                iBase.Id(formid).inputImage.style.display="none";
                iBase.Id(formid).getElementsByClassName("labelModel")[0].style.display="block";
                iBase.Id(formid).inputModel.style.display="block";
            break;
            case "新建测点":
                iBase.Id(formid).inputId.fromWhere="curFloor";
                iBase.Id(formid).getElementsByClassName("labelMPointType")[0].style.display="block";
                iBase.Id(formid).inputMPointType.style.display="block";
                iBase.Id(formid).getElementsByClassName("labelImage")[0].style.display="none";
                iBase.Id(formid).inputImage.style.display="none";
                iBase.Id(formid).getElementsByClassName("labelModel")[0].style.display="block";
                iBase.Id(formid).inputModel.style.display="block";
            break;
            case "新建标志牌":
                iBase.Id(formid).inputId.fromWhere="curFloor";
                iBase.Id(formid).getElementsByClassName("labelMPointType")[0].style.display="none";
                iBase.Id(formid).inputMPointType.style.display="none";
                iBase.Id(formid).getElementsByClassName("labelImage")[0].style.display="block";
                iBase.Id(formid).inputImage.style.display="block";
                iBase.Id(formid).getElementsByClassName("labelModel")[0].style.display="block";
                iBase.Id(formid).inputModel.style.display="block";
            break;
        }
        fadeIn(iBase.Id(formid),40);
        MoveFloatLayer("table"+formid.slice(4)); 
        
        // var form1 = document.getElementById(formid);
        // form1.style.display = 'block';
    }
    function clearFormData(formid)
    {
        // console.log("清理表格中。。。");
        iBase.Id(formid).inputId.value="";
        iBase.Id(formid).inputName.value="";
        iBase.Id(formid).inputModel.value="";
        iBase.Id(formid).inputMPointType.value="";
        iBase.Id(formid).inputImage.value="";
        // iBase.Id(formid).inputImageFake.value="";
        iBase.Id(formid).inputInfo.value="";
        clearIconImg('inputIdIcon');
        clearIconImg('inputModelIcon');
        clearIconImg('inputNameIcon');
        clearIconImg('inputMPointTypeIcon');
        clearIconImg('inputImageIcon');
    }
    function processFormData(formid,title)
    {        
        var filePrefix="./data/models/";
        var imgPrefix="./data/images/";
        var id=iBase.Id(formid).inputId.value.toUpperCase();
        var oldid=iBase.Id(formid).inputId.oldid;
        var name=iBase.Id(formid).inputName.value.toUpperCase();
        var modelpath=iBase.Id(formid).inputModel.value.toLowerCase();
        var mpointType=iBase.Id(formid).inputMPointType.value;
        var info=iBase.Id(formid).inputInfo.value;
        if(info=="") info="无";
        
        var texture=Math.random()*0xffffff;
        var rot = new THREE.Vector3(0,0,0);
        
        switch(title)
        {
            case "更改测点ID":
                console.log("更改测点ID");
                var mp = curFloor.getMPointById(oldid);
                curFloor.changeObjectId(oldid,id);
                mp.name=name;
                //update GUI
                blockparams.ID=id;
                blockparams.name=name;
                //update scene
                var obj = scene.getObjectByModelId(oldid);
                obj.modelid=id;obj.modelname=name;
            break;
            case "新建分组":
                console.log("处理分组");
                var group=new Group(id,name,new Array(),info);
                curFloor.addGroupItem(group);
            break;
            case "新建建筑物" :
               var bd= new Building(id, name, "./data/buildings/"+upCaseFirst(id)+".xml",info);
                if(bdList==null||bdList==undefined) 
                {
                    alertInputForm("./data/buildinglist.xml加载错误，不能添加建筑物");
                    return;
                }
                bdList.addItem(bd);
                curBuilding=bd;
                curFloor=null;
                clear_init_Scene(scene);
                //update GUI
                closeGuiFloor();  
                uiFloor=null;
                params.building=bdList.getCount()-1;
                initFloorGUI(bdList,curBuilding,curFloor,params);    
                uiBuilding.open();
            break;           
            case "新建楼层":
                var newfloor = new Floor(id, name, "./data/floors/"+upCaseFirst(id)+".xml",info);
                if(curBuilding==null||curBuilding==undefined) 
                {
                    alertInputForm("请先添加建筑物，再添加楼层");
                    return;
                }
                curBuilding.addItem(newfloor);
                curFloor=newfloor;
                var scale = new THREE.Vector3(1,1,1); 
                var pos = new THREE.Vector3(modelbias.x,modelbias.y,modelbias.z);
                var isFromLocal=iBase.Id("inputModelSelectFileCheckBox").checked;
                if(isFromLocal)
                    modelpath=filePrefix+modelpath;
                var modelElement = new model(modelpath,"obj");
                var block = new Block("BOARD", "地板", modelElement,pos,rot,scale,texture,info);
                curFloor.addBlockItem(block);
                clear_init_Scene(scene);
                loadBlock(scene,block,"block",isFromLocal);
                render();
                //update GUI  
                closesubGUI(); 
                closeGuiFloor();  
                uiFloor=null;              
                params.floor=curBuilding.getCount()-1;
                initFloorGUI(bdList,curBuilding,curFloor,params);    
                uiBuilding.open();
                uiFloor.open();
                if(params.mode_edit)
                {
                    INTERSECTED=scene.getObjectByModelId("BOARD").children[0];
                    blockparams.title="区块";
                    fillBlockUI(blockparams,INTERSECTED);                
                    if(guiBrand==null||guiBrand==undefined)
                        initBlockUI(blockparams,0);  
                }
            break;
            case "新建区块":     
                var scale = new THREE.Vector3(1,10,1); 
                var pos = new THREE.Vector3(modelbias.x,modelbias.y+modelbaseHeight.block,modelbias.z);
                var isFromLocal=iBase.Id("inputModelSelectFileCheckBox").checked;
                if(isFromLocal)
                    modelpath=filePrefix+modelpath;
                var modelElement = new model(modelpath,"obj");
                var block = new Block(id, name, modelElement,pos,rot,scale,texture,info,isFromLocal);
                if(curFloor==null||curFloor==undefined) 
                {
                    alertInputForm("请先添加楼层");
                    return;
                }
                curFloor.addBlockItem(block);
                loadBlock(scene,block,"block",isFromLocal);
                render();
                if(params.mode_edit)
                {
                    INTERSECTED=scene.getObjectByModelId(id).children[0];                
                    blockparams.title="区块";
                    fillBlockUI(blockparams,INTERSECTED);                
                    if(guiBrand==null||guiBrand==undefined)
                        initBlockUI(blockparams,0); 
                }
            break; 
            case "新建测点":
                var scale = new THREE.Vector3(0.01,0.01,0.01); 
                var pos = new THREE.Vector3(modelbias.x,modelbias.y+modelbaseHeight.mpoint,modelbias.z);
                isFromLocalpoint=iBase.Id("inputModelSelectFileCheckBox").checked;
                if(isFromLocal)
                    modelpath=filePrefix+modelpath;
                var modelElement = new model(modelpath,"obj");
                var mpoint = new MPoint(id, name, mpointType, modelElement,pos,rot,scale,texture,info);
                if(curFloor==null||curFloor==undefined) 
                {
                    alertInputForm("请先添加楼层");
                    return;
                }
                // flag_addMPoint=true;
                curMPoint=mpoint;
            break;
            case "新建标志牌":
                var scale = new THREE.Vector3(1,1,1); 
                var pos = new THREE.Vector3(modelbias.x,modelbias.y+modelbaseHeight.brand,modelbias.z);
                var isFromLocalimg=iBase.Id("inputImageSelectFileCheckBox").checked;
                var isFromLocal=iBase.Id("inputModelSelectFileCheckBox").checked;
                var imagePrefix="";
                if(isFromLocalimg)
                    imagePrefix += imgPrefix;
                if(isFromLocal)
                    modelpath=filePrefix+modelpath;
                var imagePath = imagePrefix+iBase.Id(formid).inputImage.value;
                var modelElement = new model(modelpath,"obj");
                var brand = new Brand(id, name, modelElement,pos,rot,scale,texture,imagePath,info,isFromLocalimg,isFromLocal);
                if(curFloor==null||curFloor==undefined) 
                {
                    alertInputForm("请先添加楼层");
                    return;
                }
                curFloor.addBrandItem(brand);
                loadBrand(scene,brand,isFromLocalimg,isFromLocal);
                render();
                if(params.mode_edit)
                {
                    INTERSECTED=scene.getObjectByModelId(id).children[0];  
                    blockparams.title="标志牌";
                    fillBlockUI(blockparams,INTERSECTED);
                    if(guiBrand==null||guiBrand==undefined)
                        initBlockUI(blockparams,1);  
                }
            break;
        } 
        // console.log("处理表格数据中。。。"+id+name+modelpath+info);
    }
    

    function assertDuplicateId(inputIdContent,fromWherestr,alert)
    {
        // console.log("assertDuplicateId...");        
        var fromWhere = eval(fromWherestr);
        var iconid='inputIdIcon';
        //查找的函数
        if(fromWhere.getObjectById(inputIdContent)==null)
        {
            // alertInputForm("ID:"+inputIdContent+"可以使用");
            if(alert!=false)
                showYesImg(iconid);
            return true;
        }
        else
        {
            if(alert!=false)
            {
                alertInputForm("ID:"+inputIdContent+"已存在，请重命名");
                showWrongImg(iconid);
            }
            return false;
        }
    }
    function assertValidModelType(inputModel)
    {
        if(inputModel.style.display=="none") return true;
        var iconid='inputModelIcon';
        var modelpart=inputModel.value.split('.');
        var modeltype=modelpart[modelpart.length-1];
        // console.log("assertValidModelType..."+inputModel.value);
        if(modeltype.toLowerCase()!='obj')
        {
            alertInputForm("请使用正确的文件格式(*.obj)");
            showWrongImg(iconid);
            return false;
        }
        alertInfo("文件格式正确");
        showYesImg(iconid);
        return true;
    }
    function showYesImg(iconid)
    {        
        iBase.Id(iconid).src='icons/yes.png';
    }
    function showWrongImg(iconid)
    {
        iBase.Id(iconid).src='icons/wrong.png';
    }
    function clearIconImg(iconid)
    {
        iBase.Id(iconid).src='';
    }
    function whenChecked(checkbx,toShow,toLock)
    {
        if(checkbx.checked==true)
        {
            iBase.Id(toShow).style.display="block";
            iBase.Id(toLock).readOnly=true;
        }
        else
        {
            iBase.Id(toShow).style.display="none";
            iBase.Id(toLock).readOnly=false;            
        }
    }
    function getFileContentofBlock(scene,block,blocktype,fileSource)
    {
        var reader = new FileReader();
        reader.addEventListener( 'load', function ( event )  { 
            var id = block.id;
            var name = block.name;
            var path = block.model.path;
            var type = block.model.type;        
            var texture =new THREE.Color( block.texture/1);        
            var pos = block.position;
            var rot = block.rotation;
            var scale = block.scale;
        
            var filecontent = event.target.result;
            var obj = new THREE.OBJLoader().parse( filecontent );  
            obj.modelid=id;  
            obj.modelname=name;  
            if(blocktype=="mpoint") 
                obj.mpointtype=block.mpointtype;
            obj.position.set(pos.x/1,pos.y/1,pos.z);
            obj.rotation.set(rot.x,rot.y,rot.z);
            obj.scale.set(scale.x,scale.y,scale.z);    
            obj.type=blocktype;
            obj.info=block.info;   
            obj.children[0].material.color =new THREE.Color( texture); 
            obj.children[0].material.ambient = new THREE.Color( texture);
            obj.children[0].material.side = THREE.DoubleSide ;            
            scene.add(obj); 
            render();      
            iBase.Id("inputModelFake").value="";
            
        },false);
        reader.readAsText(document.getElementById(fileSource).files[0]);  
    }