function getAppiontment() {
    let url = 'https://skheduler.herokuapp.com/api/appointments'
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            let output = '';
            data.forEach(function(user) {
                console.log(user)
                output += `

                <div class="col-md-4" >
                    <div class="box">
                        <div class="our-services settings text-left" >
                            <ul><br>
                                <li> Date: ${user.availableTimes[0].day} </li>
                                <li> Title: ${user.title} </li>
                                <li> Name: ${user.user.name} </li>
                                <li> Address: ${user.venue.address} </li>
                                <li> Type: ${user.venue.type} </li>
                                <li> user Id: ${user.user.userId} </li> 
                            </ul>
                        </div>
                    </div>
                </div>
                
               `;
            });
            document.getElementById('date').innerHTML = output;
        })
}


getAppiontment()