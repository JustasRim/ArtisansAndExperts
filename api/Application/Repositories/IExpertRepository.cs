using Application.Common.Interfaces;
using Domain.Model;

namespace Application.Repositories
{
    public interface IExpertRepository : IRepository<Expert>
    {
        IList<Expert> GetAllSortedByRating();
    }
}
