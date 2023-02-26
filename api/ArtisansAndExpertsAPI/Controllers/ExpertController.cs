using Application.Repositories;
using Domain.Dto;
using Domain.Extentions;
using HashidsNet;
using Microsoft.AspNetCore.Mvc;

namespace ArtisansAndExpertsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpertController : Controller
    {
        private readonly IExpertRepository _expertRepository;
        private readonly IHashids _hashids;

        public ExpertController(IExpertRepository expertRepository, IHashids hashids)
        {
            _expertRepository = expertRepository;
            _hashids = hashids;
        }

        [HttpGet]
        public IActionResult GetAllExperts()
        {
            var experts = _expertRepository.GetAllSortedByRating();
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
