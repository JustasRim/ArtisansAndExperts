using ArtisansAndExpertsAPI.Middleware;

namespace ArtisansAndExpertsAPI.Extentions
{
    public static class ExceptionMiddlewareExtention
    {
        public static void ConfigureExceptionHandler(this IApplicationBuilder app)
        {
            app.UseMiddleware<ExceptionMiddleware>();
        }
    }
}
