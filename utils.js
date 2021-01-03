function lerp(start, end, t) {
	return (1-t)*start+t*end;
}
function clamp(val, min, max) {
	return (val <= max ? (val >= min ? val : min) : max);
}
function fastConcat(a,b) {
	let ret = a;
	ret.push(b);
	return ret;
}
class Profiler {
	constructor(description,indentation) {
		this.description=description;
		this.indentation=indentation;
		this.start = window.performance.now();
	}
	finish() {
		this.elapsed = window.performance.now() - this.start;
		console.log("\t".repeat(this.indentation) + "["+this.description+"] Elapsed: "+this.elapsed+"us");
	}
}
function updateSidebar() {
	let sidebarContainerOpenedPercentMax = 15;
	let lerpDirection = options?0:-sidebarContainerOpenedPercentMax;
	sidebarLeftPercent = lerp(sidebarLeftPercent,lerpDirection,0.1);
	sidebarContainerOpened.style = "left:" + sidebarLeftPercent + "%";
	sidebarContainerUnopened.style = "left:" + (sidebarLeftPercent+sidebarContainerOpenedPercentMax) + "%";
	sidebarArrow.style = "left:" + (sidebarLeftPercent+sidebarContainerOpenedPercentMax) + "%";
	sidebarEdge.style = "left:" + (window.innerWidth * (sidebarLeftPercent + sidebarContainerOpenedPercentMax)/100 + 25) + "px";
}

//for future reference the copy format is an array with .h and .w properties
//the array contains cells
function copy(x,y,w,h){
	let ret = [];
	ret.w = w, ret.h = h;
	for(let i = 0; i != alive.length; i++)
		if(alive[i][0] >= x && alive[i][0] <= (x + w) && alive[i][1] >= y && alive[i][1] <= (y + h))
			ret.push([alive[i][0] - x, alive[i][1] - y]);
	return ret;
}

//rotates by a rotation matrix
//note it is technically possible to rotate by things that arent multiples of 90
//and it would still work
function rotate(t,f = [[0,1],[-1,0]]){
	let k = t.w*f[0][0] + t.h*f[0][1], j = t.w*f[1][0] + t.h*f[1][1];
	t.w = k, t.h = j;
	for(let i = 0; i != t.length; i++)
		t[i] = [t[i][0]*f[0][0] + t[i][1]*f[0][1], t[i][0]*f[1][0] + t[i][1]*f[1][1]];
	return t;
}

function paste(x,y,t){
	let nxt = [];
	for(let i = 0; i != t.length; i++)
		nxt.push([t[i][0] + x, t[i][1] + y]);
	for(let i = 0; i != alive.length; i++)
		if(alive[i][0] < x && alive[i][0] > (x + t.w) || alive[i][1] < y || alive[i][1] > (y + t.h))
			nxt.push(alive[i]);
	alive = nxt;
}
