// This code will be executed by the local script
WScript.Echo("Remote script executed successfully!");
function remoteFunction() {
    WScript.Echo("Stage 2 payload executed successfully by stage 2 downloader.");
}
remoteFunction();
