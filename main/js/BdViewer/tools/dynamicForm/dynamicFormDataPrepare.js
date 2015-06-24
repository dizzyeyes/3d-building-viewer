dynamicForm.prototype.getJsonDataofFormNew = function()
{
    var formFirstlist=new Array();
    var obj = this.getObjects();
    switch(this.title)
    {
        case '新建分组':
        case '新建建筑':
        case '更改ID':
            formFirstlist.push(obj.id);
            formFirstlist.push(obj.name);
            formFirstlist.push(obj.info);
        break;
        case '新建楼层':
        case '新建区块':
            formFirstlist.push(obj.id);
            formFirstlist.push(obj.name);
            formFirstlist.push(obj.model);
            formFirstlist.push(obj.info);
        break;
        case '新建测点':
            formFirstlist.push(obj.id);
            formFirstlist.push(obj.name);
            formFirstlist.push(obj.tag);
            formFirstlist.push(obj.model);
            formFirstlist.push(obj.info);
        break;
        case '新建标志牌':
            formFirstlist.push(obj.id);
            formFirstlist.push(obj.name);
            formFirstlist.push(obj.model);
            formFirstlist.push(obj.image);
            formFirstlist.push(obj.info);
        break;
        case '更换楼层':
            formFirstlist.push(obj.listBuilding);
            formFirstlist.push(obj.listFloor);
        break;
    }
    var buttonlist=new Array();
    buttonlist.push({
                    id: 'form_button_ok',
                    name: 'form_button_ok',
                    title: '确定',
                    divName: 'button',
                    className: '"btn btn-info"'
                });
    buttonlist.push({
                    id: 'form_button_cancel',
                    name: 'form_button_cancel',
                    title: '取消',
                    divName: 'button',
                    className: '"btn btn-warning"'
                });
    formFirstlist.push({
                    id: 'form_buttons',
                    name: 'form_buttons',
                    divName: 'buttons',
                    children: buttonlist,
                });
   var dataJson= [{
                    id: 'menu_edit',
                    name: 'menu_edit',
                    title: this.title,
                    divName: 'div',
                    children: formFirstlist,
                    className: '"well span4"'
                }];
    return dataJson;
}

dynamicForm.prototype.getObjects = function()
{
    var dataJson={};
    var form = this;
    
    dataJson.id={
                oldvalue: form.obj.id,
                id: 'form_input_ID',
                name: 'id',
                title: 'ID',
                holder: '请输入ID...',
                divName: 'input',
                type: 'text',
                className: 'span4',
                value: form.obj.id
                };
    dataJson.name={
                id: 'form_input_Name',
                name: 'name',
                title: '名称',
                holder: '请输入名称...',
                divName: 'input',
                type: 'text',
                className: 'span4',
                value: form.obj.name
                };
    dataJson.model={
                id: 'form_input_Model',
                name: 'model',
                title: '模型文件',
                holder: '请输入模型文件名称...',
                divName: 'input',
                type: 'text',
                className: 'span4',
                value: form.obj.model
                };
    dataJson.info={
                id: 'form_input_Info',
                name: 'info',
                title: '信息',
                holder: '请输入信息...',
                divName: 'textarea',
                type: 'textarea',
                className: '"span4 area"',
                innerHTML: form.obj.info
                };
    dataJson.image={
                id: 'form_input_Image',
                name: 'image',
                title: '贴图',
                holder: '请输入贴图文件...',
                divName: 'input',
                type: 'text',
                className: 'span4',
                value: form.obj.image
                };
    dataJson.tag={
                id: 'form_input_Tag',
                name: 'tag',
                title: '标签',
                holder: '请输入标签...',
                divName: 'input',
                type: 'text',
                className: 'span4',
                value: form.obj.tag
                };
    dataJson.listcontent=[{
                    id: 'form_button_ok',
                    name: 'form_button_ok',
                    title: '确定',
                    divName: 'option'
                },{
                    id: 'form_button_ok',
                    name: 'form_button_ok',
                    title: '取消',
                    divName: 'option'                  
                }
                ];
    dataJson.listBuilding={
                id: 'form_input_List_Building',
                name: 'Building',
                title: '建筑',
                holder: '请输入建筑...',
                divName: 'select',
                type: 'list',
                children: form.getList(form.viewer.bdList,form.viewer.curBuilding.id),
                className: 'span4'
                };
    var floorid=(form.viewer.curFloor===null)?0:form.viewer.curFloor.id;
    dataJson.listFloor={
                id: 'form_input_List_Floor',
                name: 'Floor',
                title: '楼层',
                holder: '请输入楼层...',
                divName: 'select',
                type: 'list',
                children: form.getList(form.viewer.curBuilding,floorid),
                className: 'span4'
                };
    return dataJson;
}

dynamicForm.prototype.getList = function(obj,selected)
{
    var list = new Array();
    var cnt = obj.getCount();
    for(var item = 0; item<cnt; item++)
    {        
        var item_i = obj.getAt(item);
        var listcontent={
                        id: 'form_button_ok',
                        name: 'form_button_ok',
                        title: '确定',
                        divName: 'option',
                        value: '',
                        select: ''
                    }
        listcontent.title = item_i.name;
        listcontent.id = item_i.id;
        listcontent.name = item_i.id;
        listcontent.value = item;
        if(selected == item_i.id) listcontent.select = 'selected';
        list.push(listcontent);
    }
    return list;
}