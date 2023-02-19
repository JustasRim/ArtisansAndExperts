using Application.Common.Interfaces;
using ArtisansAndExpertsAPI.Attributes;
using Domain.Enum;
using Domain.Extentions;
using Domain.Model;
using HashidsNet;
using Microsoft.AspNetCore.Mvc;

namespace ArtisansAndExpertsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpertController : Controller
    {
        private readonly IRepository<Expert> _expertRepository;

        public ExpertController(IRepository<Expert> expertRepository)
        {
            _expertRepository = expertRepository;
        }

        [HttpGet]
        [AuthorizeRoles(Role.Admin)]
        public IActionResult GetAllExperts()
        {
            var experts = _expertRepository
                .GetAll()
                .Select(q => q.ToAdminUserDto())
                .ToList();
            if (experts is null)
            {
                return NoContent();
            }

            return Ok(experts);
        }

        [HttpPatch("approve")]
        [AuthorizeRoles(Role.Admin)]
        public IActionResult Approve([FromQuery] string email)
        {
            var expert = _expertRepository.Get(q => q?.User?.Email == email);
            if (expert is null)
            {
                return NotFound();
            }

            expert.Approved = !expert.Approved;
            _expertRepository.Update(expert);
            return NoContent();
        }

        [HttpPatch("block")]
        [AuthorizeRoles(Role.Admin)]
        public IActionResult Block([FromQuery] string email)
        {
            var expert = _expertRepository.Get(q => q?.User?.Email == email);
            if (expert is null)
            {
                return NotFound();
            }

            if (expert.User is null)
            {
                return BadRequest();
            }

            expert.User.IsBanned = !expert.User.IsBanned;
            _expertRepository.Update(expert);
            return NoContent();
        }
    }
}
