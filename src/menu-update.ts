import { MenuItem } from "./homepage.js";

const addMenuItemForm = <HTMLFormElement>(
    document.getElementById("add-menu-item-form")
);
const currentMenuSection = <HTMLElement>(
    document.getElementById("current-menu-section")
);

addMenuItemForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = <HTMLFormElement>e.target;
    const newItemData = new FormData(form);
    const response = await fetch(`http://127.0.0.1:3000/add`, {
        method: "POST",
        body: newItemData,
    });
    const data = await response.json();
    addMenuItemForm.reset();
    console.log(data);
});

async function getMenuData() {
    try {
        const response = await fetch("http://127.0.0.1:3000/menu");
        if (!response.ok) {
            throw new Error(`Status error getting data ${response.status}`);
        }
        const data = await response.json();
        data.forEach((item: MenuItem) => {
            const itemContainer = document.createElement("div");
            itemContainer.classList.add("menu-item.container");
            currentMenuSection.append(itemContainer);
            const itemDetails = document.createElement("p");
            itemDetails.classList.add("item-details");
            itemDetails.textContent = item.name;
            itemContainer.append(itemDetails);
        });
    } catch (err) {
        console.error(err);
    }
}

getMenuData();
