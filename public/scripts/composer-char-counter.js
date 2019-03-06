$(document).ready(function() {
  let counter = 140;
  const notCountArray = [8, 91, 18, 17, 16, 20, 9]

// calculate and update tweet char counter
  $('textarea').keyup(function(e){
    let inTextArea = $(this).val().length;
    let keyCode = e.keyCode;
    $('.tweet-error').text('');

    if (counter - inTextArea < 0) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', 'black');
    }
    $(".counter").text(counter - inTextArea);
  });

// add opacity in new-tweet class with mouseover and mouseout
  $('.new-tweet').on('mouseover' , function(e){
    $(this).css('opacity', 1);
  });
  $('.new-tweet').on('mouseout' , function(e){
    $(this).css('opacity', 0.5);
  });

// add opacity in button-compose class with mouseover and mouseout
  $('.button-compose').mouseover(function(e){
    $(this).css('opacity', 0.6);
  })
  $('.button-compose').mouseout(function(e){
    $(this).css('opacity', 1);
  })

// add slideToggle in button-compose to toggle new-tweet
  $('.button-compose').click(function(){
    $('.new-tweet').slideToggle('slow', 'linear');
  });

});
