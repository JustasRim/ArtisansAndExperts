using Domain.Enum;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ArtisansAndExpertsAPI.Attributes
{
    public class AuthorizeRolesAttribute : AuthorizeAttribute
    {
        public AuthorizeRolesAttribute(params Role[] roles)
        {
            var role = roles.Select(q => Enum.GetName(typeof(Role), q));
            Roles = string.Join(",", role);
        }
    }
}
