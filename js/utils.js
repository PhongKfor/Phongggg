function collision({ a1, a2 }) {
    return (
        a1.attackBox.position.x + a1.attackBox.width >= a2.position.x && a1.attackBox.position.x <= a2.position.x + a2.width && a1.attackBox.position.y <= a2.position.y + a2.attackBox.height && a1.attackBox.position.y + a1.attackBox.height >= a2.position.y
    )
}

function determineWinner({ player, enemy, timerID }) {
    clearTimeout(timerID)
    document.querySelector('.displayText').style.display = 'flex'
    if (player.health === enemy.health) {
        document.querySelector('.displayText').innerHTML = 'Tie'
        player.switchSprite('death')
        enemy.switchSprite('death')
    } else if (player.health > enemy.health) {
        document.querySelector('.displayText').innerHTML = 'Player 1 Wins'
    } else if (player.health < enemy.health) {
        document.querySelector('.displayText').innerHTML = 'Player 2 Wins'
    }
}

let timer = 61
let timerID
function decreaseTimer() {
    if (timer > 0) {
        timerID = setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector('.timer').innerHTML = timer
    }
    if (timer <= 0) {
        determineWinner({ player, enemy, timerID })
    }
}