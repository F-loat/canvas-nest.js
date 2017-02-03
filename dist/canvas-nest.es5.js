'use strict';

/**
 * Copyright (c) 2016 hustcc
 * License: MIT
 * Version: v1.0.1
 * GitHub: https://github.com/hustcc/canvas-nest.js
**/

!function () {
  // 封装方法，压缩之后减少文件大小
  var get_attribute = function get_attribute(node, attr, default_value) {
    return node.getAttribute(attr) || default_value;
  };

  // 封装方法，压缩之后减少文件大小
  var get_by_tagname = function get_by_tagname(name) {
    return document.getElementsByTagName(name);
  };

  // 获取配置参数
  function get_config_option() {
    var scripts = get_by_tagname('script');
    var script_len = scripts.length;
    var script = scripts[script_len - 1]; //当前加载的script
    return {
      l: script_len, //长度，用于生成id用
      z: get_attribute(script, 'zIndex', -1), //z-index
      o: get_attribute(script, 'opacity', 0.5), //opacity
      c: get_attribute(script, 'color', '0,0,0'), //color
      n: get_attribute(script, 'count', 99) //count
    };
  }

  // 设置canvas的高宽
  function set_canvas_size() {
    canvas_width = the_canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    canvas_height = the_canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  }

  // 绘制过程
  function draw_canvas() {
    context.clearRect(0, 0, canvas_width, canvas_height);
    // 随机的线条和当前位置联合数组
    var e = void 0,
        i = void 0,
        d = void 0,
        x_dist = void 0,
        y_dist = void 0,
        dist = void 0; //临时节点
    // 遍历处理每一个点
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = random_points[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var r = _step.value;

        r.x += r.xa;
        r.y += r.ya; //移动
        r.xa *= r.x > canvas_width || r.x < 0 ? -1 : 1;
        r.ya *= r.y > canvas_height || r.y < 0 ? -1 : 1; // 碰到边界，反向反弹
        context.fillRect(r.x - 0.5, r.y - 0.5, 1, 1); // 绘制一个宽高为1的点
        // 遍历处理沾附关系
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = all_array[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _e = _step2.value;

            x_dist = r.x - _e.x; // x轴距离 l
            y_dist = r.y - _e.y; // y轴距离 n
            dist = x_dist * x_dist + y_dist * y_dist; // 总距离, m
            // 当前点在沾附范围内
            if (null !== _e.x && null !== _e.y && dist < _e.max) {
              _e === current_point && dist >= _e.max / 2 && (r.x -= 0.03 * x_dist, r.y -= 0.03 * y_dist); // 靠近的时候加速
              d = (_e.max - dist) / _e.max;
              context.beginPath();
              context.lineWidth = d / 2;
              context.strokeStyle = 'rgba(' + config.c + ', ' + (d + 0.2) + ')';
              context.moveTo(r.x, r.y);
              context.lineTo(_e.x, _e.y);
              context.stroke();
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    frame_func(draw_canvas);
  }

  // 创建画布，并添加到body中
  var the_canvas = document.createElement('canvas'); // 画布
  var config = get_config_option(); // 配置
  var canvas_id = 'c_n' + config.l; // canvas id
  var context = the_canvas.getContext('2d');
  var frame_func = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (func) {
    return window.setTimeout(func, 1000 / 45);
  };
  var random = Math.random;
  var current_point = {
    x: null, // 当前鼠标x
    y: null, // 当前鼠标y
    max: 20000 };
  var canvas_width = void 0,
      canvas_height = void 0,
      all_array = void 0;
  var random_points = [];

  the_canvas.id = canvas_id;
  the_canvas.style.cssText = 'position:fixed;top:0;left:0;z-index:' + config.z + ';opacity:' + config.o;
  get_by_tagname('body')[0].appendChild(the_canvas);

  // 初始化画布大小
  set_canvas_size();

  // 监听窗口尺寸变化
  window.addEventListener('resize', set_canvas_size);

  // 鼠标移动时位置存储，离开时释放位置信息
  window.addEventListener('mousemove', function () {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.event;

    current_point.x = e.clientX;
    current_point.y = e.clientY;
  });
  window.addEventListener('mouseout', function () {
    current_point.x = null;
    current_point.y = null;
  });

  // 随机生成config.n条线位置信息
  for (var i = 0; config.n > i; i++) {
    var x = random() * canvas_width; // 随机位置
    var y = random() * canvas_height;
    var xa = 2 * random() - 1; // 随机运动方向
    var ya = 2 * random() - 1;
    // 随机点
    random_points.push({
      x: x,
      y: y,
      xa: xa,
      ya: ya,
      max: 6000 });
  }

  all_array = random_points.concat([current_point]);

  // 0.1秒后绘制
  setTimeout(function () {
    return draw_canvas();
  }, 100);
}();