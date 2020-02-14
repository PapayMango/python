$(window).load(init());

function init() {
  console.log("init");
  $("#button").click(function() {
    console.log("clicked");
    var text = $('#URI').val();
    console.log("text : " + text)
    send(text);
  });
  console.log($('#result').get(0));
  console.log(document.getElementById('result'));
  $('#result')[0].addEventListener('success',draw_result);
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
      console.log(data.div);
      $('#result').empty();
      $('#result').val(data.div);
      triggerEvent($('#result'),'success');
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.log("リクエスト時にエラーが発生しました\n" + XMLHttpRequest + ":\n" + textStatus +":\n" + errorThrown);
    }
  });
  
  return false;
}

function triggerEvent(element, event) {
  if (document.createEvent) {
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent(event, true, true );
      console.log('chrome event thrown');
      console.log(document.getElementById('result'));
      console.log(element);
      element.get(0).dispatchEvent(evt);
      // document.getElementById('result').dispatchEvent(evt);
  } else {
      var evt = document.createEventObject();
      console.log('IE event thrown');
      element.fireEvent("on"+event, evt)
  }
}
