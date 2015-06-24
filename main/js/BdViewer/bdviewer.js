function BdViewer(body,xmlFileName) {
    document.oncontextmenu=function(){return(false)};
    
    this.scope=this;
    
    if(body==undefined) body=document;
    if(xmlFileName==undefined) xmlFileName='./data/BuildingList.xml';
    
    this.body=body;
    this.container=null; this.stats = new Stats(); this.stats.enable=false;
    this.controls=null; this.transControl=null;
    this.camera=null; this.scene=null; this.projector=null; this.raycaster=null; this.renderer=null;
    this.direct_light_01=null; this.direct_light_02=null; this.plane=null; 
    this.lights=new Array();
    
    this.keyboard=null; 
    this.version="OOP V1.0.0";
    
    this.selectionBox=null;
    
    this.modelbias= new THREE.Vector3(0,0,50);
    this.modelbaseHeight= {block:2,mpoint:0,brand:30};
    
    this.params={
        'building':0,
        'floor':0 ,
        'mode_view':false,
        'mode_edit':true
    };        
    
    this.blockparams={
        'bar_temp':null,
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
    this.bdList=new BdViewer.BuildingList();
    this.curBuilding;
    this.curFloor;            
    this.BuildingListXML=xmlFileName;//'./data/BuildingList.xml'
    
    //used in tools/control.js
    this.minZoomIn=0.5;
    this.maxZoomIn=15;
    this.deltaZoom=0.01;
    this.baseZoom=2;
    this.curZoom=this.baseZoom;//初值
    
    //used in events.js
    this.mouse = new THREE.Vector2();
    this.INTERSECTED = null;    
    this.curSelected = null;   

    this.flag_addMPoint=false;this.isFromLocalpoint=false;
    this.curMPoint=null;
    this.flag_moveBlock=false;            
    this.enable_moveBlock=true; 
    this.isBlockMoved = false;
        
    this.init_x=null;this.init_y=null;this.init_z=null;
    this.curdistance=null;

    this.colorlist={0:0x0000ff,1:0x00ff00,2:0xff0000};
    this.tmpList={"":null,"温度过高":2,"温度适宜":1,"温度过低":0};
    this.popMenu = new popUpMenu('popupmenu',this);
    this.popMenuNew = new popUpMenu('popupmenu-new',this);
    this.msgTool = null;//显示工具的实例
    this.msgToolkit = new alertMsgTool(this);
    
    this.fadeTool = new fadeInOutTool();
    
    this.form = new dynamicForm(this);
    this.table = {};
}

BdViewer.prototype.Init=function(){
    this.initBuildingDoc();
    this.initScene();
}

BdViewer.prototype.render=function(){
    this.renderer.render( this.scene, this.camera );
    if(this.stats.enable==true)
        this.stats.update();
}


BdViewer.prototype.initBuildingDoc=function(){
    this.toLoadPart(this.BuildingListXML); //this.bdList,this.BuildingListXML,this.params.building,this.params.floor  
} 



BdViewer.prototype.initScene=function() {            
    this.container = document.createElement( 'div' );
    this.body.body.appendChild( this.container );

    // CAMERA
    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 1, FAR = 1000;
    var FOV=70;
    var orthoNear=-500, orthoFar = 1000;
    
    this.camera = new THREE.CombinedCamera( window.innerWidth / 2, window.innerHeight / 2, FOV, NEAR, FAR, orthoNear, orthoFar);
    
    this.scene = new THREE.Scene();

    if(this.curFloor.camerapos==undefined)  
        this.curFloor.camerapos = new THREE.Vector3(-150,150,450);    
    this.camera.position.copy(this.curFloor.camerapos);                
    this.camera.lookAt(this.scene.position); 
    //camera.toOrthographic();
    this.camera.toPerspective();                
    this.camera.toTopView();                
    this.camera.setZoom(this.curZoom); 
                          
    
    //var light = new THREE.AmbientLight(0xcccccc); 
    //scene.add(light);
    this.direct_light_01 = new THREE.DirectionalLight( 0xffffff ,1.5);
    this.direct_light_01.position.set( 2, 1.5, 1 ).normalize();
    this.direct_light_01.shadowDarkness = 0.95;;
    this.direct_light_01.shadowCameraNear=10;
    this.direct_light_01.shadowCameraFar=30;
    this.direct_light_01.shadowCameraLeft=-100;
    this.direct_light_01.shadowCameraRight=100;
    this.direct_light_01.shadowCameraTop=100;
    this.direct_light_01.shadowCameraBottom=-100;
    this.direct_light_01.shadowMapWidth = 1024; 
    this.direct_light_01.shadowMapHeight = 1024;

    this.direct_light_02 = new THREE.DirectionalLight( 0xffffff ,0.2);
    this.direct_light_02.position.set( -1, -1, -1 ).normalize();
    
    this.lights.push(this.direct_light_01);
    this.lights.push(this.direct_light_02);
    
    var geometry = new THREE.PlaneBufferGeometry( 1000, 1000 );
    geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

    this.plane = new THREE.Mesh( geometry );
    this.plane.visible = false;

    this.projector = new THREE.Projector();
    this.raycaster = new THREE.Raycaster();

    this.renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true });
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.shadowMapEnabled = true;
    this.renderer.shadowMapSoft = true;
    this.renderer.setClearColor( 0xf0f0f0 );
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.sortObjects = false;
    this.container.appendChild(this.renderer.domElement);

    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.top = '0px';
    if(this.stats.enable==true)
        this.container.appendChild( this.stats.domElement );

    this.controls = new THREE.OrbitControls( this.camera,this.renderer.domElement ,this.scope );
    this.transControl = new THREE.TransformControls( this.camera, this.renderer.domElement );
    this.transControl.setSize( 0.5 );
    this.transControl.addEventListener( 'change', this.updateControlers ); //
    this.transControl.viewer = this;
    
    this.keyboard = new THREEx.KeyboardState();
    // THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
   
    this.selectionBox = new THREE.BoxHelper();
    this.selectionBox.material.depthTest = false;
    this.selectionBox.material.transparent = true;
    this.selectionBox.visible = false;
    this.loadFloor(this.scene, this.curFloor); 
    
}


BdViewer.prototype.updateControlers=function(event){
    event.target.viewer.transControl.update();     
    if(event.target.viewer.INTERSECTED!=null)
    {
        event.target.viewer.INTERSECTED.scale.rounding(3);
        var scal = event.target.viewer.INTERSECTED.scale;
        event.target.viewer.blockparams.scale = scal.toArray().toString();
        event.target.viewer.setObjScale(event.target.viewer.INTERSECTED.parent,event.target.viewer.curFloor,scal.x,scal.y,scal.z);
    }
} 
