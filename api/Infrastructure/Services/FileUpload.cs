using Application.Services;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Services
{
    internal class FileUpload : IFileUploadService
    {
        private readonly IConfiguration _configuration;

        public FileUpload(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<string> Upload(Stream stream)
        {
            var connection = _configuration.GetValue<string>("Secrets:BlobAccount");
            if (connection == null)
            {
                throw new ArgumentException("No blob connection");
            }


            var client = new BlobServiceClient(connection);
            var container = client.GetBlobContainerClient("profiles");
            stream.Position = 0;
            var name = $"{Guid.NewGuid()}.jpeg";
            var blobClient = container.GetBlobClient(name);
            await blobClient.UploadAsync(stream, new BlobHttpHeaders { ContentType = "image/jpeg" });
            return $"{blobClient.Uri.AbsoluteUri}";

        }
    }
}
