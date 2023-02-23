import { MenuItem } from "./homepage.js";

const addMenuItemForm = <HTMLFormElement>(
    document.getElementById("add-menu-item-form")
);
const currentMenuSection = <HTMLElement>(
    document.getElementById("current-menu-section")
);
const updateMenuItemModal = <HTMLDialogElement>(
    document.getElementById("update-menu-item-modal")
);
const closeMenuModalBtn = <HTMLButtonElement>(
    document.getElementById("close-menu-modal-button")
);
const updateMenuItemForm = <HTMLFormElement>(
    document.getElementById("update-menu-item-form")
);
const updateNameInput = <HTMLInputElement>(
    document.getElementById("update-name-input")
);
const updatePriceInput = <HTMLInputElement>(
    document.getElementById("update-price-input")
);
const updateDescriptionInput = <HTMLTextAreaElement>(
    document.getElementById("update-description-input")
);
const updateItemId = <HTMLParagraphElement>(
    document.getElementById("update-item-id")
);

async function createMenuItem(e: SubmitEvent) {
    e.preventDefault();
    const form = <HTMLFormElement>e.target;
    const newItemData = new FormData(form);
    try {
        const response = await fetch("http://127.0.0.1:3000/api/v1/menu", {
            method: "POST",
            body: newItemData,
        });
        if (!response.ok) {
            throw new Error(`Status error getting data ${response.status}`);
        }
        const data = await response.json();
        addMenuItemForm.reset();
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}

async function getMenuItem(id: string) {
    try {
        const response = await fetch(`http://127.0.0.1:3000/api/v1/menu/${id}`);
        if (!response.ok) {
            throw new Error(`Status error getting data ${response.status}`);
        }
        const data = await response.json();
        updateNameInput.value = data.name;
        updatePriceInput.value = data.price;
        updateDescriptionInput.textContent = data.description;
        updateItemId.textContent = id;
    } catch (err) {
        console.error(err);
    }
}

async function getAllMenuItems() {
    try {
        const response = await fetch("http://127.0.0.1:3000/api/v1/menu");
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
            const updateItemBtn = document.createElement("button");
            updateItemBtn.classList.add("update-item-button");
            updateItemBtn.textContent = "Update Item";
            itemContainer.append(updateItemBtn);
            updateItemBtn.addEventListener("click", () => {
                updateMenuItemModal.showModal();
                getMenuItem(item.id.toString());
            });
            const deleteItemBtn = document.createElement("button");
            deleteItemBtn.classList.add("delete-item-button");
            deleteItemBtn.textContent = "Delete Item";
            itemContainer.append(deleteItemBtn);
            deleteItemBtn.addEventListener("click", () => {
                deleteMenuItem(item.id.toString());
            });
        });
    } catch (err) {
        console.error(err);
    }
}

async function updateMenuItem(e: SubmitEvent) {
    e.preventDefault();
    const id = updateItemId.textContent;
    const form = <HTMLFormElement>e.target;
    const newItemData = new FormData(form);
    try {
        const response = await fetch(
            `http://127.0.0.1:3000/api/v1/menu/${id}`,
            {
                method: "PATCH",
                body: newItemData,
            }
        );
        if (!response.ok) {
            throw new Error(`Status error getting data ${response.status}`);
        }
        const data = await response.json();
        updateMenuItemForm.reset();
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}

async function deleteMenuItem(id: string) {
    try {
        const response = await fetch(
            `http://127.0.0.1:3000/api/v1/menu/${id}`,
            {
                method: "DELETE",
            }
        );
        if (!response.ok) {
            throw new Error(`Status error getting data ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}

addMenuItemForm.addEventListener("submit", createMenuItem);
updateMenuItemForm.addEventListener("submit", updateMenuItem);
closeMenuModalBtn.addEventListener("click", () => {
    updateMenuItemModal.close();
});

getAllMenuItems();
