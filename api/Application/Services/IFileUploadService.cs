using Domain.Enum;

namespace Application.Services
{
    public interface IFileUploadService
    {
        Task<string> Upload(Stream stream, StorageContainer storageContainer);
    }
}
