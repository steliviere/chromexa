function LOADING()
{
	this.count=0;
	this.max=0;
}
LOADING.prototype.loadData=function()
{
	var i,j;
	var table, url;
	var callback;
	for(i=0;i<2;i++)
	{
		resourceBox.map[i]=[];
		for(j=0;j<=6;j++)
		{
			if(i==0&&j!=1) continue;
			resourceBox.map[i][j]=new MAP_DATA();
			url="resource/map/"+i+"-"+j+".csv";
			callback=this.inputMapClosure(this,i,j);
			table=loadTable(url, "csv", "header", callback);
			this.max++;
		}
	}
	resourceBox.font[0]=loadFont("resource/font/NotoSans-Light.ttf",function(){this.count++;}.bind(this));
	resourceBox.font[1]=loadFont("resource/font/NotoSans-Regular.ttf",function(){this.count++;}.bind(this));
	resourceBox.font[2]=loadFont("resource/font/NotoSans-Medium.ttf",function(){this.count++;}.bind(this));
	this.max+=3;
}
LOADING.prototype.execute=function()
{
	background(0);
	fill(255);
	noStroke();
	rect(0,0,map(this.count,0,this.max,0,width),50);
	if(this.count==this.max) sceneNo=0;
}
LOADING.prototype.inputMapClosure=function(a,i,j)
{
	return function(table)
	{
		a.inputMap(table,resourceBox.map[i][j]);
	};
}
LOADING.prototype.inputMap=function(table, box)
{
	box.row=table.getRowCount();
	box.column=table.getColumnCount();
	var s="";
	for(var i=0;i<box.row;i++)
	{
		box.kind[i]=[];
		box.who[i]=[];
		box.player[i]=[];
		box.enemy[i]=[];
		for(var j=0;j<box.column;j++)
		{
			s=split(table.getString(i,j),"|");
			box.kind[i][j]=int(s[0]);
			box.who[i][j]=int(s[1]);
			if(s[2]=="null")
			{
				box.player[i][j]=null;
				box.enemy[i][j]=null;
			}
			else if(int(s[2])>1000)
			{
				box.player[i][j]=null;
				box.enemy[i][j]=int(s[2]);
			}
			else
			{
				box.player[i][j]=int(s[2]);
				box.enemy[i][j]=null;
			}
		}
	}
	this.count++;
}
