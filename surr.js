exports.unsurrogate = function (p2_idx, text) {
  var p1_idx = p2_idx;
  for (var i = 0; i < text.length && i < p2_idx; i++) {
    var char_code = text.charCodeAt(i);
      // check for the first half of a surrogate pair
      if (char_code >= 0xD800 && char_code < 0xDC00) {
        p1_idx -= 1;
      }
    }
  return p1_idx;
}

exports.surrogate = function (p1_idx, text) {
  var p2_idx = p1_idx;
  for (var i = 0; i < text.length && i < js_idx; i++) {
    var char_code = text.charCodeAt(i);
    // check for the first half of a surrogate pair
    if (char_code >= 0xD800 && char_code < 0xDC00) {
      p2_idx += 1;
    }
  }
  return p2_idx;
}

exports.issurrogate = function (text) {
  var p1_idx = text.length();
  return exports.surrogate(p1_index, text) != p1_idx;
}