using Application.Common.Interfaces;
using Domain.Model;

namespace Application.Repositories
{
    public interface IImageRepository : IRepository<Image>
    {
        Task AddWithoutCommiting(Image img);

        Task Commit();
    }
}
