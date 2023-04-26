const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './Asset/background.png'
})

const shop = new Sprite({
    position: {
        x: 620,
        y: 127
    },
    imageSrc: './Asset/shop.png',
    scale: 2.75,
    framesMax: 6,
})

const player = new Fighter({
    position: {
        x: 150,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'red',
    offset: { x: 0, y: 0 },
    scale: 2.5,
    offset: {
        x: 215,
        y: 155
    },
    sprites: {
        idle: {
            imageSrc: './Asset/samuraiMack/Idle.png',
            framesMax: 8,
        },
        run: {
            imageSrc: './Asset/samuraiMack/Run.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: './Asset/samuraiMack/Jump.png',
            framesMax: 2,
        },
        fall: {
            imageSrc: './Asset/samuraiMack/Fall.png',
            framesMax: 2,
        },
        attack1: {
            imageSrc: './Asset/samuraiMack/Attack1.png',
            framesMax: 6,
        },
        attack2: {
            imageSrc: './Asset/samuraiMack/Attack2.png',
            framesMax: 6,
        },
        takeHit: {
            imageSrc: './Asset/samuraiMack/Take Hit - white silhouette.png',
            framesMax: 4,
        },
        death: {
            imageSrc: './Asset/samuraiMack/Death.png',
            framesMax: 6,
        },
    },
    attackBox: {
        offset: {
            x: 150,
            y: 30
        },
        width: 100,
        height: 50
    }
})

const player2 = new Fighter({
    position: {
        x: 150,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'red',
    offset: { x: 0, y: 0 },
    scale: 2.5,
    offset: {
        x: 215,
        y: 155
    },
    sprites: {
        idle: {
            imageSrc: './Asset/Skeleton_Warrior/Idle.png',
            framesMax: 7,
        },
        run: {
            imageSrc: './Asset/Skeleton_Warrior/Run.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: './Asset/Skeleton_Warrior/Run+attack.png',
            framesMax: 7,
        },
        fall: {
            imageSrc: './Asset/Skeleton_Warrior/Run+attack.png',
            framesMax: 7,
        },
        attack1: {
            imageSrc: './Asset/Skeleton_Warrior/Attack_1.png',
            framesMax: 5,
        },
        attack2: {
            imageSrc: './Asset/Skeleton_Warrior/Attack_2.png',
            framesMax: 6,
        },
        takeHit: {
            imageSrc: './Asset/Skeleton_Warrior/Protect.png',
            framesMax: 4,
        },
        death: {
            imageSrc: './Asset/Skeleton_Warrior/Dead.png',
            framesMax: 6,
        },
    },
    attackBox: {
        offset: {
            x: 130,
            y: 30
        },
        width: 130,
        height: 50
    }
})

const enemy = new Fighter({
    position: {
        x: 824,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue',
    offset: { x: 0, y: 0 },
    scale: 2.5,
    offset: {
        x: 230,
        y: 170
    },
    sprites: {
        idle: {
            imageSrc: './Asset/kenji/Idle.png',
            framesMax: 4,
        },
        run: {
            imageSrc: './Asset/kenji/Run.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: './Asset/kenji/Jump.png',
            framesMax: 2,
        },
        fall: {
            imageSrc: './Asset/kenji/Fall.png',
            framesMax: 2,
        },
        attack1: {
            imageSrc: './Asset/kenji/Attack1.png',
            framesMax: 4,
        },
        attack2: {
            imageSrc: './Asset/kenji/Attack2.png',
            framesMax: 4,
        },
        takeHit: {
            imageSrc: './Asset/kenji/Take hit.png',
            framesMax: 3,
        },
        death: {
            imageSrc: './Asset/kenji/Death.png',
            framesMax: 7,
        },
    },
    attackBox: {
        offset: {
            x: -170,
            y: 30
        },
        width: 100,
        height: 50
    }
})

const keys = {
    a: {
        pressed: false
    },

    d: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }
}

decreaseTimer()

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, 1024, 576)
    background.update()
    shop.update()
    player.update()
    enemy.update()

    player.movement()

    enemy.velocity.x = 0


    //enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastkey === 'ArrowLeft') {
        enemy.velocity.x = -5
        enemy.switchSprite('run')
    } else if (keys.ArrowRight.pressed && enemy.lastkey === 'ArrowRight') {
        enemy.velocity.x = 5
        enemy.switchSprite('run')
    } else
        enemy.switchSprite('idle')

    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump')
    } else if (enemy.velocity.y > 0) enemy.switchSprite('fall')




    if (collision({
        a1: enemy,
        a2: player
    }) && enemy.isAttacking && enemy.framesCurrent === 0) {
        enemy.isAttacking = false
        player.takeHit()
        document.querySelector("#playerHealth").style.width = player.health + '%'
    }
    //if enemy misses
    if (enemy.isAttacking && enemy.framesCurrent != 0) {
        enemy.isAttacking = false
    }

    if (player.health <= 0 || enemy.health <= 0) {
        determineWinner({ player, enemy, timerID })
    }
}
animate()

window.addEventListener('keydown', (event) => {
    if (!player.death)
        switch (event.key) {
            //player
            case 'a':
                keys.a.pressed = true
                player.lastkey = 'a'
                break
            case 'd':
                keys.d.pressed = true
                player.lastkey = 'd'
                break
            case 'w':
                if (player.position.y + player.height > 470)
                    player.velocity.y = -20
                break
            case 'g':
            case 'h':
                player.attack(event.key)
                break
        }
    if (!enemy.death)
        switch (event.key) {
            //enemy
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true
                enemy.lastkey = 'ArrowLeft'
                break
            case 'ArrowRight':
                keys.ArrowRight.pressed = true
                enemy.lastkey = 'ArrowRight'
                break
            case 'ArrowUp':
                if (enemy.position.y + enemy.height > 470)
                    enemy.velocity.y = -20
                break
            case ',':
            case '.':
                enemy.attack(event.key)
                break
        }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'a':
            keys.a.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
    }
})