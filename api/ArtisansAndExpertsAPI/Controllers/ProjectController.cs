using Application.Common.Interfaces;
using Application.Repositories;
using Domain.Dto;
using Domain.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Domain.Extentions;
using Application.Services;
using Domain.Enum;
using HashidsNet;

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
        private readonly IFileUploadService _fileUploadService;
        private readonly IHashids _hashids;
        private readonly IImageRepository _imageRepository;
        private readonly IMapService _mapService;

        public ProjectController(
            IProjectRepository projectRepository,
            IRepository<Activity> activityRepository,
            IUserAuthRepository userAuthRepository,
            IFileUploadService fileUploadService,
            IHashids hashids,
            IImageRepository imageRepository,
            IMapService mapService
            )
        {
            _projectRepository = projectRepository;
            _activityRepository = activityRepository;
            _userAuthRepository = userAuthRepository;
            _fileUploadService = fileUploadService;
            _hashids = hashids;
            _imageRepository = imageRepository;
            _mapService = mapService;
        }

        [HttpGet]
        public IActionResult GetUserProjects()
        {
            var userName = User?.Identity?.Name;
            if (userName is null)
            {
                return BadRequest();
            }

            var projects = _projectRepository.GetProjectsByEmailFiltered(userName);
            var projectsDto = new List<ProjectDto>();
            foreach (var project in projects)
            {
                var dto = project.ToProjectDto(_hashids.Encode);
                dto.Id = _hashids.Encode(project.Id);
                projectsDto.Add(dto);
            }

            return Ok(projectsDto);
        }

        [HttpGet("{id}")]
        public IActionResult GetUserProjects([FromRoute] string id)
        {
            var userName = User?.Identity?.Name;
            if (userName is null)
            {
                return BadRequest();
            }

            var idAsNumber = _hashids.Decode(id)[0];
            var project = _projectRepository.GetById(idAsNumber);
            var clientProjects = _projectRepository.GetProjectsByEmailFiltered(userName);
            var clientContainsProject = clientProjects.Any(q => q.Id == idAsNumber);
            if (project is null || !clientContainsProject)
            {
                return BadRequest("Wrong id");
            }

            var dto = project.ToProjectDto(_hashids.Encode);
            return Ok(dto);
        }

        [HttpGet("briefing")]
        public IActionResult GetUserProjectBriefings([FromQuery] Status status, [FromQuery] string? search)
        {
            var userName = User?.Identity?.Name;
            if (userName is null)
            {
                return BadRequest();
            }

            var projects = _projectRepository.GetProjectsByEmailFiltered(userName, search, status);
            var projectsDto = new List<ProjectBriefingDto>();
            foreach (var project in projects)
            {
                var dto = project.ToProjectBriefingDto(_hashids.Encode);
                dto.Id = _hashids.Encode(project.Id);
                projectsDto.Add(dto);
            }

            return Ok(projectsDto);
        }

        [HttpGet("active")]
        public async Task<IActionResult> GetActiveProjects()
        {
            var userName = User?.Identity?.Name;
            if (userName is null)
            {
                return BadRequest();
            }

            var a = await _mapService.GetDistanceBetweenObjects("Kaunas", "Vilnius");

            var user = await _userAuthRepository.GetByEmail(userName);
            var projects = _projectRepository
                .GetAll()
                .Where(q => q.Status == Status.Active &&
                (user?.Expert?.Activities?.Any(activity => activity.Id == q.ActivityId) ?? false))
                .Select(q => q.ToProjectBriefingDto(_hashids.Encode))
                .ToList();

            return Ok(projects);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject([FromRoute] string id)
        {
            var userName = User?.Identity?.Name;
            if (userName is null)
            {
                return BadRequest();
            }

            var idAsNumber = _hashids.Decode(id)[0];
            var project = _projectRepository.GetById(idAsNumber);
            var clientProjects = _projectRepository.GetProjectsByEmailFiltered(userName);
            var clientContainsProject = clientProjects.Any(q => q.Id == idAsNumber);
            if (project is null || !clientContainsProject)
            {
                return BadRequest("Wrong id");
            }

            project.Status = Status.Deleted;
            await _projectRepository.Update(project);
            return Ok();
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

            var project = projectDto.ToProject();
            project.ClientId = user.Client.Id;
            await _projectRepository.Add(project);
            projectDto.Id = _hashids.Encode(project.Id);
            var location = Url.Action(nameof(CreateProject), new { id = projectDto.Id }) ?? $"/{projectDto.Id}";
            return Created(location, projectDto);
        }

        [HttpPost("pictures")]
        public async Task<IActionResult> PictureUpload([FromForm] IFormFile[] files, [FromQuery] string projectId)
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

            var projectIdAsNumber = _hashids.Decode(projectId)[0];
            var project = _projectRepository.GetById(projectIdAsNumber);
            var clientProjects = _projectRepository.GetProjectsByEmailFiltered(userName);
            var clientContainsProject = clientProjects.Any(q => q.Id == projectIdAsNumber);
            if (project is null || !clientContainsProject)
            {
                return BadRequest("No such project");
            }

            foreach (var file in files)
            {
                using var memoryStream = new MemoryStream();
                file.CopyTo(memoryStream);
                var url = await _fileUploadService.Upload(memoryStream, StorageContainer.Projects);
                var image = new Image { ProjectId = projectIdAsNumber, Source = url };
                await _imageRepository.AddWithoutCommiting(image);
            }
            
            await _imageRepository.Commit();
            return NoContent();
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
