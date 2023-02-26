namespace Application.Services
{
    public interface IMailService
    {
        Task SendPasswordReset(string to, Guid token);

        Task SendEmailVerificaiton(string to, Guid token);
    }
}
