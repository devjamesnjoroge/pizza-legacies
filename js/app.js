$(document).ready(function() {

    $("#ncart").hide()

    //Cart Addition and Substracting Items

    var n = 1
    $("#n").text(n)
    $("#ncart").text(n)

    //PLUS BUTTON

    $("#plusBtn").click(function() {

        if (n < 50) {
            n += 1;
            $("#n").text(n)
            $("#ncart").text(n)
            $("#totalNumbers").text(sumTotal * n);
        } else {
            $("#n").text(n)
            $("#ncart").text(n)
            $("#totalNumbers").text(sumTotal * n);
        }
    })

    //MINUS BUTTON

    $("#minusBtn").click(function() {

        if (n > 1) {
            n -= 1;
            $("#n").text(n)
            $("#totalNumbers").text(sumTotal * n);
        } else {
            $("#n").text(n)
            $("#totalNumbers").text(sumTotal * n);
        }

    })


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

    $("#form1").submit(function() {
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


            //TOTAL AMOUNT ARRAY - TAKE IN ALL VALUES. UNIVERSAL SCOPE

            var totalToppingsArray = [userSelection.SizeAmount(), userSelection.CrustAmount()];


            //COMBINED BUSINESS LOGIC WITH USER INTEFACE: LOOKING FOR METHOD TO MANOUVER THIS. CONTRIBUTE IF YOU HAVE A SOLUTION
            userSelection.pizzaToppings.forEach((topping) => {

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

                totalToppingsArray.push(toppingAmount)

            });


            sumTotal = 0;

            for (i = 0; i < totalToppingsArray.length; i++) {
                sumTotal += parseInt(totalToppingsArray[i]);
            }

            //APPEND TOTAL AMOUNT TO HTML TABLE

            $("#total").text(sumTotal);

            //TOTAL AMOUNT BY NUMBER
            $("#totalNumbers").text(sumTotal * n);

            //SHOW NUMBER OF ITEMS IN CART

            $("#ncart").show()


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

    //COMPLETE ORDER BUTTON EVENT.

    $("#btn_order").click(function() {
        $("#summary").css("display", "none");
        $(".delivery_container").css("display", "flex");
    })

    //DELIVERY BUTTON.

    $("#form2").submit(function() {
        event.preventDefault();
        if ($("#bool").val() === "blank") {
            alert("Please Select a Yes or a No!");
        } else if ($("#bool").val() === "yes") {
            $(".delivery_container").css("display", "none");
            $(".location_delivery").css("display", "flex");
        } else {
            alert("Your total cost of pizza is, " + sumTotal * n + " .Thank you for shopping with us. Pickup will be ready within 24 hours");
            location.reload()
        }
    })

    //LOCATION BUTTON



    $("#form3").submit(function() {
        var totalPlusDelivery = 300 + parseInt(sumTotal * n)
        event.preventDefault();
        alert($("#fname").val() + ", The delivery fee to " + $("#loc").val() + " is 300ksh. Therefore your total charge is 300 + " + sumTotal * n + " =" + totalPlusDelivery + '. We Shall reach out to you via your number, Thank you for shopping with us');
        location.reload()
    })

    //HERO BTN CLICK EVENT

    $("#hero_btn").wrap("<a href='#order'></a>");
});