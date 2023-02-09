dotnet ef migrations add initial --project .\Infrastructure.csproj --startup-project ..\ArtisansAndExpertsAPI\ArtisansAndExpertsAPI.csproj

dotnet ef database update --project .\Infrastructure.csproj --startup-project ..\ArtisansAndExpertsAPI\ArtisansAndExpertsAPI.csproj

# launch from infrastructure project