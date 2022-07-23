//V1.02 by Con11
//数组需要按照例如[100,100]的格式输入数值

inValue=0;//进入数值
stayValue=100;//一般数值
outValue=0;//退出数值
aniTime=0.5;//动画时间
aniDely=0;//动画延迟
linearTrue=false;//是否线性,true为线性，false为缓动
layer1=thisLayer;//图层

m = layer1.marker.nearestKey(time);
//寻找最近的标记
function ifZero(){
	if(m.index-1==0){
		return ""
	}else{
		return ifDuration(m.index-1)
	}
}
//判断是否为零，如果零输出空值
function ifDuration(a){
	var kayA=layer1.marker.key(a);
	if(kayA.duration==0){
		return layer1.marker.key(a).index
	}else{
		if(time <= kayA.time+kayA.duration){
			return layer1.marker.key(a).index
		}else{
			return ""
		}
	}
}
//判断标记是否有持续时间，如果有，判断当前时间是否在持续时间内
if(m.time <= time){
	nowMark=ifDuration(m.index);
}else{
	nowMark=ifZero();
}

function linearIn(a){
	return linear(time,a,a+aniTime,inValue,stayValue)
}
function linearOut(a,b,c){
	if(layer1.marker.key(nowMark).duration==0){
		return linear(time,c-aniTime,c,stayValue,outValue)
	}else{
		return linear(time,a+b-aniTime,a+b,stayValue,outValue)
	}

}
//线性出入
function toEaseIn(a){
	return ease(time-aniDely,a,a+aniTime,inValue,stayValue)
}
function toEaseOut(a,b,c){
	if(layer1.marker.key(nowMark).duration==0){
		return ease(time-aniDely,c-aniTime,c,stayValue,outValue)
	}else{
		return ease(time-aniDely,a+b-aniTime,a+b,stayValue,outValue)
	}

}
//缓动出入
if(nowMark==""){
	inValue
	//如果索引是空返回进入值
}else{
	markTime=layer1.marker.key(nowMark).time;
	if(layer1.marker.nearestKey(outPoint).index==nowMark){//判断是否为最后一个标记
		markTime1=outPoint
	}else{
		markTime1=layer1.marker.key(nowMark+1).time;
	}
	
	markDuration=layer1.marker.key(nowMark).duration;
	if(linearTrue==true){//判断是否为线性
		if(time <= markTime+aniTime){
			linearIn(markTime)
		}else{
			linearOut(markTime,markDuration,markTime1)
		}
	}else{
		if(time <= markTime+aniTime){
			toEaseIn(markTime)
		}else{
			toEaseOut(markTime,markDuration,markTime1)
		}
	}
}