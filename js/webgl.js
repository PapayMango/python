var webgl
var v_shader    
var f_shader
var urls = ['js/vertex_shader.vert','js/fragment_shader.frag']
var sources = []
var vaos = []
var vbos = []
var ibos = []

$(window).on('load',function(){

    var canvas = document.getElementById('result')
    canvas.clientWidth = 500;
    canvas.clientHeight = 300;
    webgl = canvas.getContext('webgl2')
    webgl.clearColor(0.0, 0.0, 0.0, 0.01)
    webgl.clearDepth(1.0);
    webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);

    function error_callback(req,err) {
        console.log("Error while loading '" + urls + "'.");
        console.log(req,err);
        reject(new Error(request.statusText));
    }

    var promises = urls.map((url) => {
        return new Promise((resolve,reject)=>{
            request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.setRequestHeader('Pragma', 'no-cache');
            request.setRequestHeader('Cache-Control', 'no-cache');
            request.setRequestHeader('If-Modified-Since', 'Thu, 01 Jun 1970 00:00:00');
            request.responseType = "text";
            request.onload = function () {
                if (this.readyState == 4 || this.status == 200) {
                    sources.push(this.responseText);
                } else { 
                    console.log("Error while loading '" + this.status + "'.");
                }
                resolve();
            }
            request.onerror = error_callback;
            request.send();   
        });
    })
    Promise.all(promises).then(()=>{
        v_shader = create_shader(sources[0],'vertex');
        f_shader = create_shader(sources[1],'fragment');
        create_program(v_shader,f_shader);
    }).catch((reason)=>{
        console.log("error");
        console.log(reason);
    })
})

function create_ibo(data){

    var ibo = webgl.createBuffer();
    
    webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER, ibo);
    
    webgl.bufferData(webgl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), webgl.STATIC_DRAW);
    
    webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER, null);
    
    return ibo;
}

function create_vbo(data){

    var vbo = webgl.createBuffer();
    
    webgl.bindBuffer(webgl.ARRAY_BUFFER, vbo);

    webgl.bufferData(webgl.ARRAY_BUFFER, new Float32Array(data), webgl.STATIC_DRAW);
    
    webgl.bindBuffer(webgl.ARRAY_BUFFER, null);
    
    return vbo;
}

function create_vao(data){

    
}

function create_shader(source,type){
    var shader;    
    switch(type){
        case "vertex":
            shader = webgl.createShader(webgl.VERTEX_SHADER);
            break;
        case 'fragment':
            shader = webgl.createShader(webgl.FRAGMENT_SHADER);
            break;
        default :
            return;
    }
    webgl.shaderSource(shader, source);
    webgl.compileShader(shader);
    
    if(webgl.getShaderParameter(shader, webgl.COMPILE_STATUS)){
        return shader;
    }else{
        alert(webgl.getShaderInfoLog(shader) + ' : ' + type + ' : ' + source);
    }
}

function create_program(vs, fs){

    var program = webgl.createProgram();
    
    webgl.attachShader(program, vs);
    webgl.attachShader(program, fs);
    
    webgl.linkProgram(program);

    if(webgl.getProgramParameter(program, webgl.LINK_STATUS)){
    
        webgl.useProgram(program);
        
        return program;
    }else{
        
        alert(webgl.getProgramInfoLog(program));
    }
}

function draw_result(){
    
}