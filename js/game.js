let cardsSelected = []
const audio = new Audio('../images/spike.mp3')
audio.play()

const verifyPlayerLogin = ()=>{ 
    const player = sessionStorage.getItem('player')
    if(player != null) {
        return player
    }else{
        window.location.href = "index.html"
    }
    
}

const createCard = (char, i)=>{
    const card = document.createElement('div')
    card.setAttribute('id', i)
    card.classList.add('card')
    const front = document.createElement('div')
    front.classList.add('front')
    front.classList.add('face')
    front.style.backgroundImage = `url(../images/${char}.webp)`
    card.appendChild(front)
    const back = document.createElement('div')
    back.classList.add('back')
    back.classList.add('face')
    card.appendChild(back)
    const game = document.getElementsByClassName('game')[0]
    game.appendChild(card)
    card.addEventListener('click', ()=>{
        if (cardsSelected.length < 2){
            card.style.transform = 'rotateY(180deg)'
            cardsSelected.push(i)
            verifyCardsMatch()
        }
    })
}

const chars = [
    'clove',
    'omen',
    'viper',
    'deadlock',
    'cypher',
    'gekko',
    'jett',
    'reyna',
    'sova',
    'iso',
    'sage',
    'chamber'
]

const renderCards = ()=>{
    let i = 0
    const duplicateChars = [...chars, ...chars]
    duplicateChars.sort(() => Math.random() - 0.5)
    duplicateChars.forEach(char => {
        createCard(char, i)
        i++
    });
}

const verifyCardsMatch = ()=>{
    if (cardsSelected.length == 2) {
        const card1 = document.getElementById(cardsSelected[0])
        const card2 = document.getElementById(cardsSelected[1])
        if (card1.firstChild.style.backgroundImage === card2.firstChild.style.backgroundImage && cardsSelected[1] != cardsSelected[0]) {
            card1.style.opacity = '0.75'
            card2.style.opacity = '0.75'
            card1.firstChild.nextSibling.style.backgroundImage = card1.firstChild.style.backgroundImage
            card2.firstChild.nextSibling.style.backgroundImage = card2.firstChild.style.backgroundImage
            card1.setAttribute("class", "matched")
            card2.setAttribute("class", "matched")
            card1.setAttribute('disabled', 'true')
            card2.setAttribute('disabled', 'true')
            cardsSelected = []
        }else{
            setTimeout(()=>{
                card1.style.transform = ''
                card2.style.transform = ''
                cardsSelected = []
            }, 800)
        }
    }
}

const verifyGameState = ()=>{
    if ([...document.getElementsByClassName('card')].length == 0){
        audio.pause()
        clearInterval(interval)
        alert("Round Victory! Spike Defused")
        window.location.reload()
    }
}

const Home = document.getElementsByClassName('valorant')[0]
Home.addEventListener('click', ()=>{
    window.location.href = "index.html"
})

const timeInit = new Date().getTime()


const interval = setInterval(()=>{
    const timeNow = new Date().getTime()
    const timeLeft = Math.ceil((timeNow - timeInit)/1000)
    document.getElementsByClassName('timer')[0].innerHTML = `${timeLeft}s`
    verifyGameState()
    if (timeLeft == 105){
        alert("Time's Up! Spike Destroyed")
        window.location.reload()
    }
}, 10)

verifyPlayerLogin()
renderCards()