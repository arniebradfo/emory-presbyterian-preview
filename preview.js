// This static preview must not send visitor data to the production website.
document.querySelectorAll("form").forEach((form) => {
    const isSearch = Boolean(form.querySelector('input[name="s"]'));
    if (isSearch) {
        form.action = "https://emorypresbyterian.org/";
        form.method = "get";
        return;
    }

    form.removeAttribute("action");
    form.querySelectorAll("[onclick]").forEach((element) => {
        if (element.getAttribute("onclick").includes("gform.")) {
            element.removeAttribute("onclick");
        }
    });
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let message = form.querySelector(".preview-form-message");
        if (!message) {
            message = document.createElement("p");
            message.className = "preview-form-message";
            message.setAttribute("role", "status");
            form.append(message);
        }
        message.textContent =
            "This is a local preview. To subscribe, please visit the original church website.";
    });
});
