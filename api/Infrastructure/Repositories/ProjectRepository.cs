using Application.Repositories;
using Domain.Enum;
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

        public IList<Project> GetProjectsByEmailFiltered(string email, string? search = null, Status? status = null)
        {
            var projects = _context.Projects
                .Include(q => q.Images)
                .Include(q => q.Activity)
                .OrderByDescending(q => q.CreatedAt)
                .Where(q => q.Client.User.Email.Equals(email)).ToList();
            if (status is not null)
            {
                projects = projects.Where(q => q.Status == status).ToList();
            }

            if (!string.IsNullOrEmpty(search))
            {
                projects = projects.Where(q =>
                    q.Name.Contains(search, StringComparison.OrdinalIgnoreCase) ||
                    q.Activity.Name.Contains(search, StringComparison.OrdinalIgnoreCase) ||
                    q.CreatedAt.ToShortDateString().Contains(search, StringComparison.OrdinalIgnoreCase)
                )
                .ToList();
            }

            return projects;
        }

        public async Task Update(Project entity)
        {
            var project = _context.Projects.Find(entity.Id);
            if (project == null)
            {
                throw new InvalidOperationException("Could not find the project");
            }

            _context.Entry(entity).CurrentValues.SetValues(entity);
            await _context.SaveChangesAsync();
        }
    }
}
