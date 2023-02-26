using System.ComponentModel.DataAnnotations;

namespace Domain.Dto
{
    public class ExpertDto
    {
        public string? Id { get; set; }

        public string? Name { get; set; }

        public string? WorkDescription { get; set; }

        [StringLength(100)]
        public string? City { get; set; }

        public int Radius { get; set; }

        public float Rating { get; set; }

        public string? ProfileSrc { get; set; }

        public IList<string?>? Activities { get; set; }
    }
}
