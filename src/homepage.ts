const mainMenuItems = <HTMLDivElement>(
    document.getElementById("main-menu-items")
);
const highlightMenuItem = <HTMLDivElement>(
    document.getElementById("highlight-menu-item")
);
const eventsContainer = <HTMLDivElement>(
    document.getElementById("events-container")
);

interface MenuItem {
    _id: string;
    name: string;
    description: string;
    price: number;
    alt: string;
    highlight: boolean;
    path: string;
    __v: number;
}

interface Event {
    _id: string;
    title: string;
    date: string;
    content: string;
    __v: number;
}

function createMenuElements(data: MenuItem[]) {
    data.forEach((item: MenuItem, index) => {
        const menuItemContainer = document.createElement("div");
        const menuItemImage = document.createElement("img");
        menuItemImage.src = item.path;
        menuItemImage.alt = item.alt;
        menuItemContainer.append(menuItemImage);
        const menuItemInfo = document.createElement("div");
        menuItemContainer.append(menuItemInfo);
        const menuItemName = document.createElement("h3");
        menuItemName.classList.add("menu-item-name");
        item.price = Number(item.price);
        menuItemName.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        menuItemInfo.append(menuItemName);
        const menuItemDescription = document.createElement("p");
        menuItemDescription.classList.add("menu-item-description");
        menuItemDescription.textContent = item.description;
        menuItemInfo.append(menuItemDescription);
        if (item.highlight) {
            highlightMenuItem.append(menuItemContainer);
            menuItemContainer.classList.add("menu-highlight-container");
            menuItemImage.classList.add("menu-highlight-image");
            menuItemInfo.classList.add("menu-highlight-info");
        } else {
            mainMenuItems.append(menuItemContainer);
            menuItemContainer.classList.add("menu-item-container");
            menuItemImage.classList.add("menu-item-image");
            menuItemInfo.classList.add("menu-item-info");
            if (index >= 3) {
                menuItemImage.loading = "lazy";
            }
        }
    });
}

function createEventElements(data: Event[]) {
    data.forEach((event) => {
        const eventTitle = document.createElement("h3");
        eventTitle.classList.add("event-title");
        eventTitle.textContent = event.title;
        eventsContainer.append(eventTitle);
        const eventDate = document.createElement("p");
        eventDate.classList.add("event-date");
        eventDate.textContent = event.date;
        eventsContainer.append(eventDate);
        const eventContent = document.createElement("p");
        eventContent.classList.add("event-content");
        eventContent.textContent = event.content;
        eventsContainer.append(eventContent);
    });
}

async function getDefaultMenuData() {
    try {
        const response = await fetch("./assets/default-menu-data.json");
        if (!response.ok) {
            throw new Error(`Status error getting data ${response.status}`);
        }
        const data = await response.json();
        createMenuElements(data);
    } catch (err) {
        console.error(err);
        const errorMessage = document.createElement("p");
        errorMessage.classList.add("error-message");
        errorMessage.textContent = "Error getting menu data";
        mainMenuItems.append(errorMessage);
    }
}

async function getDynamicMenuData() {
    try {
        const response = await fetch(
            "https://restaurant-admin-production.up.railway.app/api/v1/menu"
        );
        if (!response.ok) {
            throw new Error(`Status error getting data ${response.status}`);
        }
        const data = await response.json();
        if (data.length > 0) {
            createMenuElements(data);
        } else {
            getDefaultMenuData();
        }
    } catch (err) {
        console.error(err);
        getDefaultMenuData();
    }
}

async function getDynamicEventData() {
    try {
        const response = await fetch(
            "https://restaurant-admin-production.up.railway.app/api/v1/events"
        );
        if (!response.ok) {
            throw new Error(`Status error getting data ${response.status}`);
        }
        const data = await response.json();
        if (data.length > 0) {
            createEventElements(data);
        } else {
            getDefaultEventData();
        }
    } catch (err) {
        console.error(err);
        getDefaultEventData();
    }
}

async function getDefaultEventData() {
    try {
        const response = await fetch("./assets/default-event-data.json");
        if (!response.ok) {
            throw new Error(`Status error getting data ${response.status}`);
        }
        const data = await response.json();
        createEventElements(data);
    } catch (err) {
        console.error(err);
    }
}

getDynamicMenuData();
getDynamicEventData();

export { MenuItem, Event };
