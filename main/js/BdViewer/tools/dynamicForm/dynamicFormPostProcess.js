
dynamicForm.prototype.postprocess = function(output)
{
    var data = output.data;
    var valid;
    if((valid=this.postprocess_checkvalid(output))!=true) return valid;
    switch(output.title)
    {
        case '新建分组':
            this.viewer.newGroup_json(data);
        break;
        case '新建建筑':
            this.viewer.newBuilding_json(data);
        break;
        case '新建楼层':
            this.viewer.newFloor_json(data);
        break;
        case '新建区块':
            this.viewer.newBlock_json(data);
        break;
        case '新建测点':
            this.viewer.newMPoint_json(data);
        break;
        case '新建标志牌':
            this.viewer.newBrand_json(data);
        break;
        case '更改ID':
            this.viewer.changeID_json(data);
        break;
        case '更换楼层':
            this.building = data.Building;
            this.floor = data.Floor;
            console.log('already changed floor',data);
        break;
    }
    return true;
}
dynamicForm.prototype.postprocess_checkvalid = function(output)
{
    var data = output.data;
    var curFloor = this.viewer.curFloor;
    var curBuilding = this.viewer.curBuilding;
    var bdList = this.viewer.bdList;
    switch(output.title)
    {
        case '新建分组':
            if(curFloor==undefined) return 'Floor';
            if(curFloor.getGroupByName(data.name)!=null)
                return 'name';
        break;
        case '新建建筑':
            if(bdList.getObjectById(data.id)!=null)
                return 'id';
        break;
        case '新建楼层':
            if(curBuilding.getObjectById(data.id)!=null)
                return 'id';
        break;
        case '新建区块':
        case '新建测点':
        case '新建标志牌':
            if(curFloor==undefined) return 'Floor';
            if(curFloor.getObjectById(data.id)!=null)
                return 'id';
        break;
    }
    return true;
}