let form = document.getElementById('form')
const error = document.getElementById('error')

form.addEventListener('submit', function(e) {
    e.preventDefault()

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    if (!(email && password)) {
        error.innerText = 'All fields are required'
        console.log(email, password)
    } else {
        
        let postUrl = 'https://skheduler.herokuapp.com/api/user/login'

        const loginUser = async () => {
            try {
                const response = await fetch(postUrl, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                })

                const data = await response.json()
            
                if (data) {
                    location.href = "http://127.0.0.1:5501/consultant/home.html"
                }
            } catch(error) {
                console.log(error)
            } 
        }
        
        loginUser()
    }
})