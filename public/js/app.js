

const search = document.querySelector('input');
const weatherFrom = document.querySelector('form');
const temperature = document.querySelector('.result-temp');
const localTime = document.querySelector('.result-localtime');
const feelsLike = document.querySelector('.result-feelslike');
const humidity = document.querySelector('.result-humidity');
const currentLocation = document.querySelector('.current_location')


weatherFrom.addEventListener('submit',(e) => {
    e.preventDefault();
    temperature.textContent = "loading...";
    feelsLike.innerHTML = "";
    humidity.innerHTML  = "";
    localTime.innerHTML = "";
    
    fetch(`/weather?address=${search.value}&current=false`).then((res) => {
        res.json().then((data) => {
            if (data.error){
                temperature.textContent = data.error
                return
            };
            temperature.innerHTML = `The temperature of <em>${data.location}</em> is <strong>${data.weather}</strong> degree Celcius.`;
            feelsLike.innerHTML = `<em>Feels like</em> <strong>${data.feelsLike}</strong>  degree Celcius.`;
            humidity.innerHTML = `<em>Humidity</em> is <strong>${data.humidity}</strong>.`;
            localTime.innerHTML = `<em>Local time</em> <strong>${data.localTime}</strong>.`;

        });
    });
});


currentLocation.addEventListener('click', () => {

    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }
    

    navigator.geolocation.getCurrentPosition((position) => {

        fetch(`/weather?address=${position.coords.latitude},${position.coords.longitude}&current=true`).then((res) => {
            res.json().then((data) => {
                if (data.error){
                    temperature.textContent = data.error
                    return
                };
                temperature.innerHTML = `The temperature of <em>${data.location}</em> is <strong>${data.weather}</strong> degree Celcius.`;
                feelsLike.innerHTML = `<em>Feels like</em> <strong>${data.feelsLike}</strong>  degree Celcius.`;
                humidity.innerHTML = `<em>Humidity</em> is <strong>${data.humidity}</strong>.`;
                localTime.innerHTML = `<em>Local time</em> <strong>${data.localTime}</strong>.`;
    
            });
        });
    }, () => {
        
        console.log('Location shared.')
    })
})