using Domain.Dto;
using Domain.Model;

namespace Domain.Extentions
{
    public static class DtoExtentions
    {
        public static ExpertProfileDto ToExpertProfileDto(this Expert expert)
        {
            return new ExpertProfileDto
            {
                WorkDescription = expert.WorkDescription,
                MobilePhone = expert.MobilePhone,
                City = expert.City,
                Radius = expert.Radius,
                ProfileSrc = expert?.User?.ProfileSrc
            };
        }

        public static void UpdateExpertFromDto(this Expert expert, ExpertProfileDto dto)
        {
            expert.WorkDescription = dto.WorkDescription;
            expert.MobilePhone = dto.MobilePhone;
            expert.City = dto.City;
            expert.Radius = dto.Radius;
        }

        public static ExpertDto ToExpertDto(this Expert expert)
        {
            return new ExpertDto
            {
                Name = expert.User?.Name,
                WorkDescription = expert.WorkDescription,
                City = expert.City,
                Radius = expert.Radius,
                ProfileSrc = expert?.User?.ProfileSrc,
                Activities = expert?.Activities?.Select(q => q.Name).ToList()
            };
        }

        public static AdminUserDto ToAdminUserDto(this Expert expert)
        {
            return new AdminUserDto
            {
                Name = expert.User?.Name,
                LastName = expert.User?.LastName,
                Email = expert.User?.Email,
                RegistrationDate = expert.User?.RegistrationDate,
                Approved = expert.Approved,
                Banned = expert.User?.IsBanned ?? false
            };
        }


        public static AdminUserDto ToAdminUserDto(this User user)
        {
            return new AdminUserDto
            {
                Name = user.Name,
                LastName = user.LastName,
                Email = user.Email,
                RegistrationDate = user.RegistrationDate,
                Banned = user.IsBanned
            };
        }
    }
}
