using System.Net;
using ILogger = Serilog.ILogger;

namespace ArtisansAndExpertsAPI.Middleware
{
    public class ApiKeyAuthMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger _logger;
        private readonly IConfiguration _configuration;

        public ApiKeyAuthMiddleware(RequestDelegate next, ILogger logger, IConfiguration configuration)
        {
            _next = next;
            _logger = logger;
            _configuration = configuration;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            if (!httpContext.Request.Headers.TryGetValue("x-api-key", out var extractedApiKey))
            {
                _logger.Error("No api key");
                httpContext.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                return;
            }

            var apiKey = _configuration.GetValue<string>("Secrets:ApiKey");
            if (apiKey is null)
            {
                throw new ArgumentNullException(nameof(apiKey));
            }

            if (!extractedApiKey.Equals(apiKey))
            {
                _logger.Error("Invalid api key");
                httpContext.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                return;
            }

            await _next(httpContext);
        }
    }
}
