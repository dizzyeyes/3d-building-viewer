popUpMenu.prototype.processNew = function(op)
{      
    console.log("处理操作："+op);
    switch(op)
    {
//==============================================//
        case 'menu_file_exportFloor':
            this.exportFloor();
        break;
        case 'menu_file_exportAll':
            this.exportAll();
        break;
        case 'menu_reload_help':
            this.viewer.showHelpMsg();
        break;
//==============================================//
        case 'menu_new_Building':
            this.newBuilding();
        break;

        case 'menu_new_Floor':
            this.newFloor();
        break;

        case 'menu_new_Block':
            this.newBlock();
        break;
        case 'menu_new_Brand':
            this.newBrand();
        break;
        case 'menu_new_MPoint':
            this.newMPoint();
        break;
//==============================================//
        
        case 'menu_manage_changeFloor':
            this.changeFloor();//change to building 1, floor 2 (count from zero)
        break;
        
        case 'menu_manage_Group':
            this.manageGroup();
        break;

        case 'menu_manage_Block':
            this.manageBlock();
        break;                    
        case 'menu_manage_Brand':
            this.manageBrand();
        break;
        case 'menu_manage_MPoint':
            this.manageMPoint();
        break;
//==============================================//
    }
}
popUpMenu.prototype.exportFloor = function()
{    
    this.viewer.exportFloor('xml');
}
popUpMenu.prototype.exportAll = function()
{    
    this.viewer.toSaveAll('xml');
}

popUpMenu.prototype.changeFloor = function()
{    
    this.viewer.changeFloor_Form();
    //this.viewer.changeBdFloo(bid,fid);
}

popUpMenu.prototype.newBuilding = function()
{    
    this.viewer.newBuilding_Form();
}
popUpMenu.prototype.newFloor = function()
{    
    this.viewer.newFloor_Form();
}
popUpMenu.prototype.newBlock = function()
{    
    this.viewer.newBlock_Form();
}
popUpMenu.prototype.newBrand = function()
{    
    this.viewer.newBrand_Form();
}
popUpMenu.prototype.newMPoint = function()
{    
    this.viewer.newMPoint_Form();
}
popUpMenu.prototype.manageGroup = function()
{    
    this.viewer.manageGroup();
}
popUpMenu.prototype.manageBlock = function()
{    
    this.viewer.manageBlock();
}
popUpMenu.prototype.manageBrand = function()
{    
    this.viewer.manageBrand();
}
popUpMenu.prototype.manageMPoint = function()
{    
    this.viewer.manageMPoint();
}