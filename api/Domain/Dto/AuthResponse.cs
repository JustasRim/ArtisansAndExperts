namespace Domain.Dto
{
    public class AuthResponse
    {
        public string? Token { get; init; }

        public string? RefreshToken { get; init; }
    }
}
