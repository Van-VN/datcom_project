$(document).ready(function() {
  calcTotal();
});

$('.btn-remove').click(function(e) {
  var td = e.target.parentElement;
  var tr = td.parentElement;
  tr.remove();
  calcTotal();
})


function calcTotal() {
  var total = getSum($('.price-value'));
  $('#total-amount').text(total);
  $('#total-discount').text(total);
}

function getSum(items) {
  var total = 0;
  for (i = 0; i < items.length; i++) {
    var price = parseInt(items[i].value);
    total += price;
  }
  return total;
}