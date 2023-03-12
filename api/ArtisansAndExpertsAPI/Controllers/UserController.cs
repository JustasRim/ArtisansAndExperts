using Application.Common.Interfaces;
using Application.Services;
using ArtisansAndExpertsAPI.Attributes;
using Domain.Dto;
using Domain.Enum;
using Domain.Extentions;
using Domain.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ArtisansAndExpertsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : Controller
    {
        private readonly IRepository<User> _userRepository;
        private readonly IFileUploadService _fileUploadService;
        private readonly IRepository<Activity> _activityRepository;

        public UserController(IRepository<User> userRepository, IFileUploadService fileUploadService, IRepository<Activity> activityRepository)
        {
            _userRepository = userRepository;
            _fileUploadService = fileUploadService;
            _activityRepository = activityRepository;
        }

        [HttpGet("{email?}")]
        [AuthorizeRoles(Role.Admin, Role.Expert)]
        public IActionResult GetProfile([FromRoute] string? email)
        {
            if (User is null || User.Identity is null)
            {
                return BadRequest();
            }

            var userName = GetUserMail(email);
            if (userName is null)
            {
                return BadRequest("No email");
            }

            var user = _userRepository.Get(q => q.Email == userName);
            if (user is null)
            {
                return BadRequest("No user");
            }

            var activities = _activityRepository.GetAll();
            var dto = user.Expert.ToExpertProfileDto();
            dto.Activities = activities
                .Select(q => new ActivityDto
                    {
                        Label = q.Name,
                        Value = q.Id.ToString()
                    })
                    .ToList() ?? new List<ActivityDto>();

            dto.SelectedActivities = user.Expert?.Activities?
                .Select(q => new ActivityDto
                {
                    Label = q.Name,
                    Value = q.Id.ToString()
                })
                .ToList() ?? new List<ActivityDto>();

            return Ok(dto);
        }

        [HttpPost("{email?}")]
        [AuthorizeRoles(Role.Admin, Role.Expert)]
        public async Task<IActionResult> UpdateExpert([FromBody] ExpertProfileDto expertDto, [FromRoute]string? email)
        {
            if (User is null || User.Identity is null || User.Identity.Name is null)
            {
                return BadRequest();
            }

            if (expertDto.Activities is null)
            {
                return BadRequest("No user");
            }

            var userName = GetUserMail(email);
            var user = _userRepository.Get(q => q.Email == userName);
            if (user is null || user.Expert is null)
            {
                return BadRequest("No user");
            }

            if (!user.EmailConfirmed)
            {
                return Forbid("Email is not confirmed");
            }

            user.Expert.UpdateExpertFromDto(expertDto);
            var activities = _activityRepository.GetAll();
            user.Expert.Activities = new List<Activity>();
            await _userRepository.Update(user);

            foreach (var activity in expertDto.Activities)
            {
                var activityToAdd = activities.FirstOrDefault(q => q.Id.ToString() == activity.Value);
                if (activityToAdd is null)
                {
                    return BadRequest("No such activity");
                }

                activityToAdd.Experts = new List<Expert>
                {
                    user.Expert
                };

                await _activityRepository.Update(activityToAdd);
            }

            await _userRepository.Update(user);
            return Ok(user.Expert.ToExpertProfileDto());
        }


        [HttpPost("picture/{email?}")]
        [AuthorizeRoles(Role.Admin, Role.Expert)]
        public async Task<IActionResult> UpdateProfilePicture([FromForm] IFormFile file, [FromRoute] string? email)
        {
            if (User is null || User.Identity is null)
            {
                return BadRequest();
            }

            var userName = GetUserMail(email);
            if (userName is null)
            {
                return BadRequest("No email");
            }

            var user = _userRepository.Get(q => q.Email == userName);
            if (user is null || user.Expert is null)
            {
                return BadRequest("No user");
            }

            if (!user.EmailConfirmed)
            {
                return Forbid("Email is not confirmed");
            }

            using var memoryStream = new MemoryStream();
            file.CopyTo(memoryStream);
            var url = await _fileUploadService.Upload(memoryStream, StorageContainer.Profiles);

            user.ProfileSrc = url;
            await _userRepository.Update(user);

            return Ok(url);
        }

        [NonAction]
        private string? GetUserMail(string? email) 
        {
            var userName = User.Identity?.Name;
            if (!string.IsNullOrEmpty(email))
            {
                var role = User.Claims.FirstOrDefault(q => q.Type == ClaimTypes.Role)?.Value;
                if (role.Equals(Role.Admin.ToString()))
                {
                    return email;
                }
            }

            return userName;
        }
    }
}
