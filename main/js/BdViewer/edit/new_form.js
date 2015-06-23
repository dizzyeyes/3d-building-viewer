BdViewer.prototype.unlockMenu = function(state)
{
    this.popMenu.enabled=state;
    this.popMenuNew.enabled=state;
}
BdViewer.prototype.newBuilding_Form = function()
{    
    this.unlockMenu(false);
    this.form.title = '新建建筑';
    this.form.show();
}
BdViewer.prototype.newFloor_Form = function()
{        
    this.unlockMenu(false);
    this.form.title = '新建楼层';
    this.form.show();        
}
BdViewer.prototype.newBlock_Form = function()
{    
    this.unlockMenu(false);
    this.form.title = '新建区块'; 
    this.form.show();      
}
BdViewer.prototype.newBrand_Form = function()
{        
    this.unlockMenu(false);
    this.form.title = '新建标志牌';  
    this.form.show();    
}
BdViewer.prototype.newMPoint_Form = function()
{        
    this.unlockMenu(false);
    this.form.title = '新建测点';
    this.form.show();    
}
BdViewer.prototype.changeFloor_Form = function()
{        
    this.unlockMenu(false);
    this.form.title = '更换楼层';
    this.form.show();    
}