using Application.Services;
using Domain.Model;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Services
{
    internal class PasswordService : IPasswordService
    {
        private readonly PasswordHasher<User> _hasher = new();

        public string HashPassword(User user)
        {
            if (user is null || string.IsNullOrWhiteSpace(user.Password))
            {
                throw new ArgumentNullException(nameof(user));
            }

            return _hasher.HashPassword(user, user.Password);
        }

        public bool VerifyPassword(User user, string hash)
        {
            if (user is null || string.IsNullOrWhiteSpace(user.Password))
            {
                throw new ArgumentNullException(nameof(user));
            }

            return _hasher.VerifyHashedPassword(user, hash, user.Password) == PasswordVerificationResult.Success;
        }
    }
}