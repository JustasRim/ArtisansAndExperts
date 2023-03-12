using Application.Repositories;
using Domain.Model;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    internal class ProjectRepository : IProjectRepository
    {
        private readonly AaEDbContext _context;

        public ProjectRepository(AaEDbContext context)
        {
            _context = context;
        }

        public async Task<int> Add(Project entity)
        {
            await _context.Projects.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity.Id;
        }

        public async Task Delete(int id)
        {
            _context.Projects.Remove(new Project { Id = id });
            await _context.SaveChangesAsync();
        }

        public Project? Get(Func<Project, bool> pred)
        {
            return _context.Projects.FirstOrDefault(pred);
        }

        public IList<Project> GetAll()
        {
            return _context.Projects.ToList();
        }

        public Project? GetById(int id)
        {
            return _context.Projects.Include(q => q.Images).FirstOrDefault(q => q.Id == id);
        }

        public IList<Project> GetProjectsByEmailFiltered(string email, string? search = null)
        {
            var projects = _context.Projects
                .Include(q => q.Images)
                .Include(q => q.Activity)
                .OrderByDescending(q => q.CreatedAt)
                .Where(q => q.Client.User.Email.Equals(email)).ToList();

            if (string.IsNullOrEmpty(search))
            {
                return projects;
            }

            return projects
                .Where(q => 
                    q.Name.Contains(search, StringComparison.OrdinalIgnoreCase) ||
                    q.Activity.Name.Contains(search, StringComparison.OrdinalIgnoreCase) ||
                    q.CreatedAt.ToShortDateString().Contains(search, StringComparison.OrdinalIgnoreCase)
                )
                .ToList();
        }

        public async Task Update(Project entity)
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
