const loginForm = <HTMLFormElement>document.getElementById("login-form");
const usernameInput = <HTMLInputElement>(
    document.getElementById("username-input")
);
const passwordInput = <HTMLInputElement>(
    document.getElementById("password-input")
);
const errorMessage = <HTMLParagraphElement>(
    document.getElementById("error-message")
);
const createAccountBtn = <HTMLButtonElement>(
    document.getElementById("create-account-button")
);

createAccountBtn.addEventListener("click", async () => {
    const accountInfo = { username: "admin", password: "testing" };
    const response = await fetch("http://127.0.0.1:3000/api/v1/login/create", {
        method: "POST",
        body: JSON.stringify(accountInfo),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    localStorage.setItem("token", data.token);
    console.log(data);
});

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const loginInfo = {
        username: usernameInput.value,
        password: passwordInput.value,
    };
    const token = localStorage.getItem("token");
    try {
        if (token === null) {
            throw new Error("Authorization failed, no token found");
        }
        const response = await fetch("http://127.0.0.1:3000/api/v1/login", {
            method: "POST",
            body: JSON.stringify(loginInfo),
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error(`Status error: ${response.status}`);
        }
        const data = await response.json();
        if (data.status === "success") {
            location.href = "./menu-update.html";
        }
    } catch (err) {
        console.error(err);
        errorMessage.textContent = "Login failed, please try again";
    }
    loginForm.reset();
});
