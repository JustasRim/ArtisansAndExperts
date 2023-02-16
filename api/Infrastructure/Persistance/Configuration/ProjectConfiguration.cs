using Domain.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistance.Configuration
{
    internal class ProjectConfiguration : IEntityTypeConfiguration<Project>
    {
        public void Configure(EntityTypeBuilder<Project> builder)
        {
            builder
                .HasOne(q => q.Client)
                .WithMany(q => q.Projects)
                .HasForeignKey(q => q.ClientId);

            builder
                .HasMany(q => q.Images)
                .WithOne(q => q.Project)
                .HasForeignKey(q => q.ProjectId);

            builder
                .HasMany(q => q.Offers)
                .WithOne(q => q.Project)
                .HasForeignKey(q => q.ProjectId);
        }
    }
}
