var Twit = require('twit');

var T = new Twit({
  consumer_key:         'vg1YvxTYUo8ZodfJIwZuVFUI4',
  consumer_secret:      'Fc1bkK7R2SROcvFRqWUMaRspCQqxRi21W2F0820jNpPU0PxZfh',
  access_token:         '801923513556811776-qbHkEmlcRbqjRfHwebmGf4NNuVuuoqT',
  access_token_secret:  'RAxaakoMQlZmbQrYMfRR4Xbte3TtP9H77BUEC0Z8XY97U',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

var stream = T.stream('statuses/filter', { follow: 'Epic_Mashups' });

stream.on('tweet', postTweet);

function postTweet(tweet) {

    var reply_to = tweet.in_reply_to_screen_name;

    var name = tweet.user.screen_name;

    var id = tweet.id_str;

  if (reply_to === 'TTGrandDad') {

    var generatedText = generateReply();

    var replyText = '@' + reply_to + ' ' + '@' + name + ' ' + generatedText;

    T.post('statuses/update', { status: replyText, in_reply_to_status_id: id}, tweeted);

    function tweeted(err, reply) {
      if (err) {
        console.log(err.message);
      } else {
        console.log('Tweeted: ' + reply.text);
      }
    }
  }
}

function generateReply() {

  var adjective;

  var mid;

  var name;

  switch(Math.floor((Math.random() * 10))){
    
    case 0:
    case 5:
    default:
		adjective = 'Rad';
		break;
    case 1:
		adjective = 'Tubular';
		break;
    case 2:
    case 6:
		adjective = 'Nifty';
		break;
    case 3:
		adjective = 'Wicked';
		break;
    case 4:
    case 7:
		adjective = 'Fresh';
		break;
    case 8:
    case 9:
		adjective = 'Radical';
		break;
  }

  switch(Math.floor((Math.random() * 6))){
    
    case 0:
    case 3:
    default:
		mid = 'Midiswaps';
		break;
    case 1:
    case 5:
		mid = 'Midi swaps';
		break;
    case 2:
    case 4:
		mid = 'Midi-swaps';
		break;
  }

  switch(Math.floor((Math.random() * 4))){
    
    case 0:
    default:
		name = 'Pal';
		break;
    case 1:
		name = 'Bud';
		break;
    case 2:
		name = '';
		break;
    case 3:
		name = 'Guy';
		break;
  }

  return adjective + ' ' + mid + ' ' + name;

}