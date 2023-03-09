using Application.Common.Interfaces;
using Application.Repositories;
using Domain.Dto;
using Domain.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Domain.Extentions;

namespace ArtisansAndExpertsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProjectController : Controller
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IRepository<Activity> _activityRepository;
        private readonly IUserAuthRepository _userAuthRepository;

        public ProjectController(IProjectRepository projectRepository, IRepository<Activity> activityRepository, IUserAuthRepository userAuthRepository)
        {
            _projectRepository = projectRepository;
            _activityRepository = activityRepository;
            _userAuthRepository = userAuthRepository;
        }

        [HttpGet] 
        public IActionResult GetUserProjects()
        {
            var userName = User?.Identity?.Name;
            if (userName is null)
            {
                return BadRequest();
            }

            var projects = _projectRepository.GetProjectsByEmail(userName);
            return Ok(projects);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProject(ProjectDto projectDto)
        {
            if (projectDto == null)
            {
                return BadRequest();
            }

            var userName = User?.Identity?.Name;
            if (userName == null)
            {
                return BadRequest();
            }

            var user = await _userAuthRepository.GetByEmail(userName);
            if (user == null)
            {
                return BadRequest();
            }

            _projectRepository.Add(new Project
            {
                ClientId = user.Client.Id,
                Name = projectDto.Name,
                Description = projectDto.Description,
                TimeLine = projectDto.TimeLine,
                City = projectDto.City,
                ActivityId = projectDto.ActivityId,
            });

            return View();
        }

        [HttpGet("activities")]
        public IActionResult GetActivities()
        {
            var activities = _activityRepository.GetAll();
            IList<ActivityDto> activitiesDto = new List<ActivityDto>();
            foreach (var activity in activities)
            {
                activitiesDto.Add(activity.ToActivityDto());
            }

            return Ok(activitiesDto);
        }
    }
}
