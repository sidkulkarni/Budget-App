/* A constructor function responsible for instances. In this case, if we wanted to have a constructor function for UI we would have this:
function UI (id) {
 this.id = id;
}
*/


// In ES6 we have the class syntax. For the class syntax we have the class keyword.
// Then we would have the name of the class.

//So if we create a new variable and set it to UI class instance, we would be creating a
//new instance for this UI class.

//Whenever we have a class, we also have an option of having a constructor method.
// That constructor method is going to run everytime we are going to instantaite the class.


class UI {
  // in our case we are going to use constructor and preset the properties.
  constructor() { // whenever we have a class, we will have an option of having a constructor method:

    // all these are the properties of the UI class.
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }

  //submit budget method:
  submitBudgetForm(){
    // as it is a form, we can use the property: value to get back the value.
    const value = this.budgetInput.value; //.value because as it is a form, we can use the property: value to get back the value inputted into the form.
    if (value === '' || value < 0){
      this.budgetFeedback.classList.add('showItem'); //adding a class to the variable element using classList.
      this.budgetFeedback.innerHTML = `<p>value cannot be empty or negative.</p>`;   // we use innerHTML for DOM elements. {Note: innerHTML can be textContent or HTML source code.}[As this is not a form, we do not use .value]
      const self = this;
      setTimeout(function(){
         self.budgetFeedback.classList.remove('showItem'); //remving the class for the variable element using classList.
      }, 4000); //the function runs after 4000 milliseconds.
    }
    else{
      this.budgetAmount.textContent = value; //we use textContent for DOM elements. {Note: textContent's value is meant to be text only, not HTML.}[As it s not a part of any form that is why we don't use .value]
      this.budgetInput.value = ''; // as it is a form, we can use the property: value to retrieve the value inputted into the form.
      this.showBalance();
    }
  }

  //show balance:
  showBalance(){
    const expense = this.totalExpense();
    const total = parseInt(this.budgetAmount.textContent) - expense; // parseint used to obtain integer value from the budgetAmount textContent.
    this.balanceAmount.textContent = total;
    if (total<0){
      this.balance.classList.remove("showGreen", "showBlack");
      this.balance.classList.add("showRed");
    }
    else if (total>0){
      this.balance.classList.remove("showRed", "showBlack");
      this.balance.classList.add("showGreen");
    }
    else if (total === 0){
      this.balance.classList.remove("showRed", "showGreen");
      this.balance.classList.add("showBlack");
    }
  }

  //submit expense form:
  submitExpenseForm(){
    // as these are forms, we can use the property: value to get back the value:
    const expenseValue = this.expenseInput.value;//expense value contains string format.
    const amountValue = this.amountInput.value;  //amount value contains string format.

    if (expenseValue === '' || amountValue === '' || amountValue < 0){
      this.expenseFeedback.classList.add('showItem');
      this.expenseFeedback.innerHTML = `<p>values cannot be empty or negative.<p>`
      const self = this;
      setTimeout(function(){
        self.expenseFeedback.classList.remove('showItem');
      }, 4000);
    }

    else{
      let amount = parseInt(amountValue); // now amount is in the number format. No more a string like before.
      this.expenseInput = "";
      this.amountInput = "";

      let expense = {
        id: this.itemID,
        title: expenseValue,
        amount: amount,
      }
      this.itemID++;
      this.itemList.push(expense);
      this.addExpense(expense);
      //show balance.
    }
  }

 //add expense
 addExpense(expense){
  const div = document .createElement('div');
  div.classList.add('expense');
  div.innerHTML = `<div class="expense-item d-flex justify-content-between align-items-baseline">

   <h6 class="expense-title mb-0 text-uppercase list-item">- title</h6>
   <h5 class="expense-amount mb-0 list-item">amount</h5>

   <div class="expense-icons list-item">

    <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
     <i class="fas fa-edit"></i>
    </a>
    <a href="#" class="delete-icon" data-id="${expense.id}">
     <i class="fas fa-trash"></i>
    </a>
   </div>
  </div> `;

 }

  //total expense:
  totalExpense(){
    let total = 400;
    return total;
  }

}

// this is outside of the class. We would want to run these functions as the DOM content loads.
function eventListeners(){
 const budgetForm = document.getElementById("budget-form");
 const expenseForm = document.getElementById("expense-form");
 const expenseList = document.getElementById("expense-list");

  // new instance of UI Class:
  const ui = new UI();

  //budget form submit
  budgetForm.addEventListener('submit', function (event){
     event.preventDefault(); // by this way it is not going to be resubmitting everytime.
     ui.submitBudgetForm();
  })

  //exense form submit:
  expenseForm.addEventListener('submit',function (event){
    event.preventDefault(); // by this way it is not going to be resubmitting everytime.
    ui.submitExpenseForm();
  });

  //expense click:
  expenseList.addEventListener("click", function(){});

}

// The DOMContentLoaded event fires when the initial HTML document has been completely loaded
// and parsed, without waiting for stylesheets, images, and subframes to finish loading.
document.addEventListener('DOMContentLoaded', function (){
  eventListeners();
})



/*
Class List: Add / Remove:
1]var.classList.add("className")
Adds the specified class values to an element/ tag
If these classes already exist in the element's class attribute they are ignored.
2]remove( String [, String [, ...]] )
 Removes the specified class values for an element/tag.
*/

/*
setTimeout:
Executes a function, after waiting a specified number of milliseconds.

setInterval(function, milliseconds)
Same as setTimeout(), but repeats the execution of the function continuously.

The setTimeout() and setInterval() are both methods of the HTML DOM Window object.


This Operator usage:
It has different values depending on where it is used:

->In a method, this refers to the owner object.
->Alone, this refers to the global object.
->In a function, this refers to the global object.
->In a function, in strict mode, this is undefined.
->In an event, this refers to the element that received the event.
->Methods like call(), and apply() can refer this to any object.



*/
