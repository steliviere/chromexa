function roundedHexagon(x,y,r)
{
	var edge=createVector(0,r*cos(PI/6));
	var cpoint=createVector(-r/2,0);
	var apoint=createVector(-r*7/20,0);
	var v1, v2;
	translate(width/2,height/2);
	beginShape();
	v2=p5.Vector.add(edge,apoint);
	vertex(x+v2.x,y+v2.y);
	for(var i=0;i<6;i++)
	{
		v1=p5.Vector.sub(edge,cpoint);
		v2=p5.Vector.sub(edge,apoint);
		bezierVertex(x+v1.x,y+v1.y,x+v2.x,y+v2.y,x+v2.x,y+v2.y);
		v1=p5.Vector.add(edge,cpoint);
		v2=p5.Vector.add(edge,apoint);
		bezierVertex(x+v2.x,y+v2.y,x+v1.x,y+v1.y,x+v2.x,y+v2.y);
		edge.rotate(PI/3);
		cpoint.rotate(PI/3);
		apoint.rotate(PI/3);
	}
	v1=p5.Vector.sub(edge,cpoint);
	v2=p5.Vector.sub(edge,apoint);
	bezierVertex(x+v1.x,y+v1.y,x+v2.x,y+v2.y,x+v2.x,y+v2.y);
	endShape(CLOSE);
}