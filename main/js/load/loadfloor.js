
function loadFloor(scene,curFloor)
{
    clear_init_Scene(scene);    
    if(curFloor.camerapos!=undefined)
    {
        camera.position.copy(curFloor.camerapos);                
        camera.lookAt(scene.position); 
    }
    loadBlockList(scene,curFloor);
    loadMPointList(scene,curFloor);
    loadBrandList(scene,curFloor);
    //loadTextTexture(scene,curFloor);
    //loadDefault(scene,curFloor);
}
function loadBlockList(scene,curFloor)
{
    var cnt=curFloor.getBlockCount();
    for(var item=0;item<cnt;item++)
    {        
        var block = curFloor.getBlockAt(item);
        loadBlock(scene,block,"block");
    }
        
}
function loadMPointList(scene,curFloor)
{
    var cnt=curFloor.getMPointCount();
    for(var item=0;item<cnt;item++)
    {        
        var mpoint = curFloor.getMPointAt(item);
        loadBlock(scene,mpoint,"mpoint");
    }        
}
function loadBrandList(scene,curFloor)
{
    var cnt=curFloor.getBrandCount();
    for(var item=0;item<cnt;item++)
    {        
        var brand = curFloor.getBrandAt(item);
        loadBrand(scene,brand);
    }
        
}
function loadBlock(scene,block,blocktype,isFromLocal)
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
            }, onProgress, onError); 
            break;
        case 'json':
        
            break;
    }    
}

function loadBrand(scene,brand,isFromLocalimg,isFromLocal)
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
            }, onProgress, onError); 
            break;
        case 'json':
        
            break;
    }    
}
        var onProgress = function ( xhr ) {
            if ( xhr.lengthComputable ) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                // alertPercent( Math.round(percentComplete, 2) + '% downloaded' );
            }
        };

        var onError = function ( xhr ) {
        };
        
function loadTextTexture(scene,curFloor)
{
    var cnt=curFloor.getBlockCount();
    for(var key = 0; key < cnt; key ++)
    {
        obj=curFloor.getBlockAt(key);
        textTexture(scene,obj);
    }
}
function textTexture(scene,obj)//obj from floor
{
    var materialargs = {
        color: 0xffffff,
        specular: 0xffaa00,
        shininess: 50,
        shading: THREE.SmoothShading,
        emissive: 0x000000
    };

    var geomtransform = new THREE.Matrix4();
    var tmpvec = new THREE.Vector3();
    var meshes = [];
    var coloroffset = 0;
    var colorskip = ['black', 'antiquewhite', 'bisque', 'beige', 'blanchedalmond', 'darkblue', 'darkcyan'];
    var colorkeys = Object.keys( THREE.ColorKeywords );

    var labeldata={size:5,scale:0.5,label:obj.id};
    // labeldata.size=10;
    // labeldata.scale=1;
    // labeldata.label=obj.modelid;
    var scale = labeldata.scale || 1;
    var labelgeo = new THREE.TextGeometry( labeldata.label, {
        size: labeldata.size,
        height: labeldata.size / 2,
        font: 'helvetiker',
    });
    labelgeo.computeBoundingSphere();

    // center text
    geomtransform.setPosition( tmpvec.set( -labelgeo.boundingSphere.radius, 0, 0 ) );
    labelgeo.applyMatrix( geomtransform );

    // Pick a color at "random".  Exclude black, because it looks bad.
    while ( colorskip.indexOf( colorkeys[ i + coloroffset ] ) != -1 ) {
        coloroffset++;
    }
    materialargs.color = THREE.ColorKeywords[ colorkeys[ i + coloroffset ] ];

    var material = new THREE.MeshPhongMaterial( materialargs );

    var textmesh = new THREE.Mesh( labelgeo, material );
    textmesh.scale.set(scale, scale, scale);
    textmesh.position.z = -labeldata.size * scale;
    textmesh.position.y = labeldata.size / 4 * scale;
    textmesh.updateMatrix();

    var dotmesh = new THREE.Mesh(new THREE.SphereGeometry(labeldata.size * scale / 2, 24, 12), material);
    dotmesh.position.y = -labeldata.size / 4 * scale;
    dotmesh.updateMatrix();

    var merged = new THREE.Geometry();
    merged.merge( textmesh.geometry, textmesh.matrix );
    merged.merge( dotmesh.geometry, dotmesh.matrix );

    var mesh = new THREE.Mesh(merged, material);
    // mesh.position.z = -labeldata.size * 1 * scale;
    mesh.position.x=obj.position.x;
    mesh.position.y=obj.position.y*obj.scale.y;
    mesh.position.z=obj.position.z;

    mesh.modelid=obj.id+"TEXT";
    mesh.modelname=obj.name+"TEXT";
    scene.add(mesh);
}
function loadDefault(scene,curFloor)
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
    scene.add(floor);
    scene.add(cube);
    scene.add(pyramid);
    scene.add(sphere);
}
