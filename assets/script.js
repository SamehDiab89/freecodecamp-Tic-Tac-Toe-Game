
var turnxo;
var testArrayx = [];
var testArrayo = [];
var testArrayc = [];
var xarray = [];
var oarray = [];
var carray = [];
var xwin = [];
var owin = [];
var cwin = [];
var pwin = [];
var gameArray = [];
var cTestArray = [];
var testAraayCC=[];
var comTArray = [];
var cellId;
var oneplayer = false;
var twoplayer = false;
var computerVS = false;
var com;
var playercom;
var winList = [
	[1, 2, 3], [4, 5, 6], [7, 8, 9],
	[1, 4, 7], [2, 5, 8], [3, 6, 9],
	[1, 5, 9], [3, 5, 7]
]

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

$("#p2").click(function() {
	$(".info").fadeOut();
	twoplayer = true;
	player2();
	$(".game").fadeIn();
})

$("#p1").click(function() {
	$(".info").fadeOut();
	$(".cpu").fadeIn();
})

$("#x").click(function() {
	com = 'O';
	playercom = 'X';
	pwin = xwin;
	oneplayer = true;
})

$("#o").click(function() {
	com = 'X';
	playercom = 'O';
	pwin = owin;
	oneplayer = true;
	setTimeout(cpu, 1500);
})

$(".playcom").click(function() {
	
	$(".cpu").fadeOut();
	comText(com, playercom);
	computerVS = true;
	$(".game").fadeIn();
})


$(".cell").click(function() {
	if(oneplayer && com === 'O' ){
		oneplayer = false;
		
	}

	if(oneplayer && com === 'X' ){
		console.log("computer turn");
		
	} else if (!oneplayer) {
		if(!turnxo || turnxo == 'O'){
			if($(this).hasClass("enter")) {
				console.log("Already Entered")
		} else {
			$(this).text("X");
			$(this).addClass( "enter" );
			cellId = $(this).attr('id');
			testArrayx.push(cellId);
			gameArray.push(cellId/1);
			turnxo = 'X';
			xarray = arrNum(testArrayx);
			if(!computerVS){
				player2();
			}else {
				comText(com, playercom);
			}
			if(xarray.length > 2){
				win(xarray);
			}
			if(win(xarray)){
				xwin.push("X");
				console.log("Player X WIN");
				gameArray = [];
				if(!computerVS){
					$("#player2").text("Player2 WIN");
					$("#player2").addClass( "winturn" );
				} else{
					comText(com, playercom);
				}
				if(twoplayer){
					setTimeout(player2, 2500);
				}
				
				setTimeout(restart, 2500);
			} else {
				check();
			}
			if(!oneplayer && !twoplayer){
				oneplayer = true;
				if(xarray.length > 2 || !win(xarray)){
					setTimeout(cpu, 1500);
				} else {
					setTimeout(restart, 1500);
					setTimeout(cpu, 2500);
				}
				
				
			}
			
		}
		
	} else if (turnxo == 'X') {
			if($(this).hasClass("enter")) {
				console.log("Already Entered")
			} else {
				$(this).text("O");
				$(this).addClass( "enter" );
				cellId = $(this).attr('id');
				testArrayo.push(cellId);
				gameArray.push(cellId/1);
				turnxo = 'O';
				oarray = arrNum(testArrayo);
				if(!computerVS){
					player2();
				}else {
					comText(com, playercom);
				}
				
				if(oarray.length > 2){
					win(oarray);
				}
				if(win(oarray)){
					owin.push("O");
					console.log("Player O WIN");
					gameArray = [];
					if(!computerVS){
						$("#player2").text("Player2 WIN");
						$("#player2").addClass( "winturn" );
					} else{
						comText(com, playercom);
					}
					
					if(twoplayer){
						setTimeout(player2, 2500);
					}
					setTimeout(restart, 2500);
					
				}else{
					check();
				}
				if(!oneplayer && !twoplayer){
					oneplayer = true;
					if(oarray.length > 2 ||!win(oarray)){
						setTimeout(cpu, 1500);
					} else {
						setTimeout(restart, 1500);
						setTimeout(cpu, 2500);
					}
					
				}
				
			}
		}
	}
	
})



$("#restart").click(function() {
	if (confirm("Are You Sure ?") == true) {
	    restartAll();
	    $(".game").fadeOut();
		player2();
		$(".info").fadeIn();
	} else {
	    return false
	}
})

function cpu(){
	console.log("comTURN");
	if(oneplayer && com === 'X'){
		// console.log("comTURN");	
	}
		if(com === 'X'){
			turnxo = 'X';
			comTArray = oarray;
		} else if (com === 'O'){
			turnxo = 'O';
			comTArray = xarray;
		}
			for (var i = 0; i < winList.length; i++) {
				testAraayCC = winList[i].diff(comTArray);
				if(testAraayCC.length === 1 && !(gameArray.includes(testAraayCC[0]))){
					break;
				}
			}
			if(testAraayCC.length === 1 && !(cTestArray.includes(testAraayCC[0]))) {
				cTestArray.push(testAraayCC[0]);
				var comcell = testAraayCC[0];
			} else {
				var arrtest = 0;
				var arrTS = [];
				var arrLs = [];
				var wintc ;
				var comcell;
				for (var i = 0; i < winList.length; i++) {
					var test = 0;
					var xtest = winList[i].diff(carray);
					for (var x = 0; x < winList[i].length; x++) {
						if (xtest.length === 1 && !win(comTArray)) {
							wintc = xtest[0];
							break;
						} else if(arrtest === 0 &&!(gameArray.includes(winList[i][x])) && xtest.length <3){
							arrTS = winList[i];
							arrtest = 1;
							break;
						} else if (!(gameArray.includes(winList[i][x]))) {
							arrLs.push(winList[i]);
						}
					}	
				}
				if(wintc && !(gameArray.includes(wintc))){
					comcell = wintc;
				} else {
					if(arrtest === 1){
						for (var i = 0; i < arrTS.length; i++) {
							if (!(gameArray.includes(arrTS[i]))){
								comcell = arrTS[i];
								break;
							}
						}
					} else{
						for (var i = 0; i < arrLs.length; i++) {
							var t = 0;
							for (var x = 0; i < arrLs[x].length; x++) {
								if (!(gameArray.includes(arrLs[i][x]))){
									comcell = arrLs[i][x];
									t = 1;
									break;
								}
							}
							if(t === 1){
								break;
							}
						}
					}			
				}
			}

			
			testAraayCC = [];
			var comcelltext = "#"+comcell
			$(comcelltext).text(turnxo);
			$(comcelltext).addClass( "enter" );
			testArrayc.push(comcell);
			gameArray.push(comcell/1);
			comText(com, playercom);
			carray.push(comcell);
			if(carray.length > 2){
				win(carray);
			}
			if(win(carray)){
				cwin.push("C");
				gameArray = [];
				comText(com, playercom);
				setTimeout(restart, 2500);
			}else{
				check();
			}

			oneplayer = false;
		
}
	

function player2() {
	var player1 = "Player One (X) : " + xwin.length;
	var player2 = "Player Two (O) : " + owin.length;
	$("#player1").text(player1);
	$("#player2").text(player2);
	if(!turnxo || turnxo == 'O'){
		$("#player2").removeClass("turn");
		$("#player1").addClass("turn");
	} else if (turnxo == 'X') {
		$("#player1").removeClass("turn");
		$("#player2").addClass("turn");
	}
}

function comText(c, p){
	var player1 = "Player One " + "(" +p+") : "+ pwin.length;
	var computer = "Computer " +"(" +c+") : " + cwin.length;
	$("#player1").text(player1);
	$("#player2").text(computer);
	if(oneplayer === true){
		$("#player2").removeClass("turn");
		$("#player1").addClass("turn");
	} else if (oneplayer === false) {
		$("#player1").removeClass("turn");
		$("#player2").addClass("turn");
	}

	if(win(oarray) || win(xarray)){
		$("#player1").text("player1 WIN");
		$("#player1").addClass( "winturn" );
		setTimeout(function(){
			$("#player1").text(player1);
		}, 1500);
	}else if (win(carray)){
		$("#player2").text("The computer defeated you");
		$("#player2").addClass( "winturn" );
		setTimeout(function(){
			$("#player2").text(computer);
		}, 1500)
		
	}
}

function arrNum(arr) {
	var arrayNum = [];
	for (var i = 0; i < arr.length; i++) {
		var x = arr[i]/1
		arrayNum.push(x)
	}
	return arrayNum;
}

function win(arr){
	for (var i = 0; i < winList.length; i++) {
		var x = winList[i].diff(arr);
		if(x.length < 1 && arr.length > 2){
			console.log(turnxo, winList[i]);
			for (var l = 0; l < winList[i].length; l++) {
				var n = "#" + winList[i][l];
				$(n).addClass( "win" );
			}
			$('.cell').addClass( "wingame" );
			return true;
		}
	}
	
}

function restart() {
	$("#player1").removeClass( "winturn" );
	$("#player2").removeClass( "winturn" );
	testArrayx = [];
	testArrayo = [];
	xarray = [];
	oarray = [];
	carray = [];
	gameArray = [];
	cTestArray = [];
	testAraayCC=[];
	comTArray = [];
	cellId = '';
	if(!computerVS){
		player2();
	}
	$('.cell').removeClass( "wingame" );
	$('.cell').removeClass( "enter" );
	$('.cell').removeClass( "win" );
	$('.cell').removeClass( "drow" );
	$('.cell').empty();

}

function restartAll() {
	turnxo = '';
	testArrayx = [];
	testArrayo = [];
	testArrayc = [];
	xarray = [];
	oarray = [];
	carray = [];
	xwin = [];
	owin = [];
	cwin = [];
	gameArray = [];
	cTestArray = [];
	testAraayCC=[];
	comTArray = [];
	oneplayer = false;
	twoplayer = false;
	computerVS = false;
	com = undefined;
	playercom = undefined;
	cellId = '';
	if(!computerVS){
		player2();
	}
	$("#player1").text("Player One (X) : 0");
	$("#player2").text("Player Two (O) : 0");
	$('.cell').removeClass( "wingame" );
	$('.cell').removeClass( "enter" );
	$('.cell').removeClass( "win" );
	$('.cell').empty();
}

function check(){
	if(gameArray.length === 9){
		$("#player1").removeClass("turn");
		$("#player2").removeClass("turn");
		$('.cell').addClass( "drow" );
		$("#player1").text("tough game, it's a draw");
		$("#player2").text("_______________________");
		setTimeout(restart, 2000);
	}

}
 






