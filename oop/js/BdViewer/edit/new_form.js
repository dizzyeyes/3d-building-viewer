BdViewer.prototype.unlockMenu = function(state)
{
    this.popMenu.enabled=state;
    this.popMenuNew.enabled=state;
    if(state==true&&this.isFromTable==true)
    {
        this.table.TableShow();
        this.isFromTable = false;
    }
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
BdViewer.prototype.changeID_Form = function(obj)
{        
    this.unlockMenu(false);
    this.form.title = '更改ID';
    this.form.obj = obj;
    this.form.show();    
}
BdViewer.prototype.newGroup_Form = function()
{        
    this.unlockMenu(false);
    this.form.title = '新建分组';
    this.form.show();    
}