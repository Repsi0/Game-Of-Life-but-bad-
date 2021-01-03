function check(i) {
	let ant = alive[i];
	let turnDirection = -1;
	let alreadyFound = false;
	for(let j = 0; j != nxt.length; j++) {
		let cell = nxt[j];
		if(cell[0] == ant[0] && cell[1] == ant[1] && cell[2] == -ant[2]) {
			if(!alreadyFound) {
				turnDirection = 1;
				nxt = nxt.slice(0,j).concat(nxt.slice(j+1,nxt.length));
				alreadyFound=true;
			} else {
				nxt = nxt.slice(0,j).concat(nxt.slice(j+1,nxt.length));
			}
		}
	}
	if(turnDirection==-1) {
		nxt.push([Math.floor(ant[0]),Math.floor(ant[1]),-ant[2],0]);
	}
	return turnDirection;
}
function moveForward(i,turnDir) {
	let ant = alive[i];
	let x = ant[0], y = ant[1], t = ant[2], d = ant[3];
	let newDir = d+turnDir;
	d = (newDir>3)?0:((newDir<0)?3:newDir);
	switch(d) {
	case 0:
		x++;break;
	case 1:
		y++;break;
	case 2:
		x--;break;
	case 3:
		y--;break;
	}
	for(let j = 0; j != nxt.length; j++) {
		if(nxt[j]==ant) {
			nxt = nxt.slice(0,j).concat(nxt.slice(j+1,nxt.length));
			nxt.push([Math.floor(x),Math.floor(y),t,d]);
			break;
		}
	}
}
function update(){
	for(let tick = 0; tick < 100; tick++) {
		let startTime = new Date().getTime();
		nxt = alive;
		//let updateProfiler = new Profiler("update()",0);
		for(let i = 0; i != alive.length; i++) {
			if(alive[i][2] > 0) {
				//let checkProfiler = new Profiler("check(i)",1);
				let j = check(i);
				//checkProfiler.finish();
				//let moveProfiler = new Profiler("moveForward(i,j)",1);
				moveForward(i,j);
				//moveProfiler.finish();
			}
		}
		//updateProfiler.finish();
		alive=nxt;
		tpsAccurate = 1000 / (new Date().getTime() - startTime);
		tpsAccurate = (tpsAccurate > tps && tps != 0 ? tps : tpsAccurate);
	}
}
