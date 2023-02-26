using Domain.Model;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Infrastructure
{
    public class AaEDbContext : DbContext
    {
        public virtual DbSet<User> Users => Set<User>();

        public virtual DbSet<Activity> Activities => Set<Activity>();

        public virtual DbSet<Expert> Experts => Set<Expert>();

        public virtual DbSet<PasswordReset> PasswordResets => Set<PasswordReset>();

        public AaEDbContext(DbContextOptions<AaEDbContext> options)
            : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
            base.OnModelCreating(modelBuilder);
        }
    }
}
