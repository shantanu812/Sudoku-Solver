const board = document.getElementById("board")

for(let i=0;i<81;i++){

let cell = document.createElement("input")
cell.maxLength=1

cell.addEventListener("input",()=>{
cell.value = cell.value.replace(/[^1-9]/g,'')
})

board.appendChild(cell)

}

function getGrid(){

let cells = document.querySelectorAll("#board input")
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

function setGrid(grid){

let cells=document.querySelectorAll("#board input")

for(let r=0;r<9;r++)
for(let c=0;c<9;c++)
cells[r*9+c].value=grid[r][c]

}

function isValid(grid,row,col,num){

for(let x=0;x<9;x++){

if(grid[row][x]==num) return false
if(grid[x][col]==num) return false

}

let sr=row-row%3
let sc=col-col%3

for(let r=0;r<3;r++)
for(let c=0;c<3;c++)
if(grid[sr+r][sc+c]==num) return false

return true

}

async function solve(grid){

for(let row=0;row<9;row++){
for(let col=0;col<9;col++){

if(grid[row][col]==0){

for(let num=1;num<=9;num++){

if(isValid(grid,row,col,num)){

grid[row][col]=num

setGrid(grid)
await sleep(20)

if(await solve(grid)) return true

grid[row][col]=0

}

}

return false

}

}

}

return true

}

function sleep(ms){
return new Promise(r=>setTimeout(r,ms))
}

async function solveSudoku(){

let grid=getGrid()
await solve(grid)

}

function clearBoard(){

document.querySelectorAll("#board input")
.forEach(c=>c.value="")

}