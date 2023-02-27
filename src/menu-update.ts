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
    currentMenuSection.innerHTML =
        '<h2 class="current-menu-heading">Current Menu Items:</h2>';
    try {
        const response = await fetch("http://127.0.0.1:3000/api/v1/menu");
        if (!response.ok) {
            throw new Error(`Status error getting data ${response.status}`);
        }
        const data = await response.json();
        data.forEach((item: MenuItem) => {
            const itemContainer = document.createElement("div");
            itemContainer.classList.add("menu-item-container");
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
                getMenuItem(item._id);
            });
            const deleteItemBtn = document.createElement("button");
            deleteItemBtn.classList.add("delete-item-button");
            deleteItemBtn.textContent = "Delete Item";
            itemContainer.append(deleteItemBtn);
            deleteItemBtn.addEventListener("click", () => {
                deleteMenuItem(item._id);
            });
        });
    } catch (err) {
        console.error(err);
        const errorMessage = document.createElement("p");
        errorMessage.classList.add("error-message");
        errorMessage.textContent = "Error getting menu data";
        currentMenuSection.append(errorMessage);
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
        updateMenuItemModal.close();
        getAllMenuItems();
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
        getAllMenuItems();
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
