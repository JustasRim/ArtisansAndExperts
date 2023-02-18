using Domain.Dto;
using Domain.Model;

namespace Domain.Extentions
{
    public static class DtoExtentions
    {
        public static ExpertDto ToExpertDto(this Expert expert)
        {
            return new ExpertDto
            {
                WorkDescription = expert.WorkDescription,
                MobilePhone = expert.MobilePhone,
                City = expert.City,
                Radius = expert.Radius,
                ProfileSrc = expert?.User?.ProfileSrc
            };
        }

        public static void UpdateExpertFromDto(this Expert expert, ExpertDto dto)
        {
            expert.WorkDescription = dto.WorkDescription;
            expert.MobilePhone = dto.MobilePhone;
            expert.City = dto.City;
            expert.Radius = dto.Radius;
        }
    }
}
