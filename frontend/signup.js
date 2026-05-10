function signup() {

    const username =
    document.getElementById("username").value.trim();

    const email =
    document.getElementById("email").value.trim();

    const password =
    document.getElementById("password").value.trim();

    // Validation
    if(username === "" || email === "" || password === ""){

        alert("Please fill all fields");

        return;
    }

    // Password length validation
    if(password.length < 6){

        alert("Password must be at least 6 characters");

        return;
    }

    fetch("https://to-do-list-p8hi.onrender.com/signup", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            username,
            email,
            password

        })

    })

    .then(res => res.json())

    .then(data => {

        alert(data.message);

        // Redirect after successful signup
        if(data.message === "Signup successful"){

            window.location.href = "login.html";

        }

    })

    .catch(err => {

        console.log(err);

        alert("Server Error");

    });

}