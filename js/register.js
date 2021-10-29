let form = document.getElementById("form");
form.addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const gender = document.getElementById("gender").value;
    const password = document.getElementById("password").value;
    console.log(email, password, name, gender);

    let postUrl = "https://skheduler.herokuapp.com/api/user/register";
    fetch(postUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                gender: gender,
                password: password,
            }),
        })
        .then(function(response) {
            location.replace("http://127.0.0.1:5501/consultant/home.html");
            return console.log(response);
        })
        .catch(function(error) {
            console.log("Request failed", error);
        });
});