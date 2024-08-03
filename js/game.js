const verifyPlayerLogin = ()=>{ 
    const player = sessionStorage.getItem('player')
    if(player != null) {
        return player
    }else{
        window.location.href = "index.html"
    }
    
}

const createCard = (char)=>{
    const card = document.createElement('div')
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
        card.style.transform = 'rotateY(180deg)'
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
    const duplicateChars = [...chars, ...chars]
    duplicateChars.sort(() => Math.random() - 0.5)
    duplicateChars.forEach(char => {
        createCard(char)
    });
}

const spikeSound = ()=>{
    const audio = new Audio('../images/spike.mp3')
    audio.play()
}

const Home = document.getElementsByClassName('valorant')[0]
Home.addEventListener('click', ()=>{
    window.location.href = "index.html"
})

verifyPlayerLogin()
renderCards()
spikeSound()