const sectionSelectAttack = document.getElementById("eleccion-poder")
const buttonPet = document.getElementById("actual-button-pet")
const changePetPlayer = document.getElementById("player-pet")
const changePetEnemy = document.getElementById("enemy-pet")
const sectionSelectPet = document.getElementById("eleccion-mokepon")
const buttonPethtml = document.getElementById("actual-button-pet")
const attackSubtitle = document.getElementById("attack-subtitle")
const attackButtons = document.getElementById("attack-buttons")
const imagePetSection = document.getElementById("player-image")
const showPlayerVictories = document.getElementById("player-wins")
const showEnemyVictories = document.getElementById("enemy-wins")
const notification = document.getElementById("resultado")
const attackResultsSection = document.getElementById("attack-results")
const messagessection = document.getElementById("messages")
const hideNotification = document.getElementById("resultado")
const restartSection = document.getElementById("reiniciar")
const conteinerCards = document.getElementById("conteiner-cards")
const mapSection = document.getElementById("view-map")
const map = document.getElementById("map")

let mokepones = []
let mokeponEnemys = []
let inputSharkboy 
let inputLavagirl
let inputDirtdog 
let inputSharklava 
let inputDirtshark  
let inputLavadog 
let playerPet
let playerId = null
let enemyId = null
let imagePet
let enemyPet
let buttonFuego 
let buttonAgua 
let buttonTierra 
let buttons = []
let playerAttacks = []
let enemyAttacksSecuence = []
let injectMokepones
let injectAttacks
let mainPlayerIndex
let mainEnemyIndex
let playerVictories = 0
let enemyVictories = 0
let result
let canvas = map.getContext("2d")
let interval
let interval2
let backgroundMap = new Image()
backgroundMap.src = "./images/mapa3.png" 
let lookingForheight 
let displaywidth = window.innerWidth - 20
const maxMapWidth = 820

if (displaywidth > maxMapWidth) {
    displaywidth = maxMapWidth - 20
}

lookingForheight = displaywidth * 600 / 800
map.width = displaywidth
map.height = lookingForheight

class Mokepon {
    constructor(name, image, life, type, x, y, headImage, xMultiplier, yMultiplier, id = null) {
        this.id = id
        this.name = name
        this.image = image
        this.life = life
        this.type = type
        this.attacks = []
        this.width = displaywidth * 0.125
        this.height = displaywidth * 0.125
        this.x = x
        this.y = y
        this.xMultiplier = xMultiplier 
        this.yMultiplier = yMultiplier
        this.mapImage = new Image()
        this.mapImage.src = headImage
        this.speedX = 0
        this.speedY = 0
        
        // Automatically push to mokepones array
        mokepones.push(this)
    }   
}
    
let sharkboy = new Mokepon("Sharkboy", "./images/Sharkboy.png", 3, "Strong", displaywidth * 0.41875, lookingForheight * 0.75, "./images/sharkboyHead.png", 0.41875, 0.75)
let lavagirl = new Mokepon("Lavagirl", "./images/Lavagirl.png", 3, "Strong", displaywidth * 0.36875, lookingForheight * 0.325, "./images/lavagirlHead.png", 0.36875, 0.325)
let dirtdog = new Mokepon("Dirtdog", "./images/Dirtdog.png", 3, "Strong", displaywidth * 0.74375, lookingForheight * 0.69, "./images/dirtdogHead.png", 0.74375, 0.69)
let sharklava = new Mokepon("Sharklava", "./images/Sharklava.png", 3, "Hybrid", displaywidth * 0.0875, lookingForheight * 0.375, "./images/sharklavaHead.png", 0.0875, 0.375)
let dirtshark = new Mokepon("Dirtshark", "./images/Dirtshark.png", 3, "Hybrid", displaywidth * 0.6125, lookingForheight * 0.167, "./images/dirtsharkHead.png", 0.6125, 0.167)
let lavadog = new Mokepon("Lavadog", "./images/Lavadog.png", 3, "Hybrid", displaywidth * 0.225, lookingForheight * 0.217, "./images/lavadogHead.png", 0.225, 0.217)

sharkboy.attacks.push(
    { name: "AGUA", id: "button-agua", scr: "./images/agua.png"},
    { name: "AGUA", id: "button-agua", scr: "./images/agua.png" },
    { name: "AGUA", id: "button-agua", scr: "./images/agua.png" },
    { name: "FUEGO", id: "button-fuego", scr: "./images/fuego.png" },
    { name: "TIERRA", id: "button-tierra", scr: "./images/tierra.png" }
)

lavagirl.attacks.push(
    { name: "FUEGO", id: "button-fuego", scr: "./images/fuego.png" },
    { name: "FUEGO", id: "button-fuego", scr: "./images/fuego.png" },
    { name: "FUEGO", id: "button-fuego", scr: "./images/fuego.png" },
    { name: "AGUA", id: "button-agua", scr: "./images/agua.png" },
    { name: "TIERRA", id: "button-tierra", scr: "./images/tierra.png" }
)

dirtdog.attacks.push(
    { name: "TIERRA", id: "button-tierra", scr: "./images/tierra.png" },
    { name: "TIERRA", id: "button-tierra", scr: "./images/tierra.png" },
    { name: "TIERRA", id: "button-tierra", scr: "./images/tierra.png" },
    { name: "AGUA", id: "button-agua", scr: "./images/agua.png" },
    { name: "FUEGO", id: "button-fuego", scr: "./images/fuego.png" },
)
sharklava.attacks.push(
    { name: "AGUA", id: "button-agua", scr: "./images/agua.png" },
    { name: "AGUA", id: "button-agua", scr: "./images/agua.png" },
    { name: "FUEGO", id: "button-fuego", scr: "./images/fuego.png" },
    { name: "FUEGO", id: "button-fuego", scr: "./images/fuego.png" },
    { name: "TIERRA", id: "button-tierra", scr: "./images/tierra.png" }
)
dirtshark.attacks.push(
    { name: "AGUA", id: "button-agua", scr: "./images/agua.png" },
    { name: "AGUA", id: "button-agua", scr: "./images/agua.png" },
    { name: "TIERRA", id: "button-tierra", scr: "./images/tierra.png" },
    { name: "TIERRA", id: "button-tierra", scr: "./images/tierra.png" },
    { name: "FUEGO", id: "button-fuego", scr: "./images/fuego.png" }
)
lavadog.attacks.push(
    { name: "AGUA", id: "button-agua", scr: "./images/agua.png" },
    { name: "FUEGO", id: "button-fuego", scr: "./images/fuego.png" },
    { name: "FUEGO", id: "button-fuego", scr: "./images/fuego.png" },    
    { name: "TIERRA", id: "button-tierra", scr: "./images/tierra.png" },
    { name: "TIERRA", id: "button-tierra", scr: "./images/tierra.png" }
)

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function iniciateGame() {
    mapSection.style.display = "none"
    sectionSelectAttack.style.display = "none"

    mokepones.forEach((mokepon) => {
        injectMokepones = `
            <input type="radio" name="pets" id="${mokepon.name}" />
            <label class="mokepon-card" for="${mokepon.name}">
                <img src="${mokepon.image}" alt="${mokepon.name}" />
                <p>${mokepon.name}</p>
        `
        conteinerCards.innerHTML += injectMokepones        
    })

    inputSharkboy = document.getElementById("Sharkboy")
    inputLavagirl = document.getElementById("Lavagirl") 
    inputDirtdog = document.getElementById("Dirtdog")
    inputSharklava = document.getElementById("Sharklava")   
    inputDirtshark = document.getElementById("Dirtshark")
    inputLavadog = document.getElementById("Lavadog")

    buttonPet.addEventListener("click", selectPetPlayer)
    joinGame()
}

function joinGame() {
    fetch("http://192.168.1.9:8080/join")
        .then(function(res) {
            if (res.ok) {
                res.text()
                    .then(function(res) {
                        console.log(res)
                        playerId = res
                    })
            }
        })
}

function selectPetPlayer() {
    if (inputSharkboy.checked) {
        changePetPlayer.innerHTML = inputSharkboy.id
        let sharkboy = new Mokepon("Sharkboy", "./images/Sharkboy.png", 3, "Strong", displaywidth * 0.41875, lookingForheight * 0.75, "./images/sharkboyHead.png", 0.41875, 0.75)
        playerPet = sharkboy
        showPlayersImage()
    } else if (inputLavagirl.checked) {
        changePetPlayer.innerHTML = inputLavagirl.id    
        playerPet = lavagirl
        showPlayersImage()
    } else if (inputDirtdog.checked) {
        changePetPlayer.innerHTML = inputDirtdog.id
        playerPet = dirtdog
        showPlayersImage()
    } else if (inputSharklava.checked) {
        changePetPlayer.innerHTML = inputSharklava.id
        playerPet = sharklava
        showPlayersImage()
    } else if (inputDirtshark.checked) {
        changePetPlayer.innerHTML = inputDirtshark.id
        playerPet = dirtshark
        showPlayersImage()
    } else if (inputLavadog.checked) {
        changePetPlayer.innerHTML = inputLavadog.id
        playerPet = lavadog
        showPlayersImage()
    } else {
        alert("You must select a pet")
        return
    }

    selectMokepon(playerPet)

    if (changePetPlayer.innerHTML != "") {
        mapSection.style.display = "flex"
        initiateMap()

        for (let i = 0; i < mokepones.length; i++) {
            if (mokepones[i].name == playerPet.name) {
                mokepones[i].attacks.forEach((attack) => {
                    injectAttacks = `
                        <button class="attacks Battack" id="${attack.id}"> ${attack.name}
                        </button>
                    `
                    attackButtons.innerHTML += injectAttacks
                })
            }
        }
    
        sectionSelectPet.style.display = "none"
        buttonPethtml.style.display = "none"

        buttonFuego = document.getElementById("button-fuego")
        buttonAgua = document.getElementById("button-agua") 
        buttonTierra = document.getElementById("button-tierra")

        buttons = document.querySelectorAll(".Battack")
        attacksequence()
    }
}

function selectMokepon(playerPet) {
    fetch(`http://192.168.1.9:8080/mokepon/${playerId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: playerPet.name
        })
    })
}

function attacksequence() {
    buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
            if (e.target.textContent === " FUEGO\n                        ") {
                playerAttacks.push("FUEGO")
                console.log(playerAttacks)
                button.style.background = "#567C8D"
                button.disabled = true
            } else if (e.target.textContent === " AGUA\n                        ") {
                playerAttacks.push("AGUA")
                console.log(playerAttacks)
                button.style.background = "#567C8D"
                button.disabled = true
            } else if (e.target.textContent === " TIERRA\n                        ") {
                playerAttacks.push("TIERRA")
                console.log(playerAttacks)
                button.style.background = "#567C8D"
                button.disabled = true
            }

            if (playerAttacks.length === 5) {
                sendAttacksToServer()
            }
        })
    })         
}
 
function sendAttacksToServer() {
    fetch(`http://192.168.1.9:8080/mokepon/${playerId}/attacks`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            attacks: playerAttacks
        })
    })

    interval2 = setInterval(recievedAttacks, 50)
}

function recievedAttacks() {
    fetch(`http://192.168.1.9:8080/mokepon/${enemyId}/attacks`)
        .then(function(res) {
            if (res.ok) {
                res.json() 
                    .then(function({attacks}) {
                        if (attacks.length === 5) {
                            enemyAttacksSecuence = attacks
                            combatstart()
                        }
                    })
            }
        })
}

function showPlayersImage() {
    imagePet = document.createElement("img")
    imagePet = `<img id="player2-image" src="${playerPet.image}" alt="${playerPet.name}" >`
    imagePetSection.innerHTML = imagePet
}

function showEnemyImage() {
    const imagePetSection = document.getElementById("enemy-image")
    let imagePet = `<img id="enemy2-image" src="${enemyPet.image}" alt="${enemyPet.name}" >`
    imagePetSection.innerHTML = imagePet
}

function randomEnemyAttack() {
    let randomAttack = aleatorio(0, enemyPet.attacks.length - 1)
    let ataqueAInyectar = enemyPet.attacks[randomAttack].name
    enemyAttacksSecuence.push(ataqueAInyectar)
    enemyPet.attacks.splice(randomAttack, 1)
    console.log(enemyAttacksSecuence)
    combatstart()
}

function combatstart() {
    if (playerAttacks.length >= 5 && [...buttons].every(button => button.disabled)) {
        individualCombat()
        if (playerVictories == enemyVictories) {
            result = "It's a tie!"
        } else if (playerVictories > enemyVictories) {
            result = "You win!"
        } else {
            result = "You lose!"
        }
        createWinMessage()
    }
}

function collectEachCombat(playerIndex, enemyIndex) {
    mainPlayerIndex = playerAttacks[playerIndex]
    mainEnemyIndex = enemyAttacksSecuence[enemyIndex]
    createmessage()
}

function individualCombat() {
    clearInterval(interval2)
    for (let i = 0; i < playerAttacks.length; i++) {
        if (playerAttacks[i] == enemyAttacksSecuence[i]) {
            collectEachCombat(i, i)           
        } else if (playerAttacks[i] == "AGUA" && enemyAttacksSecuence[i] == "FUEGO" || playerAttacks[i] == "FUEGO" && enemyAttacksSecuence[i] == "TIERRA" || playerAttacks[i] == "TIERRA" && enemyAttacksSecuence[i] == "AGUA") {
            collectEachCombat(i, i)
            playerVictories++   
        } else {
            collectEachCombat(i, i)
            enemyVictories++
        }
    }
}

function resizePetsImages() {
    let imagePet2 = document.getElementById("player2-image")
    imagePet2.style.height = window.innerWidth * 0.2125 + "px"
    imagePet2.style.width = window.innerWidth * 0.2125 + "px"
    let imagePet3 = document.getElementById("enemy2-image")
    imagePet3.style.height = window.innerWidth * 0.2125 + "px"
    imagePet3.style.width = window.innerWidth * 0.2125 + "px"
}

function createmessage() {
    let attackResults = document.createElement("p")
    attackResults.innerHTML = "Your attack " + mainPlayerIndex + " against " + mainEnemyIndex
    attackResultsSection.appendChild(attackResults)
}

function checkhealth() {
    // if (playerHealth == 0) {
    //     createWinMessage("You lose!")
    // } else if (enemyHealth == 0) {
    //     createWinMessage("You win!")
    // }
}

function createWinMessage() {    
    let wholeResult = document.createElement("p")
    wholeResult.innerHTML = "Final result: " + result
    
    messagessection.appendChild(wholeResult)

    showPlayerVictories.innerHTML = playerVictories
    showEnemyVictories.innerHTML = enemyVictories

    showRestartButton()

    hideNotification.style.display = "none"
    attackButtons.style.display = "none"
    attackSubtitle.style.display = "none"
}

function showRestartButton() {
    let restarButton = document.createElement("button")
    restarButton.id = "button-playAgain"
    restarButton.className = "buttons"
    restarButton.innerHTML = "Restart Game"
    restartSection.appendChild(restarButton)
    restarButton.addEventListener("click", restartGame)
}

function restartGame() {
    location.reload()
}

function paintmap() {
    playerPet.x = playerPet.x + playerPet.speedX
    playerPet.y = playerPet.y + playerPet.speedY
    displaywidth = window.innerWidth - 20 
    
    if (displaywidth > maxMapWidth) {
        displaywidth = maxMapWidth - 20
    }

    lookingForheight = displaywidth * 600 / 800
    map.width = displaywidth
    map.height = lookingForheight
    canvas.clearRect(0, 0, map.width, map.height)
    canvas.drawImage(backgroundMap, 0, 0, map.width, map.height)
    canvas.drawImage(playerPet.mapImage, playerPet.x, playerPet.y, playerPet.width, playerPet.height)
    
    mokeponEnemys.forEach((mokepon) => {
        canvas.drawImage(mokepon.mapImage, mokepon.x, mokepon.y, mokepon.width, mokepon.height)
        checkcollision(mokepon)
    })

    sendLocation(playerPet.x, playerPet.y)
}

function sendLocation(x, y) {
    fetch(`http://192.168.1.9:8080/mokepon/${playerId}/position`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function(res) {
        if (res.ok) {
            res.json()
                .then(function({enemys}) {
                    mokeponEnemys = enemys.map((enemy) => {
                        let originalMokepon = mokepones.find((mokepon) => mokepon.name === enemy.mokepon.name)
                        if (originalMokepon) {
                            // Crear nuevo mokepón con los datos del original + la información del servidor
                            let individualEnemy = new Mokepon(
                                originalMokepon.name,
                                originalMokepon.image,
                                originalMokepon.life,
                                originalMokepon.type,
                                enemy.x, // Posición X del servidor
                                enemy.y, // Posición Y del servidor
                                originalMokepon.mapImage.src,
                                originalMokepon.xMultiplier,
                                originalMokepon.yMultiplier,
                                enemy.id // ID único del servidor
                            )
                            
                            // Copiar los ataques del mokepón original
                            individualEnemy.attacks = [...originalMokepon.attacks]
                            
                            return individualEnemy
                        }
                    })
                })  
        }
    })
}

function moveRight() {
    playerPet.speedX = 5
}

function moveUp() {
    playerPet.speedY = -5
}

function moveDown() {
    playerPet.speedY = 5
}

function moveLeft() {
    playerPet.speedX = -5
}

function stopMovement() {
    playerPet.speedX = 0
    playerPet.speedY = 0
}   

function keyPress(event) {
    if (event.key === "w" || event.key === "W") {
        moveUp()
    } else if (event.key === "s" || event.key === "S") {
        moveDown()
    } else if (event.key === "a" || event.key === "A") {
        moveLeft()
    } else if (event.key === "d" || event.key === "D") {
        moveRight()
    } else {
        console.log("Key not recognized")
    }
}

function initiateMap() {
    interval = setInterval(paintmap, 50)      
    window.addEventListener("keydown", keyPress)
    window.addEventListener("keyup", stopMovement)
}

function checkcollision(enemy) {
    const enemyTop = enemy.y
    const enemyBottom = enemy.y + enemy.height
    const enemyLeft = enemy.x
    const enemyRight = enemy.x + enemy.width
    const playerCenterX = playerPet.x + playerPet.width / 2
    const playerCenterY = playerPet.y + playerPet.height / 2
            
    if (playerCenterY > enemyTop && playerCenterY < enemyBottom && playerCenterX > enemyLeft && playerCenterX < enemyRight) {
        console.log("Collision detected" + enemy.name)
        enemyId = enemy.id
        enemyPet = enemy
        showEnemyImage()
        mapSection.style.display = "none"
        sectionSelectAttack.style.display = "flex"
        changePetEnemy.innerHTML = enemy.name
        showPlayersImage("enemy", enemy.name)
        clearInterval(interval)
    }
}

window.addEventListener("load", iniciateGame)

