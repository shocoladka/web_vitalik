$(document).ready(function() {
  $("#todo-form").submit(function(e) {
    if($("#todo-input").val().length > 0) {
      $("#todo-list").append($('<li class="list-group-item myli">').append(
          $('<input type="checkbox" name="checkbox">')).append(
            "\n<span>" + $("#todo-input").val() + "</span>").append(
              '<button type="button" class="close"><span aria-hidden="true">&times;</span>'));
      $("#todo-input").val("");
      items_left();
    }
    e.preventDefault();
  });
  
  $("#done").click(function() {
    $('input[name="checkbox"]:checked').each(function(i) {
      $(this).parent().remove();
    });
    items_left();
  });

  $('#mark-all').change(function() {
    var t = $(this).is(':checked');
    $('input[name="checkbox"]').each(function(i) {
      $(this).prop('checked', t);
      strike(this);
    });
    items_left();
  })
});

$(document).on('change', 'input[name="checkbox"]', function() {
  strike(this);
  items_left();
});

$(document).on('click', 'button[class="close"]', function() {
  $(this).parent().remove();
  items_left();
});

function items_left() {
  if($('input[name="checkbox"]:checked').length > 0)
    $('#done').show();
  else
    $('#done').hide();
  
  left = $('input[name="checkbox"]').length - $('input[name="checkbox"]:checked').length;
  if(left == 0 && $('input[name="checkbox"]').length > 0)
    $('#mark-all').prop('checked', true);
  else
    $('#mark-all').prop('checked', false);
  $("#items-left").text(left + ' items left');
  $("#todo-input").focus();
}

function strike(e) {
  if(!$(e).is(':checked'))
    $(e).siblings('strike').children().unwrap();
  else
    $(e).siblings('span').wrap("<strike>");
}
