$(".btn-add").click(function() {
  var countText = $('#item-number').text();
  $('#item-number').text(parseInt(countText) + 1);
});
