# Con11 的表达式库
Con11‘s Expression Library

模仿[鹤梦的表达式增强库](https://github.com/dreamstring/After-Effects-Enhanced-Expression)写的自用小库

### 声明表达式库
也可以在表达式库脚本右键帮助按钮载入临时库使用
```javascript
eval(footage("Con11‘s Expression Library.jsx").sourceText);
```
## 简易使用说明
### 使用标记自动生成动画
```javascript
autoMarkAni(inValue, stayValue, outValue, aniTime, aniDely, intMode, targetlayer);
//Depends: Enhanced Expression Library 1.0
```
(进入数值,一般数值,退出数值,动画时间,动画延迟,插值模式,图层)  
插值模式,可选「linear」「ease」「easeIn」「easeOut」  
配合 getMarkerParameter 食用，如果配合P粒子使用会很卡，原因未知。
#### 示例
```javascript
eval(footage("Con11‘s Expression Library.jsx").sourceText); //会自动声明Enhanced-Expression
var targetlayer = thisLayer;
autoMarkAni(0,100,0,0.2,0,"linear",targetlayer);
//如果用于字幕透明度属性会有淡出淡入的效果
```

```javascript
MarkerKeyExtra.getMarkerParameter("last",thisLayer,0).comment;
```

### 获取图层真实旋转方向 
```javascript
getLayerRotion(targetLayer,returnMode);
```
(图层,0-3) 模式0-3分别输出单独XYZ和XYZ的数组

### 获取图层真实坐标
```javascript
getLayerPos(targetLayer,returnMode);
```
(图层,0-3) 模式0-3分别输出单独XYZ和XYZ的数组

### 快捷数组取整
```javascript
arrayRound(value);//数组四舍五入取整
arrayTrunc(value);//数组去除小数
arrayCeil(value);//数组向上取整
arrayFloor(value);//数组向下取整
```
### 获取修剪路径上的点坐标
```javascript
getTrimPathPoint(thePath,startEndValue,offSetValue);
```
(路径,开始/结束点, 偏移)

### 获取修剪路径上的点切线方向
```javascript
getTrimPathPoint(thePath,startEndValue,offSetValue);
```
(路径,开始/结束点, 偏移)
