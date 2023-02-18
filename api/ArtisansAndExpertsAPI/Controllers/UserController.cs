using Application.Common.Interfaces;
using Application.Services;
using ArtisansAndExpertsAPI.Attributes;
using Domain.Dto;
using Domain.Enum;
using Domain.Extentions;
using Domain.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ArtisansAndExpertsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : Controller
    {
        private readonly IRepository<User> _userRepository;
        private readonly IFileUploadService _fileUploadService;

        public UserController(IRepository<User> userRepository, IFileUploadService fileUploadService)
        {
            _userRepository = userRepository;
            _fileUploadService = fileUploadService;
        }

        [HttpGet]
        [AuthorizeRoles(Role.Admin, Role.Expert)]
        public IActionResult GetProfile()
        {
            if (User is null || User.Identity is null)
            {
                return BadRequest();
            }

            var userName = User.Identity?.Name;
            if (userName is null)
            {
                return BadRequest("No email");
            }

            var user = _userRepository.Get(q => q.Email == userName);
            if (user is null)
            {
                return BadRequest("No user");
            }

            var dto = user.Expert.ToExpertDto();
            return Ok(dto);
        }

        [HttpPost]
        [AuthorizeRoles(Role.Admin, Role.Expert)]
        public async Task<IActionResult> UpdateExpert([FromBody] ExpertDto expertDto)
        {
            if (User is null || User.Identity is null)
            {
                return BadRequest();
            }

            var userName = User.Identity?.Name;
            if (userName is null)
            {
                return BadRequest("No email");
            }

            var user = _userRepository.Get(q => q.Email == userName);
            if (user is null || user.Expert is null)
            {
                return BadRequest("No user");
            }

            user.Expert.UpdateExpertFromDto(expertDto);
            await _userRepository.Update(user);

            return Ok(user.Expert.ToExpertDto());
        }

        [HttpPost("picture")]
        [AuthorizeRoles(Role.Admin, Role.Expert)]
        public async Task<IActionResult> UpdateProfilePicture([FromForm] IFormFile file)
        {
            if (User is null || User.Identity is null)
            {
                return BadRequest();
            }

            var userName = User.Identity?.Name;
            if (userName is null)
            {
                return BadRequest("No email");
            }

            var user = _userRepository.Get(q => q.Email == userName);
            if (user is null || user.Expert is null)
            {
                return BadRequest("No user");
            }

            using var memoryStream = new MemoryStream();
            file.CopyTo(memoryStream);
            var url = await _fileUploadService.Upload(memoryStream);

            user.ProfileSrc = url;
            await _userRepository.Update(user);

            return Ok(url);
        }
    }
}
