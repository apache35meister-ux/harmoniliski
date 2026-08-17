$token = "nfp_vhn6Zw5w7FRkaqouuK5ZZB3zHKWNj14Sce89"
$headers = @{
    Authorization = "Bearer $token"
    "User-Agent" = "Harmoni-AutoDeployer"
}

Write-Host "Netlify hesabina baglaniliyor..."
try {
    $sites = Invoke-RestMethod -Uri "https://api.netlify.com/api/v1/sites" -Headers $headers -Method Get
    Write-Host "Bulunan Site Sayisi: $($sites.Count)"
} catch {
    Write-Error "Netlify baglanti hatasi: $_"
    exit 1
}

# harmoniliski.com veya ilgili siteyi bul
$targetSite = $null
foreach ($s in $sites) {
    Write-Host "Site: $($s.name) | Custom Domain: $($s.custom_domain) | ID: $($s.id)"
    if ($s.custom_domain -match "harmoniliski" -or $s.name -match "harmoniliski" -or $s.url -match "harmoniliski") {
        $targetSite = $s
        break
    }
}

if (-not $targetSite) {
    if ($sites.Count -gt 0) {
        $targetSite = $sites[0]
        Write-Host "Hedef site varsayilan olarak secildi: $($targetSite.name) ($($targetSite.id))"
    } else {
        Write-Error "Hesapta hic site bulunamadi."
        exit 1
    }
}

Write-Host "Canli Site Secildi: $($targetSite.name) (ID: $($targetSite.id))"

$sourceDir = "C:\Users\Lenovo\.gemini\antigravity\scratch\dating-match-platform"
$zipPath = "$env:TEMP\harmoni_deploy.zip"

if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

# Gecici klasore temiz dosyalari kopyala
$stagingDir = "$env:TEMP\harmoni_staging"
if (Test-Path $stagingDir) {
    Remove-Item $stagingDir -Recurse -Force
}
New-Item -ItemType Directory -Path $stagingDir | Out-Null

$files = Get-ChildItem -Path $sourceDir -Recurse -File | Where-Object {
    $_.FullName -notmatch '\\\.git' -and
    $_.FullName -notmatch '\\\.system_generated' -and
    $_.Name -notmatch '^deploy_'
}

foreach ($f in $files) {
    $rel = $f.FullName.Substring($sourceDir.Length + 1)
    $dest = Join-Path $stagingDir $rel
    $destParent = Split-Path $dest
    if (-not (Test-Path $destParent)) {
        New-Item -ItemType Directory -Path $destParent -Force | Out-Null
    }
    Copy-Item $f.FullName -Destination $dest -Force
}

# Zip olustur
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory($stagingDir, $zipPath)

Write-Host "Paket hazirlandi. Netlify'a canli yukleme yapiliyor..."

$deployUri = "https://api.netlify.com/api/v1/sites/$($targetSite.id)/deploys"
$uploadHeaders = @{
    Authorization = "Bearer $token"
    "Content-Type" = "application/zip"
}

$zipBytes = [System.IO.File]::ReadAllBytes($zipPath)
$deployRes = Invoke-RestMethod -Uri $deployUri -Headers $uploadHeaders -Method Post -Body $zipBytes

Write-Host "=========================================="
Write-Host "🚀 TEBRIKLER! SITE BASARIYLA CANLIYA ALINDI!"
Write-Host "Deploy ID: $($deployRes.id)"
Write-Host "State: $($deployRes.state)"
Write-Host "Canli URL: https://harmoniliski.com"
Write-Host "=========================================="

# Temizlik
Remove-Item $zipPath -Force
Remove-Item $stagingDir -Recurse -Force
