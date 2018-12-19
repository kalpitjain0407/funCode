$(document).ready(function(){
  $("#board,#Xwon,#Owon,#draw,#reset").hide();
  $(".score,.row").hide();
  var humanPlayer;
  var compPlayer;

  var choice1=[1,'X',0];
  var choice2=[2,'O',0];

  var winCombination = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
  ];

  var boardArr=["#","#","#","#","#","#","#","#","#" ];

  var current;
  var firstTurn;
  var gameWon=false;
  var turnCount=0;

  humanPlayer=choice1;
  compPlayer=choice2;

 $(".btn").click(function(){
    $("#board,#reset").show();
    $(".score,.row").show();
    $("#start").hide();
 });
 
/*Change cursor on pointing to empty cell at human chance*/

 $("td").hover(function(){
    humanPlayer=choice1;
    compPlayer=choice2;
    var position=$(this).attr("id");
    if(boardArr[position]==="#"){
      $(this).css('cursor','pointer');
    }
 });

 /*human clicking empty tile*/

 $("td").click(function(){
    humanPlayer=choice1;
    compPlayer=choice2;
    var tile=$(this).attr("id");
    if(boardArr[tile]==="#" && turnCount % 2===0){
      humanTurn(tile);
    }else if(boardArr[tile]==="#" && turnCount % 2!==0){
      compTurn(tile);
    }
 });

function compTurn(tile){
  var current=compPlayer;
  $('#'+tile).html(compPlayer[1]);
  boardArr[tile]=compPlayer[1];
  checkWin(current);
  if(gameWon===1 || gameWon===2){
    $("#Owon").fadeIn(1000);
    $("#Owon").fadeOut(1000);
    $("#reset").hide();
    winReset(compPlayer);
  }else {
      turnCount=turnCount+1;
      checkDraw();
    }
};

function humanTurn(tile){
    current=humanPlayer;
    $('#'+tile).html(humanPlayer[1]);
    boardArr[tile]=humanPlayer[1];
    checkWin(current);
    if(gameWon===1 || gameWon===2){
      $("#Xwon").fadeIn(1000);
      $("#Xwon").fadeOut(1000);
      $("#reset").hide();
      winReset(humanPlayer);
    }else {
      turnCount=turnCount + 1;
      checkDraw();
    }
};

/*Checking for winning combination*/

function checkWin(curr){
    var currentTiles=[];
    for(let i=0; i<boardArr.length; i++){
      if(boardArr[i]===curr[1]){
        currentTiles.push(i);
      }
    }
    for(let x=0; x<winCombination.length; x++){
      var count=0;
      for(let j=0; j<winCombination[x].length; j++){
        if(currentTiles.indexOf(winCombination[x][j])!=-1){
          count=count + 1;
        }
        if(count==3){
          gameWon=current[0]; 
        } 
      }
    }
  };

/*Reset board after game*/

function winReset(winner){
    winner[2]=winner[2] + 1;
    $('#scores').html('X: '+choice1[2]+' <br>O: '+choice2[2]);
    turnCount=0;
    $('td').html('');
    boardArr=["#", "#", "#", "#", "#", "#", "#", "#", "#"];
    let current=humanPlayer;
    gameWon=false;
    $("#reset").show();
  };

function checkDraw(){
    if(turnCount>8){
      $('#draw').fadeIn(1000);
      $('#draw').fadeOut(1000);
      $('td').html('');
      boardArr=["#", "#", "#", "#", "#", "#", "#", "#", "#"];
      if(humanPlayer===choice1){
        current=humanPlayer;
      }else{
        current=compPlayer;
      }
      turnCount=0;
    }
  };

$('#reset').click(function(){
    $('td').html('');
    boardArr = ["#", "#", "#", "#", "#", "#", "#", "#", "#"];
    gameWon = false;
    turnCount = 0;
  });
});