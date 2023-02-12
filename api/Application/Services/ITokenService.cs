using System.Security.Claims;

namespace Application.Services
{
    public interface ITokenService
    {
        string GenerateAccessToken(IEnumerable<Claim> claims);

        string GenerateRefreshToken();

        DateTime GenerateRefreshTokenExpirationTime();

        ClaimsPrincipal GetPrincipalFromExpiredToken(string token); 
    }
}
