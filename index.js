const canvas = document.getElementById('tetris')

const ctx = canvas.getContext('2d')

const starterOffsetY = 2

const boardConfig = {
  height: 20,
  width:10,
  shape: 1,
  shapeSize: 30,
  offsetX: 4,
  offsetY: 2
}

canvas.height = boardConfig.height * boardConfig.shapeSize
canvas.width = boardConfig.width * boardConfig.shapeSize

const board = Array.from({length: boardConfig.height}, () => Array(boardConfig.width).fill(0))

const shape = [
  [
    [1,1],
    [1,1],
  ],
  [
    [0,1,0],
    [0,1,0],
    [0,1,1],
  ],
  [
    [0,1,0],
    [0,1,0],
    [1,1,0],
  ],
  [
    [1,1,1],
    [0,1,0],
    [0,1,0],
  ],
  [
    [0,1,0],
    [0,1,0],
    [1,1,1],
  ],
  [
    [0,1,0],
    [0,1,0],
    [0,1,0],
    [0,1,0],
  ],
  [
    [1,1,1,1]
  ]
]

const brickState = {
  alive: false
}

const userConfig = {
  moveSpeed: 10,
  timeBrickDown: 500
}

let randomShape;

function selectRandomShape() {
  randomShape = Math.floor(Math.random() * shape.length)
}

function draw() {
  console.log(randomShape)
  shape[randomShape].forEach((row, y) => {
    row.forEach((value, x) => {
      if(value === 1) {
        board[boardConfig.offsetY + y][boardConfig.offsetX + x] = value
      }
      board[boardConfig.offsetY + y - 1][boardConfig.offsetX + x - 1] = 0
    })
  })

  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if(value === 1) {
        ctx.clearRect(0,0, canvas.width, canvas.height)
        ctx.fillStyle = "yellow"
        ctx.fillRect((boardConfig.offsetX) * boardConfig.shapeSize, (boardConfig.offsetY) * boardConfig.shapeSize, boardConfig.shapeSize, boardConfig.shapeSize)
      }
    })
  })
}

console.log(board)

function solidifyShape(y, x){
  board[y][x] = 1
}

function busEvent() {
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
      boardConfig.offsetX = --boardConfig.offsetX
      console.log('ArrowLeft', boardConfig.offsetX)
    } else if (e.key === 'ArrowRight') {
      boardConfig.offsetX = ++boardConfig.offsetX
      console.log('ArrowRight', boardConfig.offsetX)
    } else if (e.key === 'ArrowDown') {
      boardConfig.offsetY = ++boardConfig.offsetY
      console.log('ArrowDown', boardConfig.offsetY) 
    }
  })
}

function dropShape() {
  setInterval(() => {
    if(boardConfig.offsetY >= board.length - 1) {
      boardConfig.offsetY = starterOffsetY
      selectRandomShape()
      brickState.alive = false
    } else {
      brickState.alive = true
      boardConfig.offsetY++
    }
    console.log("setInterval", boardConfig.offsetY)
  }, 500)
}

function update() {
  draw()
  requestAnimationFrame(update)
}

function main(){
  busEvent()
  selectRandomShape()
  update()
  dropShape()
}

main()