let form = document.getElementById("validateForm")
const error = document.getElementById('error')

const data = localStorage.getItem('Consultant')
const user = JSON.parse(data)
console.log(location)

form.addEventListener("submit", function (e) {
    e.preventDefault()

    const title = document.getElementById("title").value
    const venue = document.getElementById("venue").value
    const address = document.getElementById('location').value
    const date = document.getElementById("date").value
    const time = document.getElementById("time").value

    if (!(title && venue && address && date && time)) {
        error.innerText = 'All fields are required'
    } else {
        
        const postUrl = "https://skheduler.herokuapp.com/api/appointment"

        const createAppointment = async () => {
            try {
                const response = await fetch(postUrl, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "title": title,
                        "user": {
                            "name": user.name,
                            "userId": user._id
                        },
                        "venue": {
                            "type": venue, 
                            "address": address
                        },
                        "duration": "45 minutes",
                        "availableTimes": [
                            {
                                "day": date,
                                "times": [  
                                    { "isTaken": false, "time": time }
                                ]
                            }
                        ]
                    })
                })

                const data = await response.json()
                if (data) {
                    location.href = 'http://127.0.0.1:5501/consultant/appointments.html'
                }
    
            } catch(err) {
                error.innerText = err.message
            } 
        }

        createAppointment()
    }

})
