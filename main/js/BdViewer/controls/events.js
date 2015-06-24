

BdViewer.prototype.onWindowResize = function(){
    this.scope.camera.setSize( window.innerWidth, window.innerHeight );
    this.scope.camera.updateProjectionMatrix();

    this.scope.renderer.setSize( window.innerWidth, window.innerHeight ); 
} 

BdViewer.prototype.onKeyUp = function(event) {
    this.controls.enabled=true;
}

BdViewer.prototype.onKeyDown = function(event) {
    var keyCode = event.keyCode
    switch(keyCode)
    {
        case 116://F5
            event.preventDefault();
            var ret = alertConfirm("是否重新载入？",windowRefresh);
            return;
        break;
        case 27://ESC
            event.preventDefault();  
            if(this.form.div.style.display==="block") 
            {
                this.form.hide();
                this.unlockMenu(true);
            }
            if(this.flag_addMPoint===true)
            {
                this.flag_addMPoint=false;
                this.msgToolkit.alertInfo("结束添加测点");
            }
        break;
    }
    this.controls.enabled=false;
}
BdViewer.prototype.onMouseWheel = function( event ) {
    
}
BdViewer.prototype.onDoubleClick = function(event){
    if(this.params.mode_edit&&this.INTERSECTED )
    {
       // console.log("缩放框");
        this.transControl.attach( this.INTERSECTED );
        this.transControl.setMode( "scale" );
        this.msgToolkit.alertInfo("在空白处，鼠标左右键同时按下，<br>取消选择");
    }
}
BdViewer.prototype.onDocumentMouseMove = function( event ) {
    this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;    
    
    if (this.INTERSECTED )
    {
        if(this.flag_moveBlock&&this.enable_moveBlock)
        {                    
            this.container.style.cursor="move";
            var vector = new THREE.Vector3( this.mouse.x, this.mouse.y, 0 );
            vector.unproject(  this.camera );
            this.raycaster.set( this.camera.position, vector.sub( this.camera.position ).normalize() );
            var intersectplane = this.raycaster.intersectObjects( [this.plane] ,true);    
        
            var newplanex=this.planex, newplaney=this.planey, newplanez=this.planez;
            if(intersectplane.length >0)   
            {                            
                newplanex=intersectplane[0].point.x;
                newplaney=intersectplane[0].point.y;
                newplanez=intersectplane[0].point.z;
            }        
            
            this.deltax=newplanex-this.planex;
            this.deltay=newplaney-this.planey;
            this.deltaz=newplanez-this.planez;
            
            this.objPositionChange(this.INTERSECTED.parent,this.curFloor,this.deltax,0,this.deltaz);
             
            this.planex = newplanex;
            this.planey = newplaney;
            this.planez = newplanez;
            
            this.msgToolkit.alertMsg(this.msgToolkit.getMsg(this.INTERSECTED.parent,this.curFloor));
            this.isBlockMoved=true;
            event.preventDefault();
        }  
        if(!this.enable_moveBlock&&!this.flag_moveBlock)
        {                        
            this.container.style.cursor="not-allowed";
            event.preventDefault();
        }
    }
}
BdViewer.prototype.onDocumentMouseDown = function( event ) {
    this.msgToolkit.hideMenuD();
    if(this.form.isInForm(event.clientX,event.clientY))
    {                   
        this.controls.enabled=false; 
        return;
    }
    if(event.button!=THREE.MOUSE.RIGHT||!this.params.mode_edit)
    {
        if(!this.popMenu.isInMenu(event.clientX,event.clientY))
            this.popMenu.hide();
        else
        {                    
            this.controls.enabled=false; 
            return;
        }
        if(!this.popMenuNew.isInMenu(event.clientX,event.clientY))
            this.popMenuNew.hide();
        else
        {                    
            this.controls.enabled=false; 
            return;
        }
    }
    
    this.flag_moveBlock = this.params.mode_edit;
    
    var vector = new THREE.Vector3( this.mouse.x, this.mouse.y, 0 );
    vector.unproject(  this.camera );

    this.raycaster.set( this.camera.position, vector.sub( this.camera.position ).normalize() );

    var intersects = this.raycaster.intersectObjects( this.scene.children ,true); 
    if(intersects.length==0) return;
    var index=0;
    if(intersects.length > index || (intersects[ index ].object instanceof THREE.BoxHelper))
        while(/*INTERSECTED != intersects[ index ].object&&*/intersects[ index ].object.visible==false||(intersects[ index ].object instanceof THREE.BoxHelper))
        {
            index++;
            if(intersects.length <= index) break;
        }
    if ( intersects.length > index ) {
        
        if ( /*INTERSECTED != intersects[ index ].object&&*/intersects[ index ].object.visible==true) {
            if ( this.INTERSECTED )
                this.unSelectObject(); //交替选择
            
            this.INTERSECTED = intersects[ index ].object;
            this.init_x=this.INTERSECTED.parent.position.x;
            this.init_y=this.INTERSECTED.parent.position.y;
            this.init_z=this.INTERSECTED.parent.position.z;
            if(this.plane.position.y != this.INTERSECTED.parent.position.y)
            {
                this.plane.position.y = this.INTERSECTED.parent.position.y;//将交平面移动交点的高度
                this.render();
            }
            
            if ( this.INTERSECTED.parent.modelid )
            {
                var vector = new THREE.Vector3( this.mouse.x, this.mouse.y, 0 );
                vector.unproject(  this.camera );
                this.raycaster.set( this.camera.position, vector.sub( this.camera.position ).normalize() );       
                var intersectplane = this.raycaster.intersectObjects( [this.plane] ,true);    
            
                if(intersectplane.length >0)   
                {                            
                    this.planex=intersectplane[0].point.x;
                    this.planey=intersectplane[0].point.y;
                    this.planez=intersectplane[0].point.z;
                }                                            
                this.controls.enabled=false;
                this.curdistance =  intersects[ index ].distance;
                if(this.params.mode_edit==true&&!this.flag_addMPoint&&this.INTERSECTED.parent.type=="block")
                {
                    console.log("选中区块："+this.INTERSECTED.parent.modelid);
                    this.blockparams.ID = this.INTERSECTED.parent.modelid;                              
                }
                if(this.params.mode_edit==true&&!this.flag_addMPoint&&this.INTERSECTED.parent.type=="brand")
                {
                    console.log("选中标志牌："+this.INTERSECTED.parent.modelid); 
                    this.blockparams.ID = this.INTERSECTED.parent.modelid;    
                }
                if(this.params.mode_edit==true&&this.INTERSECTED.parent.type=="mpoint")
                {
                    console.log("选中测点："+this.INTERSECTED.parent.modelid);
                    this.blockparams.ID = this.INTERSECTED.parent.modelid;
                }
                if(this.flag_addMPoint&& this.INTERSECTED.parent.type!="mpoint"&&this.INTERSECTED.parent.modelname !="地板")
                {
                    //向场景中添加点后，选择测点ID、名称等信息
                    this.enable_moveBlock=false;
                    //new_id=newMPoint(scene,curFloor,intersects[ index ].point);  
                    if(this.curMPoint!=null&&this.curMPoint!=undefined)
                    {
                        this.curMPoint.position=intersects[ index ].point;
                        this.curMPoint.texture=Math.random()*0xffffff;
                        var id,name,t_id,t_name;
                        t_id=this.curMPoint.id;id=t_id;
                        t_name=this.curMPoint.name;name=t_name;
                        var cnt=1;
                        while(this.curFloor.getObjectById(id)!=null)
                        {
                            cnt++;
                            id=t_id+" "+cnt;                
                            name=t_name+" "+cnt;
                        }                    
                        var point = new BdViewer.MPoint(id,name);
                        point.copy(this.curMPoint);
                        this.curFloor.addMPointItem(point);
                        this.loadBlock(this.scene,point,"mpoint");
                        if(this.params.mode_edit)
                        {
                            this.INTERSECTED=this.scene.getObjectByModelId(point.id).children[0];
                            this.blockparams.ID = this.INTERSECTED.parent.modelid;
                            console.log("选中测点："+this.INTERSECTED.parent.modelid);
                        }
                    }
                    this.enable_moveBlock=this.flag_moveBlock&&!(event.button==THREE.MOUSE.RIGHT);                                
                }         
                else
                {
                    this.enable_moveBlock= this.flag_moveBlock&&!(event.button==THREE.MOUSE.RIGHT);
                }
                this.curSelected=this.INTERSECTED.parent;  
                this.selectObject(this.INTERSECTED);  

                if(event.button==THREE.MOUSE.RIGHT&&this.params.mode_edit)
                {
                    event.preventDefault();
                    if(this.popMenu.visible==true)
                         this.popMenu.hide();
                    if(this.popMenuNew.visible==true)
                         this.popMenuNew.hide();
                    this.popMenu.selectobj(this.curSelected);
                    this.popMenu.show(event.clientX,event.clientY);
                }                 
                this.msgToolkit.alertMsg(this.msgToolkit.getMsg(this.INTERSECTED.parent,this.curFloor));                
            }
        }
    }
    else {
        if ( this.INTERSECTED )//点空了
                this.unSelectObject(true);
        
        if(event.button==THREE.MOUSE.RIGHT&&this.params.mode_edit)
        {
            event.preventDefault();
            if(this.popMenu.visible==true)
                 this.popMenu.hide();
            if(this.popMenuNew.visible==true)
                 this.popMenuNew.hide();
            this.popMenuNew.show(event.clientX,event.clientY);
        }
    }
}
BdViewer.prototype.onDocumentMouseUp = function( event ) {
    this.container.style.cursor="auto";
    if(this.params.mode_view)
    {
        if ( this.INTERSECTED )
                this.unSelectObject(true);;
    }
    else
    {
         this.enable_moveBlock=false;
    }
    if(this.controls.enabled==false) this.controls.enabled=true;
     //controls.enabled=!params.mode_edit;
    this.msgToolkit.hideMsg();
}