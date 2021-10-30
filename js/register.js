let form = document.getElementById("form")
let error = document.getElementById('error')

form.addEventListener("submit", function(e) {
    e.preventDefault()

    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const gender = document.getElementById("gender").value
    const password = document.getElementById("password").value

    if (!(name && email && gender && password)) {
        error.innerText = 'All fields are required'
    } else {
        let postUrl = "https://skheduler.herokuapp.com/api/user/register"

        const registerUser = async () => {
            try {
                const response = await fetch(postUrl, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        gender: gender,
                        password: password,
                    })
                })

                const data = await response.json()
                if (data) {
                    localStorage.setItem('Consultant', JSON.stringify(data))
                    location.href = 'http://127.0.0.1:5501/consultant/login.html'
                }
    
            } catch(err) {
                error.innerText = err.message
            } 
        }

        registerUser()
    }

    //     fetch(postUrl, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             name: name,
    //             email: email,
    //             gender: gender,
    //             password: password,
    //         }),
    //     })
    //     .then((response) => {
    //         console.log(response)
    //         console.log(response.status);
    //         if (response.status = 200) {
    //             console.log(response.json())
    //             
    //         } else if (response.status = 409) {
    //             throw new Error('User exists. Please sign in')
    //         }
    //     })
    //     .catch((error) => {
    //         console.log("Request failed", error);
    //     })
    // }
})