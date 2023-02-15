using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace ArtisansAndExpertsAPI.Extentions
{
    internal static class AuthExtention
    {
        public static void AddAuthSchema(this IServiceCollection services, IConfiguration configuration)
        {
            var signingKey = configuration.GetValue<string>("Secrets:JwtSecret");
            if (signingKey is null)
            {
                throw new ArgumentNullException(nameof(signingKey));
            }

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = configuration.GetValue<string>("Secrets:JwtIssuer"),
                    ValidAudience = configuration.GetValue<string>("Secrets:JwtAudience"),
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(signingKey)),
                    ClockSkew = TimeSpan.Zero
                };
            });
        }
    }
}
