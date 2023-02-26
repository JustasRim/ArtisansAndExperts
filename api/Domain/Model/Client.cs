using Domain.Common;

namespace Domain.Model
{
    public class Client : BaseEntity
    {
        public float Rating { get; set; }

        public IList<Project>? Projects { get; set; }

        public User? User { get; set; }

        public int UserId { get; set; }
    }
}
