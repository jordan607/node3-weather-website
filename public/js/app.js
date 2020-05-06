const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''
    messageFive.textContent = ''

    fetch('http://localhost:3000/weather?address='+location).then( (response) => {
    response.json().then( (data) =>{
        if (data.error) messageOne.textContent  = data.error
        else {
            messageOne.textContent = 'Address Searched : ' + data.Address_searched
            messageTwo.textContent = ' Weather :' + data.forecast
            messageThree.textContent = 'Location : ' +data.Coordinates_for_location
            messageFour.textContent = 'Longitude' + data.Longitude
            messageFive.textContent = 'Latitude' + data.Latitude
        
        }
    })
})

})