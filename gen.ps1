# Set error action to stop on any error
$ErrorActionPreference = "Stop"

# Function to run adduce with the local executable
function Invoke-Adduce {
    $adducePath = Join-Path $PSScriptRoot "adduce.exe"
    & $adducePath $args
}

function Generate-Pages {
    $inputDir = "input/pages"
    $outputDir = "docs"
    Write-Host "Generating individual pages..."
    Get-ChildItem -Path $inputDir -Directory | ForEach-Object {
        $pageName = $_.Name
        $outputFile = "$pageName.html"
        
        Invoke-Adduce -c $_.FullName -n $outputFile -o $outputDir
    }
}

function Generate-Items {
    param (
        [string]$directory,
        [string]$outputDir
    )
    Write-Host "Generating items for $directory..."
    Set-Location $directory -ErrorAction Stop
    Invoke-Adduce feed establish
    
    Get-ChildItem -Path "documents" -File | ForEach-Object {
        $itemName = [System.IO.Path]::GetFileNameWithoutExtension($_.Name)
        Invoke-Adduce feed export $itemName
    }
    
    $docsOutputDir = "../../docs/$outputDir"
    New-Item -ItemType Directory -Force -Path $docsOutputDir
    Copy-Item -Path "export/*" -Destination $docsOutputDir -Recurse -Force -ErrorAction Stop
    Set-Location ../..
}

function Generate-Portfolio {
    Generate-Items -directory "input/portfolio" -outputDir "portfolio"
}

function Copy-GlobalAssets {
    Write-Host "Copying styles and assets..."
    Copy-Item -Path "input/global/styles" -Destination "docs/" -Recurse -Force -ErrorAction Stop
    Copy-Item -Path "input/global/assets" -Destination "docs/" -Recurse -Force -ErrorAction Stop
    Copy-Item -Path "input/global/js" -Destination "docs/" -Recurse -Force -ErrorAction Stop
}

function Main {
    Generate-Pages
    Generate-Portfolio
    Copy-GlobalAssets
    Write-Host "Site built successfully!"
}

# Run the main function
Main