/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function diffDate(tweetDate) {
  let now = new Date();
  let diffDays = Math.floor((now - tweetDate) / (1000*60*60*24));
  let diffHours = Math.floor((now - tweetDate) / (1000*60*60));
  let diffMinutes = Math.floor((now - tweetDate) / (1000*60));

  if (diffDays > 0) {
    return `${diffDays} days ago`;
  } else if (diffDays === 0 && diffHours > 0) {
    return `${diffHours} hours ago`;
  } else {
    return `${diffMinutes} minutes ago`;
  }
};

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


function renderTweets(tweets) {
  tweets.forEach( function(elm) {
    let tweet = createTweetElement(elm);
    $('.new-tweet').after(tweet)
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
              <span>${diffDate(elm['created_at'])}</span>
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
      console.log(typeof res);
      console.log(typeof res[res.length - 1])
      renderTweets(res)
    })

// POST > new tweets and update tweets
  $( ".tweet-form" ).submit(function( event ) {
    event.preventDefault();
    let tweet = $(this).serialize()
    let val = tweet.split('=').slice(1).join('');
    if (val.length <= 140 && val) {
      $('.tweet-error').css('opacity', 0)

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
      $('.tweet-error').text('Your tweets has more than 140 characters!')
      $('.tweet-error').css('opacity', 1)
    } else {
      $('.tweet-error').text('Enter a valid tweet')
      $('.tweet-error').css('opacity', 1)
    }
  });
})