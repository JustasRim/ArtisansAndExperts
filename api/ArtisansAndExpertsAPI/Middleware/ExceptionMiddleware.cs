using Domain.Model;
using System.Net;
using ILogger = Serilog.ILogger;

namespace ArtisansAndExpertsAPI.Middleware
{
    internal class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger _logger;

        public ExceptionMiddleware(RequestDelegate next, ILogger logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (UnauthorizedAccessException ex)
            {
                await HandleExceptionAsync(httpContext, ex);
            }
            catch (ArgumentNullException ex)
            {
                await HandleExceptionAsync(httpContext, ex);
            }
            catch (AccessViolationException ex)
            {
                await HandleExceptionAsync(httpContext, ex);
            }
            catch (InvalidOperationException ex)
            {
                await HandleExceptionAsync(httpContext, ex);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(httpContext, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var (statusCode, message) = exception switch
            {
                UnauthorizedAccessException => (HttpStatusCode.Unauthorized, "Unauthorized request."),
                ArgumentNullException => (HttpStatusCode.BadRequest, "Bad request."),
                AccessViolationException => (HttpStatusCode.Forbidden, "Forbidden."),
                InvalidOperationException => (HttpStatusCode.BadRequest, "Invalid operation."),
                _ => (HttpStatusCode.InternalServerError, "Internal Server Error.")
            };

            _logger.Error("{exeption}", exception);

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)statusCode;

            await context.Response.WriteAsync(new ErrorDetails
            {
                Message = message
            }.ToString());
        }
    }
}
