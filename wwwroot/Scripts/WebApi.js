var tokenKey = "accessToken";

async function getTokenAsync() {
    const formData = new FormData();
    formData.append("grant_type", "password");
    formData.append("username", document.getElementById("emailLogin").value);
    formData.append("password", document.getElementById("passwordLogin").value);

    const response = await fetch("/token", {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: formData
    });

    const data = await response.json();

    if (response.ok === true) {
        document.getElementById("userName").innerText = data.username;
        document.getElementById("userInfo").style.display = "block";
        document.getElementById("emailLogin").value = "";
        document.getElementById("passwordLogin").value = "";
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("promptLogin").style.display = "none";
        sessionStorage.setItem(tokenKey, data.access_token);
        console.log(data.access_token);
    }
    else {
        document.getElementById("promptLogin").style.display = "block";
        console.log("Error: ", response.status, data.errorText);
    }
};
async function getData(url) {
    const token = sessionStorage.getItem(tokenKey);

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer" + token
        }
    });
    if (response.ok === true) {
        const data = await response.json();
        alert(data)
    }
    else
        console.log("Status: ", response.status);
};

document.getElementById("submitLogin").addEventListener("click", e => {
    e.preventDefault();
    getTokenAsync();
});
document.getElementById("logOut").addEventListener("click", e => {
    e.preventDefault();
    document.getElementById("userName").innerText = "";
    document.getElementById("userInfo").style.display = "none";
    document.getElementById("userName").style.display = "block";
    document.getElementById("loginForm").style.display = "block";
    sessionStorage.removeItem(tokenKey);
});
document.getElementById("getDataByLogin").addEventListener("click", e => {
    e.preventDefault();
    getData("/api/values/getlogin");
});
document.getElementById("getDataByRole").addEventListener("click", e => {
    e.preventDefault();
    getData("/api/values/getrole");
});