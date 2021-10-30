const consultant = JSON.parse(localStorage.getItem('Consultant'))
const appointments = JSON.parse(localStorage.getItem('BookedAppointment'))

async function getAppointment() {
    // let url = 'https://skheduler.herokuapp.com/api/appointments'

    try {
        // const response = await fetch(url)
        // const data = await response.json()

        // const appointments = data.filter((item) => item.user.userId === consultant._id)

        if (appointments) {
            console.log(appointments)
            let output = ''
            appointments.forEach(function(user) {
                output += `

                <div class="col-md-4" >
                    <div class="box">
                        <div class="our-services settings text-left" >
                            <ul class='pb-4'><br>
                                <li> Date: ${user.slotPicked.day} </li>
                                <li> Time: ${user.slotPicked.time} </li>
                                <li> Title: ${user.title} </li>
                                <li> Name: ${user.name} </li>
                                <li> Email: ${user.email} </li> 
                                <li> Address: ${user.venue.address} </li>
                                <li> Venue: ${user.venue.type} </li>
                                <li> Reason: ${user.comment}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
               `
            })
            document.getElementById('date').innerHTML = output
        }

    } catch(err) {
        error.innerText = err.message
    } 
}


getAppointment()