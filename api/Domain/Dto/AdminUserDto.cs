namespace Domain.Dto
{
    public class AdminUserDto
    {
        public string? Name { get; set; }

        public string? LastName { get; set; }

        public string? Email { get; set; }

        public DateTime? RegistrationDate { get; set; }

        public bool Banned { get; set; }

        public bool Approved { get; set; }
    }
}
