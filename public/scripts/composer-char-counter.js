$(document).ready(function() {
  let counter = 140;
  const notCountArray = [8, 91, 18, 17, 16, 20, 9]

  $('textarea').keyup(function(e){
    let inTextArea = $(this).val().length;
    let keyCode = e.keyCode;

    if (counter - inTextArea < 0) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', 'black');
    }

    $(".counter").text(counter - inTextArea);
  });

  $('.tweeted').mouseover(function(e){
    $(this).css('opacity', 1);
  })
  $('.tweeted').mouseout(function(e){
    $(this).css('opacity', 0.75);
  })

  $('.button-compose').mouseover(function(e){
    $(this).css('opacity', 0.6);
  })
  $('.button-compose').mouseout(function(e){
    $(this).css('opacity', 1);
  })

  $('.button-compose').click(function(){
    $('.new-tweet').slideToggle('slow', 'linear');
  });
});
