using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Infrastructure
{
    public class AaEDbContext : DbContext
    {
        public AaEDbContext(DbContextOptions<AaEDbContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
