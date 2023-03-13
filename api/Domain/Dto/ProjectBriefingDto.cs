using Domain.Enum;

namespace Domain.Dto
{
    public class ProjectBriefingDto
    {
        public string? Id { get; set; }

        public string? Name { get; set; }

        public string? Activity { get; set; }

        public DateTime? CreatedAt { get; set; }

        public Status Status { get; set; }

        public string? City { get; set; }

        public string? TimeLine { get; set; }
    }
}
