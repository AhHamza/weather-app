
// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const targetSearch = document.querySelector('form')
const search = document.querySelector('input')
const targetParagraph1 = document.querySelector('#target-parag1')
const targetParagraph2 = document.querySelector('#target-parag2')
const errorParag = document.querySelector('#error-parag')

let location = ''
targetSearch.addEventListener('submit', (e) => {
    e.preventDefault()
    if (search.value === '') {
        console.log('please enter a location')
    }
    location = search.value
    const url = `http://localhost:3000/weather?address=${location}`
    errorParag.textContent = ''
    targetParagraph1.textContent = 'loading'
    targetParagraph2.textContent = ''
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                errorParag.textContent = data.error
            } else {
                // targetParagraph1.textContent = data.countryName
                targetParagraph1.textContent = data.countryName
                targetParagraph2.textContent = data.forecast
                console.log(data.forecast)

                console.log(data.countryName)

            }
        })
    })
})



