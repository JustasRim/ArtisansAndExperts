using Domain.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistance.Configuration
{
    internal class ActivityConfiguration : IEntityTypeConfiguration<Activity>
    {
        public void Configure(EntityTypeBuilder<Activity> builder)
        {
            builder.HasIndex(q => q.Name).IsUnique();
            builder
                .HasMany(q => q.Projects)
                .WithOne(q => q.Activity)
                .HasForeignKey(q => q.ActivityId);
        }
    }
}
