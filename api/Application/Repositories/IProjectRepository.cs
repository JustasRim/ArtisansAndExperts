using Application.Common.Interfaces;
using Domain.Enum;
using Domain.Model;

namespace Application.Repositories
{
    public interface IProjectRepository : IRepository<Project>
    {
        IList<Project> GetProjectsByEmailFiltered(string email, string? search = null, Status? status = null);
    }
}
