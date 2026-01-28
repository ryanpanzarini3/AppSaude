# Script para extrair coordenadas de Google Maps links
$linksFile = 'c:\Users\ryanp\ProjetoSaúde\links-maps\links.txt'
$outputFile = 'c:\Users\ryanp\ProjetoSaúde\coordenadas-extraidas.json'

$links = Get-Content $linksFile
$unidades = @()

foreach ($linha in $links) {
    if ($linha.Trim() -eq "") { continue }
    
    $parts = $linha -split '\|'
    $nome = $parts[0].Trim()
    $url = $parts[1].Trim()
    
    # Procura padrão: /@LAT,LNG
    if ($url -match '/@(-?[0-9]+\.[0-9]+),(-?[0-9]+\.[0-9]+)') {
        $lat = [double]$matches[1]
        $lng = [double]$matches[2]
        
        $unidades += @{
            nome = $nome
            lat = $lat
            lng = $lng
        }
        
        Write-Host "✓ $nome : $lat, $lng"
    } else {
        Write-Host "✗ Erro ao processar: $nome"
    }
}

# Gera JSON
$json = $unidades | ConvertTo-Json
$json | Out-File -FilePath $outputFile -Encoding UTF8

Write-Host "`n✅ Coordenadas extraídas para: $outputFile"
Write-Host "Total de unidades: $($unidades.Count)"
