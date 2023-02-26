using Application.Common.Interfaces;
using Application.Services;
using Domain.Dto;
using Domain.Model;
using Microsoft.AspNetCore.Mvc;

namespace ArtisansAndExpertsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IAuthService _authService;
        private readonly IRepository<User> _userRepository;

        public AuthController(IAuthService authService, IRepository<User> userRepository)
        {
            _authService = authService;
            _userRepository = userRepository;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            if (loginDto is null)
            {
                return BadRequest("Invalid client request");
            }

            var authResponse = await _authService.Login(loginDto);
            if (authResponse is null)
            {
                return BadRequest();
            }

            return Ok(authResponse);
        }

        [HttpPost("sign-up")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            if (registerDto is null)
            {
                return BadRequest("Invalid client request");
            }

            var authResponse = await _authService.Register(registerDto);
            if (authResponse is null)
            {
                return BadRequest();
            }

            return Ok(authResponse);
        }

        [HttpGet("confirm-email")]
        public async Task<IActionResult> EmailCongfirmation([FromQuery] string email, [FromQuery] string token)
        {
            var user = _userRepository.Get(q => q.Email == email);
            if (user is null)
            {
                return BadRequest("wrong email");
            }

            if (!user.EmailConfirmationToken.Equals(token))
            {
                return BadRequest("wrong token");
            }

            user.EmailConfirmed = true;
            await _userRepository.Update(user);
            return Ok(user);
        }

        [HttpPost("password-reset-request")]
        public async Task<IActionResult> RequestPasswordReset([FromBody] PasswordResetDto passwordResetDto)
        {
            if (passwordResetDto is null)
            {
                return BadRequest("Invalid request");
            }

            await _authService.PasswordResetRequest(passwordResetDto);
            return Ok();
        }

        [HttpPost("password-reset")]
        public async Task<IActionResult> PasswordReset([FromBody] PasswordResetDto passwordResetDto)
        {
            if (passwordResetDto is null)
            {
                return BadRequest("Invalid request");
            }

            var authResponse = await _authService.PasswordReset(passwordResetDto);
            if (authResponse is null)
            {
                return BadRequest();
            }

            return Ok(authResponse);
        }
    }
}
