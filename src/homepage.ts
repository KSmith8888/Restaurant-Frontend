const menuSection = <HTMLElement>document.getElementById("menu-section");
const mainMenuItems = <HTMLDivElement>(
    document.getElementById("main-menu-items")
);
const highlightMenuItem = <HTMLDivElement>(
    document.getElementById("highlight-menu-item")
);

interface MenuItem {
    Id: number;
    Name: string;
    Description: string;
    Price: number;
    Alt: string;
    Highlight: boolean;
}

async function getDefaultMenuData() {
    try {
        const response = await fetch("./assets/default-menu-data.json");
        if (!response.ok) {
            throw new Error(`Status error getting data ${response.status}`);
        }
        const data = await response.json();
        data.map((item: MenuItem) => {
            const menuItemContainer = document.createElement("div");
            const menuItemImage = document.createElement("img");
            menuItemImage.src = `./assets/images/menu-image-${item.Id}.jpg`;
            menuItemImage.alt = item.Alt;
            menuItemContainer.append(menuItemImage);
            const menuItemInfo = document.createElement("div");
            menuItemContainer.append(menuItemInfo);
            const menuItemName = document.createElement("h3");
            menuItemName.classList.add("menu-item-name");
            menuItemName.textContent = `${item.Name} - $${item.Price.toFixed(
                2
            )}`;
            menuItemInfo.append(menuItemName);
            const menuItemDescription = document.createElement("p");
            menuItemDescription.classList.add("menu-item-description");
            menuItemDescription.textContent = item.Description;
            menuItemInfo.append(menuItemDescription);
            if (item.Highlight) {
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
    } catch (err) {
        console.error(err);
    }
}

getDefaultMenuData();
