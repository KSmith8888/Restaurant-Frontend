const mainMenuItems = <HTMLDivElement>(
    document.getElementById("main-menu-items")
);
const highlightMenuItem = <HTMLDivElement>(
    document.getElementById("highlight-menu-item")
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

function createMenuElements(data: MenuItem[]) {
    data.forEach((item: MenuItem) => {
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
        }
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
        const response = await fetch("http://127.0.0.1:3000/api/v1/menu");
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

getDynamicMenuData();

export { MenuItem };
