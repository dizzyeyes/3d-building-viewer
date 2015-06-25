
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
BdViewer.prototype.manageSubGroup = function(group)
{    
    this.table.title = group.name+'分组';
    this.table.TableShow();
}