﻿namespace Domain.Dto
{
    public class AuthDto
    {
        public string? Name { get; set; }

        public string? LastName { get; set; }

        public string? AccessToken { get; init; }

        public string? RefreshToken { get; init; }
    }
}
