const canvas = document.getElementById('tetris')

const ctx = canvas.getContext('2d')

const boardConfig = {
  height: 20,
  width:10,
  shape: 1,
  shapeSize: 30,
  offsetX: 4,
  offsetY: 2,
  starterOffsetY: 2
}

canvas.height = boardConfig.height * boardConfig.shapeSize
canvas.width = boardConfig.width * boardConfig.shapeSize

// const board = Array.from({length: boardConfig.height}, () => Array(boardConfig.width).fill(0))

const board = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 0, 0, 1, 1, 1]
]

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
  clock: 0,
  timeBrickDown: 30
}

let randomShape;

function selectRandomShape() {
  randomShape = Math.floor(Math.random() * shape.length)
}

function draw() {
  if(!brickState.alive) {
    boardConfig.offsetX = 4
    boardConfig.offsetY = 2
    userConfig.clock = 0

    console.log("shape", shape[randomShape])
    selectRandomShape()

    shape[randomShape].forEach((row, y) => {
      row.forEach((value, x) => {
        if( value === 1) {
          ctx.fillStyle = "red"
          ctx.fillRect((boardConfig.offsetX + x) * boardConfig.shapeSize, (boardConfig.offsetY + y) * boardConfig.shapeSize, boardConfig.shapeSize, boardConfig.shapeSize)
        }
      })
    })

    brickState.alive = true
  } else if (brickState.alive) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    dropShape()
  }
  
  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if(value === 1) {
        ctx.fillStyle = "yellow"
        ctx.fillRect(x * boardConfig.shapeSize, y * boardConfig.shapeSize, boardConfig.shapeSize, boardConfig.shapeSize)
      }
    })
  })

  // console.log(board)
}

function solidifyShape(y, x){
  board[y][x] = 1
}

function dropShape() {
  userConfig.clock++

  if(userConfig.clock >= userConfig.timeBrickDown) {
    boardConfig.offsetY++
    userConfig.clock = 0
  }

  if (true) {
    shape[randomShape].forEach((row, y) => {
      row.forEach((value, x) => {
        if( value === 1) {
          ctx.fillStyle = "red"
          ctx.fillRect((boardConfig.offsetX + x) * boardConfig.shapeSize, (boardConfig.offsetY + y) * boardConfig.shapeSize, boardConfig.shapeSize, boardConfig.shapeSize)
        }
      })
    })
  } else {
    solidifyShape(boardConfig.offsetY, boardConfig.offsetX)
    brickState.alive = false
  }
}

function update() {
  draw()
  requestAnimationFrame(update)
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

function main(){
  busEvent()
  selectRandomShape()
  update()
  dropShape()
}

main()