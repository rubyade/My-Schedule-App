let form = document.getElementById('form');
form.addEventListener('submit', function(e) {
    e.preventDefault()
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log(email, password)
    let postUrl = 'https://skheduler.herokuapp.com/api/user/login';
    fetch(postUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            mode: "no-cors",
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(function(response) {
            return console.log(response);
        })
        .then(function(result) {
            alert(result);
        })
        .catch(function(error) {
            console.log('Request failed', error)
        })
})