$(document).ready(function(){
    $("#html-input").val(
        "<div>\n" +
        "    <p>\n" +
        "        1234\n" +
        "    </p>\n" +
        "</div>\n" +
        "<button id='btn' onclick='displayDate()'>click</button>");
    $("#css-input").val(
        "div {\n" +
        "    background-color: #ccc;\n" +
        "}\n" +
        "p {\n" +
        "    color: green;\n" +
        "}\n");
    $("#js-input").val(
        "function displayDate(){\n" +
        "    alert(new Date());\n" +
        "    window.parent.document.getElementById(\"html-input\").style.color=\"red\";\n" +
        "}");

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
        ifrdoc.write("<script>" + js + "</script>");
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