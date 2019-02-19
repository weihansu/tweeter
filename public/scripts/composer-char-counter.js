$(document).ready(function() {
  let counter = 140;
  const notCountArray = [8, 91, 18, 17, 16, 20, 9]

  $('textarea').keydown(function(e){
    let keyCode = e.keyCode;

    if (counter < 0) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', 'black');
    }

    if (!notCountArray.includes(keyCode)) {
      counter += -1;
      $(".counter").text(counter);
    } else if (keyCode === 8) {
      if (counter > 140) {
        $(".counter").text(140);
      } else {
        counter += 1;
        $(".counter").text(counter);
      }
    }
  })
});
