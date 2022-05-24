//Con11‘s Expression Library V0.1
//使用标记自动生成动画
var autoMarkAni = function(inValue, stayValue, outValue, aniTime, aniDely, intMode, targetlayer) {
	//V2.2(进入数值,一般数值,推出数值,动画时间,动画延迟,插值模式,图层)
	//配合食用 MarkerKeyExtra.getMarkerParameter("last",thisLayer,0).comment;
	//Depends： Enhanced Expression Library 1.0
	eval(footage("Enhanced Expression Library 1.0.jsx").sourceText);
	var lastMark = MarkerKeyExtra.getMarkerParameter("last", targetlayer, 0);
	var nextMark = MarkerKeyExtra.getMarkerParameter("next", targetlayer, 0);
	//插值计算
	function toOutputIn(a) {
		return InterpolationExtra.setInterpolation(time - aniDely, a, a + aniTime, inValue, stayValue, intMode);
	}
	function toOutputOut(a, b, c) {
		if (lastMark.duration == 0) {
			//判断是否有持续时间
			return InterpolationExtra.setInterpolation(time - aniDely, c - aniTime, c, stayValue, outValue, intMode);
		} else {
			return InterpolationExtra.setInterpolation(time - aniDely, a + b - aniTime, a + b, stayValue, outValue, intMode);
		}
	}
	//输出
	if (time <= lastMark.inPoint + aniTime) {
		return toOutputIn(lastMark.inPoint);
	} else {
		return toOutputOut(lastMark.inPoint, lastMark.duration, nextMark.inPoint);
	}
}
//获取图层真实旋转方向 (图层,0-3) 模式0-3分别输出单独XYZ和XYZ的数组
var getLayerRotion = function(targetLayer,returnMode) {
	function getXRotion(){
		zVec = normalize(targetLayer.toWorldVec([0,0,1]));
		return radiansToDegrees(Math.atan2(-zVec[1], zVec[2]));
	}
	function getYRotion(){
		zVec = normalize(targetLayer.toWorldVec([0,0,1]));
		return radiansToDegrees(Math.asin(zVec[0]));
	}
	function getZRotion(){
		xVec = normalize(targetLayer.toWorldVec([1,0,0]));
		yVec = normalize(targetLayer.toWorldVec([0,1,0]));
		return radiansToDegrees(Math.atan2(-yVec[0], xVec[0]));
	}
	if (returnMode == 0) {
		return getXRotion();
	}
	if (returnMode == 1) {
		return getYRotion();
	}
	if (returnMode == 2) {
		return getZRotion();
	}
	if (returnMode == 3) {
		return [getXRotion(),getYRotion(),getZRotion()];
	}
}
//获取图层真实坐标 (图层,0-3) 模式0-3分别输出单独XYZ和XYZ的数组
var getLayerPos = function(targetLayer,returnMode) {
	function ifLightLayer(){
		if(targetLayer.intensity==undefined) { //判断是否为灯光图层
			return targetLayer.toWorld(targetLayer.transform.anchorPoint.value);
		}else{
			return targetLayer.toWorld([0,0,0]);
		}
	}
var realLayerPos = ifLightLayer()
	if (returnMode == 0) {
		return realLayerPos[0];
	}
	if (returnMode == 1) {
		return realLayerPos[1];
	}
	if (returnMode == 2) {
		return realLayerPos[2];
	}
	if (returnMode == 3) {
		return realLayerPos;
	}
}
////快捷数组取整////
//数组四舍五入取整
var arrayRound = function(value) {
	var arrayLength = value.length;
	var outputValue = value;
	for (i=0; i < arrayLength; i++){
		outputValue[i]=(Math.round(value[i]));
	}
	return outputValue;
}
//数组去除小数
var arrayTrunc = function(value) {
	var arrayLength = value.length;
	var outputValue = value;
	for (i=0; i < arrayLength; i++){
		outputValue[i]=(Math.trunc(value[i]));
	}
	return outputValue;
}
//数组向上取整
var arrayCeil = function(value) {
	var arrayLength = value.length;
	var outputValue = value;
	for (i=0; i < arrayLength; i++){
		outputValue[i]=(Math.ceil(value[i]));
	}
	return outputValue;
}
//数组向下取整
var arrayFloor = function(value) {
	var arrayLength = value.length;
	var outputValue = value;
	for (i=0; i < arrayLength; i++){
		outputValue[i]=(Math.floor(value[i]));
	}
	return outputValue;
}
////快捷数组取整////

//获取修剪路径上的点坐标 (路径,开始/结束点,偏移)
var getTrimPathPoint = function(thePath,startEndValue,offSetValue) {
	//获取图层
	var i = 1,j = 0, theLayer = "";
	do {
		try {
			theLayer = thePath.propertyGroup(i);
			i = i + 1;
		} catch (err) {
			j = 1;
		}
	} while (j == 0)
	//获取结束点位置+偏移值
	var x=startEndValue/100 + offSetValue/360; 
	var y=x-Math.floor(x);
	return thePath.pointOnPath(y) + theLayer.toComp(transform.anchorPoint);//输出当前点位置 + 合成空间位置
}

//获取修剪路径上的点切线方向 (路径,开始/结束点,偏移)
var getTrimPathRotion = function(thePath,startEndValue,offSetValue) {
	//获取结束点位置+偏移值
	var x=startEndValue/100 + offSetValue/360; 
	var y=x-Math.floor(x);
	var tangent=thePath.tangentOnPath(y)//获取路径点tan值
	return 90 + value - radiansToDegrees(Math.atan2(tangent[0],tangent[1]));//转换tan到角度，输出当前角度值-路径角度值
}