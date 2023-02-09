using Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class DependancyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<AaEDbContext>(options =>
                options.UseNpgsql(configuration.GetConnectionString("AAEDatabase"),
                builder => builder.MigrationsAssembly(typeof(AaEDbContext).Assembly.FullName)));

            //services.AddScoped<IApplicationDbContext>(q => q.GetRequiredService<ApplicationDbContext>());

            //services.AddTransient<IMedicService, MedicService>();
            //services.AddTransient<IPatientService, PatientService>();
            //services.AddTransient<ISymptomService, SymptomService>();
            //services.AddTransient<IAuthService, AuthService>();

            //services.AddSingleton<IAuthHelper, AuthHelper>();

            return services;
        }
    }
}
