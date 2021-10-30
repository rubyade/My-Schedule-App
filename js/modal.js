const day = document.querySelector('.cal-day__day--selected')
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


btn.addEventListener('click', async(e) => {
    e.preventDefault()
    
    const name = document.querySelector('#name').value
    const email = document.querySelector('#email').value
    const reason = document.querySelector('#reason').value
    const time = document.querySelector('#time').value
    const comments = document.querySelector('#comments').value
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

    if (!(reason && time && comments)) {
        console.log(err)
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
                let appointments = JSON.parse(localStorage.getItem('BookedAppointment'))
                let appointmentArray
                console.log(appointments)
                if (appointments === null) {
                    appointmentArray = []
                } else {
                    appointmentArray = appointments
                }

                appointmentArray.push(data)
                localStorage.setItem('BookedAppointment', JSON.stringify(appointmentArray))
                name = ''
                email = ''
                reason = ''
                time = ''
                comments = ''
                alert('Appointment confirmed')
            }
            
        } catch (err) {
            console.log(err.message)
        }
    }        
})
