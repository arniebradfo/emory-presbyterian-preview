const designs = {
    warm: { title: "Warm welcome", template: "warm-template" },
    community: { title: "Community in action", template: "community-template" },
    quiet: { title: "Quiet & confident", template: "quiet-template" },
};

const calendar = "https://emorypresbyterian.org/calendar/";
const events = [
    {
        marker: "SUN",
        detail: "Every week / 11 AM",
        category: "Worship & connection",
        title: "A Sunday to feel at home.",
        description: "Gather for worship, reflection, and a welcoming community. In person or wherever you are.",
        action: "Join Sunday worship",
        url: "https://emorypresbyterian.org/worship/",
    },
    {
        marker: "18",
        detail: "Oct 18 - Nov 22, 2026",
        category: "Seasonal sermon series",
        title: "In God's Economy",
        description: "Explore stewardship and what it means to live generously through our Sunday sermon series.",
        action: "Explore the series",
        url: calendar,
    },
    {
        marker: "GIVE",
        detail: "Clifton Night Shelter",
        category: "Serve our neighbors",
        title: "Make room at the table.",
        description: "Help our mission team provide meals for our neighbors. Check the calendar for the next service date.",
        action: "Find the next meal",
        url: calendar,
    },
];

function eventMarkup(event, index, mode) {
    return `<article class="event-card event-${index}">
        <div class="event-top"><span class="event-marker">${event.marker}</span><span class="event-detail">${event.detail}</span></div>
        <div class="event-content"><p class="eyebrow">${event.category}</p><h3>${event.title}</h3>
        <p class="event-description">${event.description}</p></div>
        <a class="${mode === "featured" && index === 0 ? "button" : "text-link"}" href="${event.url}">${event.action} <span aria-hidden="true">&nearr;</span></a>
    </article>`;
}

const main = document.querySelector("#main");
const menu = document.querySelector("#design-menu");
const menuButton = document.querySelector("#open-menu");

function renderDesign() {
    const requested = new URLSearchParams(location.search).get("design");
    const selected = Object.hasOwn(designs, requested) ? requested : "warm";
    const design = designs[selected];
    document.body.dataset.design = selected;
    document.title = `${design.title} | Emory Presbyterian Church`;
    main.replaceChildren(document.querySelector(`#${design.template}`).content.cloneNode(true));
    main.querySelectorAll("[data-events]").forEach((container) => {
        container.innerHTML = events.map((event, index) =>
            eventMarkup(event, index, container.dataset.events)).join("");
    });
    document.querySelectorAll("[data-choice]").forEach((button) => {
        button.setAttribute("aria-pressed", String(button.dataset.choice === selected));
    });
}

menuButton.addEventListener("click", () => menu.showModal());
document.querySelector("#close-menu").addEventListener("click", () => menu.close());
menu.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        event.preventDefault();
        menu.close();
    }
});
menu.addEventListener("close", () => menuButton.focus({ preventScroll: true }));
menu.addEventListener("click", (event) => {
    if (event.target !== menu) return;
    const bounds = menu.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) menu.close();
});
menu.querySelectorAll("[data-choice]").forEach((button) => {
    button.addEventListener("click", () => {
        const url = new URL(location.href);
        url.searchParams.set("design", button.dataset.choice);
        url.hash = "";
        history.pushState(null, "", url);
        renderDesign();
        menu.close();
        window.scrollTo({ top: 0, behavior: "instant" });
    });
});
menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => menu.close());
});
window.addEventListener("popstate", renderDesign);
renderDesign();
