function BdViewer(body,xmlFileName) {
    document.oncontextmenu=function(){return(false)};
    
    this.scope=this;
    
    this.body=body;
    this.container=null; this.stats=null; this.controls=null; this.transControl=null;
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
    this.msgTool = null;
    this.msgToolkit = new alertMsgTool(this);
    
    this.fadeTool = new fadeInOutTool();
}

BdViewer.prototype.Init=function(){
    this.scope.initBuildingDoc();
    this.scope.initScene();
}

BdViewer.prototype.render=function(){
    this.scope.renderer.render( this.scope.scene, this.scope.camera );
}


BdViewer.prototype.initBuildingDoc=function(){
    this.scope.toLoadPart(this.scope.bdList,this.scope.BuildingListXML,this.scope.params.building,this.scope.params.floor);   
} 



BdViewer.prototype.initScene=function() {            
    this.scope.container = document.createElement( 'div' );
    this.body.body.appendChild( this.scope.container );

    // CAMERA
    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 1, FAR = 1000;
    var FOV=70;
    var orthoNear=-500, orthoFar = 1000;
    
    this.scope.camera = new THREE.CombinedCamera( window.innerWidth / 2, window.innerHeight / 2, FOV, NEAR, FAR, orthoNear, orthoFar);
    
    this.scope.scene = new THREE.Scene();

    if(this.scope.curFloor.camerapos!=undefined)                
        this.scope.camera.position.copy(this.scope.curFloor.camerapos); 
    else
        this.scope.camera.position.set(-150,150,450);                
    this.scope.camera.lookAt(this.scope.scene.position); 
    //camera.toOrthographic();
    this.scope.camera.toPerspective();                
    this.scope.camera.toTopView();                
    this.scope.camera.setZoom(this.scope.curZoom); 
                          
    
    //var light = new THREE.AmbientLight(0xcccccc); 
    //scene.add(light);
    this.scope.direct_light_01 = new THREE.DirectionalLight( 0xffffff ,1.5);
    this.scope.direct_light_01.position.set( 2, 1.5, 1 ).normalize();
    this.scope.direct_light_01.shadowDarkness = 0.95;;
    this.scope.direct_light_01.shadowCameraNear=10;
    this.scope.direct_light_01.shadowCameraFar=30;
    this.scope.direct_light_01.shadowCameraLeft=-100;
    this.scope.direct_light_01.shadowCameraRight=100;
    this.scope.direct_light_01.shadowCameraTop=100;
    this.scope.direct_light_01.shadowCameraBottom=-100;
    this.scope.direct_light_01.shadowMapWidth = 1024; 
    this.scope.direct_light_01.shadowMapHeight = 1024;

    this.scope.direct_light_02 = new THREE.DirectionalLight( 0xffffff ,0.2);
    this.scope.direct_light_02.position.set( -1, -1, -1 ).normalize();
    
    this.scope.lights.push(this.scope.direct_light_01);
    this.scope.lights.push(this.scope.direct_light_02);
    
    var geometry = new THREE.PlaneBufferGeometry( 1000, 1000 );
    geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

    this.scope.plane = new THREE.Mesh( geometry );
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
    this.scope.container.appendChild(this.scope.renderer.domElement);

    this.scope.stats = new Stats();
    this.scope.stats.domElement.style.position = 'absolute';
    this.scope.stats.domElement.style.top = '0px';
    this.scope.container.appendChild( this.scope.stats.domElement );

    this.scope.controls = new THREE.OrbitControls( this.scope.camera,this.scope.renderer.domElement ,this.scope );
    this.scope.transControl = new THREE.TransformControls( this.scope.camera, this.scope.renderer.domElement );
    this.scope.transControl.setSize( 0.5 );
    this.scope.transControl.addEventListener( 'change', this.updateControlers ); //
    this.scope.transControl.viewer = this;
    
    this.scope.keyboard = new THREEx.KeyboardState();
    THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
   
    this.scope.selectionBox = new THREE.BoxHelper();
    this.scope.selectionBox.material.depthTest = false;
    this.scope.selectionBox.material.transparent = true;
    this.scope.selectionBox.visible = false;
    this.scope.loadFloor(this.scope.scene, this.scope.curFloor); 
    
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
