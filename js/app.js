$(document).ready(function () {
  $("form").submit(function () {
    event.preventDefault();
  });
  $("button").click(function () {
    $(".card_container").css("display", "none");
  });
});
