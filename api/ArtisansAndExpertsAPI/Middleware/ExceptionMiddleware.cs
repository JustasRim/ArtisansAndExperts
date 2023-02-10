using Domain.Model;
using System.Net;

namespace ArtisansAndExpertsAPI.Middleware
{
    internal class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
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
            catch (Exception ex)
            {
                await HandleExceptionAsync(httpContext, ex);
            }
        }

        private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var (statusCode, message) = exception switch
            {
                UnauthorizedAccessException => (HttpStatusCode.Unauthorized, "Unauthorized request."),
                ArgumentNullException => (HttpStatusCode.BadRequest, "Bad request."),
                AccessViolationException => (HttpStatusCode.Forbidden, "Forbidden."),
                _ => (HttpStatusCode.InternalServerError, "Internal Server Error.")
            };

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)statusCode;

            await context.Response.WriteAsync(new ErrorDetails
            {
                Message = message
            }.ToString());
        }
    }
}
