require(["./modules/someFunctions"], function() {
    window.onload = function() {
        var someFunctions = require("./modules/someFunctions");
        document.getElementById("doubleIt").onclick = function() {
            var num = document.getElementById("num").value;
            document.getElementById("theCount").innerHTML = someFunctions.Double(num);
        };

        document.getElementById("tripleIt").onclick = function() {
            var num = document.getElementById("num").value;
            document.getElementById("theCount").innerHTML = someFunctions.Triple(num);
        };
    };
});