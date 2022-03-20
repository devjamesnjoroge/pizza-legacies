$(document).ready(function() {
    //User Inputs Constructor
    function Cart(pizza_crust, pizza_size, pizza_topping) {
        (this.pizzaCrust = pizza_crust),
        (this.pizzaSize = pizza_size),
        (this.pizzaToppings = pizza_topping);
    }


    //Pizza Size to Amount prototype.

    Cart.prototype.SizeAmount = function() {
        var pizzaSizeAmount = [];

        switch (this.pizzaSize) {
            case "small":
                pizzaSizeAmount.push(500);
                break;
            case "medium":
                pizzaSizeAmount.push(800);
                break;
            case "large":
                pizzaSizeAmount.push(1200)
                break;
            default:
                pizzaSizeAmount.push(0)
        }

        return pizzaSizeAmount;
    }

    //Pizza Crust to Amount Prototype.

    Cart.prototype.CrustAmount = function() {
        var pizzaCrustAmount = []

        switch (this.pizzaCrust) {
            case "crispy":
                pizzaCrustAmount.push(300);
                break;
            case "Stuffed":
                pizzaCrustAmount.push(350);
                break;
            case "glutten_free":
                pizzaCrustAmount.push(400);
                break;
            case "Tasmania":
                pizzaCrustAmount.push(450);
                break;
            default:
                pizzaCrustAmount.push(0);

        }

        return pizzaCrustAmount;
    }

    //The User Interface Logic

    $("form").submit(function() {
        event.preventDefault();
        //Collect user Inputs and place them in a constructor
        var toppingArray = [];

        var pTopping = $('input[name="topping"]:checked').map(function() {
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
            $("#txt_amount").text(userSelection.CrustAmount());

            $("tbody").prepend(
                " <tr><td id='txt_size' class='ps-3 pb-3'><span>" +
                userSelection.pizzaSize +
                "</span></td><td align='center' class='ps-3 pb-3'>" + userSelection.SizeAmount() + "</td><td align='center' class='ps-3 pb-3 pe-3'>-</td > < /tr>"
            );

            userSelection.pizzaToppings.forEach((topping) => {

                //COMBINED BUSINESS LOGIC WITH USER INTEFACE: LOOKING FOR METHOD TO MANOUVER THIS. CONTRIBUTE IF YOU HAVE A SOLUTION

                switch (userSelection.pizzaSize) {
                    case "small":
                        toppingAmount = 200;
                        break;
                    case "medium":
                        toppingAmount = 300;
                        break;
                    case "large":
                        toppingAmount = 400;
                        break;
                    default:
                        toppingAmount = 0;
                }

                $("tbody").append(
                    '<tr><td class="pb-3 ps-3">' +
                    topping +
                    '</td><td align="center" class="ps-3 pb-3">' + toppingAmount + '</td><td align = "center" class = "ps-3 pb-3 pe-3"></td></tr>');
            });


            //Make Formto disapper
            $("form").trigger("reset");
            $("#form").css("display", "none");
            $("#summary").css("display", "flex");


            //Empty the Cart Button
            $("#btn_empty").click(function() {
                location.reload();
                location.href($("#order"));
            });
        }
    });


});