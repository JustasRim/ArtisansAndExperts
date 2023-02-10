using Domain.Model;

namespace Application.Services
{
    public interface IPasswordService
    {
        string HashPassword(User user);

        bool VerifyPassword(User user, string hash);
    }
}
