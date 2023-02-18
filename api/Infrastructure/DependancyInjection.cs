using Application.Common.Interfaces;
using Application.Services;
using Domain.Model;
using Infrastructure;
using Infrastructure.Repositories;
using Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class DependancyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<AaEDbContext>(options =>
                options.UseNpgsql(configuration.GetConnectionString("AAEDatabase"),
                builder => builder.MigrationsAssembly(typeof(AaEDbContext).Assembly.FullName)));

            services.AddTransient<ITokenService, TokenService>();
            services.AddTransient<IPasswordService, PasswordService>();
            services.AddTransient<IAuthService, AuthService>();
            services.AddTransient<IFileUploadService, FileUpload>();

            services.AddTransient<IRepository<User>, UserRepository>();
            
            return services;
        }
    }
}
