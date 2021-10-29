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
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(function(response) {
            location.replace("http://127.0.0.1:5501/consultant/home.html");
            console.log(response);
        })
        .catch(function(error) {
            console.log('Request failed', error)
        })
});
