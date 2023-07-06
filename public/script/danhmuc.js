$('.btn[data-radio-name]').click(function() {
  
  $('.btn[data-radio-name="' + $(this).data('radioName') + '"]').removeClass('active');
  $('input[name="' + $(this).data('radioName') + '"]').val(
    $(this).text()
  );
});

$('.btn[data-checkbox-name]').click(function() {
  $('input[name="' + $(this).data('checkboxName') + '"]').val(
    $(this).hasClass('active') ? 0 : 1
  );
  console.log('1');
});
