/**
 *
 * 육각형 셀 클래스
 * 
 * @author steliviere
 * @date 2017.12.13
 * @version 0.31
 *
 */
function CELL(i,j,kind,who)
{
	/**
	 *
	 * @var {object} index	각 셀의 인덱스 no.
	 			i:열(row) 인덱스
				j:행(column) 인덱스
 	 * @var {float} x	셀 중심의 x좌표
	 * @var {float} y	셀 중심의 y좌표
	 * @var {float} r	셀의 반지름
	 * @var {int} kind	셀의 타입
				0:빈 공간
				1:이동 가능 셀
				2:이동 불가 셀
				3:베이스
				4:서브베이스
				5:벽
	 * @var {int} who	셀의 진영
				1:플레이어/1P
				2:상대/2P
				0:중립
				-1:칠할 수 없음
	 *
	 */
	this.index={i:i,j:j};
	this.x=45*(1.5*this.index.j+1);
	this.y=45*cos(PI/6)*(2*this.index.i+2-this.index.j%2);
	this.kind=kind;
	this.who=who;
	this.r=30;
	if(this.kind==3) this.r=40;
}
/**
 *
 * 각 셀들을 스크린에 그리는 함수
 *
 */
CELL.prototype.draw=function()
{
	switch(this.who)
	{
		case 1:fill("#0000ff"); break;
		case 2:fill("#ff0000"); break;
		default:fill(220);
	}
	var pos=createVector(this.x,this.y);
/*	var edge=createVector(this.r,0);
	var p=createVector();
	beginShape();
	for(var i=0;i<6;i++)
	{
		p=p5.Vector.add(edge,pos);
		vertex(p.x,p.y);
		edge.rotate(PI/3);
	}
	endShape(CLOSE);
	*/
	image(svg,this.x,this.y,this.r*2,this.r*2);
	fill(0);
	text(this.kind,this.x,this.y);
}
/**
 *
 * 셀 위에 마우스가 올려져 있는지 체크하는 함수
 *
 * @return {boolean}	셀 위에 마우스가 올려져 있는지 여부
 *
 */
CELL.prototype.isMouseOn=function()
{
	var mouse=screenControl.relativeMouse();
	var mousePos=createVector(this.x,this.y);
	mousePos.sub(mouse);
	var edge=createVector(this.r,0);
	var theta=0;
	for(var i=0;i<6;i++)
	{
		var v1=p5.Vector.sub(edge,mousePos);
		edge.rotate(PI/3);
		var v2=p5.Vector.sub(edge,mousePos);
		theta+=v1.angleBetween(v2);
	}
	return abs(theta-TWO_PI)<0.00001;
}
/**
 *
 * 셀을 클릭했을 때 메인 함수에 자신의 인덱스 no와 셀의 유형을 보낸다.
 *
 * @return {object}	메인 함수에 전달할 값들
 			index:자신의 인덱스 no.
			signal:버튼 종류(0:움직일 수 없는 셀, 1:움직일 수 있는 셀, 2:필러)
 *
 */
CELL.prototype.mouseClick=function()
{
	var code;
	switch(this.kind)
	{
		case 3:
		case 4:code=_FILLER; break;
		case 1:code=_MOVEABLE; break;
		default:code=_NOMOVE;
	}
	return {index:this.index, signal:code};
}