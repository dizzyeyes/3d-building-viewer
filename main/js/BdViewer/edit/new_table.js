
BdViewer.prototype.manageGroup = function()
{    
    this.table.title = '分组管理';
    this.table.TableShow();
}
BdViewer.prototype.manageBlock = function()
{    
    this.table.title = '区块管理';
    this.table.TableShow();
}
BdViewer.prototype.manageBrand = function()
{    
    this.table.title = '标志牌管理';
    this.table.TableShow();
}
BdViewer.prototype.manageMPoint = function()
{    
    this.table.title = '测点管理';
    this.table.TableShow();
}
BdViewer.prototype.manageSubGroup = function(id)
{    
    this.curGroup = this.curFloor.getGroupById(id);
    this.table.parents.push(this.table.title);
    this.table.title = this.curGroup.name + " 分组详情";
    this.table.TableShow();
    this.msgToolkit.alertInfo('将区块或测点拖拽到列表中实现添加');
}