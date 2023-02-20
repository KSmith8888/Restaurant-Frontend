const addMenuItemForm = <HTMLFormElement>(
    document.getElementById("add-menu-item-form")
);
const nameInput = <HTMLInputElement>document.getElementById("name-input");
const priceInput = <HTMLInputElement>document.getElementById("price-input");
const descriptionInput = <HTMLInputElement>(
    document.getElementById("description-input")
);
const imageInput = <HTMLInputElement>document.getElementById("image-input");

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
