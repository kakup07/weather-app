

const search = document.querySelector('input')
const weatherFrom = document.querySelector('form')
const result = document.querySelector('.result')


weatherFrom.addEventListener('submit',(e) => {
    e.preventDefault()
    result.textContent = "loading..."
    
    fetch(`/weather?address=${search.value}`).then((res) => {
        res.json().then((data) => {
            if (data.error){
                result.textContent = data.error
                return
            }
            console.log(data)
            result.innerHTML = `The temperature of <em>${data.location}</em> is <strong>${data.weather}</strong> degree Celcius.`
        })
    })
    
})