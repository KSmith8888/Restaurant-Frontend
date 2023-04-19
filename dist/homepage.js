var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mainMenuItems = (document.getElementById("main-menu-items"));
const highlightMenuItem = (document.getElementById("highlight-menu-item"));
const eventsContainer = (document.getElementById("events-container"));
function createMenuElements(data) {
    data.forEach((item, index) => {
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
        }
        else {
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
function createEventElements(data) {
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
function getDefaultMenuData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("./assets/default-menu-data.json");
            if (!response.ok) {
                throw new Error(`Status error getting data ${response.status}`);
            }
            const data = yield response.json();
            createMenuElements(data);
        }
        catch (err) {
            console.error(err);
            const errorMessage = document.createElement("p");
            errorMessage.classList.add("error-message");
            errorMessage.textContent = "Error getting menu data";
            mainMenuItems.append(errorMessage);
        }
    });
}
function getDynamicMenuData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://127.0.0.1:3000/api/v1/menu");
            if (!response.ok) {
                throw new Error(`Status error getting data ${response.status}`);
            }
            const data = yield response.json();
            if (data.length > 0) {
                createMenuElements(data);
            }
            else {
                getDefaultMenuData();
            }
        }
        catch (err) {
            console.error(err);
            getDefaultMenuData();
        }
    });
}
function getDynamicEventData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://127.0.0.1:3000/api/v1/events");
            if (!response.ok) {
                throw new Error(`Status error getting data ${response.status}`);
            }
            const data = yield response.json();
            if (data.length > 0) {
                createEventElements(data);
            }
            else {
                getDefaultEventData();
            }
        }
        catch (err) {
            console.error(err);
            getDefaultEventData();
        }
    });
}
function getDefaultEventData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("./assets/default-event-data.json");
            if (!response.ok) {
                throw new Error(`Status error getting data ${response.status}`);
            }
            const data = yield response.json();
            createEventElements(data);
        }
        catch (err) {
            console.error(err);
        }
    });
}
getDynamicMenuData();
getDynamicEventData();
export {};
