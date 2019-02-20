/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from tweets.json
const datas = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

function renderTweets(tweets) {
  tweets.forEach( function(elm) {
    let post = createTweetElement(elm);
    $('.container').append(post)
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
              <p>${elm['content']['text']}</p>
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

$(document).ready(function() {
  renderTweets(datas);

  $( ".tweet-form" ).submit(function( event ) {
  event.preventDefault();
  // console.log($(this).serialize());
  let tweet = $(this).serialize()
  $.post( "/tweets", tweet, function( data ) {
    alert("Data: " + tweet);
  });


});

})