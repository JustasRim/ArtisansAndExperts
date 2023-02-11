using Application.Common.Interfaces;
using Application.Services;
using Domain.Dto;
using Domain.Model;
using Domain.Enum;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Serilog;

namespace Infrastructure.Services
{
    internal class AuthService : IAuthService
    {
        private readonly IRepository<User> _userRepository;
        private readonly ITokenService _tokenService;
        private readonly IPasswordService _passwordService;
        private readonly IConfiguration _configuration;

        private string JwtIssuer 
        {
            get
            {
                if (_configuration.GetSection("Secrets:JwtIssuer") is null)
                {
                    throw new ArgumentNullException("JwtIssuer");
                }

                var issuer = _configuration.GetSection("Secrets:JwtIssuer").Value;
                if (issuer is null)
                {
                    throw new ArgumentNullException(nameof(issuer));
                }

                return issuer;
            }
        }

        private string JwtAudience
        {
            get
            {
                if (_configuration.GetSection("Secrets:JwtAudience") is null)
                {
                    throw new ArgumentNullException("JwtAudience");
                }

                var issuer = _configuration.GetSection("Secrets:JwtAudience").Value;
                if (issuer is null)
                {
                    throw new ArgumentNullException(nameof(issuer));
                }

                return issuer;
            }
        }

        public AuthService(IRepository<User> userRepository, ITokenService tokenService, IPasswordService passwordService, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _tokenService = tokenService;
            _passwordService = passwordService;
            _configuration = configuration;
        }

        public async Task<AuthDto> Login(LoginDto loginDto)
        {
            if (loginDto is null || string.IsNullOrEmpty(loginDto.Email)) 
            {
                throw new ArgumentNullException(nameof(loginDto));
            }

            var user = _userRepository.Get(q => q.Email == loginDto.Email);
            if (user is null || string.IsNullOrEmpty(user.Password))
            {
                throw new UnauthorizedAccessException("No user");
            }

            var isVerified = _passwordService.VerifyPassword(new User { Password = loginDto.Password }, user.Password);
            if (!isVerified) 
            {
                throw new UnauthorizedAccessException("Wrong password");
            }

            var (accessToken, refreshToken) = GenerateTokens(loginDto.Email, user.Role);

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(15);
            await _userRepository.Update(user);

            return new AuthDto 
            { 
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };
        }

        public async Task<AuthDto> Register(RegisterDto registerDto)
        {
            if (registerDto is null || string.IsNullOrEmpty(registerDto.Email))
            {
                throw new ArgumentNullException(nameof(registerDto));
            }

            if (registerDto.Role == Role.Moderator || registerDto.Role == Role.Admin)
            {
                throw new InvalidOperationException();
            }

            var user = _userRepository.Get(q => q.Email == registerDto.Email);
            if (user is not null)
            {
                throw new InvalidOperationException("User exists");
            }

            var newUser = new User 
            {
                Email= registerDto.Email,
                Role = registerDto.Role,
                Password = registerDto.Password
            };

            var hashedPassword = _passwordService.HashPassword(newUser);
            newUser.Password = hashedPassword;

            var (accessToken, refreshToken) = GenerateTokens(registerDto.Email, registerDto.Role);
            newUser.RefreshToken = refreshToken;
            newUser.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(15);
            var affectedRows = await _userRepository.Add(newUser);

            if (affectedRows != 0)
            {
                throw new Exception("Save changes to database returned not 0");
            }

            return new AuthDto
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };
        }

        private (string accessToken, string refreshToken) GenerateTokens(string email, Role role)
        {
            var claims = GetClaims(email, role);
            var accessToken = _tokenService.GenerateAccessToken(claims);
            var refreshToken = _tokenService.GenerateRefreshToken();

            return (accessToken, refreshToken);
        }

        private Claim[] GetClaims(string email, Role role)
        {
            return new[]
            {
                new Claim(ClaimTypes.Name, email),
                new Claim(ClaimTypes.Email, email),
                new Claim(ClaimTypes.Role, role.ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iss, JwtIssuer),
                new Claim(JwtRegisteredClaimNames.Aud, JwtAudience),
            };
        }
    }
}
