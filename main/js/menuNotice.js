var myMessages = ['menuDinfo','menuDwarning','menuDerror','menuDsuccess']; // define the messages types		 
var ismenuDShow=false;
function menuDInfo(msg)
{
    tiggerMenuDNotice('menuDinfo',msg);
}
function menuDError(msg)
{
    tiggerMenuDNotice('menuDerror',msg);
}
function menuDWarning(msg)
{
    tiggerMenuDNotice('menuDwarning',msg);
}
function menuDSucess(msg)
{
    tiggerMenuDNotice('menuDsuccess',msg);
}

function tiggerMenuDNotice(type,info)
{
    $('.'+type)[0].innerHTML="<center>"+info+"</center>";
    hideMenuD();
    fadeIn(iBase.Id(type));
    ismenuDShow=true;
}
function hideMenuD()
{   
    if(ismenuDShow==false) return;
    for (i=0; i<myMessages.length; i++)
    {
        var obj = iBase.Id(myMessages[i]);
        if(obj.style.display=="block")
        {
            obj.style.display="none";                    
            ismenuDShow = false;            
        }
    }
}
