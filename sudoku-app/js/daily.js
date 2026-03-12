const board = document.getElementById("board")

/* create grid */

for(let i=0;i<81;i++){

let cell=document.createElement("input")
cell.maxLength=1

cell.addEventListener("input",()=>{
cell.value = cell.value.replace(/[^1-9]/g,'')
})

board.appendChild(cell)

}

/* puzzles */

const puzzles={

easy:[
"530070000600195000098000060800060003400803001700020006060000280000419005000080079"
],

medium:[
"000260701680070090190004500820100040004602900050003028009300074040050036703018000"
],

hard:[
"000000907000420180000705026100904000050000040000507009920108000034059000507000000"
]

}

function loadPuzzle(diff){

let puzzle=puzzles[diff][0]

let cells=document.querySelectorAll("#board input")

for(let i=0;i<81;i++){

cells[i].style.background="white"

cells[i].value=puzzle[i]==0?"":puzzle[i]

}

}

/* get grid */

function getGrid(){

let cells=document.querySelectorAll("#board input")

let grid=[]

for(let r=0;r<9;r++){

grid[r]=[]

for(let c=0;c<9;c++){

let val=cells[r*9+c].value
grid[r][c]=val?parseInt(val):0

}

}

return grid

}

/* set grid */

function setGrid(grid){

let cells=document.querySelectorAll("#board input")

for(let r=0;r<9;r++)
for(let c=0;c<9;c++)
cells[r*9+c].value=grid[r][c]

}

/* validation */

function isValid(grid,row,col,num){

for(let x=0;x<9;x++){

if(x!=col && grid[row][x]==num) return false
if(x!=row && grid[x][col]==num) return false

}

let sr=row-row%3
let sc=col-col%3

for(let r=0;r<3;r++)
for(let c=0;c<3;c++){

let rr=sr+r
let cc=sc+c

if((rr!=row || cc!=col) && grid[rr][cc]==num)
return false

}

return true

}

/* check solution */

function checkSolution(){

let grid=getGrid()

let cells=document.querySelectorAll("#board input")

let correct=true

for(let r=0;r<9;r++){
for(let c=0;c<9;c++){

let num=grid[r][c]

if(num===0 || !isValid(grid,r,c,num)){

cells[r*9+c].style.background="#ffb3b3"
correct=false

}
else{

cells[r*9+c].style.background="#b3ffcc"

}

}
}

if(correct) alert("🎉 Correct Solution!")

}

/* solver */

function solve(grid){

for(let row=0;row<9;row++){
for(let col=0;col<9;col++){

if(grid[row][col]==0){

for(let num=1;num<=9;num++){

if(isValid(grid,row,col,num)){

grid[row][col]=num

if(solve(grid)) return true

grid[row][col]=0

}

}

return false

}

}

}

return true

}

/* reveal solution */

function solveSudoku(){

let grid=getGrid()

let copy=JSON.parse(JSON.stringify(grid))

if(solve(copy)){

setGrid(copy)

alert("Solution revealed")

}
else{

alert("No solution exists")

}

}