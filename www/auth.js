function getAuthToken() {

    return localStorage.getItem("authToken");

}


function isLoggedIn() {

    return !!getAuthToken();

}


function requireLogin() {

    if (!isLoggedIn()) {

        window.location.href = "login.html";

    }

}


function logout() {

    localStorage.removeItem("authToken");

    window.location.href = "login.html";

}