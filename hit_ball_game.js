const boardHeight = 500 
const boardWidth = 700
const ballDiameter = 30
const blockWidth = 165
const blockHeight = 25
const boardSize =  document.getElementById('board')
const gameOver = document.getElementById('gameover')
const scoreCard = document.getElementById('scorecard')
const playbutton = document.getElementById('playButton')
const playagain = document.createElement('button')
playagain.setAttribute("id","replay")
playagain.onclick = replayTheGame
const playAgainy = document.getElementById('playAgain')
const play = document.getElementById('play')
let score = 0


class Board{
    constructor(xaxis,yaxis){
        this.bottomLeft = [xaxis, yaxis]
        this.bottomRight = [xaxis + blockWidth, yaxis]
        this.topLeft = [xaxis, yaxis + blockHeight]
        this.topRight = [xaxis + blockWidth, yaxis + blockHeight]     
    }
}

// let board = new Board(50,50)
// console.log(board)
// console.log(board.bottomRight)

const boards = [
    new Board(10,10),
    new Board(185,10),
    new Board(360,10),
    new Board(535,10),
    new Board(10,45),
    new Board(185,45),
    new Board(360,45),
    new Board(535,45),
    new Board(10,80),
    new Board(185,80),
    new Board(360,80),
    new Board(535,80),
    new Board(10,115),
    new Board(185,115),
    new Board(360,115),
    new Board(535,115),
    new Board(10,150),
    new Board(185,150),
    new Board(360,150),
    new Board(535,150),
    new Board(10,185),
    new Board(185,185),
    new Board(360,185),
    new Board(535,185),
]


// adding blocks
function createBlocks(){
    for(let i=0; i<boards.length; i++){
        let block = document.createElement('div')
        block.classList.add('block')
        block.style.width = "165px"
        block.style.height = "25px"
        block.style.left = boards[i].bottomLeft[0] +"px"
        block.style.top = boards[i].bottomLeft[1] + "px"
        boardSize.appendChild(block)
    }
    return
}

createBlocks()

const userBlockInitial = [268,470]
let currentPosition = userBlockInitial


// creating user block
function createUserBlock(){
    let userBlock = document.createElement('div')
        userBlock.classList.add('user_block')
        userBlock.style.width = "165px"
        userBlock.style.height = "25px"
        userBlock.style.position = "absolute"
        userBlock.style.left = currentPosition[0] + "px"
        userBlock.style.top = currentPosition[1] + "px"
        boardSize.appendChild(userBlock)
    return
}
createUserBlock()


function operateKeys(event) {
    console.log("Hi")
    if (event.keyCode === 37) {
        if(currentPosition[0] >= 10){
            const removeUserBlock = boardSize.lastElementChild
            removeUserBlock.remove()
            currentPosition[0] -= 10
            createUserBlock()
            console.log('al')
        }
    } 
    else if (event.keyCode === 39) {
        if(currentPosition[0] < boardWidth-175){
            const removeUserBlock = boardSize.lastElementChild
            removeUserBlock.remove()
            console.log(removeUserBlock)
            currentPosition[0] += 10
            createUserBlock()
            console.log('ar')
        }
        
    }
}

document.addEventListener("keydown",operateKeys);

// creating a ball 
const initialBallPosition = [336,420]
let currentBallPosition = initialBallPosition
const baller = document.getElementById('baller')

const ballCreation = document.createElement('div')
ballCreation.classList.add('ball')

function ballCoordinates(){
    ballCreation.style.left = currentBallPosition[0] + "px"
    ballCreation.style.top = currentBallPosition[1] + "px"
    return
}
ballCoordinates()
baller.appendChild(ballCreation)




// ball collision and directions 
let northEast = true
let northWest = false
let southWest = false
let southEast = false

let initial = 1
let rightWall = 0
let topWall = 0
let leftWall = 0
let userBlockBox = 0    
let mode = [0,0,0,0]           //[right,top,left,bottom]
let blockMode = [0,0,0,0]
let kitValue     //[right,top,left,bottom]


//fuction to change direction of ball just give kit value
function changeDirection(kit){
    if(kit==1){
        currentBallPosition[0] -= 1     //kit=1
        currentBallPosition[1] -= 1
        northWest = true //nw
        southWest = false
        southEast = false
        northEast = false
        rightWall = 1
        return
    }
    if(kit==2){
        currentBallPosition[0] -= 1      //kit=2
        currentBallPosition[1] += 1
        southEast = false
        southWest = true
        northEast = false
        northWest = false
        rightWall = 1
        return
    }
    if(kit==3){
        currentBallPosition[0] -= 1      //kit=3
        currentBallPosition[1] += 1
        southWest = true //sw
        southEast = false
        northEast = false
        northWest = false
        topWall = 1
        return
    }
    if(kit==4){
        currentBallPosition[0] += 1      //kit=4
        currentBallPosition[1] += 1
        northEast = false
        southEast = true
        northWest = false
        southWest = false
        topWall = 1
        return
    }
    if(kit==5){
        currentBallPosition[0] += 1      //kit=5
        currentBallPosition[1] += 1
        southEast = true //se
        northEast = false
        northWest = false
        southWest = false
        leftWall = 1
        return
    }
    if(kit==6){
        currentBallPosition[0] += 1      //kit=6
        currentBallPosition[1] -= 1
        northWest = false
        northEast = true
        southWest = false
        southEast = false
        leftWall = 1
        return
    }
    if(kit==7){
        currentBallPosition[0] += 1      //kit=7
        currentBallPosition[1] -= 1
        southWest = false
        northEast = true //kw
        northWest = false
        southEast = false
        userBlockBox = 1
        return
    }
    if(kit==8){
        currentBallPosition[0] -= 1      //kit=8
        currentBallPosition[1] -= 1
        northWest = true
        northEast = false
        southWest = false
        southEast = false
        userBlockBox = 1
        return
    }
}





function collisonWalls(){

    if(currentBallPosition[0]===boardWidth-ballDiameter || rightWall==1){  //right wala
        rightWall = 1 
        initial=0
        topWall=0
        leftWall=0  
        userBlockBox = 0      
        if(northEast==true || mode[0]==1){   //kit=1
            changeDirection(1)
            mode = [1,0,0,0]
            ballCoordinates()
        }
        else{
            changeDirection(2) //kit=2
            mode = [0,0,0,0]
            ballCoordinates()
        }
    }

    if(initial==1){    //initial
        currentBallPosition[0] += 1
        currentBallPosition[1] -= 1
        ballCoordinates()
    }


    if(currentBallPosition[1]===0 || topWall==1){          //top wala
        topWall = 1
        initial=0
        rightWall=0
        leftWall=0 
        userBlockBox = 0     
        if(northWest==true || mode[1]==1){      //kit=3
            changeDirection(3)
            mode = [0,1,0,0]
            ballCoordinates()
        }
        if(northEast==true || mode[1]==0){
            changeDirection(4)            //kit=4
            mode = [0,0,0,0]
            ballCoordinates() 
        }
    }
    


    if(currentBallPosition[0]===0 || leftWall==1){   //left wala
        leftWall = 1
        initial=0
        rightWall=0
        topWall=0 
        userBlockBox = 0       
        if(southWest || mode[2]==1){              //kit=5
            changeDirection(5)
            mode = [0,0,1,0]
            ballCoordinates()
        }
        else{
            changeDirection(6)           //kit=6
            mode = [0,0,0,0]
            ballCoordinates()
        }
    }
    if(currentBallPosition[1]===boardHeight-ballDiameter){    //base wala game over
        clearInterval(timeInterval);
        currentBallPosition[0] += 0
        currentBallPosition[1] += 0
        ballCoordinates()
        gameOver.textContent = "Sorry!! Game Over"
        gameOver.style.color = "red" 
        gameOver.style.fontFamily = "Lucida Grande"
        gameOver.style.fontSize = "35px"
        playagain.style.backgroundColor = "red"
        playagain.textContent = "Replay"
        playAgainy.appendChild(playagain)
    }

    function userBlockFucn(){
        if(currentBallPosition[1]+ballDiameter===boardHeight-24 && currentBallPosition[0]-165<=currentPosition[0] && currentPosition[0]<=currentBallPosition[0]+ballDiameter || userBlockBox==1){ //ball collides user block
            userBlockBox = 1   
            leftWall = 0
            initial=0
            rightWall=0
            topWall=0       
                if(southEast==true || mode[3]==1){
                    changeDirection(7)       // kit=7
                    mode = [0,0,0,1]
                    ballCoordinates()
                }
                else{
                    changeDirection(8)         //kit=8
                    mode = [0,0,0,0]
                    ballCoordinates()
                }
        }
    }
    userBlockFucn()

    function checkKitValue(){
        if(northEast==true){
            topWall = 1
            return
        }
        if(northWest==true){
            topWall = 1
            return
        }
        if(southEast==true){
            userBlockBox = 1
            userBlockFucn()
        }
        if(southWest==true){
            userBlockBox = 1
            userBlockFucn()
        }
    }

    //  collison of ball and blocks
     for(let i=0;i<boards.length;i++){    
        if(currentBallPosition[0]>=boards[i].bottomLeft[0]-ballDiameter && currentBallPosition[0]<=boards[i].bottomRight[0] && currentBallPosition[1]<=boards[i].bottomLeft[1] && currentBallPosition[1]>=boards[i].topLeft[1]-ballDiameter)
           {
                console.log(currentBallPosition)
                console.log(boards[i])
                const rmvBlock  = Array.from(document.querySelectorAll('.block'))
                rmvBlock[i].classList.remove('block')
                // boards.splice(i,1)
                score += 1
                scoreCard.textContent = score
                // checkKitValue()
                let keyBe = Math.floor(Math.random()*8 + 1)
                changeDirection(keyBe)
                break
           }
    }

    if(score===24){
        clearInterval(timeInterval);
        currentBallPosition[0] += 0
        currentBallPosition[1] += 0
        ballCoordinates()
        gameOver.textContent = "Congratulations!! You Won"
        gameOver.style.color = "green"
        gameOver.style.fontFamily = "Lucida Grande"
        gameOver.style.fontSize = "35px"
        playagain.style.backgroundColor = "green"
        playagain.textContent = "Replay"
        playAgainy.appendChild(playagain)        
    }





}

function playTheGame(){
    timeInterval = setInterval(collisonWalls,2)
    score=0
    scoreCard.textContent = score
    playbutton.remove()
}

function replayTheGame(){
    const initialBallPosition = [336,420]
    currentBallPosition = initialBallPosition
    ballCoordinates()
    boardSize.innerHTML = ""
    createBlocks()
    createUserBlock()
    gameOver.innerHTML = ""
    // baller.appendChild(ballCreation)
    initial=1
    score=0
    scoreCard.textContent = score
    playagain.remove()
    play.appendChild(playbutton)
    // timeInterval = setInterval(collisonWalls,2)
}



// done 




    
   