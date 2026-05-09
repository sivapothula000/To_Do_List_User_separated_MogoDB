function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    .then(res => res.json())
    .then(data => {

        if(data.token){

            localStorage.setItem("token", data.token);

            alert("Login Successful");

            window.location.href = "index.html";

        } else {
            alert(data.message);
        }
    });
}