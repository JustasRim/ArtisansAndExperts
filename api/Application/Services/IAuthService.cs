using Domain.Dto;

namespace Application.Services
{
    public interface IAuthService
    {
        Task<AuthDto> Register(RegisterDto registerDto);

        Task<AuthDto> Login(LoginDto loginDto);
    }
}
