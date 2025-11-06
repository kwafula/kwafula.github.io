//var shell = new ActiveXObject("WScript.Shell"); 
//shell.Run("iexplore.exe https://pastebin.com/raw/y9CNLxq6");
///////////////////////////////////////////////////////////////
function openUrlFromBase64(base64Url) {
    var xhr = new ActiveXObject("MSXML2.XMLHTTP");
    xhr.open("GET", base64Url, false); // Synchronous request
    xhr.send();

    if (xhr.status === 200) {
        var encodedString = xhr.responseText;

        // Decode the Base64 string using ADODB.Stream for JScript environment
        var stream = new ActiveXObject("ADODB.Stream");
        stream.Type = 1; // adTypeBinary
        stream.Open();
        stream.LoadFromStream(new ActiveXObject("ADODB.Stream")); // Placeholder for actual decoding
        stream.Write(Base64Decode(encodedString)); // Assuming a Base64Decode function exists
        stream.Position = 0;
        stream.Type = 2; // adTypeText
        stream.CharSet = "utf-8";
        var decodedUrl = stream.ReadText();
        stream.Close();

        // Open the URL in Internet Explorer
        var ie = new ActiveXObject("InternetExplorer.Application");
        ie.Visible = true;
        ie.Navigate(decodedUrl);
    } else {
        WScript.Echo("Failed to retrieve Base64 string from URL. Status: " + xhr.status);
    }
}

// Placeholder for a Base64Decode function in JScript
// This would typically involve more complex logic or a pre-existing library
function Base64Decode(encodedString) {
    // This is a simplified representation. Actual Base64 decoding in JScript
    // often involves creating a DOMDocument and using its transformNode method
    // with an XSLT stylesheet that contains base64Binary decoding.
    // Alternatively, external components or more complex stream manipulation
    // might be used.
    // For demonstration, let's assume a direct mapping for simple cases
    // or a pre-defined utility.
    return encodedString; // Replace with actual decoding logic
}

// Example usage:
// openUrlFromBase64("http://example.com/path/to/base64encodedurl.txt");
