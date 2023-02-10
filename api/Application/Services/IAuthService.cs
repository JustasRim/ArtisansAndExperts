using Domain.Dto;

namespace Application.Services
{
    public interface IAuthService
    {
        Task<AuthResponse> Register(RegisterDto registerDto);

        Task<AuthResponse> Login(LoginDto loginDto);
    }
}
