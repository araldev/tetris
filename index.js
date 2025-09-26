const canvas = document.getElementById('tetris')

const ctx = canvas.getContext('2d')

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

const randomShape = Math.floor(Math.random() * shape.length)

function draw(shapeSize) {
  shape[randomShape].forEach((row, y) => {
    row.forEach((value, x) => {
      if(value === 1) {
        board[ boardConfig.offsetY +y][boardConfig.offsetX + x] = value
      }
    })
  })

  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if(value === 1) {
        console.log(board, (boardConfig.offsetY + y) * shapeSize, canvas.height)
        ctx.fillStyle = "yellow"
        ctx.fillRect((boardConfig.offsetX + x -4) * shapeSize, (boardConfig.offsetY + y) * shapeSize, shapeSize, shapeSize)
      }
    })
  })

    document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
      console.log('ArrowLeft', boardConfig.offsetX)
      boardConfig.offsetX = --boardConfig.offsetX
    } else if (e.key === 'ArrowRight') {
      boardConfig.offsetX = ++boardConfig.offsetX
    } else if (e.key === 'ArrowDown') {
      boardConfig.offsetY = ++boardConfig.offsetY
    }
  })
}

function update() {
  requestAnimationFrame(update)
}



function main(){
  draw(boardConfig.shapeSize)
  requestAnimationFrame(update)
}

main()