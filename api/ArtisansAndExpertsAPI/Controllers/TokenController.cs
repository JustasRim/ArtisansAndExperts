using Application.Common.Interfaces;
using Application.Services;
using Domain.Dto;
using Domain.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ArtisansAndExpertsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : Controller
    {
        private readonly IRepository<User> _repository;
        private readonly ITokenService _tokenService;

        public TokenController(IRepository<User> repository, ITokenService tokenService)
        {
            _repository = repository;
            _tokenService = tokenService;
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] AuthDto authDto)
        {
            if (authDto is null || string.IsNullOrEmpty(authDto.AccessToken) || string.IsNullOrEmpty(authDto.RefreshToken))
            {
                return BadRequest("Invalid request");
            }

            var principal = _tokenService.GetPrincipalFromExpiredToken(authDto.AccessToken);
            var userName = principal?.Identity?.Name;

            if (userName is null)
            {
                return BadRequest("Invalid email");
            }

            var user = _repository.Get(q => q.Email == userName);
            if (user is null || user.RefreshToken != authDto.RefreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
            {
                return BadRequest("Invalid request");
            }

            var newAccessToken = _tokenService.GenerateAccessToken(principal.Claims);
            var newRefreshToken = _tokenService.GenerateRefreshToken();
            user.RefreshToken = newRefreshToken;

            await _repository.Update(user);

            return Ok(new AuthDto
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            });
        }

        [HttpPost("revoke"), Authorize]
        public async Task<IActionResult> Revoke()
        {
            var userName = User?.Identity?.Name;

            if (userName is null)
            {
                return BadRequest("Invalid email");
            }

            var user = _repository.Get(q => q.Email == userName);
            if (user is null)
            {
                return Forbid();
            }

            user.RefreshToken = null;
            await _repository.Update(user);

            return NoContent();
        }
    }
}
