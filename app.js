// Storage controller

// Item Controller
const ItemCtrl = (function () {
  const Item = function (id, name, calories) {
    (this.id = id), (this.name = name), (this.calories = calories);
  };

  // Data structure / state
  const data = {
    items: [
      { id: 0, name: "Steak Dinner", calories: 1200 },
      { id: 2, name: "Candy Bar", calories: 1000 },
      { id: 3, name: "Eggs", calories: 50 },
    ],
    currentItem: null,
    totalCalories: 0,
  };

  // Public methods
  return {
    getItems: function () {
      return data.items;
    },
    logData: function () {
      return data;
    },
    addItem: (name, calories) => {
      console.log(name, calories);
    },
  };
})();

// UI Controller
const UICtrl = (function () {
  const UISelectors = {
    itemList: "#item-list",
    addBtn: ".add-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
  };

  // Public methods
  return {
    populateItemList: function (items) {
      let html = "";
      items.forEach((item) => {
        html += `<li class="collection-item" id='${item.id}'>
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
      </li>`;
      });
      // Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getSelectors: function () {
      return UISelectors;
    },
    getItemInput: () => {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      };
    },
  };
})();

// App Controller
const App = ((ItemCtrl, UICtrl) => {
  // Load Event listeners
  const loadEventListeners = () => {
    const UISelectors = UICtrl.getSelectors();
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);
  };

  // Add Item submit
  const itemAddSubmit = (e) => {
    //  Get form input from UICtrl
    const input = UICtrl.getItemInput();

    if (input.name !== "" && input.calories !== "") {
      const newItem = ItemCtrl.addItem(input.name, input.calories);
    }

    e.preventDefault();
  };
  return {
    init: function () {
      // Fetch items from data structure
      const items = ItemCtrl.getItems();
      // Populate list with items
      UICtrl.populateItemList(items);

      // Load event listeners
      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl);

// Initialize
App.init();
