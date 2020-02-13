// import vertexShader from 'vertexShader.vert';
// import fragmentShader from 'fragmentShader.frag';

var webgl
var v_shader    
var f_shader
var urls = ['js/vertex_shader.vert','js/fragment_shader.frag']
var requests = []

$(window).on('load',function(){

    var canvas = document.getElementById('result')
    canvas.clientWidth = 500;
    canvas.clientHeight = 300;
    webgl = canvas.getContext('webgl')
    webgl.clearColor(0.0, 0.0, 0.0, 0.01)
    webgl.clearDepth(1.0);
    webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);
    console.log("webgl");
    
    function error_callback(req,err) {
        console.log("Error while loading '" + urls + "'.");
        console.log(req,err);
        reject(new Error(requests[i].statusText));
    }

    var promise = new Promise((resolve,reject) => {
        for(var i = 0; i < urls.length ; i++){
            requests[i] = new XMLHttpRequest();
            console.log(i);
            requests[i].open('GET', urls[i], true);
            requests[i].setRequestHeader('Pragma', 'no-cache');
            requests[i].setRequestHeader('Cache-Control', 'no-cache');
            requests[i].setRequestHeader('If-Modified-Since', 'Thu, 01 Jun 1970 00:00:00');
            requests[i].responseType = "text";
            console.log(urls[i]);   
            requests[i].onloadstart = function(){
                console.log("load start")
            }
            requests[i].onload = function () {
                if (this.readyState == 4 || this.status == 200) {
                    console.log("Successfully '" + this.responseURL + "' loaded.");
                    console.log(this.responseText)
                } else { 
                    console.log("Error while loading '" + this.status + "'.");
                }
                console.log("resolve");
                resolve();
            }
            requests[i].onerror = error_callback;
            requests[i].send();   
        };
    }).then(()=>{
        console.log("b");
        v_shader = create_shader(requests[0].responseText,'vertex');
        f_shader = create_shader(requests[1].responseText,'fragment');
        create_program(v_shader,f_shader);
        console.log("a");
    }).catch((reason)=>{
        console.log("error");
        console.log(reason);
    })
})



var vertex_position = [
    0.0,1.0,
    0.0,1.0,
    0.0,0.0,
    -1.0,0.0
];

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

// function create_shader(id){

//     var shader;

//     var scriptElement = document.getElementById(id);
    
//     if(!scriptElement){return;}

//     switch(scriptElement.type){
        
//         // 頂点シェーダの場合
//         case 'x-shader/x-vertex':
//             console.log('vertex');
//             shader    = webgl.createShader(webgl.VERTEX_SHADER);
//             break;
            
//         // フラグメントシェーダの場合
//         case 'x-shader/x-fragment':
//             console.log('fragment');
//             shader = webgl.createShader(webgl.FRAGMENT_SHADER);
//             break;
//         default :
//             return;
//     }
    
//     webgl.shaderSource(shader, scriptElement.text);
    
//     // シェーダをコンパイルする
//     webgl.compileShader(shader);
    
//     // シェーダが正しくコンパイルされたかチェック
//     if(webgl.getShaderParameter(shader, webgl.COMPILE_STATUS)){
        
//         // 成功していたらシェーダを返して終了
//         return shader;
//     }else{
        
//         // 失敗していたらエラーログをアラートする
//         alert(webgl.getShaderInfoLog(shader));
//     }
// }

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
        alert(webgl.getShaderInfoLog(shader));
    }
}

function create_program(vs, fs){
    // プログラムオブジェクトの生成
    var program = webgl.createProgram();
    
    // プログラムオブジェクトにシェーダを割り当てる
    webgl.attachShader(program, vs);
    webgl.attachShader(program, fs);
    
    // シェーダをリンク
    webgl.linkProgram(program);

    if(webgl.getProgramParameter(program, webgl.LINK_STATUS)){
    
        webgl.useProgram(program);
        
        return program;
    }else{
        
        alert(webgl.getProgramInfoLog(program));
    }
}

function draw_result(){
    console.log('draw')
}