dotnet ef migrations add expandedModels --project .\Infrastructure.csproj --startup-project ..\ArtisansAndExpertsAPI\ArtisansAndExpertsAPI.csproj

dotnet ef database update --project .\Infrastructure.csproj --startup-project ..\ArtisansAndExpertsAPI\ArtisansAndExpertsAPI.csproj

# launch from infrastructure project


dotnet ef migrations script --idempotent .\Infrastructure.csproj --startup-project ..\ArtisansAndExpertsAPI\ArtisansAndExpertsAPI.csproj -o migration.sql