const API_URL = "http://10.0.2.2:3000/api";

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const studentId =
            document.getElementById("StudentID").value.trim();

        const password =
            document.getElementById("Password").value;

        const message =
            document.getElementById("loginMessage");

        if (studentId === "") {
            message.textContent =
                "Please enter your Student ID or Email.";
            return;
        }

        if (password === "") {
            message.textContent =
                "Please enter your password.";
            return;
        }

        message.textContent = "Logging in...";

        try {

            const response = await fetch(
                `${API_URL}/auth/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        identifier: studentId,
                        password: password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {

                message.textContent =
                    data.message ||
                    "Invalid Student ID or password.";

                return;
            }

            localStorage.setItem(
                "authToken",
                data.token
            );

            window.location.href = "index.html";

        } catch (error) {

            console.error("LOGIN ERROR:", error);

            message.textContent =
                "Unable to connect to the server.";
        }

    });

}


function getAuthToken() {
    return localStorage.getItem("authToken");
}


function isLoggedIn() {
    return !!getAuthToken();
}


function requireLogin() {

    if (!isLoggedIn()) {

        window.location.href = "login.html";

        return false;
    }

    return true;
}


function logout() {

    localStorage.removeItem("authToken");

    window.location.href = "login.html";
}