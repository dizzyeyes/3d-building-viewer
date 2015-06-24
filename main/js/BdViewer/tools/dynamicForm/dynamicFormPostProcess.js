
dynamicForm.prototype.postprocess = function(output)
{
    var data = output.data;
    var valid=this.postprocess_checkvalid(output);
    if(valid[0]!=true) return valid;
    switch(output.title)
    {
        case '新建分组':
            this.viewer.newGroup_json(data);
        break;
        case '新建建筑':
            this.viewer.newBuilding_json(data);
            this.building = this.viewer.params.building;
            this.floor = 0;
        break;
        case '新建楼层':
            this.viewer.newFloor_json(data);
            this.floor = this.viewer.params.floor;
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
    return [true];
}
dynamicForm.prototype.assertValidModelType = function(modelname)
{    
    var modelpart=modelname.split('.');
    var modeltype=modelpart[modelpart.length-1];
    if(modeltype.toLowerCase()!='obj')
    {
        return false;
    }
    return true;
}
dynamicForm.prototype.postprocess_checkvalid = function(output)
{
    var data = output.data;
    var curFloor = this.viewer.curFloor;
    var curBuilding = this.viewer.curBuilding;
    var bdList = this.viewer.bdList;
    var errmsg_id = "ID不能重复";
    var errmsg_name = "名称不能重复";
    var errmsg_model = "模型类型错误";
    switch(output.title)
    {
        case '新建分组':
            if(curFloor==undefined) return ['Floor'];
            if(curFloor.getGroupByName(data.name)!=null)
                return ['name',errmsg_name];
        break;
        case '新建建筑':
            if(bdList.getObjectById(data.id)!=null)
                return ['id',errmsg_id];
        break;
        case '新建楼层':
            if(curBuilding.getObjectById(data.id)!=null)
                return ['id',errmsg_id];
            if(this.assertValidModelType(data.model)==false) return ['model',errmsg_model];
        break;
        case '新建区块':
        case '新建测点':
        case '新建标志牌':
            if(curFloor==undefined) return ['Floor'];
            if(curFloor.getObjectById(data.id)!=null)
                return ['id',errmsg_id];
            if(this.assertValidModelType(data.model)==false) return ['model',errmsg_model];
        break;
    }
    return [true];
}