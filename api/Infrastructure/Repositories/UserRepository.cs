using Application.Repositories;
using Domain.Model;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    internal class UserRepository : IUserAuthRepository
    {
        private readonly AaEDbContext _context;

        public UserRepository(AaEDbContext context)
        {
            _context = context;
        }

        public async Task<int> Add(User entity)
        {
            await _context.Users.AddAsync(entity);
            return await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            _context.Users.Remove(new User { Id = id });
            await _context.SaveChangesAsync();
        }

        public User? Get(Func<User, bool> pred) => _context.Users
            .Include(q => q.Client)
            .Include(q => q.Expert)
            .ThenInclude(q => q.Activities)
            .FirstOrDefault(pred);

        public async Task<User?> GetByEmail(string email)
        {
            return await _context.Users
                .Include(q => q.Client)
                .Include(q => q.Expert)
                .ThenInclude(q => q.Activities)
                .FirstOrDefaultAsync(q => q.Email == email.ToLower());
        }

        public async Task<User?> GetUserWithPasswordResets(string email)
        {
            return await _context.Users
                .Include(q => q.PasswordResets)
                .FirstOrDefaultAsync(q => q.Email == email);
        }

        public User? GetById(int id) => _context.Users.Find(id);

        public IList<User> GetAll() => _context.Users
            .OrderBy(q => q.Name)
            .ThenBy(q => q.LastName)
            .ToList();

        public async Task Update(User entity)
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
