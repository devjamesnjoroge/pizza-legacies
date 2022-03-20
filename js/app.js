$(document).ready(function () {
  //User Inputs Constructor
  function Cart(pizza_crust, pizza_size, pizza_topping) {
    (this.pizzaCrust = pizza_crust),
      (this.pizzaSize = pizza_size),
      (this.pizzaToppings = pizza_topping);
  }

  $("form").submit(function () {
    event.preventDefault();
    //Collect user Inputs and place them in a constructor
    var toppingArray = [];

    var pTopping = $('input[name="topping"]:checked').map(function () {
      toppingArray.push($(this).val());
    });

    var userSelection = new Cart(
      $("#pcrust").val(),
      $("#psize").val(),
      toppingArray
    );
    if (
      userSelection.pizzaCrust === "blank" ||
      userSelection.pizzaSize === "blank"
    ) {
      alert("Error, select the starred options");
    }
    //append UserSelected Items to order Summary
    else {
      $("#txt_crust").css("display", "flex");
      $("#txt_crust").text(userSelection.pizzaCrust + " Crust");

      $("tbody").prepend(
        " <tr><td id='txt_size' class='ps-3 pb-3'><span>" +
          userSelection.pizzaSize +
          "</span></td><td align='center' class='ps-3 pb-3'>1200</td><td align='center' class='ps-3 pb-3 pe-3'>-</td></tr>"
      );

      userSelection.pizzaToppings.forEach((topping) => {
        $("tbody").append(
          '<tr><td class="pb-3 ps-3">' +
            topping +
            '</td><td align="center" class="ps-3 pb-3"></td><td align="center" class="ps-3 pb-3 pe-3"></td></tr>'
        );
      });
      $("form").trigger("reset");
      $("#form").css("display", "none");
      $("#summary").css("display", "flex");
      //Empty the Cart Button
      $("#btn_empty").click(function () {
        location.reload();
        location.href($("#order"));
      });
    }
  });
});
