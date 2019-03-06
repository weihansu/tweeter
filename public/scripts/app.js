/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// function to calculate date until now using moment.js
function diffDate(tweetDate) {
  return (moment(parseInt(tweetDate)).fromNow());
};

// functin to validade spaces
function valSpaces(val) {
  let testStr = val.match(/[A-Za-z0-9-]/g);

  if(testStr) {
    return true;
  } else {
    return false;
  }
}

// function to escape unsafe tweets
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function renderTweets(tweets) {
  tweets.forEach( function(tweetObj) {
    let tweet = createTweetElement(tweetObj);
    $('.new-tweet').after(tweet);

    // add opacity when mouseover
    $('.tweeted').on('mouseover' , function(e){
      $(this).css('opacity', 1);
    });
    $('.tweeted').on('mouseout' , function(e){
      $(this).css('opacity', 0.5);
    });

    // when click in icons' rules
    $('.icon-flag').on('click' , function(e){
      $(this).css('opacity', 1);
    });
    $('.icon-like').on('click' , function(e){
      $(this).css('opacity', 1);
    });
    $('.icon-retwitte').on('click' , function(e){
      $(this).css('opacity', 1);
    });
  });
}

function createTweetElement(tweetObj) {
  let tweet = `
        <article class='tweeted'>
          <div class="tweeted-head">
            <img class="profile-photo tweeted-heading" src="${tweetObj['user']['avatars']['small']}" alt="">
            <h2 class="tweeted-heading" >${tweetObj['user']['name']}</h2>
            <span class="tweeted-heading-right">${tweetObj['user']['handle']}</span>
          </div>
          <div>
            <article class="tweeted-msg">
              <p>${escape(tweetObj['content']['text'])}</p>
            </article>
          </div>
          <div>
            <footer class="tweeted-footer">
              <span>${diffDate(tweetObj['created_at'])}</span>
              <img class="img-compose-icon icon-like" src="/images/like.svg">
              <img class="img-compose-icon icon-retwitte" src="/images/retwitte.svg">
              <img class="img-compose-icon icon-flag" src="/images/other.svg">
            </footer>
          </div>
        </article>
        `
  return tweet;
}

// RUN JQUERY AFTER DOCUMENT READY
$(document).ready(function() {

// load olds tweets
  $.ajax('/tweets', {method: 'GET', dataType: 'json'})
    .then(function(res) {
      renderTweets(res)
    });

// POST > new tweets and update tweets
  $( ".tweet-form" ).submit(function( event ) {
    event.preventDefault();
    let tweet = $(this).serialize()
    let val = tweet.split('=').slice(1).join('');

    if (val.length <= 140 && val && valSpaces(val)) {
      $('.tweet-error').css('opacity', 0);
      $('textarea').val('');
      $(".counter").text('140');

      $.ajax({
          url: '/tweets',
          type: 'post',
          data: tweet,
          success: function(){
            $.ajax('/tweets', {method: 'GET', dataType: 'json'})
              .then(function(res) {
                let lastTweet = []
                lastTweet.push(res[res.length - 1]);
                renderTweets(lastTweet)
              })
          }
      })
    } else if (val.length > 140) {
      $('.tweet-error').text('Your tweets has more than 140 characters!');
      $('.tweet-error').css('opacity', 1);
    } else {
      $('.tweet-error').text('Enter a valid tweet');
      $('.tweet-error').css('opacity', 1);
    }
  });
})