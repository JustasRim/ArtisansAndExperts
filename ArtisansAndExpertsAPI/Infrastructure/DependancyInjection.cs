using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure
{
    public static class DependancyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<AaEDbContext>(options =>
                options.UseNpgsql(configuration.GetConnectionString("MedinkDatabase"),
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
