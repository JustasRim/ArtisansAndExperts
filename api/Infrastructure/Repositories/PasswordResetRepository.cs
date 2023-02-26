using Application.Common.Interfaces;
using Domain.Model;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    internal class PasswordResetRepository : IRepository<PasswordReset>
    {
        private readonly AaEDbContext _context;

        public PasswordResetRepository(AaEDbContext context)
        {
            _context = context;
        }

        public async Task<int> Add(PasswordReset entity)
        {
            await _context.PasswordResets.AddAsync(entity);
            return await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            _context.PasswordResets.Remove(new PasswordReset { Id = id });
            await _context.SaveChangesAsync();
        }

        public PasswordReset? Get(Func<PasswordReset, bool> pred) => _context.PasswordResets
            .Include(q => q.User)
            .FirstOrDefault(pred);

        public PasswordReset? GetById(int id) => _context.PasswordResets.Find(id);

        public IList<PasswordReset> GetAll() => _context.PasswordResets.ToList();

        public async Task Update(PasswordReset entity)
        {
            var user = _context.Users.Find(entity.Id);
            if (user == null)
            {
                return;
            }

            _context.Entry(entity).CurrentValues.SetValues(entity);
            await _context.SaveChangesAsync();
        }
    }
}
