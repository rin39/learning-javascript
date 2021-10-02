const inputArea = document.querySelector(".input");
const inputResource = inputArea.querySelector("select");
const inputAmount = inputArea.querySelector("#amount");
const addResource = inputArea.querySelector("#add");
const subtractResource = inputArea.querySelector("#subtract");

const showArea = document.querySelector(".show").children[0];

const createArea = document.querySelector(".create");
const newResourceNameInput = createArea.querySelector("input");
const newResourceCreateButton = createArea.querySelector("button");

const removeResourceButton = createArea.querySelector("#remove-resource");

class Resource {
  constructor(data) {
    this.name = data.name;
    this.amount = data.amount;
  }

  add(amount) {
    this.amount += amount;
  }

  subtract(amount) {
    this.amount -= amount;
    if (this.amount < 0) this.amount = 0;
  }
}

const metal = new Resource({
  name: "METAL",
  amount: 0,
});

const wood = new Resource({
  name: "WOOD",
  amount: 0,
});

const glass = new Resource({
  name: "GLASS",
  amount: 0,
});

const allResources = [metal, wood, glass];

function updateShowArea() {
  indicators = showArea.querySelectorAll("span");
  allResources.forEach((value, index) => {
    indicators[index].textContent = value.amount;
  });
}

function changeAmount(action) {
  const selectedResource = inputResource.value;
  amountToChange = +inputAmount.value;
  for (resource of allResources) {
    if (resource.name === selectedResource) {
      action ? resource.add(amountToChange) : resource.subtract(amountToChange);
    }
  }
  updateShowArea();
}

function createNewResource() {
  newResourceName = newResourceNameInput.value;
  newResourceName = newResourceName.trim().toUpperCase();
  // Check if already exits
  let resourceExists = false;
  allResources.forEach((resource) => {
    if (resource.name === newResourceName) resourceExists = true;
  });
  if (resourceExists) return;
  // Check if input value empty
  if (!newResourceName) return;
  // Create new object and add it to the allResources array
  let newResource = new Resource({
    name: `${newResourceName}`,
    amount: 0,
  });
  allResources.push(newResource);
  // Add new HTML element
  let newEntryP = document.createElement("p");
  newEntryP.innerHTML = `
	${newResource.name}: <span id=${newResource.name}-amount>${newResource.amount}</span>
	`;
  showArea.append(newEntryP);
  // Add to dropdown
  let newEntryOption = document.createElement("option");
  newEntryOption.value = `${newResourceName}`;
  newEntryOption.id = `${newResourceName}`;
  newEntryOption.append(`${newResourceName}`);
  const dropDown = document.querySelector("#resources");
  dropDown.append(newEntryOption);
  updateShowArea();
}

function removeResource() {
  resourceToDelete = newResourceNameInput.value;
  resourceToDelete = resourceToDelete.trim().toUpperCase();
  let resourceExists = false;
  let index;
  allResources.forEach((resource, resourceIndex) => {
    if (resource.name === resourceToDelete) {
      resourceExists = true;
      index = resourceIndex;
    }
  });
  if (!resourceExists) return;
  // Check if input value empty
  if (!resourceToDelete) return;
  // Remove from allResources array
  allResources.splice(index, 1);
  // Remove HTML elemnt
  elementToDelete = showArea.querySelector(
    `#${resourceToDelete}-amount`
  ).parentElement;
  elementToDelete.remove();
  // Remove from dropdown
  optionToDelete = inputResource.querySelector(`#${resourceToDelete}`);
  optionToDelete.remove();
}

addResource.addEventListener("click", changeAmount.bind(this, true));
subtractResource.addEventListener("click", changeAmount.bind(this, false));

newResourceCreateButton.addEventListener("click", createNewResource);
removeResourceButton.addEventListener("click", removeResource);

updateShowArea();
