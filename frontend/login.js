function login() {

    const email =
    document.getElementById("email").value.trim();

    const password =
    document.getElementById("password").value.trim();

    // Validation
    if(email === "" || password === ""){

        alert("Please fill all fields");

        return;
    }

    fetch("https://to-do-list-p8hi.onrender.com/login", {

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

        // Login success
        if(data.token){

            // Store token
            localStorage.setItem(
                "token",
                data.token
            );

            // Store username
            localStorage.setItem(
                "username",
                data.username
            );

            alert("Login Successful");

            // Redirect
            window.location.href = "index.html";

        } else {

            alert(data.message);

        }

    })

    .catch(err => {

        console.log(err);

        alert("Server Error");

    });

}