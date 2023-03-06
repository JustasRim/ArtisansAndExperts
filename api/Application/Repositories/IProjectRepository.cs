using Application.Common.Interfaces;
using Domain.Model;

namespace Application.Repositories
{
    public interface IProjectRepository : IRepository<Project>
    {
        IList<Project> GetProjectsByEmail(string email);
    }
}
