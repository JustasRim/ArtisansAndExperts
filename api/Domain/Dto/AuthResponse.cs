namespace Domain.Dto
{
    public class AuthDto
    {
        public string? AccessToken { get; init; }

        public string? RefreshToken { get; init; }
    }
}
