$(document).ready(function () {
  $("form").submit(function () {
    event.preventDefault();
    //Collect user Inputs and place them in a constructor

    function Cart(pizza_crust, pizza_size, pizza_topping) {
      (this.pizzaCrust = pizza_crust),
        (this.pizzaSize = pizza_size),
        (this.pizzaToppings = pizza_topping);
    }

    var toppingArray = [];

    var pTopping = $('input[name="topping"]:checked').map(function () {
      toppingArray.push($(this).val());
    });

    var userSelection = new Cart(
      $("#pcrust").val(),
      $("#psize").val(),
      toppingArray
    );
    alert(userSelection.pizzaToppings);
  });
});
