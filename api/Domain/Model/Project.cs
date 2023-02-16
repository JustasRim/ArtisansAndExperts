using Domain.Common;

namespace Domain.Model
{
    public class Project : BaseEntity
    {
        public string? Name { get; set; }

        public string? Description { get; set; }

        public IList<Images>? Images { get; set; }
    }
}
