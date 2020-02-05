var canvas = document.getElementById('result')
canvas.clientWidth = 500;
canvas.clientHeight = 300;
var webgl = canvas.getContext('webgl')
webgl.clearColor(0.0, 0.0, 0.0, 0.01)
webgl.clear(webgl.COLOR_BUFFER_BIT)
