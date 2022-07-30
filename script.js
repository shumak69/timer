window.addEventListener('DOMContentLoaded', () => {
    let interval;
    function getZero (num) {
        if(num <= 10) {
            return '0' + num
        }
        return num
    }
    function timer(minutes, seconds = 0) {
        let t = 60 * minutes + seconds
        function getRemaining(time){
            document.querySelector('#minutes').textContent = getZero(Math.floor((time / 60)))
            document.querySelector('#seconds').textContent = getZero(time % 60)
            t --
        }
        getRemaining(t)
        interval = setInterval(() => {
            if(t <= 0) {
                const audio = new Audio('timer.mp3');
                audio.loop = true;
                audio.play();
                const stopAudio = document.createElement('button')
                stopAudio.classList.add('btn', 'stop')
                stopAudio.innerHTML = 'Остановить таймер'
                document.querySelector('.form').append(stopAudio);
                stopAudio.addEventListener('click', (e) => {
                    e.preventDefault();
                    audio.pause();
                })
                clearInterval(interval);
            }
            getRemaining(t)
        }, 1000)

    }
    let min = document.querySelector('[name="minutes"]')
    let sec = document.querySelector('[name="seconds"]')
    document.querySelector('.form').addEventListener('submit', (e) => {
        e.preventDefault();
        clearInterval(interval);
        timer(+min.value, +sec.value)
        min.value = ''
        sec.value = ''
    })
})