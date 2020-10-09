
//                Code Quiz - Script by Rodolfo Diaz
//
//                          Table of contents:
//              0.- All querySelectors and Global variables.  
//              1.- When the Page loads. 
//              2.- Events.  
//              3.- Functions within the quiz flow.   
//              4.- How this script ends   
//              5.- Support functions                 
//                      5.1.- Clear previews values dynamically   
//                      5.2.- Memory management with localStorage and JSON  
//              6.- All querySelectors and Global variables  
//

// 0.- list of variables for queryselector 
var insBtn=document.querySelector("#ins-btn")
var qNameElement=document.querySelector("#myQuestion")
var lAnsElement=document.querySelector("#answerList")
var startBtn=document.querySelector("#StartBtn")
var qContElement=document.querySelector("#question-container")
var instElement=document.querySelector("#instructions-container")
var timerEl=document.querySelector("#countdown")
var statusEl=document.querySelector("#reStatus")
var scoreEl=document.querySelector("#myScore")
var scoreDiv=document.querySelector("#score-container")
var userEl=document.querySelector("#userName")
var addUser=document.querySelector("#addName")
var boardEl=document.querySelector("#hiScore")
var leBoard=document.querySelector("#board-container")
var scoreList=document.querySelector("#theTopOnes")

// variables for the functions like questions and answers moved to the bottom of the script 
var shuffleQuestion, currentIndex,theAnswer,myAns,timeInterval 
var timeLeft = 120 // declaring this variable as global to deduct time if the answer is wrong initialized to 120 seconds
var Score=0
var highScores,leadBoard=[]

//   **********************  My Magic starts HERE!! ******************************

/// 1.- when the page loads then we clear existing localStorage --- this function will be disabled by default; if we want to e
// localStorage.clear() 

///                          2. My events 

//2.1- event to display instructions
insBtn.addEventListener("click",instructions)
//2.2.- To start the quiz
startBtn.addEventListener("click",startPlaying)
//2.3.- LeaderBoard 
boardEl.addEventListener("click",leadersBoard)

//  3.                          my functions

// 3.1 if the start button is pressed then unHide the question frame
        // call for the box to be populated  
function startPlaying () {    leBoard.classList.add("hide")
                            instElement.classList.add("hide") 
                           qContElement.classList.remove("hide")
                           timerEl.classList.remove("hide") 
                           statusEl.classList.remove("hide") 
                          // this method is to shuffle the questions so they don't have the same order every time the quiz starts 
                            shuffleQuestion=questions.sort(()=>Math.random()-0.5)
                            currentIndex=0
                            myTimer()
                            selectQuestion()
                        }  
// 3.2 If the instructions are selected we hide the questions and display the instructions
function instructions () {
                        leBoard.classList.add("hide")
                        qContElement.classList.add ("hide")
                        instElement.classList.remove("hide")
                           
                        }
// 3.3.- from 3.1 if the start quiz button is pressed we start our timer --- timer format debugged during bootCamp class activity 
function myTimer() {
                            timeInterval = setInterval(function() {
                              timerEl.textContent = timeLeft + " seconds remaining"
                              timeLeft--
                                  if (timeLeft === 0) {
                                  timerEl.classList.remove("badge-warning")    
                                  timerEl.classList.add("badge-danger")    
                                  timerEl.textContent = "Time's Up!"
                                  clearInterval(timeInterval)
                                  gradeNSto()
                                  
                              }
                          
                              }, 1000);
                          }
// 3.4 .- From 3.1 this function will kickoff our question display,, 
/// clear the template and then call the displayQuestion function 
function selectQuestion() {     clearOld()
                                dispQuestion(shuffleQuestion[currentIndex])
                                
                            }
//3.5 .- this function is to display the questions and possible answers contained on the array 
// with the current index question, display the name on a card tittle   and create a list with anchors for each of the answers
// appendChild the anchor to the list item and then appendChild the list item to the ordered list 
function dispQuestion(question) {   qNameElement.textContent=question.question
                                    question.answers.forEach(answer => {
                                                                        answerItem=document.createElement("li")
                                                                        myAns=document.createElement("a")
                                                                        myAns.classList.add("anchor")
                                                                        myAns.setAttribute('href',"#")
                                                                        myAns.textContent=answer.text
                                                                        answerItem.appendChild(myAns)
                                                                        // Check if the correct property is true, if so, then assign it to the answer  
                                                                        if(answer.correct){
                                                                                            myAns.dataset.correct=answer.correct
                                                                                            }
                                                                        // adding eventListener to our answers
                                                                        myAns.addEventListener("click",selectAnswer)
                                                                        lAnsElement.appendChild(answerItem)
                                                                     })  
                                }
// 3.6.- Get the answer and compare if this is correct, or wrong , then execute action accordingly                                 
function selectAnswer(x) {
                            theAnswer=x.target
                            anStatus=theAnswer.dataset.correct
                            if (anStatus){
                                statusEl.textContent = "Correct Answer !";
                                Score=timeLeft
                                        }
                                        else {
                                            statusEl.textContent = "Wrong ... !";
                                            timeLeft=timeLeft-10
                                        }
                                        nextQ()
       
                        }
// 3.7  Check if we have more questions, 
 // if current index.length < current index +1 then look for next question , else game over 
 function nextQ() {  leBoard.classList.add("hide")
     currentIndex++                     
    if (shuffleQuestion.length > currentIndex) {
                                                     selectQuestion()
                                                } 
                                                else { 
                                                    clearInterval(timeInterval) // stop the clock and call the function to report results
                                                        gradeNSto()
                                                 }
                                                }
// 3.8 when the game is over, 
// hide the current elements and then present the form for the score and name 
function gradeNSto(){  instElement.classList.add("hide") 
                        qContElement.classList.add("hide")
                        timerEl.classList.add("hide") 
                        statusEl.classList.add("hide")  
                        leBoard.classList.add("hide")
                        scoreDiv.classList.remove("hide")
                        scoreEl.textContent=Score
                        
                        }

//                                                  4.   End of Script 
// add an event listener for the submit score button and call to write the results on the memory  
addUser.addEventListener("click",writeMem)

//   =================   5.-  Support Functions ==========================

function leadersBoard() { totalScore=localStorage.getItem("Totals")
                        leadBoard=JSON.parse(totalScore)
                       
                        if (leadBoard===null){
                            alert("Welcome, you are the first player.    No historic scores found for this Quiz")
                        }
                        // we need to sort the array leadBoard by score highest to the lowest
                        leadBoard.sort(function (a,b) {
                            return b.score - a.score                    
                        })
                        // then we proceed to populate the table with the top three 
                             for(i=0;i<3;i++){
                                console.log(leadBoard[i].name)
                             }
                        
                        

                        leBoard.classList.remove("hide")
                        
}

//function to clear all original information from the card on the HTML so the new answers can be populated 
function clearOld() { while (lAnsElement.firstChild) {
                                                        lAnsElement.removeChild
                                                        (lAnsElement.firstChild)
                                                     }
                    }
 
// this function writes into the localStorage using JSON -- i tried to pseudocode inside the function since it's complex  
function writeMem(event) {
                                                event.preventDefault()
                                                //taking the initials from the input form     
                                              initials=userEl.value
                        
                                //preparing my user object for JSON 
                                highScores={name: initials, score: Score}
                                //checking if the localStorage is empty 
                                totalScore=localStorage.getItem("Totals")
                                // if there localStorage is empty then log the array higScores
                                if (totalScore===null) {localStorage.setItem("Totals",JSON.stringify([highScores]))}
                                                    //if there is existing data on the localStorage then set new submission 
                                else {                    leadBoard=JSON.parse(totalScore)
                                                        /// adding the new score to the leadBoard
                                                        leadBoard.push(highScores)
                                                    //    set the new values on the local storage 
                                                    localStorage.setItem("Totals",JSON.stringify(leadBoard))
                                                    console.log(localStorage)                                       
                                            }
                                scoreDiv.classList.add("hide")
                            // end of script 
                    }

//    =========  6.-  Array for Questions and Answers  ==========================
var questions=[
                { question: "Select the correct syntax for the external register.js",
                    answers: [
                                {text:" <script type='text/javascript'' name=''register.js''></script>", correct: false},
                                {text:" <script type='text/javascript'' href=''register.js''></script>", correct: false},
                                {text:"<script type=''text/javascript'' src=''register.js''></script>", correct: true},
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