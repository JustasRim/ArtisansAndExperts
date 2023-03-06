using Application.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ArtisansAndExpertsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProjectController : Controller
    {
        private readonly IProjectRepository _projectRepository;

        public ProjectController(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
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
        public IActionResult CreateProject()
        {
            return View();
        }
    }
}
