using Application.Common.Interfaces;
using Domain.Dto;
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
        private readonly IHashids _hashids;

        public ExpertController(IRepository<Expert> expertRepository, IHashids hashids)
        {
            _expertRepository = expertRepository;
            _hashids = hashids;
        }

        [HttpGet]
        public IActionResult GetAllExperts()
        {
            var experts = _expertRepository.GetAll();
            List<ExpertDto> expertsDto = new();

            foreach (var expert in experts)
            {
                if (!expert.Approved)
                {
                    continue;
                }

                var dto = expert.ToExpertDto();
                dto.Id = _hashids.Encode(expert.Id);
                expertsDto.Add(dto);
            }

            if (expertsDto.Count == 0)
            {
                return NoContent();
            }

            return Ok(expertsDto);
        }
    }
}
