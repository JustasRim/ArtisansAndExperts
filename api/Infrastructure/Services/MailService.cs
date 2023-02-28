using Application.Services;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Infrastructure.Services
{
    internal class MailService : IMailService
    {
        private readonly IConfiguration _configuration;

        private string SendgridApi
        {
            get
            {
                var sendgridKey = _configuration.GetValue<string>("Secrets:Sendgrid");
                if (sendgridKey is null)
                {
                    throw new ArgumentNullException(nameof(sendgridKey));
                }

                return sendgridKey;
            }
        }

        private string FromAddress
        {
            get
            {
                var from = _configuration.GetValue<string>("Email");
                if (from is null)
                {
                    throw new ArgumentNullException(nameof(from));
                }

                return from;
            }
        }

        public MailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendPasswordReset(string to, Guid token)
        {
            var clientLink = _configuration.GetValue<string>("ClientLink");
            if (clientLink is null)
            {
                throw new ArgumentNullException($"{nameof(clientLink)} is null");
            }

            var client = new SendGridClient(SendgridApi);
            var from = new EmailAddress(FromAddress, "Artisans&Experts");
            var subject = "Slaptažodžio atkūrimas";
            var toAddress = new EmailAddress(to);
            var plainTextContent = $"Norėdami atkurti slaptažodį paspauskite šią nuorodą: {clientLink}/password-reset?email={to}&token={token}\nNuoroda galioja 1 valandą";
            var htmlContent = $"<p>Norėdami atkurti slaptažodį paspauskite šią nuorodą: {clientLink}/password-reset?email={to}&token={token}</p><br /><strong>Nuoroda galioja 1 valandą</strong>";
            var msg = MailHelper.CreateSingleEmail(from, toAddress, subject, plainTextContent, htmlContent);
            await client.SendEmailAsync(msg);
        }

        public async Task SendEmailVerificaiton(string to, Guid token)
        {
            var clientLink = _configuration.GetValue<string>("ClientLink");
            if (clientLink is null)
            {
                throw new ArgumentNullException($"{nameof(clientLink)} is null");
            }

            var client = new SendGridClient(SendgridApi);
            var from = new EmailAddress(FromAddress, "Artisans&Experts");
            var subject = "Pašto patvirtinimas";
            var toAddress = new EmailAddress(to);
            var plainTextContent = $"Patvirtinkite paštą paspausdami šią nuorodą: {clientLink}/confirm-email?email={to}&token={token}";
            var htmlContent = $"<p>Patvirtinkite paštą paspausdami šią nuorodą: {clientLink}/confirm-email?email={to}&token={token}</p>";
            var msg = MailHelper.CreateSingleEmail(from, toAddress, subject, plainTextContent, htmlContent);
            await client.SendEmailAsync(msg);
        }
    }
}
