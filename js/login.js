const input = document.getElementById('username')
const btnStart = document.getElementsByClassName('start')[0]

sessionStorage.removeItem('player')

input.addEventListener('input', (event)=>{
    if (event.target.value.length >= 3){
        btnStart.removeAttribute('disabled') 
    }else{
        btnStart.setAttribute('disabled', 'true')
    }
})

btnStart.addEventListener('click', (event)=>{
    event.preventDefault()
    const player = input.value
    sessionStorage.setItem('player', player)
    window.location.href = 'game.html'
})