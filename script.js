// list of variables for queryselector 

var insBtn=document.querySelector("#ins-btn");
var qNameElement=document.querySelector("#myQuestion");
var lAnsElement=document.querySelector("#answerList");
var startBtn=document.querySelector("#StartBtn");
var qContElement=document.querySelector("#question-container");
var instElement=document.querySelector("#instructions-container");
var timerEl=document.querySelector("#countdown");
var statusEl=document.querySelector("#reStatus");

// variables for the functions like questions and answers moved to the bottom of the script 
var shuffleQuestion, currentIndex
var theAnswer
var myAns
var timeLeft = 120 // declaring this variable as global to deduct time if the answer is wrong initialized to 120 seconds
var Score=0
// my functions //
//



        // if the start button is pressed then unHide the question frame
        // call for the box to be populated  
function startPlaying () { instElement.classList.add("hide") 
                            qContElement.classList.remove("hide")
                            shuffleQuestion=questions.sort(()=>Math.random()-0.5)
                            currentIndex=0
                            myTimer()
                            selectQuestion()

                        }                   

function instructions () {
    qContElement.classList.add ("hide")
    instElement.classList.remove("hide")
                           
                        }

function selectQuestion() {     clearOld()
                                dispQuestion(shuffleQuestion[currentIndex])
                                
                            }

function dispQuestion(question) {   qNameElement.textContent=question.question
                                    question.answers.forEach(answer => {
                                                                        var answerItem=document.createElement("li")
                                                                        myAns=document.createElement("a")
                                                                        myAns.setAttribute('href',"#")
                                                                        myAns.textContent=answer.text
                                                                        answerItem.appendChild(myAns)
                                                                        // place holder space to insert a class
                                                                        
                                                                        // Check if the answer is correct 
                                                                        if(answer.correct){
                                                                                            myAns.dataset.correct=answer.correct
                                                                                            }
                                                                        // adding eventListener to our answers
                                                                        myAns.addEventListener("click",selectAnswer)
                                                                        lAnsElement.appendChild(answerItem)
                                                                     })  
                                }
// get the answer and compare if this is correct, or wrong , then execute action accordingly                                 
function selectAnswer(x) {
    theAnswer=x.target
    var anStatus=theAnswer.dataset.correct
    console.log(anStatus)
    if (anStatus){
        statusEl.textContent = "Correct Answer !";
        Score=Score+25
    }
    else {
        statusEl.textContent = "Wrong ... !";
        timeLeft=timeLeft-10
    }
    nextQ()
       
}



function gradeNSto(){  instElement.classList.add("hide") 
qContElement.classList.add("hide") 
    alert("your score is "+Score)
                        }

//function to clear all original information from the card on the HTML so the new answers can be populated 
function clearOld() { while (lAnsElement.firstChild) {
                                                        lAnsElement.removeChild
                                                        (lAnsElement.firstChild)
                                                     }
                    }
 
function myTimer() {
                        var timeInterval = setInterval(function() {
                        timerEl.textContent = timeLeft + " seconds remaining";
                        timeLeft--;
                            if (timeLeft === 0) {
                            timerEl.textContent = "";
                            gradeNSto()
                            clearInterval(timeInterval);
                        }
                    
                        }, 1000);
                    }
  
 
 
 
    // Check if we have more questions, 


 // if current index.length < current index +1 then look for next question , else game over 
function nextQ() {  currentIndex++                     
                            if (shuffleQuestion.length > currentIndex) {
                                                                             selectQuestion()
                                                                        } 
                                                                        else { 
                                                                                gradeNSto()
                                                                         }
                        }
/// My events 

//1.- event to display instructions
insBtn.addEventListener("click",instructions);
startBtn.addEventListener("click",startPlaying);



// questions and answers arrays
var questions=[
                { question: "Choose the correct syntax for the external script ''register.js''",
                    answers: [
                                {text:" <script type='text/javascript'' name=''register.js''></script>", correct: false},
                                {text:" <script type='text/javascript'' href=''register.js''></script>", correct: false},
                                {text:"<script type=''text/javascript'' src=''register.js''></script>   ", correct: true},
                                {text:"<link type=''text/javascript'' href=''register.js''></link>", correct: false},
                            ]                            
                },
                { question: "Inside which HTML element do we put the JavaScript?    ",
                answers: [
                            {text:"<script>", correct: true},
                            {text:"<js>", correct: false},
                            {text:"<javascript>", correct: false},
                            {text:"<scripting>", correct: false},
                        ]                            
                },
                { question: "The external JavaScript file must contain the <script> tag",
                        answers: [
                                    {text:"No.", correct: true},
                                    {text:"Yes.", correct: false},
                                    {text:" Yes and Must be specified at the end of the Script", correct: false},
                                    {text:"Yes and  Must be specified at the beginning of the Script", correct: false},
                                ]                            
                },
                { question: "Where is the correct place to insert a JavaScript?",
                answers: [
                            {text:"The <head> section" , correct: false},
                            {text:"Both the <head> section and the <body> section are correct", correct: true},
                            {text:"the<header> section", correct: false},
                            {text:"The <body> section", correct: false},
                        ]                            
                 },
            ];