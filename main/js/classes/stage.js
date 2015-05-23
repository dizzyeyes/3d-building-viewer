function Stage()
{
    this.Init();
    this.scope=this;
}
Stage.prototype.Init = function()
{
    this.container=null;this.stats=null;this.controls=null;this.transControl=null;
    this.camera=null; this.scene=null; this.projector=null ; this.raycaster=null; this.renderer=null;
    this.direct_light_01=null;this.direct_light_02=null;this.plane=null;
    this.lights=new Array();
    this.vis=false;
    this.curSelected=null;
    this.curdistance=null;
    this.deltax=null;this.deltay=null;this.deltaz=null;
    this.planex=null;this.planey=null;this.planez=null;
    this.flag_addMPoint=false;
    this.isFromLocalpoint=false;//本地文件
    this.curMPoint=null;
    this.flag_moveBlock=false;            
    this.enable_moveBlock=true;
    this.lock_dock=false;
    this.keyboard=null;
    this.Viewer_version="V4.0.0";
    
    this.maxTemperature=90;
    this.minTemperature=10;          
    
    this.noPan=false;
    this.noZoom=false;
    this.noOrbit=false; 
    this.selectionBox=null;
    
    this. msgTools=["jqTooltip",  "buble", "humane"];
    //msgTool="humane";//"jqTooltip"  "buble" "humane"
    //msgTool="buble";
    this.msgTool=msgTools[0];
    
    this.needTemp=false;//颜色表示温度模式
    this.hide_docmenu=false;
    
    this.ismodelActivated = false;
    this.curTable=null;
    this.curGroup=null;isBlockMoved=false;
    this.isBuildFromMngList=false;
    this.isFormSelected=false;
    this.isTableSelected=false;            
    this.isSubTableSelected=false;
    this.isFormDrag=false;
    this.isMPointFormSelected=false;
    this.isInform=false;
    
    this.oConfirmModal=null;
    this.oNewDiv=iBase.Id("table_add_template");            
    this.oFormDiv=iBase.Id("form_add_template");            
    this.oManageDiv=iBase.Id("table_manage");
    this.osubManageDiv=iBase.Id("subtable_manage");            
    this.demoGUI=null;this.box1gui=null;this.box2gui=null;
    this.shiftkeypressed=false;
    //dragDiv.js
    // 实现可拖动的div
    this.pxDrag = 0;
    this.pyDrag = 0;
    this.beginDrag = false;
    //是否要开启透明效果
    this.enableOpacity = true; // 默认允许
    this.myDragDiv=null;

    this.guiFloor=null;this.guiBlock=null;this.guiMPoint=null;this.guiBrand=null;
    this.uiBuilding=null;this.uiFloor=null;this.uiMode=null;this.uiClose=null;
    this.uilist=new Array();
    
    this.modelbias= new THREE.Vector3(0,0,50);
    this.modelbaseHeight= {block:2,mpoint:0,brand:30};

    this.colorlist={0:0x0000ff,1:0x00ff00,2:0xff0000};
    this.tmpList={"":null,"温度过高":2,"温度适宜":1,"温度过低":0};

    
    this.params={
        'building':0,
        'floor':0 ,
        'mode_view':true,
        'mode_edit':false
    };        
    this.params.close = function() {
        var startEvent = new CustomEvent( 'close-guiFloor', closeGuiFloor());
        window.dispatchEvent(startEvent);
    };
    this.lastp={
        'building':0,
        'floor':0 ,
        'mode_view':true,
        'mode_edit':false
    };
    this.blockparams={
        'bar_temp':minTemperature,
        'temperature':null,
        'curUI':null,
        'title':null,
        'ID':"CVD",
        'name':null,
        'mpoint_type':null,
        'model_path':null,
        'model_type':null,
        'red':null,
        'green':null,
        'blue':null,
        'position':null,
        'rotation':null,
        'scale':null,
        'image':null,
        'info':null
    };
    this.blockparams.closeSubGUI = function() {
        var startEvent = new CustomEvent( 'close-guiBlock', closesubGUI() );
        window.dispatchEvent(startEvent);
    };
    this.new_id="";
    
    this.mouse = new THREE.Vector2();this.INTERSECTED=null;
    this.radius = 100; this.theta = 0;
    this.init_x=null;this.init_y=null;this.init_z=null;
    
    this.bdList=new BuildingList();
    this.curBuilding=null;
    this.curFloor=null;            
    this.BuildingListXML='./data/BuildingList.xml';
    
    this.uilist.push(this.guiBrand);
    this.uilist.push(this.guiMPoint);
    this.uilist.push(this.guiBlock);
    this.popMenu = new popUpMenu('popupmenu');
}


Stage.prototype.closeGuiFloor =function()
{                
    if(this.scope.guiFloor!=undefined&&this.scope.guiFloor!=null)
        this.scope.guiFloor.destroy();
    this.scope.guiFloor=null;
}
Stage.prototype.closesubGUI = function()
{           
    var cnt=0;
    for(var item=0;item<3;item++)
    {       
        if(this.scope.uilist[item]!=undefined&&this.scope.uilist[item]!=null)
        {
            this.scope.uilist[item].destroy();
            cnt++;
        }
        this.scope.uilist[item]=null;
    }
    if(cnt>0) this.scope.guiFloor.open();
    this.scope.selectionBox.visible=false;
    if(this.scope.INTERSECTED) this.scope.unSelectObject();
}
Stage.prototype.initBuildingDoc = function(){
    this.scope.toLoadPart(this.scope.bdList,this.scope.BuildingListXML,this.scope.params.building,this.scope.params.floor); 
    this.scope.initFloorGUI(this.scope.bdList,this.scope.curBuilding,this.scope.curFloor,this.scope.params);
} 

Stage.prototype.initScene = function() {

    // CAMERA
    this.scope.SCREEN_WIDTH = window.innerWidth; this.scope.SCREEN_HEIGHT = window.innerHeight;
    this.scope.VIEW_ANGLE = 45; this.scope.ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT; this.scope.NEAR = 1; this.scope.FAR = 1000;
    this.scope.FOV=70;
    this.scope.orthoNear=-500;this.scope.orthoFar = 1000;
    this.scope.camera = new THREE.CombinedCamera( this.scope.SCREEN_WIDTH / 2, this.scope.SCREEN_HEIGHT / 2, this.scope.FOV, this.scope.NEAR, this.scope.FAR, this.scope.orthoNear, this.scope.orthoFar);
    
    this.scope.scene = new THREE.Scene();

    if(this.scope.curFloor.camerapos!=undefined)                
        this.scope.camera.position.copy(this.scope.curFloor.camerapos); 
    else
        this.scope.camera.position.set(-150,150,450);                
    this.scope.camera.lookAt(this.scope.scene.position); 
    this.scope.camera.toPerspective();                
    this.scope.camera.toTopView();                
    this.scope.camera.setZoom(this.scope.curZoom); 
    
    this.scope.direct_light_01 = new THREE.DirectionalLight( 0xffffff ,1.5);
    this.scope.direct_light_01.position.set( 2, 1.5, 1 ).normalize();
    this.scope.direct_light_01.shadowDarkness = 0.95;;
    this.scope.direct_light_01.shadowCameraNear=10;
    this.scope.direct_light_01.shadowCameraFar=30;
    this.scope.direct_light_01.shadowCameraLeft=-100;
    this.scope.direct_light_01.shadowCameraRight=100;
    this.scope.direct_light_01.shadowCameraTop=100;
    this.scope.direct_light_01.shadowCameraBottom=-100;
    this.scope.direct_light_01.shadowMapWidth = 1024; this.scope.direct_light_01.shadowMapHeight = 1024;

    this.scope.direct_light_02 = new THREE.DirectionalLight( 0xffffff ,0.2);
    this.scope.direct_light_02.position.set( -1, -1, -1 ).normalize();
    
    this.scope.lights.push(this.scope.direct_light_01);
    this.scope.lights.push(this.scope.direct_light_02);
    
    this.scope.geometry = new THREE.PlaneBufferGeometry( 1000, 1000 );
    this.scope.geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

    this.scope.plane = new THREE.Mesh( this.scope.geometry );
    this.scope.plane.visible = false;

    this.scope.projector = new THREE.Projector();
    this.scope.raycaster = new THREE.Raycaster();

    this.scope.renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true });
    this.scope.renderer.setPixelRatio( window.devicePixelRatio );
    this.scope.renderer.shadowMapEnabled = true;
    this.scope.renderer.shadowMapSoft = true;
    this.scope.renderer.setClearColor( 0xf0f0f0 );
    this.scope.renderer.setSize( window.innerWidth, window.innerHeight );
    this.scope.renderer.sortObjects = false;
    this.scope.container = document.createElement( 'div' );
    this.scope.container.appendChild(this.scope.renderer.domElement);
    
    this.scope.stats = new Stats();
    this.scope.stats.domElement.style.position = 'absolute';
    this.scope.stats.domElement.style.top = '0px';

    //
    window.addEventListener( 'close-guiBlock', this.scope.animate,false );
    window.addEventListener( 'close-guiFloor', this.scope.animate,false );
    this.scope.controls = new THREE.OrbitControls( this.scope.camera );
    this.scope.transControl = new THREE.TransformControls( this.scope.camera, this.scope.renderer.domElement );
    this.scope.transControl.setSize( 0.5 );
    this.scope.transControl.addEventListener( 'change', this.scope.updateControlers ); //
    
    this.scope.keyboard = new THREEx.KeyboardState();
    THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
   
    this.scope.selectionBox = new THREE.BoxHelper();
    this.scope.selectionBox.material.depthTest = false;
    this.scope.selectionBox.material.transparent = true;
    this.scope.selectionBox.visible = false;
    this.scope.loadFloor(scene, curFloor); 
}

Stage.prototype.updateControlers = function() {
    this.scope.transControl.update();     
    if(this.scope.INTERSECTED!=null)
    {
        this.scope.INTERSECTED.scale.rounding(3);
        var scal = this.scope.INTERSECTED.scale;
        this.scope.blockparams.scale = scal.toArray().toString();
        this.scope.setObjScale(this.scope.INTERSECTED.parent,this.scope.curFloor,scal.x,scal.y,scal.z);
    }
}
Stage.prototype.onKeyUp = function(event) {                
    this.scope.controls.enabled=true;
}
Stage.prototype.windowRefresh = function(confirmed)
{
    if(confirmed) window.location.reload();
}
Stage.prototype.onKeyDown = function(event) {
    var keyCode = event.keyCode;
    switch(keyCode)
    {
        case 116://F5
            event.preventDefault();
            var ret = this.scope.alertConfirm("是否重新载入？",this.scope.windowRefresh);
            return;
            //if(!ret) event.preventDefault();
        break;
        case 27://ESC
            if(this.scope.oFormDiv.style.display=="block") 
                this.scope.cancelsubmitfun('form_add_template');
            this.scope.mpointStop_dom();
            event.preventDefault();                        
        break;
    }
    this.scope.controls.enabled=false;
}


Stage.prototype.onWindowResize = function() {

        this.scope.camera.setSize( window.innerWidth, window.innerHeight );
        this.scope.camera.updateProjectionMatrix();

        this.scope.renderer.setSize( window.innerWidth, window.innerHeight );
        this.scope.MoveFloatLayer("table_add_template");
        this.scope.MoveFloatLayer('table_manage');
        this.scope.MoveFloatLayer('subtable_manage');
        
        $table.bootstrapTable('resetView');
        $sub_table.bootstrapTable('resetView');
}

Stage.prototype.onMouseWheel = function( event ) {             
    if(this.scope.ismodelActivated)
    {
        this.scope.oConfirmModal = iBase.Id("windowConfirmModal");
        var oConfirmModalUp = this.scope.oConfirmModal.children[0];
        var oConfirmModalDown = this.scope.oConfirmModal.children[1];                
        if(this.scope.isInDivs([oConfirmModalUp,oConfirmModalDown],event.clientX-this.scope.oConfirmModal.offsetLeft,event.clientY-this.scope.oConfirmModal.offsetTop))
            this.scope.controls.enabled=false;
        else 
        {
            oConfirmModalDown.children[0].click();
            this.scope.controls.enabled=true;
            this.scope.ismodelActivated=false;
        }
        return;
    }
    if(!this.scope.isInDiv(this.scope.osubManageDiv,event.clientX,event.clientY)&&!this.scope.isInDiv(this.scope.oManageDiv,event.clientX,event.clientY))
    {
        var delta = 0;
        if ( event.wheelDelta !== undefined ) { // WebKit / Opera / Explorer 9
            delta = event.wheelDelta;
        } else if ( event.detail !== undefined ) { // Firefox
            delta = - event.detail;
        }                
        if(this.scope.controls.enabled==false) this.scope.zoomInOut(this.scope.camera,delta/50);
    }
    else
    {
        this.scope.controls.enabled=false;
    }
}

Stage.prototype.onDocumentMouseMove = function( event ) {              
    if(this.scope.shiftkeypressed)
    {
        this.scope.keyboard.destroy();
        this.scope.keyboard = new THREEx.KeyboardState();
        this.scope.shiftkeypressed=false;
        this.scope.unSelectObject(true);
        this.scope.controls.enabled=true;
    }
    if(!this.scope.isInDivs([this.scope.oNewDiv,this.scope.oManageDiv,this.scope.osubManageDiv,this.scope.box1gui,this.scope.box2gui],event.clientX,event.clientY))
    {
        event.preventDefault();                   
    }   
    this.scope.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.scope.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;    
    
    if(this.scope.isFormDrag==true)
    {                          
        this.scope.onMoveDiv(event);
        return;
    }
    
    if (this.scope.INTERSECTED )
    {
        if(this.scope.flag_moveBlock&&this.scope.enable_moveBlock)
        {                    
            this.scope.container.style.cursor="move";
            var vector = new THREE.Vector3( this.scope.mouse.x, this.scope.mouse.y, 0 );
            vector.unproject(  this.scope.camera );
            this.scope.raycaster.set( this.scope.camera.position, vector.sub( this.scope.camera.position ).normalize() );
            var intersectplane = this.scope.raycaster.intersectObjects( [this.scope.plane] ,true);    
        
            var newplanex=this.scope.planex, newplaney=this.scope.planey, newplanez=this.scope.planez;
            if(intersectplane.length >0)   
            {                            
                newplanex=intersectplane[0].point.x;
                newplaney=intersectplane[0].point.y;
                newplanez=intersectplane[0].point.z;
            }        
            
            this.scope.deltax=newplanex-planex;
            this.scope.deltay=newplaney-planey;
            this.scope.deltaz=newplanez-planez;
            
            this.scope.objPositionChange(this.scope.INTERSECTED.parent,this.scope.curFloor,this.scope.deltax,0,this.scope.deltaz);
             
            this.scope.planex = newplanex;
            this.scope.planey = newplaney;
            this.scope.planez = newplanez;
            
            this.scope.fillBlockUI(this.scope.blockparams,this.scope.INTERSECTED);
            if(this.scope.osubManageDiv.style.display=='block')
            {
                if(this.scope.isInDiv(this.scope.osubManageDiv,event.clientX,event.clientY))                            
                    this.scope.alertMsg(["释放鼠标添加到分组中"]);                        
                else this.scope.alertMsg(["拖拽到分组编辑面板中，添加到分组中"]);
            }
            else
                this.scope.alertMsg(this.scope.getMsg(this.scope.INTERSECTED.parent,this.scope.curFloor));
            this.scope.isBlockMoved=true;
            event.preventDefault();
        }  
        if(!this.scope.enable_moveBlock&&!this.scope.flag_moveBlock)
        {                        
            this.scope.container.style.cursor="not-allowed";
            event.preventDefault();
        }
    }
}
      
Stage.prototype.onDoubleClick = function(event)
{
    //console.log("双击了");
    if(this.scope.params.mode_edit)
    {
       // console.log("缩放框");
        this.scope.transControl.attach( this.scope.INTERSECTED );
        this.scope.transControl.setMode( "scale" );
        this.scope.alertInfo("在空白处，鼠标左右键同时按下，<br>取消选择");
    }
}
Stage.prototype.onDocumentMouseDown = function( event ) {
    
    if(this.scope.ismodelActivated)
    {
        this.scope.oConfirmModal = iBase.Id("windowConfirmModal");
        var oConfirmModalUp = this.scope.oConfirmModal.children[0];
        var oConfirmModalDown = this.scope.oConfirmModal.children[1];              
        if(this.scope.isInDivs([oConfirmModalUp,oConfirmModalDown],event.clientX-this.scope.oConfirmModal.offsetLeft,event.clientY-this.scope.oConfirmModal.offsetTop))
            this.scope.controls.enabled=false;
        else 
        {
            oConfirmModalDown.children[0].click();
            this.scope.controls.enabled=true;
            this.scope.ismodelActivated=false;
        }
        return;
    }
    this.scope.hideMenuD();
    
    if(event.button!=THREE.MOUSE.RIGHT||!this.scope.params.mode_edit)
    {
        if(!this.scope.popMenu.isInMenu(event.clientX,event.clientY))
            this.scope.popMenu.hide();
        else
        {                    
            this.scope.controls.enabled=false; 
            return;
        }
    }
    
    if(event.button==THREE.MOUSE.MIDDLE)
    {
        this.scope.controls.enabled=true;
        return ;
    }
    
    if(this.scope.shiftkeypressed)
    {
        this.scope.keyboard.destroy();
        this.scope.keyboard = new THREEx.KeyboardState();
        this.scope.shiftkeypressed=false;
        this.scope.unSelectObject(true);
        this.scope.controls.enabled=true;
    }
    if(this.scope.isFormSelected==true)
    {
        var oDiv;
        oDiv=this.scope.oNewDiv;
        this.scope.clickOnDiv(oDiv,event);
        this.scope.controls.enabled=false; 
        this.scope.oManageDiv.style.zIndex=1;
        this.scope.oNewDiv.style.zIndex=2;
        return;
    }
    if(this.scope.isTableSelected==true)
    {
        var oDiv;
        oDiv=this.scope.oManageDiv;
        this.scope.clickOnDiv(oDiv,event);
        this.scope.controls.enabled=false; 
        this.scope.oManageDiv.style.zIndex=2;
        this.scope.oNewDiv.style.zIndex=1;
        return;
    }
    if(this.scope.isSubTableSelected==true)
    {
        var oDiv;
        oDiv=this.scope.osubManageDiv;
        this.scope.clickOnDiv(oDiv,event);
        this.scope.controls.enabled=false; 
        this.scope.osubManageDiv.style.zIndex=3;
        this.scope.oManageDiv.style.zIndex=2;
        this.scope.oNewDiv.style.zIndex=1;
        return;
    }
    if(this.scope.isInform==true)
        return;
    
    
    this.scope.demoGUI = document.getElementsByClassName("dg ac");
    this.scope.box1gui=demoGUI.item(0).getElementsByClassName("dg main a").item(0);
    this.scope.box2gui=demoGUI.item(0).getElementsByClassName("dg main a").item(1); 
    
    if(this.scope.isInDivs([this.scope.oNewDiv,this.scope.box1gui,this.scope.box2gui],event.clientX,event.clientY))
    {
        this.scope.controls.enabled=false;   
        return;                   
    }    
    
    if(this.scope.isOverDocMenu(event.clientX,event.clientY))
    {
        this.scope.controls.enabled=false; 
        return;
    }
    
    
    
    var vector = new THREE.Vector3( this.scope.mouse.x, this.scope.mouse.y, 0 );
    vector.unproject(  this.scope.camera );

    this.scope.raycaster.set( this.scope.camera.position, vector.sub( this.scope.camera.position ).normalize() );

    var intersects = this.scope.raycaster.intersectObjects( this.scope.scene.children ,true);                
    
    
    var index=0;
    if(intersects.length > index || (intersects[ index ].object instanceof THREE.BoxHelper))
        while(/*INTERSECTED != intersects[ index ].object&&*/intersects[ index ].object.visible==false||(intersects[ index ].object instanceof THREE.BoxHelper))
        {
            index++;
            if(intersects.length <= index) break;
        }
    if ( intersects.length > index ) {
        if ( /*INTERSECTED != intersects[ index ].object&&*/intersects[ index ].object.visible==true) {
            if ( this.scope.INTERSECTED )
                this.scope.unSelectObject(); //交替选择
            
            this.scope.INTERSECTED = intersects[ index ].object;
            this.scope.init_x=this.scope.INTERSECTED.parent.position.x;
            this.scope.init_y=this.scope.INTERSECTED.parent.position.y;
            this.scope.init_z=this.scope.INTERSECTED.parent.position.z;
            this.scope.selectObject(this.scope.INTERSECTED); 
            if(this.scope.plane.position.y != this.scope.INTERSECTED.parent.position.y)
            {
                this.scope.plane.position.y = this.scope.INTERSECTED.parent.position.y;//将交平面移动交点的高度
                this.scope.render();
            }
            
            if ( this.scope.INTERSECTED.parent.modelid )
            {                                                      
                if ( this.scope.keyboard.pressed("shift") ) {
                    this.scope.popMenu.delObject_menu(this.scope.INTERSECTED.parent);
                    this.scope.shiftkeypressed=true;
                    return;
                }
                var vector = new THREE.Vector3( this.scope.mouse.x, this.scope.mouse.y, 0 );
                vector.unproject(  this.scope.camera );
                this.scope.raycaster.set( this.scope.camera.position, vector.sub( this.scope.camera.position ).normalize() );       
                var intersectplane = this.scope.raycaster.intersectObjects( [this.scope.plane] ,true);    
            
                if(intersectplane.length >0)   
                {                            
                    this.scope.planex=intersectplane[0].point.x;
                    this.scope.planey=intersectplane[0].point.y;
                    this.scope.planez=intersectplane[0].point.z;
                }                                            
                this.scope.controls.enabled=false;
                this.scope.curdistance =  intersects[ index ].distance;
                if(this.scope.params.mode_edit==true&&!this.scope.flag_addMPoint&&this.scope.INTERSECTED.parent.type=="block")
                {
                    this.scope.blockparams.title="区块";
                    this.scope.fillBlockUI(this.scope.blockparams,this.scope.INTERSECTED);
                    
                    if(this.scope.guiBlock==null||this.scope.guiBlock==undefined)
                        this.scope.initBlockUI(this.scope.blockparams,0);                                
                }
                if(this.scope.params.mode_edit==true&&!this.scope.flag_addMPoint&&this.scope.INTERSECTED.parent.type=="brand")
                {
                    this.scope.blockparams.title="标志牌";
                    this.scope.fillBlockUI(blockparams,INTERSECTED);
                    
                    if(this.scope.guiBrand==null||this.scope.guiBrand==undefined)
                        this.scope.initBlockUI(this.scope.blockparams,1);     
                }
                if(this.scope.params.mode_edit==true&&this.scope.INTERSECTED.parent.type=="mpoint")
                {
                    this.scope.blockparams.title="测点";
                    this.scope.fillBlockUI(this.scope.blockparams,this.scope.INTERSECTED);
                    
                    if(this.scope.guiMPoint==null||this.scope.guiMPoint==undefined)
                        this.scope.initBlockUI(this.scope.blockparams,2);     
                }
                if(this.scope.flag_addMPoint&& this.scope.INTERSECTED.parent.type!="mpoint"&&this.scope.INTERSECTED.parent.modelname !="地板")
                {
                    //向场景中添加点后，选择测点ID、名称等信息
                    this.scope.enable_moveBlock=false;
                    //new_id=newMPoint(scene,curFloor,intersects[ index ].point);  
                    if(this.scope.curMPoint!=null&&this.scope.curMPoint!=undefined)
                    {
                        this.scope.curMPoint.position=intersects[ index ].point;
                        this.scope.curMPoint.texture=Math.random()*0xffffff;
                        var id,name,t_id,t_name;
                        t_id=this.scope.curMPoint.id;id=t_id;
                        t_name=this.scope.curMPoint.name;name=t_name;
                        var cnt=1;
                        while(this.scope.curFloor.getObjectById(id)!=null)
                        {
                            cnt++;
                            id=t_id+" "+cnt;                
                            name=t_name+" "+cnt;
                        }                    
                        var point = new MPoint(id,name);
                        point.copy(this.scope.curMPoint);
                        this.scope.curFloor.addMPointItem(point);
                        this.scope.loadBlock(this.scope.scene,point,"mpoint",this.scope.isFromLocalpoint);
                        if(this.scope.params.mode_edit)
                        {
                            this.scope.INTERSECTED=this.scope.scene.getObjectByModelId(point.id).children[0];
                            this.scope.blockparams.title="测点";
                            this.scope.fillBlockUI(this.scope.blockparams,this.scope.INTERSECTED);                                    
                            if(this.scope.guiMPoint==null||this.scope.guiMPoint==undefined)
                                this.scope.initBlockUI(this.scope.blockparams,2);   
                        }
                    }
                    this.scope.enable_moveBlock=this.scope.flag_moveBlock&&!(event.button==THREE.MOUSE.RIGHT);                                
                }          
                else
                {
                    this.scope.enable_moveBlock= this.scope.flag_moveBlock&&!(event.button==THREE.MOUSE.RIGHT);
                }
                this.scope.curSelected=this.scope.INTERSECTED.parent;   

                if(event.button==THREE.MOUSE.RIGHT&&this.scope.params.mode_edit)
                {
                    if(this.scope.popMenu.visible==true)
                         this.scope.popMenu.hide();
                    this.scope.popMenu.show(this.scope.curSelected,event.clientX,event.clientY);
                } 
                
                this.scope.alertMsg(this.scope.getMsg(this.scope.INTERSECTED.parent,this.scope.curFloor));                
            }
        }
    }
    else {
        
        if ( this.scope.INTERSECTED )//点空了
                this.scope.unSelectObject(true);;
    }

}


Stage.prototype.onDocumentMouseUp = function( event ) {
        this.scope.container.style.cursor="auto";
        this.scope.onUpDiv();
        if(this.scope.params.mode_view)
        {
            if ( this.scope.INTERSECTED )
                    this.scope.unSelectObject(true);;
        }
        else
        {
             this.scope.enable_moveBlock=false;
        }
        if(this.scope.INTERSECTED&&this.scope.osubManageDiv.style.display=='block'&&this.scope.isBlockMoved)
        {
            this.scope.objPositionSet(this.scope.INTERSECTED.parent,this.scope.curFloor,this.scope.init_x,this.scope.init_y,this.scope.init_z);
            
            if(this.scope.isInDiv(this.scope.osubManageDiv,event.clientX,event.clientY))
            {
                var id=this.scope.INTERSECTED.parent.modelid;
                console.log("添加"+id);   
                this.scope.subTableAppend($sub_table,id);
            }   
            this.scope.isBlockMoved=false;
        }
        if(this.scope.controls.enabled==false) this.scope.controls.enabled=true;
            this.scope.hideMsg();
}


Stage.prototype.animate = function() {

    requestAnimationFrame( this.scope.animate );

    this.scope.render();
    this.scope.stats.update();

}

Stage.prototype.render = function() {

    this.scope.renderer.render( this.scope.scene, this.scope.camera );
    
}
