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
                            <ul><br>
                                <li> Date: ${user.slotPicked.day} </li>
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



    // fetch(url)
    //     .then((res) => res.json())
    //     .then((data) => {
    //         console.log(data)
    //         let output = '';
    //         data.forEach(function(user) {
    //             console.log(user)
    //             output += `

    //             <div class="col-md-4" >
    //                 <div class="box">
    //                     <div class="our-services settings text-left" >
    //                         <ul><br>
    //                             <li> Date: ${user.availableTimes[0].day} </li>
    //                             <li> Title: ${user.title} </li>
    //                             <li> Name: ${user.user.name} </li>
    //                             <li> Address: ${user.venue.address} </li>
    //                             <li> Type: ${user.venue.type} </li>
    //                             <li> user Id: ${user.user.userId} </li> 
    //                         </ul>
    //                     </div>
    //                 </div>
    //             </div>
                
    //            `;
    //         });
    //         document.getElementById('date').innerHTML = output;
    //     })
}


getAppointment()