$(document).ready(function() {
  var elems = JSON.parse(localStorage.getItem("ThingsToDo"));
  for (i in elems)
    addThing(elems[i]);

  $("#todo-form").submit(function(e) {
    if($("#todo-input").val().length > 0) {
      addThing($("#todo-input").val());
      $("#todo-input").val("");
      update();
    }
    e.preventDefault();
  });
  
  $("#done").click(function() {
    $('input[name="checkbox"]:checked').each(function(i) {
      $(this).parent().remove();
    });
    update();
  });

  $('#mark-all').change(function() {
    var t = $(this).is(':checked');
    $('input[name="checkbox"]').each(function(i) {
      $(this).prop('checked', t);
      strike(this);
    });
    update();
  })
  update();
});

$(document).on('change', 'input[name="checkbox"]', function() {
  strike(this);
  update();
});

$(document).on('click', 'button[class="close"]', function() {
  $(this).parent().remove();
  update();
});

$(document).on('dblclick', 'span[name="text"]', function() {
  $(this).replaceWith($('<input name="text">').val(this.innerHTML));
  $('input[name="text"]').focus();
  $('input[name="text"]').on('blur', function() {
    if($(this).val().length == 0)
      $(this).parent().remove();
    $(this).replaceWith($('<span name="text">').html($(this).val()));
    update();
  });
  $('input[name="text"]').on('keypress', function(e) {
    if (e.which == 13) {
      if($(this).val().length == 0)
        $(this).parent().remove();
      $(this).replaceWith($('<span name="text">').html($(this).val()));
      update();
    }
  });
});

function update() {
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

  var elems = $('span[name="text"]').toArray();
  for (i in elems)
    elems[i] = elems[i].innerHTML
  
  localStorage.setItem("ThingsToDo", JSON.stringify(elems));

  $("#todo-input").focus();
}

function strike(e) {
  if(!$(e).is(':checked'))
    $(e).siblings('strike').children().unwrap();
  else
    $(e).siblings('span').wrap("<strike>");
}

function addThing(e) {
  $("#todo-list").append($('<li class="list-group-item myli">').append(
    $('<input type="checkbox" name="checkbox">')).append(
      '\n<span name="text">' + e + "</span>").append(
        '<button type="button" class="close"><span aria-hidden="true">&times;</span>'));
}
