var todo = document.getElementById('todo');
var done = document.getElementById('done');
var display = document.getElementById('display');

var list1 = document.getElementById('todolist'),
	list2 = document.getElementById('donelist'),
	list3 = document.getElementById('content');

var badge1 = document.getElementById('badge1'),
	badge2 = document.getElementById('badge2'),
	badge3 = document.getElementById('badge3');

function count() {
	var num1 = list1.getElementsByTagName('div').length;
	var num2 = list2.getElementsByTagName('div').length;
	var num3 = list3.getElementsByTagName('div').length;
	badge1.innerText = num1;
	badge2.innerText = num2;
	badge3.innerText = num3;
}

count();

// function loadAll() {
// 	if(typeof(Storage) !== "undefined") {
// 		if(localStorage.length > 0) {
// 			for(let i=0; i<localStorage.length; i++) {
// 				console.log(localStorage.key(i));
// 				var key = localStorage.key(i);
// 				if(key.slice(0,4) == "todo") {
// 					var str1 = localStorage.getItem(key);
// 					var data1 = JSON.parse(str1);
// 					console.log("data1: " + data1.value1 + " " + data1.value2 + " " + data1.value3)
// 					add(data1.value1,data1.value2,data1.value3);
// 				} else {
// 					var str2 = localStorage.getItem(key);
// 					var data2 = JSON.parse(str2);
// 					console.log("data2: " + data2.value1 + " " + data2.value2 + " " + data2.value3)
// 					add(data2.value1,data2.value2,data2.value3,true);
// 				}
// 			}
// 		count();
// 		}
// 	}
// }

function loadAll() {
	if(typeof(Storage) !== "undefined") {
		if(localStorage.length > 0) {
			var array1 = [];
			var array2 = [];
			for(let i=0; i<localStorage.length; i++) {
				if(localStorage.key(i).slice(0,4) == "todo") {
					var str1 = localStorage.getItem(localStorage.key(i));
					var data1 = JSON.parse(str1);
					array1.push(data1);
				} else {
					var str2 = localStorage.getItem(localStorage.key(i));
					var data2 = JSON.parse(str2);
					array2.push(data2);
				}
			}

			// 排序
			for(var j=0;j<array1.length-1;j++){
		       for(var i=0;i<array1.length-1-j;i++){
		       		var x = array1[i].key.slice(8,array1[i].length);
		       		var y = array1[i+1].key.slice(8,array1[i+1].length);
		            if(Number(x)<Number(y)) {
		                var temp = array1[i];
		                array1[i] = array1[i+1];
		                array1[i+1] = temp;
		            }
		        } 
		    }

			console.log(array1);

			// 排序
			for(var j1=0;j1<array2.length-1;j1++){
		       for(var i1=0;i1<array2.length-1-j1;i1++){
		       		var x1 = array2[i1].key.slice(8,array2[i1].length);
		       		var y1 = array2[i1+1].key.slice(8,array2[i1+1].length);
		            if(Number(x1)<Number(y1)){
		                var temp1 = array2[i1];
		                array2[i1] = array2[i1+1];
		                array2[i1+1] = temp1;
		            }
		        } 
		    }

			console.log(array2);

			for(let i=0; i<array1.length; i++) {
				add(array1[i].value1,array1[i].value2,array1[i].value3);
			}

			for(let i=0; i<array2.length; i++) {
				add(array2[i].value1,array2[i].value2,array2[i].value3,true);
			}
		count();
		}
	}
}

loadAll();

function changeBorder1(change) {
	change.style.borderColor = "#CCCC33";
}

function changeBorder2(change) {
	change.style.borderColor = "#ccc";
}

var search = document.getElementById('search');

function changeBorder3() {  // 改变的不是当前元素所以需要另外写
	search.style.borderColor = "#CCCC33";
	if(todo.style.display != "none") {  // todo 页面
		todo.style.display = "none";
		display.style.display = "block";
	} else {  // done 页面
		done.style.display = "none";
		display.style.display = "block";
	}
}

function changeBorder4() {
	search.style.borderColor = "#ccc";
	if(list3.getElementsByTagName('div').length === 0) {
		close1();
	}
}

function changeColor1(change) {
	change.style.color = "white";
}

function changeColor2(change) {
	change.style.color = "#636261";
}

function changeImage1(change) {
	change.src = "search2.png";
}

function changeImage2(change) {
	change.src = "search1.png";
}

function toggle() {
	if(todo.style.display=="none") {
		todo.style.display = "block";
		done.style.display = "none";
	} else {
		todo.style.display = "none";
		done.style.display = "block";
	}
}

function close1() {  // 不能用 close 作为函数名，关闭
	document.getElementById('search').getElementsByTagName('input')[0].value = "";
	list3.innerHTML = "";
	count();
	todo.style.display = "block";
	display.style.display = "none";
}

function add(a,b,c,yz) {
	if(yz!='display1' && yz!='display2') {
		if(todo.style.display=="none") {  // 如果在 done 页面则自动返回 todo 页面
			todo.style.display = "block";
			done.style.display = "none";
		}
	}

	if(yz!='display1' && yz!='display2') {
		close1();  // 页面跳转
	}

	var div = document.createElement('div'),
		ip1 = document.createElement('input'),  // 是否完成按钮
		ip2 = document.createElement('input'),  // 输入框
		ip3 = document.createElement('input'),  // 删除按钮
		ip4 = document.createElement('span');  // 时间

	div.setAttribute('class','div');

	ip1.setAttribute('type', 'button');
	ip1.setAttribute('class', 'ip1');
	ip1.style.backgroundColor = getRandomColor();
	if(typeof(a) !== "undefined") {
		ip1.style.backgroundColor = a;
	}

	ip2.setAttribute('type', 'text');
	ip2.setAttribute('class','ip2');
	ip2.style.border = "2px solid #CCCC33";
	if(typeof(b) !== "undefined") {
		ip2.value = b;
		ip2.style.border = "2px solid white"
	}

	if(yz=='display1' || yz=='display2') {
		ip2.setAttribute('readonly','readonly');
		ip2.style.cursor = 'pointer';
	}

	ip3.setAttribute('type', 'button');
	ip3.setAttribute('class','ip3');
	ip3.setAttribute('value','×');

	ip4.setAttribute('class', 'ip4');
	var time = new Date();
	var y = time.getFullYear();
	var m = time.getMonth() + 1;
	var d = time.getDate();
	var d1 = time.getDay();
	var h = time.getHours();
    var m1 = time.getMinutes();
    var s = time.getSeconds();
    h = checkTime(h);
    m1 = checkTime(m1);
    s = checkTime(s);
	var arr = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
	if(typeof(c) !== "undefined") {
		ip4.innerText = c;
	} else {
		ip4.innerText = y + "年 " + m + "月" + d + "日 " + arr[d1] + " " + h + ":" + m1 + ":" + s;
	}
	
	div.appendChild(ip1);
	div.appendChild(ip2);
	div.appendChild(ip4);
	div.appendChild(ip3);
	if(yz=='display1' || yz=='display2') {
		div.style.cursor = "pointer";
		list3.appendChild(div);
	} else {
		var fc = list1.firstChild;  // 始终在第一行添加
		list1.insertBefore(div, fc);
	}

	if(typeof(a) === "undefined") {
		ip2.tabIndex = -1;  // 自动获得焦点
		ip2.focus();
	}

	if(yz === true) {
		ip1.style.backgroundColor = "#d7d7d7";
		ip1.setAttribute('value', '√');
		var dfc = list2.firstChild;  // 始终在第一行添加
		list2.insertBefore(div, dfc);
	}

	if(yz!='display1' && yz!='display2') {
		myFunction1(ip1, div);
		myFunction2(ip2);
		myFunction3(ip3, div);
	} else {
		myFunction4(div,yz);
	}
}

function getRandomColor() {
	var c1 = getRandom(0, 255);
	var c2 = getRandom(0, 255);
	var c3 = getRandom(0, 255);
	return 'rgb(' + c1 + ', ' + c2 + ', ' + c3 + ')';
}

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkTime(i) {
	if(i<10) {
		i = "0" + i;
	}
	return i;
}

// ip1 监听
function myFunction1(ip1, div) {
	ip1.addEventListener('click', function () {
		if (div.parentNode.id=="todolist") {  // 该 div 的父节点是什么，而不是父节点有什么子节点
			ip1.style.backgroundColor = "#d7d7d7";
			ip1.setAttribute('value', '√');
			var dfc = list2.firstChild;  // 始终在第一行添加
			list2.insertBefore(div, dfc);
		} else {
			ip1.style.backgroundColor = getRandomColor();
			ip1.setAttribute('value', '');
			var fc = list1.firstChild;  // 始终在第一行添加
			list1.insertBefore(div, fc);
			
		}
		count();
	});
}

// ip2 监听
function myFunction2(ip2) {
	ip2.addEventListener('blur', function () {
		var iv = ip2.value;
		iv = iv.replace(/(^\s*)|(\s*$)/g, '');  // 将开头和结尾的空白字符去除
		if(iv=="" || iv==null || iv==undefined) {
			list1.removeChild(ip2.parentNode);  // 注意要删除的是哪个节点
		} else {
			ip2.style.borderColor = "white";
			// 焦点回到开头位置
			ip2.value = iv;  // Firefox
			ip2.scrollLeft = 0;  // IE
			count();
		}
	});

	ip2.addEventListener('focus', function () {
		ip2.style.borderColor = "#CCCC33";
	});

	ip2.addEventListener('keydown', function () {  // 回车失去焦点
		if(window.event.keyCode == 13) {
			ip2.blur();
		}
	})
}

// ip3 监听
function myFunction3(ip3, div) {
	ip3.addEventListener('click', function () {
		if (div.parentNode.id == "todolist") {
			list1.removeChild(div);
		} else {
			list2.removeChild(div);
		}
		count();
	});
}

function myFunction4(div,yz) {
	div.addEventListener('click', function () {
		document.getElementById('search').getElementsByTagName('input')[0].value = "";
		list3.innerHTML = "";
		count();
		if(yz == 'display1') {
			var value1 = div.getElementsByTagName('input')[1].value;
			todo.style.display = "block";
			display.style.display = "none";
			for(let i=0; i<list1.getElementsByTagName('div').length; i++) {
				if(list1.getElementsByTagName('div')[i].getElementsByTagName('input')[1].value == value1) {
					list1.getElementsByTagName('div')[i].getElementsByTagName('input')[1].tabIndex = -1;
					list1.getElementsByTagName('div')[i].getElementsByTagName('input')[1].focus();
				}
			}
		} else {
			var value2 = div.getElementsByTagName('input')[1].value;
			done.style.display = "block";
			display.style.display = "none";
			for(let i=0; i<list2.getElementsByTagName('div').length; i++) {
				if(list2.getElementsByTagName('div')[i].getElementsByTagName('input')[1].value == value2) {
					list2.getElementsByTagName('div')[i].getElementsByTagName('input')[1].tabIndex = -1;
					list2.getElementsByTagName('div')[i].getElementsByTagName('input')[1].focus();
				}
			}
		}
	});
}

// 在刷新和退出时保存
window.onbeforeunload= (e)=>{
	e = e || window.event;
	// if (e) {
	// 	e.returnValue = '保存成功';
	// }

	this.save();  //调用自己的方法

	// Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
	// return '保存成功';
};

function save() {
	// close1();
	if(typeof(Storage !== "undefiend")) {
		localStorage.clear();
		var todolist = document.getElementById('todolist');
		var donelist = document.getElementById('donelist');
		var div1 = todolist.getElementsByTagName('div');
		var div2 = donelist.getElementsByTagName('div');

		for(var i=0; i<div1.length; i++) {
			var data = new Object;
			data.key = "todolist" + i;
			data.value1 = div1[i].getElementsByTagName('input')[0].style.backgroundColor;
			data.value2 = div1[i].getElementsByTagName('input')[1].value;
			data.value3 = div1[i].getElementsByTagName('span')[0].innerText;
			var str = JSON.stringify(data);
			localStorage.setItem(data.key, str);
		}

		if(i === div1.length) {  // 储存完 todo 后再存 done
			for(let j=0; j<div2.length; j++) {
				var data = new Object;
				data.key = "donelist" + j;
				data.value1 = div2[j].getElementsByTagName('input')[0].style.backgroundColor;
				data.value2 = div2[j].getElementsByTagName('input')[1].value;
				data.value3 = div2[j].getElementsByTagName('span')[0].innerText;
				var str = JSON.stringify(data);
				localStorage.setItem(data.key, str)
			}
		}
	}
}

function find() {
	// console.log(list3.getElementsByTagName('div').length);
	// console.log(list3.getElementsByTagName('div')[2]);
	// var len = list3.getElementsByTagName('div').length;  // 不要每次循环都 length
	// for(let i=0; i<len; i++) {
	// 	list3.removeChild(list3.getElementsByClass('.div')[i]);  // 清除
	// }

	list3.innerHTML = "";

	count();

	var val = document.getElementById('search').getElementsByTagName('input')[0].value;
	val = val.replace(/(^\s*)|(\s*$)/g, '');  // 将开头和结尾的空白字符去除
	if(val !== "") {
		for(let i=0; i<list1.getElementsByTagName('div').length; i++) {
			if(list1.getElementsByTagName('div')[i].getElementsByTagName('input')[1].value.indexOf(val) != -1) {  // 找到，把 0 打成 O ??
				add(list1.getElementsByTagName('div')[i].getElementsByTagName('input')[0].style.backgroundColor,list1.getElementsByTagName('div')[i].getElementsByTagName('input')[1].value,list1.getElementsByTagName('div')[i].getElementsByTagName('span')[0].innerText,'display1');
				count();
			}
		}

		for(let i=0; i<list2.getElementsByTagName('div').length; i++) {
			if(list2.getElementsByTagName('div')[i].getElementsByTagName('input')[1].value.indexOf(val) != -1) {  // 找到，把 0 打成 O ??
				add(list2.getElementsByTagName('div')[i].getElementsByTagName('input')[0].style.backgroundColor,list2.getElementsByTagName('div')[i].getElementsByTagName('input')[1].value,list2.getElementsByTagName('div')[i].getElementsByTagName('span')[0].innerText,'display2');
				count();
			}
		}
	}
}

// 设置 visibility: 'hidden'; span 数据无法获取