const addMenuItemForm = <HTMLFormElement>(
    document.getElementById("add-menu-item-form")
);
const nameInput = <HTMLInputElement>document.getElementById("name-input");
const priceInput = <HTMLInputElement>document.getElementById("price-input");
const descriptionInput = <HTMLInputElement>(
    document.getElementById("description-input")
);
const imageInput = <HTMLInputElement>document.getElementById("image-input");

addMenuItemForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = <HTMLFormElement>e.target;
    const data = new FormData(form);
    console.log(data);
    addMenuItemForm.reset();
});
