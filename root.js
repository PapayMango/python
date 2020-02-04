$(window).load(init());

function init() {
  console.log("init");
  $("#button").click(function() {
    console.log("clicked");
    var text = $('#URI').val();
    console.log("text : " + text)
    send(text);
  });
}

function send(text) {
  console.log(text);
  console.log("b");
  var json = JSON.stringify({'url': text});
  console.log(json)
  $.ajax({
    type: 'POST',
    url: 'cgi-bin/python_cgi.py',
    contentType: 'application/json',
    data: json,
    success: function(data) {
      console.log(data);
      console.log(data.url);
      $('#result').empty();
      $('#result').val(data.url);
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.log("リクエスト時にエラーが発生しました\n" + XMLHttpRequest + ":\n" + textStatus +":\n" + errorThrown);
    }
  });
  
  return false;
}    