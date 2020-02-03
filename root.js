$(window).load(init());

function init() {
  console.log("init");
  $("#button").click(function() {
    console.log("clicked");
    // var text = $('#URI').text;
    var text = "text"
    console.log("text : " + text)
    send(text);
  });
}

function send(text) {
  console.log(text);
  console.log("a");
  var json = JSON.stringify({'text': text});
  console.log(json)
  $.ajax({
    type: 'POST ',
    url: 'cgi-bin/python_cgi.py',
    contentType: 'application/json',
    data: json,
    success: function(data) {
      console.log(data);
      console.log(data.text);
      $('#result').empty();
      $('#result').val(data.text);
    }
  });
  
  return false;
}    