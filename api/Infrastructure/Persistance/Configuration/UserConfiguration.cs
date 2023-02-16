using Domain.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistance.Configuration
{
    internal class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasIndex(q => q.Email).IsUnique();
            builder
                .HasOne(q => q.Expert)
                .WithOne(q => q.User)
                .HasForeignKey<Expert>(q => q.UserId);

            builder
                .HasOne(q => q.Client)
                .WithOne(q => q.User)
                .HasForeignKey<Client>(q => q.UserId);
        }
    }
}
