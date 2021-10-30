const day = document.querySelector('.cal-day__day--selected')
const nameElement = document.querySelector('#name')
const emailElement = document.querySelector('#email')
const reasonElement = document.querySelector('#reason')
const timeElement = document.querySelector('#time')
const commentsElement = document.querySelector('#comments')
const btn = document.querySelector('#btn')

const form = document.querySelector('#validateForm').value

async function fetchConsultant() {
    try {
        const data = await fetch("https://skheduler.herokuapp.com/api/appointment/616e5d41632e32cbf694de70")
        const consultant = await data.json()
        return consultant
    } catch (err) {
        console.log(err)
    }
}

const resetForm = () => {
    nameElement.value = ''
    emailElement.value = ''
    reasonElement.value = ''
    timeElement.value = ''
    commentsElement.value = ''
}


btn.addEventListener('click', async(e) => {
    e.preventDefault()
    
    let name = nameElement.value
    let email = emailElement.value
    let reason = reasonElement.value
    let time = timeElement.value
    let comments = commentsElement.value

    const consultant = await fetchConsultant()
    
    const requestBody = {
        "title": consultant.title,
        "host": {
            "name": consultant.user.name,
            "userId": consultant.user.userId
        },
        "name": name,
        "email": email,
        "venue": {
            "type": consultant.venue.type, 
            "address": consultant.venue.address
        },
        "slotPicked": {
            "day": "29-10-2021", 
            "time": time
        },
        "comment": reason
    } 

    if (!(name && email && reason && time && comments)) {
        alert('All fields are required')
    } else {
        const url = 'https://skheduler.herokuapp.com/api/book-appointment'

        try {
            const appointment = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })

            const data = await appointment.json()
            if (data) {
                const appointments = JSON.parse(localStorage.getItem('BookedAppointment'))
                let appointmentArray
                
                if (appointments === null) {
                    appointmentArray = []
                } else {
                    appointmentArray = appointments
                }

                appointmentArray.push(data)
                localStorage.setItem('BookedAppointment', JSON.stringify(appointmentArray))
                alert(`Appointment confirmed. The appointment would be ${consultant.venue.type} and hold at ${consultant.venue.address} by ${time} on 29-10-2021`)
                resetForm()
            }
            
        } catch (err) {
            console.log(err.message)
        }
    }        
})
