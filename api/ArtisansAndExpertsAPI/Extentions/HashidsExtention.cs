using HashidsNet;

namespace ArtisansAndExpertsAPI.Extentions
{
    public static class HashidsExtention
    {
        public static void AddHashids(this IServiceCollection services, IConfiguration configuration)
        {
            var salt = configuration.GetValue<string>("Secrets:HashIdSalt");
            if (salt is null)
            {
                throw new ArgumentNullException(nameof(salt));
            }

            services.AddSingleton<IHashids>(_ => new Hashids(salt));
        }
    }
}
