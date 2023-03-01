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

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const loginInfo = new FormData(loginForm);
    try {
        const response = await fetch("http://127.0.0.1:3000/api/v1/login", {
            method: "POST",
            body: loginInfo,
            headers: {
                "Content-Type": "application/json",
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
