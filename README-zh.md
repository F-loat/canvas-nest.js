# canvas-nest.js

> 一个基于html5 canvas绘制的网页背景效果，非常赞！如果需要 `wordpress插件`，在插件库搜索 `canvas-nest` 或者看看项目 [canvas-nest-for-wp](https://github.com/aTool-org/canvas-nest-for-wp)。

![travis-ci](https://travis-ci.org/hustcc/canvas-nest.js.svg?branch=master) ![npm](https://img.shields.io/npm/v/canvas-nest.js.svg?style=flat-square) ![npm](https://img.shields.io/npm/l/canvas-nest.js.svg?style=flat-square)


## 特性

 - 不依赖任何框架或者类库，比如不依赖 jQuery，使用原生的 javascript。
 - 非常小，只有1.6 kb，如果开启 gzip，可以更小。
 - 非常容易实现，配置简单，即使你不是web开发者，也能简单搞定。


## 使用

使用非常简单，感觉都没有必要写这一节内容。

将下面的代码插入到 `<body> 和 </body> 之间`.

```html
<script type="text/javascript" src="//cdn.bootcss.com/canvas-nest.js/1.0.1/canvas-nest.min.js"></script>
```

强烈建议在 `</body>`标签上方. 例如下面的代码结构:

```html
<html>
<head>
	...
</head>
<body>
	...
	...
	...
	<script type="text/javascript" src="//cdn.bootcss.com/canvas-nest.js/1.0.1/canvas-nest.min.js"></script>
</body>
</html>
```

`请注意不要将代码置于 <head> </head>里面`.

然后就完成了，打开网页即可看到效果!


## 配置和配置项

 - **`color`**: 线条颜色, 默认: `'0,0,0'` ；三个数字分别为(R,G,B)，注意用,分割
 - **`opacity`**: 线条透明度（0~1）, 默认: `0.5`
 - **`count`**: 线条的总数量, 默认: `150`
 - **`zIndex`**: 背景的z-index属性，css属性用于控制所在层的位置, 默认: `-1`


Example:

```
<script type="text/javascript" color="0,0,255" opacity='0.7' zIndex="-2" count="99" src="//cdn.bootcss.com/canvas-nest.js/1.0.1/canvas-nest.min.js"></script>
```

这些属性配置在引用js的script标签中，作为它的一个属性值。所有的配置项都有默认值，如果你不知道怎么设置，可以先不设置这些配置项，就使用默认值看看效果也可以的。


## 示例

1. [在线工具: http://www.atool.org/](http://www.atool.org/)
2. [爱表情 aiBQ: https://aibq.cn/](https://aibq.cn/)

如果你使用的了本项目，也可以修改此处文件，并 pr，我会接受的。

![screenshot](https://raw.githubusercontent.com/hustcc/canvas-nest.js/master/screenshot.png)


## 其他

本项目的Javascript文件已经存储在CDN上，可以直接使用，地址为： [http://www.bootcdn.cn/canvas-nest.js/](http://www.bootcdn.cn/canvas-nest.js/)，如果你不需要 CDN 或者有自己的 CDN，可以直接下载源码 dist 目录中的 `canvas-nest.min.js`，然后相应的修改使用地址即可。

有任何的bug或者建议，非常鼓励 issue 和 pr，来者不拒。
