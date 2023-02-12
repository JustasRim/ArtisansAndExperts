namespace ArtisansAndExpertsAPI.Extentions
{
    internal static class CorsExtention
    {
        public static void AddGlobalCors(this IServiceCollection services)
        {
            services.AddCors(options => {
                options.AddDefaultPolicy(policy =>
                {
                    policy.WithOrigins("http://localhost:5173", "https://artisansandexperts.azurewebsites.net")
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });
            });
        }
    }
}
