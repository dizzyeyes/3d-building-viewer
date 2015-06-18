BdViewer.prototype.loadFloor = function(scene,curFloor)
{
    this.scope.clear_init_Scene(scene);    
    if(curFloor.camerapos ==undefined)
        this.curFloor.camerapos = new THREE.Vector3(-150,150,450);  

    this.scope.camera.position.copy(curFloor.camerapos);                
    this.scope.camera.lookAt(this.scope.scene.position); 

    this.loadBlockList(scene,curFloor);
    this.loadMPointList(scene,curFloor);
    this.loadBrandList(scene,curFloor);
}
BdViewer.prototype.loadBlockList = function (scene,curFloor)
{
    var cnt=curFloor.getBlockCount();
    for(var item=0;item<cnt;item++)
    {        
        var block = curFloor.getBlockAt(item);
        this.loadBlock(scene,block,"block");
    }
        
}
BdViewer.prototype.loadMPointList = function (scene,curFloor)
{
    var cnt=curFloor.getMPointCount();
    for(var item=0;item<cnt;item++)
    {        
        var mpoint = curFloor.getMPointAt(item);
        this.loadBlock(scene,mpoint,"mpoint");
    }        
}
BdViewer.prototype.loadBrandList = function (scene,curFloor)
{
    var cnt=curFloor.getBrandCount();
    for(var item=0;item<cnt;item++)
    {        
        var brand = curFloor.getBrandAt(item);
        this.loadBrand(scene,brand);
    }
        
}
BdViewer.prototype.loadBlock = function (scene,block,blocktype,isFromLocal)
{
    var id = block.id;
    var name = block.name;
    var path = block.model.path;
    var type = block.model.type;        
    var texture =new THREE.Color( block.texture/1);        
    var pos = block.position;
    var rot = block.rotation;
    var scale = block.scale;
    var obj;
    
    if(isFromLocal)
    {
        getFileContentofBlock(scene,block,blocktype,'inputModelFake');
       
        return;
    }
    
    var message=block.name;
    var canvas1,context1,texture1;
    canvas1 = document.createElement('canvas');
    context1 = canvas1.getContext('2d');
    context1.font = "Bold 20px Arial";
    
    var metrics = context1.measureText(message);
    var width = metrics.width+4;
    context1.fillStyle = "rgba(0,0,0,0.95)"; // black border
    context1.fillRect( 0,0, width+8,20+8);
    context1.fillStyle = "rgba(255,255,255,0.95)"; // white filler
    context1.fillRect( 2,2, width+4,20+4 );
    context1.fillStyle = "rgba(0,0,0,1)"; // text color
    context1.fillText( message, 4,20 );
    // canvas contents will be used for a texture
    texture1 = new THREE.Texture(canvas1)
    texture1.repeat.set( 1, 1 );
    texture1.needsUpdate = true;
    
    switch(type)
    {
        case 'obj':
            var manager = new THREE.LoadingManager();
            var loader = new THREE.OBJLoader(manager); 
            loader.load(path, function(obj) { 
                obj.traverse(function(child) { 
                
                    if ( child instanceof THREE.Mesh ) {
                            //if(blocktype=="block") child.material.map = texture1;
                            child.material.color = texture; 
                            child.material.ambient = texture;
                            // child.material.emissive = texture;
                            child.material.side = THREE.DoubleSide ;
                            child.scale.set(scale.x,scale.y,scale.z);  
						}
                
                }); 
                obj.modelid=id;  
                obj.modelname=name;  
                // obj.position.set(pos.x/1+modelbias.x,pos.y/1+modelbias.y,pos.z/1+modelbias.z);                
                if(blocktype=="mpoint") 
                    obj.mpointtype=block.mpointtype;
                obj.position.set(pos.x/1,pos.y/1,pos.z);
                obj.rotation.set(rot.x,rot.y,rot.z); 
			    // obj.castShadow = true;
			    // obj.receiveShadow = true;
				obj.type=blocktype;
                obj.info=block.info;
                scene.add(obj); 
            }, this.onProgress, this.onError); 
            break;
        case 'json':
        
            break;
    }    
}

BdViewer.prototype.loadBrand = function (scene,brand,isFromLocalimg,isFromLocal)
{
    var id = brand.id;
    var name = brand.name;
    var path = brand.model.path;
    var type = brand.model.type;        
    var texture = new THREE.Color(brand.texture/1);       
    var pos = brand.position;
    var rot = brand.rotation;
    var scale = brand.scale;
    
    if(isFromLocal)
    {
        getFileContentofBlock(scene,brand,"brand",'inputModelFake');
        
        return;
    }
    switch(type)
    {
        case 'obj':
            var imageTexture = new THREE.Texture();
            var loader = new THREE.ImageLoader( manager );
            loader.load( brand.image, function ( image ) {

                imageTexture.image = image;
                imageTexture.needsUpdate = true;

            } );
            var manager = new THREE.LoadingManager();
            var loader = new THREE.OBJLoader(manager); 
            loader.load(path, function(obj) { 
                obj.traverse(function(child) { 
                
                    if ( child instanceof THREE.Mesh ) {
                        child.material.color = texture; 
                        child.material.ambient = texture;
                        child.material.map = imageTexture ;
                        child.scale.set(scale.x,scale.y,scale.z);  
                    }
                }); 
                obj.modelid=id;  
                obj.modelname=name;  
                // obj.position.set(pos.x/1+modelbias.x,pos.y/1+modelbias.y,pos.z/1+modelbias.z);                
                obj.position.set(pos.x/1,pos.y/1,pos.z);
                obj.rotation.set(rot.x,rot.y,rot.z);
				obj.type="brand";
                obj.info=brand.info;
                scene.add(obj); 
            }, this.onProgress, this.onError); 
            break;
        case 'json':
        
            break;
    }    
}
BdViewer.prototype.onProgress = function ( xhr ) {
            if ( xhr.lengthComputable ) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                // alertPercent( Math.round(percentComplete, 2) + '% downloaded' );
            }
        };

BdViewer.prototype.onError = function ( xhr ) {
        };
    

BdViewer.prototype.loadDefault = function()
{    
    var geo = new THREE.CylinderGeometry(0,2,2,4,1, true);
    var pyramid = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({color:0xff0000}));
    pyramid.position.set(-2.5, -1, 0);
 
    geo = new THREE.SphereGeometry(1, 25, 25);
    var sphere = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({color:0x00ff00}));
    sphere.position.set(2.5, -1, 0);
 
    geo = new THREE.CubeGeometry(2,2,2);
    var cube = new THREE.Mesh(geo,new THREE.MeshPhongMaterial({color:0x0000ff })   );
    cube.position.set(0, 1, 0);
    
    pyramid.castShadow = true; sphere.castShadow = true; cube.castShadow = true;

    geo = new THREE.CubeGeometry(20, 25,0.1);
    var floor = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({color :0xcfcfcf}));
    floor.material.side = THREE.DoubleSide;
    floor.rotation.x = Math.PI/2;
    floor.position.y = -2;
    floor.receiveShadow = true;
    this.scope.scene.add(floor);
    this.scope.scene.add(cube);
    this.scope.scene.add(pyramid);
    this.scope.scene.add(sphere);
}
