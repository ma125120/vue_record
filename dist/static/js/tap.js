var MyTap = {};
var clearEvent = function(e) {
	e.stopPropagation();
	e.preventDefault();
}
MyTap.install = function (Vue, options) {
  // 2. 添加全局资源
  Vue.directive('tap', {
    bind (el, binding, vnode, oldVnode) {
    	let x1, x2, y1, y2, time1, time2;
      el.addEventListener("touchstart",function(e) {
      	time1=Date.now();
      	x1=e.touches[0].pageX;
      	y1=e.touches[0].pageY;
      });
      el.addEventListener("touchend",function(e) {
      	time2 = Date.now();
      	if(time2 - time1 > 10) {
      		x2 = e.changedTouches[0].pageX;
      		y2=e.changedTouches[0].pageY;
      		var x=Math.abs(x1-x2),
      				y=Math.abs(y1-y2);
      		(x <= 30 && y <= 30) && binding.value();
      	}
      });
    }
  });
  Vue.directive('swipeLeft', {
    bind (el, binding, vnode, oldVnode) {
    	var startTime , endTime, x, x1, x2;
			el.addEventListener('touchstart', function(e) {
				startTime=Date.now();
				x1=e.touches[0].pageX;
			},false);
			el.addEventListener('touchend', function(e) {
				endTime=Date.now();
				if(endTime-startTime>=30) {
					x2=e.changedTouches[0].pageX;
					if(x1-x2>30) {
						binding.value();
					}
				}
			},false);
    }
  });
  Vue.directive('swipeRight', {
    bind (el, binding, vnode, oldVnode) {
    	var startTime,endTime,x,x1,x2;
			el.addEventListener('touchstart',function(e) {
				startTime=Date.now();
				x1=e.touches[0].pageX;
			},false);
			el.addEventListener('touchend', function(e) {
				endTime=Date.now();
				if(endTime-startTime>=30) {
					x2=e.changedTouches[0].pageX;
					if(x2-x1>30) {
						binding.value();
					}
				}
			},false);
    }
  });
  Vue.directive('swipeUp', {
    bind (el, binding, vnode, oldVnode) {
    	var startTime,endTime,y,y1,y2;
			el.addEventListener('touchstart',function(e) {
				startTime=Date.now();
				y1=e.touches[0].pageY;
			},false);
			el.addEventListener('touchend', function(e) {
				endTime=Date.now();
				if(endTime-startTime>=30) {
					y2=e.changedTouches[0].pageY;
					if(y1-y2>30) {
						binding.value();
					}
				}
			},false);
    }
  });
  Vue.directive('swipeDown', {
    bind (el, binding, vnode, oldVnode) {
    	var startTime,endTime,y,y1,y2;
			el.addEventListener('touchstart',function(e) {
				startTime=Date.now();
				y1=e.touches[0].pageY;
			},false);
			el.addEventListener('touchend', function(e) {
				endTime=Date.now();
				if(endTime-startTime>=30) {
					y2=e.changedTouches[0].pageY;
					if(y1-y2>30) {
						binding.value();
					}
				}
			},false);
    }
  });
}
export default  MyTap