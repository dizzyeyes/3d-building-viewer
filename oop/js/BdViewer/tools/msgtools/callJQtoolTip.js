function JQTool(id) {
    if(id==undefined) id = "JQtooltip";
    this.init(id);
}
JQTool.prototype.init = function(id)
{
    this.div = document.createElement('div');
    this.div.id = id;
    this.div.className = "JQtooltip";
    this.div.style.display = "none";
    document.body.appendChild(this.div);    
}

JQTool.prototype.show = function(e,text){
	if(document.all)e = event;
	
	var obj = this.div;
	obj.innerHTML = text;
	obj.style.display = 'block';
    obj.style.background='#1e2227';
    obj.style.color='#fff';
    obj.style.opacity= '0.8';
	var st = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
	if(navigator.userAgent.toLowerCase().indexOf('safari')>=0)st=0; 
	var leftPos = e.clientX + 10;
	if(leftPos+205>window.innerWidth) leftPos = window.innerWidth - 205 ;
	obj.style.left = leftPos + 'px';
	var top= e.clientY - obj.offsetHeight -1 + st ;
     if(top<0)
        obj.style.top=e.clientY  +10 + 'px';
    else         
        obj.style.top=top+ 'px';
}

JQTool.prototype.hide = function()
{
	this.div.style.display = 'none';
}