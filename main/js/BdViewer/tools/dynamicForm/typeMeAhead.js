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
    ////typeAhead ajax
    // mockMeAjax(uurl,obj,type);
        // $(inputID).typeahead({
            // ajax: { url: uurl, triggerLength: 1 }
        // });
    ////typeAhead jsonstring
    // var dataJson=getJSON(obj,type);
    // $(inputID).typeahead({
        // source: dataJson,
        // display: 'name'
    // });
    
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

function mockMeAjax(uurl,obj,type)
{
    json=getJSON(obj,type);
    // Mock an AJAX request
    $.mockjax({
        url: uurl,//'/cities/list',
        responseText: json,
        contentType: "application/x-www-form-urlencoded; charset=utf-8"
    });
}
function getJSON(obj,type)
{
    var jsonString;
    switch(type)
    {
        case 'blockid':
        jsonString="[{ id: 1, name: 'BLOCK1' },\
                    { id: 2, name: 'BLOCK2' },\
                    { id: 3, name: 'BLOCK3' },\
                    { id: 4, name: 'BLOCK4' },\
                    { id: 5, name: 'BLOCK5' },\
                    { id: 6, name: 'BLOCK6' },\
                    { id: 7, name: 'BLOCK7' },\
                    { id: 8, name: 'BLOCK8' },\
                    { id: 9, name: 'BLOCK9' },\
                    { id: 10, name: 'BLOCK10' }]";        
        break;
        case 'blockname':
        jsonString="[{ id: 1, name: '地板' },\
                    { id: 2, name: '区块1' },\
                    { id: 3, name: '区块2' },\
                    { id: 4, name: '天道区' },\
                    { id: 5, name: '神合区' },\
                    { id: 6, name: '地理区' },\
                    { id: 7, name: '不可区' },\
                    { id: 8, name: '地雷区' },\
                    { id: 9, name: '无人区' },\
                    { id: 10, name: '抽烟区' },\
                    { id: 11, name: '休息区' }]";        
        break;
        case 'brandid':
        jsonString="[{ id: 1, name: 'BRAND1' },\
                    { id: 2, name: 'BRAND2' },\
                    { id: 3, name: 'BRAND3' },\
                    { id: 4, name: 'BRAND4' },\
                    { id: 5, name: 'BRAND5' },\
                    { id: 6, name: 'BRAND6' },\
                    { id: 7, name: 'BRAND7' },\
                    { id: 8, name: 'BRAND8' },\
                    { id: 9, name: 'BRAND9' },\
                    { id: 10, name: 'BRAND10' }]";        
        break;
        case 'brandname':
        jsonString="[{ id: 1, name: '蚁力神' },\
                    { id: 2, name: '夏士莲' },\
                    { id: 3, name: '飘柔' },\
                    { id: 4, name: '肯德基' },\
                    { id: 5, name: '麦当劳' },\
                    { id: 6, name: '员工休息室' },\
                    { id: 7, name: '厕所' },\
                    { id: 8, name: '电梯间' },\
                    { id: 9, name: '咖啡店' },\
                    { id: 10, name: '楼梯' },\
                    { id: 11, name: '售票处' }]";        
        break;
        case 'mpointid':
        jsonString="[{ id: 1, name: 'MPOINT1' },\
                    { id: 2, name: 'MPOINT2' },\
                    { id: 3, name: 'MPOINT3' },\
                    { id: 4, name: 'MPOINT4' },\
                    { id: 5, name: 'MPOINT5' },\
                    { id: 6, name: 'MPOINT6' },\
                    { id: 7, name: 'MPOINT7' },\
                    { id: 8, name: 'MPOINT8' },\
                    { id: 9, name: 'MPOINT9' },\
                    { id: 10, name: 'MPOINT10' }]";        
        break;
        case 'mpointname':
        jsonString="[{ id: 1, name: '温度测点2' },\
                    { id: 2, name: '温度测点2' },\
                    { id: 3, name: '温度测点3' },\
                    { id: 4, name: '温度测点4' },\
                    { id: 5, name: '温度测点5' },\
                    { id: 6, name: '温度测点6' },\
                    { id: 7, name: '湿度测点1' },\
                    { id: 8, name: '湿度测点2' },\
                    { id: 9, name: '湿度测点3' },\
                    { id: 10, name: '湿度测点4' },\
                    { id: 11, name: '未知测点' }]";        
        break;
        case 'floorid':
        jsonString="[{ id: 1, name: 'FLOOR1' },\
                    { id: 2, name: 'FLOOR2' },\
                    { id: 3, name: 'FLOOR3' },\
                    { id: 4, name: 'FLOOR4' },\
                    { id: 5, name: 'FLOOR5' },\
                    { id: 6, name: 'FLOOR6' },\
                    { id: 7, name: 'FLOOR7' },\
                    { id: 8, name: 'FLOOR8' },\
                    { id: 9, name: 'FLOOR9' },\
                    { id: 10, name: 'FLOOR10' }]";        
        break;
        case 'floorname':
        jsonString="[{ id: 1, name: '一楼' },\
                    { id: 2, name: '二楼' },\
                    { id: 3, name: '三楼' },\
                    { id: 4, name: '四楼' },\
                    { id: 5, name: '测试楼层' },\
                    { id: 6, name: 'demo楼层' },\
                    { id: 7, name: '南京楼层' },\
                    { id: 8, name: '北京楼层' }]";        
        break;
        case 'buildingid':
        jsonString="[{ id: 1, name: 'BUILDING1' },\
                    { id: 2, name: 'BUILDING2' },\
                    { id: 3, name: 'BUILDING3' },\
                    { id: 4, name: 'BUILDING4' },\
                    { id: 5, name: 'BUILDING5' },\
                    { id: 6, name: 'BUILDING6' },\
                    { id: 7, name: 'BUILDING7' },\
                    { id: 8, name: 'BUILDING8' },\
                    { id: 9, name: 'BUILDING9' },\
                    { id: 10, name: 'BUILDING10' }]";        
        break;
        case 'buildingname':
        jsonString="[{ id: 1, name: 'T1航站楼' },\
                    { id: 2, name: 'T2航站楼' },\
                    { id: 3, name: 'T3航站楼' },\
                    { id: 4, name: '信管大厦' },\
                    { id: 5, name: '主办公楼' },\
                    { id: 6, name: '指挥中心' },\
                    { id: 7, name: '机场超市' },\
                    { id: 8, name: '机场宾馆' },\
                    { id: 11, name: '候机大楼' }]";        
        break;
        case 'model':
        jsonString="[{ id: 1, name: './data/json/models/huang.obj' },\
                    { id: 2, name: './data/json/models/bai02.obj' },\
                    { id: 3, name: './data/json/models/bai03.obj' },\
                    { id: 4, name: './data/json/models/lv01.obj' },\
                    { id: 5, name: './data/json/models/lv2.obj' },\
                    { id: 6, name: './data/json/models/lan01.obj' },\
                    { id: 7, name: './data/json/models/lan2.obj' },\
                    { id: 8, name: './data/json/models/fen.obj' },\
                    { id: 9, name: './data/json/models/ju.obj' },\
                    { id: 10, name: './data/json/models/dibu.obj' },\
                    { id: 11, name: './data/json/models/mpoint.obj' },\
                    { id: 12, name: './data/json/models/brand.obj' },\
                    { id: 13, name: './data/json/models/bai01.obj' }]";        
        break;
        case 'mpointtype':
        jsonString="[{ id: 1, name: 'temperature' },\
                    { id: 2, name: 'humidity' },\
                    { id: 3, name: 'unkown' }]";        
        break;
        case 'brandimage':
        jsonString="[{ id: 1, name: './data/json/images/kfc.jpg' },\
                    { id: 2, name: './data/json/images/nike.jpg' },\
                    { id: 3, name: './data/json/images/dfs.jpg' }]";        
        break;
    }
     
    
    return eval('('+jsonString+')');
}