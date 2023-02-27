using Application.Common.Interfaces;
using Domain.Model;

namespace Application.Repositories
{
    public interface IUserAuthRepository : IRepository<User>
    {
        Task<User?> GetUserWithPasswordResets(string email);

        Task<User?> GetByEmail(string email);
    }
}
