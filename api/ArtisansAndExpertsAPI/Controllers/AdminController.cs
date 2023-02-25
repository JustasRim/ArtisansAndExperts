using Application.Common.Interfaces;
using ArtisansAndExpertsAPI.Attributes;
using Domain.Enum;
using Domain.Extentions;
using Domain.Model;
using Microsoft.AspNetCore.Mvc;

namespace ArtisansAndExpertsAPI.Controllers
{
    [Route("api/[controller]")]
    [AuthorizeRoles(Role.Admin)]
    [ApiController]
    public class AdminController : Controller
    {
        private readonly IRepository<Expert> _expertRepository;
        private readonly IRepository<User> _userRepository;

        public AdminController(IRepository<Expert> expertRepository, IRepository<User> userRepository)
        {
            _expertRepository = expertRepository;
            _userRepository = userRepository;
        }

        [HttpGet("experts")]
        public IActionResult GetAllExperts([FromQuery] string? search, [FromQuery] bool banned, [FromQuery] bool approved)
        {
            var experts = _expertRepository
                .GetAll()
                .Select(q => q.ToAdminUserDto())
                .ToList();
            if (experts is null || experts.Count == 0)
            {
                return NoContent();
            }

            var searched = experts.Where(q => q.Banned == banned && q.Approved == approved).ToList();
            if (string.IsNullOrEmpty(search))
            {
                return Ok(searched);
            }

            searched = searched.Where(q =>
                q.Name.Contains(search, StringComparison.OrdinalIgnoreCase) ||
                q.LastName.Contains(search, StringComparison.OrdinalIgnoreCase) ||
                q.Email.Contains(search, StringComparison.OrdinalIgnoreCase)).ToList();

            return Ok(searched);
        }

        [HttpGet("clients")]
        public IActionResult GetAllClients([FromQuery] string? search, [FromQuery] bool banned)
        {
            var clients = _userRepository
                .GetAll()
                .Where(q => q.Role == Role.Client)
                .Select(q => q.ToAdminUserDto())
                .ToList();
            if (clients is null || clients.Count == 0)
            {
                return NoContent();
            }

            var searched = clients.Where(q => q.Banned == banned).ToList();
            if (string.IsNullOrEmpty(search))
            {
                return Ok(searched);
            }

            searched = searched.Where(q =>
                q.Name.Contains(search, StringComparison.OrdinalIgnoreCase) ||
                q.LastName.Contains(search, StringComparison.OrdinalIgnoreCase) ||
                q.Email.Contains(search, StringComparison.OrdinalIgnoreCase)).ToList();

            return Ok(searched);
        }

        [HttpPatch("approve")]
        public IActionResult Approve([FromQuery] string email, [FromQuery] bool approve)
        {
            var expert = _expertRepository.Get(q => q?.User?.Email == email);
            if (expert is null)
            {
                return NotFound();
            }

            expert.Approved = approve;
            _expertRepository.Update(expert);
            return Ok(approve);
        }

        [HttpPatch("block")]
        public IActionResult Block([FromQuery] string email, [FromQuery] bool block)
        {
            var user = _userRepository.Get(q => q.Email == email && q.Role != Role.Admin);
            if (user is null)
            {
                return NotFound();
            }

            user.IsBanned = block;
            user.RefreshToken = null;
            _userRepository.Update(user);
            return Ok(block);
        }
    }
}
