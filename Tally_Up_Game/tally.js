const gamestart = document.getElementById("gamestart");
const gmae = document.getElementById("game");
const lbox = document.getElementById("lbox");
const rbox = document.getElementById("rbox");
const choiceA = document.getElementById("G");
const choiceB = document.getElementById("E");
const choiceC = document.getElementById("L");
const counter = document.getElementById("counter");
const barwidth = document.getElementById("barwidth");
const result = document.getElementById("result");
const scoreper = document.getElementById("scoreper");
var aa=document.getElementById("a")
var bb=document.getElementById("b")
var cc=document.getElementById("c")
var dd=document.getElementById("d")
var ee=document.getElementById("e")
var ff=document.getElementById("f")
var gg=document.getElementById("g")
var hh=document.getElementById("h")


//Generation random number
var a,b,c,d,answers=[];
function randnum(){
    
    a=Math.floor(Math.random() * 9)+1;
    b=Math.floor(Math.random() * 9)+1;
    if(score>=5){
    c=Math.floor(Math.random() * 9)+1;
    d=Math.floor(Math.random() * 9)+1;
    return a+b+c+d;
    }
    else return a*b;
    
   
}


// create some variables

var totalquestions = 9;
let runningQuestion = 0;
let count = 0;
var questionTime = 10; // 10s
var gaugeWidth = 150; // 150px
var gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;
//adding audio files

var CorrectAudio= new Audio('Tally_Up_Game/sounds/correct.mp3');
var WrongAudio=new Audio('Tally_Up_Game/sounds/Wrong.mp3');
var gameover=new Audio('Tally_Up_Game/sounds/win.mp3');



function showQuestion(){
    let l =randnum(); 
        
        aa.innerHTML=a;
        bb.innerHTML=b;
        if(score>=5){
            spacel.style.display = "none";
            spacer.style.display = "none";
            cc.innerHTML=c;
            dd.innerHTML=d;
            questionTime=5;
            gaugeUnit=30;
        }
        
    
    let r =randnum(); 
    
    ee.innerHTML=a;
    ff.innerHTML=b;
    if(score>=5){

    gg.innerHTML=c;
    hh.innerHTML=d;
    }
    

    if(l>r)
    answers.push(">");
    else if(l==r)
        answers.push("=");
    else
        answers.push("<");    
    
        

        console.log(answers[runningQuestion]);
    
    choiceA.innerHTML = ">";
    choiceB.innerHTML = "=";
    choiceC.innerHTML = "<";
    
    
}


gamestart.addEventListener("click",startgame);

// Start game function

function startgame(){
    gamestart.style.display = "none";
    instructions.style.display="none";
    showQuestion();
    game.style.display = "block";
    answercircle();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1s
    
}



// generate circle for answer to display answer 
function answercircle(){
    for(let i = 0; i <= totalquestions; i++){
        result.innerHTML += "<div class='circle' id="+ i +"></div>";
    }
}

// counter render
///////
function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        barwidth.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to pink for not etemted question
        
        NotEtempted();
        if(runningQuestion < totalquestions){
            runningQuestion++;
            showQuestion();
        }else{
            // end the game and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == answers[runningQuestion]){
        
        score++;
        
        answerIsCorrect();  
    }
    else{
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < totalquestions){
        runningQuestion++;
        showQuestion();
    }else{
        
        clearInterval(TIMER);
        
            scoreRender();
        
        
    }
}


// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
    CorrectAudio.play();
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "blue";
   WrongAudio.play();
   
}
function NotEtempted(){
    document.getElementById(runningQuestion).style.backgroundColor = "pink";
   WrongAudio.play();
   
}

// score render
function scoreRender(){
    game.style.display = "none";
    scoreper.style.display = "block";
    replay.style.display="block";
    
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/10);
    
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "Tally_Up_Game/img/5.png" :
              (scorePerCent >= 60) ? "Tally_Up_Game/img/4.png" :
              (scorePerCent >= 40) ? "Tally_Up_Game/img/3.png" :
              (scorePerCent >= 20) ? "Tally_Up_Game/img/2.png" :
              "Tally_Up_Game/img/1.png";
    
    scoreper.innerHTML = "<img src="+ img +">";
    scoreper.innerHTML += "<p>"+ scorePerCent +"%</p>";
    gameover.play();
    
}
//Replay Game
replay.addEventListener("click",function(){
    location.reload();
})


