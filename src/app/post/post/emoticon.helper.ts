const table: Record<string, string[]> = {
  '🔥': [':fire:'],
  '💩': [':shit:', ':hankey:', ':poop:'],
  '🙏': [':pray:'],
  '😉': [':wink:', ';)', ';-)'],
  '😄': [':smile:', ':)', ':-)'],
  '😊': [':blush:'],
  '😺': [':smiley_cat:'],
  '😸': [':smile_cat:'],
  '😖': [':confounded:'],
  '😳': [':flushed:'],
  '😍': [':heart_eyes:'],
  '👽': [':alien:'],
  '👊': [':facepunch:', ':punch:'],
  '👏': [':clap:'],
  '😎': [':sunglasses:', '8)', '8-)'],
  '😆': [':laughing:'],
  '😀': [':grinning:', ':D', ':-D'],
  '😃': [':smiley:', '=D', '=-D'],
  '😁': [':grin:'],
  '😠': ['>:(', '>:-(', ':angry:'],
  '😑': [':|', ':-|', ':expressionless:'],
  '😕': [':confused:', ':/', ':-/'],
  '😛': [':stuck_out_tongue:', ':p', ':-p', ':P', ':-P'],
  '😜': [':stuck_out_tongue_winking_eye:', ';p', ';-p', ';P', ';-P'],
  '😝': [':stuck_out_tongue_closed_eyes:'],
  '😞': [':disappointed:', ':(', ':-('],
  '😒': [':unamused:'],
  '😢': [":'(", ":'-(", ':cry:'],
  '😂': [':joy:'],
  '😭': [':sob:'],
  '😓': [':sweat:'],
  '😱': [':scream:', ':o', ':O', ':-o', ':-O'],
  '😰': [':cold_sweat:'],
  '😨': [':fearful:'],
  '😶': [':no_mouth:'],
  '😗': [':kissing:'],
  '😚': [':kissing_closed_eyes:'],
  '😙': [':kissing_smiling_eyes:'],
  '😟': [':worried:'],
  '😇': [':innocent:'],
  '😡': [':rage:'],
  '😷': [':mask:'],
  '👍': ['(y)', '(Y)', ':thumbsup:', ':+1:'],
  '👎': ['(n)', '(N)', ':thumbsdown:', ':-1:'],
  '💛': ['<3', ':yellow_heart:', ':heart:'],
  '💥': [':boom:', ':collision:'],
  '✨': [':sparkles:'],
};

function _escapeRegExp(string: string) {
  return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
}

function _replaceAll(string: string, find: string, replace: string) {
  var pre = '(^|[\\s\\0])';
  return string.replace(new RegExp(pre + '(' + _escapeRegExp(find) + ')', 'g'), ' ' + replace);
}

export const emoticonize = (text: string, showEmoticons: boolean) => {
  if (!text || !showEmoticons) {
    return text;
  }

  Object.keys(table).forEach((emoji) => {
    table[emoji].forEach((emoticon: string) => {
      text = _replaceAll(text, emoticon, emoji);
    });
  });

  return text;
};
