$(document).ready(function(){
    $("#html-input").val(
        "<div>\n" +
        "  <p>\n" +
        "      1234\n" +
        "  </p>\n" +
        "</div>\n" +
        "<button id='btn' onclick='displayDate()'>click</button>\n" +
        "<div id=\"app\">\n" +
        "  {{ message }}\n" +
        "</div>");
    $("#css-input").val(
        "div {\n" +
        "  background-color: #ccc;\n" +
        "}\n" +
        "p {\n" +
        "  color: green;\n" +
        "}\n");
    $("#js-input").val(
        "function displayDate(){\n" +
        "  alert(new Date());\n" +
        "  window.parent.document.getElementById(\"html-input\").style.color=\"red\";\n" +
        "}\n" +
        "var app = new Vue({\n" +
        "  el: '#app',\n" +
        "  data: {\n" +
        "    message: 'Hello Vue!'\n" +
        "  }\n" +
        "});\n" +
        "$(document).ready(function(){\n" +
        " $(\"#btn\").text('jquery!'); \n" +
        "});");

    var htmlCodeMirrorEditor = CodeMirror.fromTextArea(document.getElementById('html-input'), {
        mode: "text/html",
        lineNumbers: true,
        theme: "material"
    });
    var cssCodeMirrorEditor = CodeMirror.fromTextArea($("#css-input")[0], {
        mode:"text/css",
        lineNumbers:true,
        theme: "material"
    });
    var jsCodeMirrorEditor = CodeMirror.fromTextArea($("#js-input")[0], {
        mode: "text/javascript",
        lineNumbers: true,
        theme: "material"
    });

    $("#run-btn").click(function () {
       repaint();
    });

    repaint();

    function repaint() {
        $("#run-btn").text('运行中...');
        var html = htmlCodeMirrorEditor.getValue();
        var css = cssCodeMirrorEditor.getValue();
        var js = jsCodeMirrorEditor.getValue();
        //html & js 写入document-body
        var ifrdoc = document.getElementById("result-frame").contentWindow.document;
        ifrdoc.designMode = "on"; //文档进入可编辑模式
        ifrdoc.open(); //打开流
        ifrdoc.write(html);
        ifrdoc.write("<script src='https://cdn.jsdelivr.net/npm/vue/dist/vue.js'></script>\n" +
            "<script src=\"https://cdn.bootcss.com/jquery/3.3.1/jquery.js\"></script>\n" +
            "<script>" + js + "</script>\n"
            );
        ifrdoc.close(); //关闭流
        ifrdoc.designMode = "off"; //文档进入非可编辑模式
        //css
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        document.getElementById("result-frame").contentWindow.document.head.appendChild(style);

        $("#run-btn").text('运行');
        //防止注入
        document.getElementById("result-frame").contentWindow.parent= null;
    }
});