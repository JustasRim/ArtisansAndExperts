using Domain.Common;

namespace Domain.Model
{
    public class Image : BaseEntity
    {
        public string? Source { get; set; }

        public Project? Project { get; set; }

        public int ProjectId { get; set; }
    }
}
