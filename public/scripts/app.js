/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function renderTweets(tweets) {
  tweets.forEach( function(elm) {
    let post = createTweetElement(elm);
    $('.new-tweet').after(post)
  });
}

function createTweetElement(elm) {
  let tweet = `
        <article class='tweeted'>
          <div class="tweeted-head">
            <img class="profile-photo tweeted-heading" src="${elm['user']['avatars']['small']}" alt="">
            <h2 class="tweeted-heading" >${elm['user']['name']}</h2>
            <span class="tweeted-heading-right">${elm['user']['handle']}</span>
          </div>
          <div>
            <article class="tweeted-msg">
              <p>${escape(elm['content']['text'])}</p>
            </article>
          </div>
          <div>
            <footer class="tweeted-footer">
              <span>${elm['created_at']}</span>
            </footer>
          </div>
        </article>
        `
  return tweet;
}

function loadTweets() {
  const result = []
  const $form = $('.tweet-form');
  $form.submit(function(){
    $.ajax('/tweets', {method: 'GET', dataType: 'json'})
    .then(function(res) {
      renderTweets(res)
    })

  })
}

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


$(document).ready(function() {
  // loadTweets()
  // renderTweets(datas);
  $.ajax('/tweets', {method: 'GET', dataType: 'json'})
    .then(function(res) {
      renderTweets(res)
    })

  $( ".tweet-form" ).submit(function( event ) {
    event.preventDefault();
    let tweet = $(this).serialize()
    let val = tweet.split('=').slice(1).join('');
    if (val.length <= 140 && val) {
      $('.tweet-error').css('opacity', 0)
      $.post( "/tweets", tweet, function( data ) {
        loadTweets()
        // renderTweets(data);
        // console.log(data)
      });
    } else if (val.length > 140) {
      // alert('Your tweets has more than 140 characters!')
      $('.tweet-error').text('Your tweets has more than 140 characters!')
      $('.tweet-error').css('opacity', 1)

    } else {
      // alert('Enter a valid tweet')
      $('.tweet-error').text('Enter a valid tweet')
      $('.tweet-error').css('opacity', 1)
    }

  });
})