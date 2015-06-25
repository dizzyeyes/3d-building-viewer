dynamicForm.prototype.isInTypeMeAhead = function(x,y)
{
    var accs = document.getElementsByClassName('acc');
    for(var item = 0; item<accs.length;item++)
    {
        if(this.isInDiv(accs[item],x,y)===true) return true;
    }
    return false;
}
dynamicForm.prototype.prepareTypeMeAhead = function()
{
    switch(this.title)
    {
        case '新建分组':  
            this.typeMeAhead('form_new','#form_input_ID','./data/json/id/',null,'groupid');
            this.typeMeAhead('form_new','#form_input_Name','./data/json/name/',null,'groupname');
        break;
        case '新建建筑':
            this.typeMeAhead('form_new','#form_input_ID','./data/json/id/',null,'buildingid');
            this.typeMeAhead('form_new','#form_input_Name','./data/json/name/',null,'buildingname');
        break;
        case '更改ID':         
        break;
        case '新建楼层':  
            this.typeMeAhead('form_new','#form_input_ID','./data/json/id/',null,'floorid');
            this.typeMeAhead('form_new','#form_input_Name','./data/json/name/',null,'floorname');
            this.typeMeAhead('form_new','#form_input_Model','./data/json/',null,'model');
        break;
        case '新建区块':  
            this.typeMeAhead('form_new','#form_input_ID','./data/json/id/',null,'blockid');
            this.typeMeAhead('form_new','#form_input_Name','./data/json/name/',null,'blockname');
            this.typeMeAhead('form_new','#form_input_Model','./data/json/',null,'model');
        break;
        case '新建测点':  
            this.typeMeAhead('form_new','#form_input_ID','./data/json/id/',null,'mpointid');
            this.typeMeAhead('form_new','#form_input_Name','./data/json/name/',null,'mpointname');
            this.typeMeAhead('form_new','#form_input_Model','./data/json/',null,'model');
            this.typeMeAhead('form_new','#form_input_Tag','./data/json/',null,'mpointtype');
        break;
        case '新建标志牌':  
            this.typeMeAhead('form_new','#form_input_ID','./data/json/id/',null,'brandid');
            this.typeMeAhead('form_new','#form_input_Name','./data/json/name/',null,'brandname');
            this.typeMeAhead('form_new','#form_input_Model','./data/json/',null,'model');
            this.typeMeAhead('form_new','#form_input_Image','./data/json/',null,'brandimage');
        break;
    }
}
dynamicForm.prototype.typeMeAhead = function(formid,inputID,uurl,obj,type)
{
    //autocomplete ajax    
    $(inputID).AutoCompleteMe('destroy');
    $(inputID).AutoCompleteMe({
        'data': uurl+type+".json",
        'async': true,
        'onerror': function(msg){alert(msg);},
        'itemHeight': 20,
        'width': 'auto',
        'emphasisHandler': function(keyword, data){
            var regex = RegExp("("+keyword.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")+")", 'ig');
            data.label = data.label.replace(regex, "<span style='font-weight:bold;'>$1</span>");
        },
        'afterSelectedHandler':function(keyword, data){
            var inputitem=this.inputView[0];
            var inputitemid=this.inputView[0].id;
            switch(inputitemid){
                case "inputId":
                    inputitem.value=inputitem.value.toUpperCase();assertDuplicateId(inputitem.value,inputitem.fromWhere);
                break;
                case "inputModel":
                    inputitem.value=inputitem.value.toLowerCase();assertValidModelType(inputitem);
                break;  
            }
        }
    }).AutoCompleteMe('show');
}
