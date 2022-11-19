using Case.Entities.Concrete;
using Case.Entities.Helper;
using Microsoft.EntityFrameworkCore;

namespace DataContext
{
    public class DataContexts : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql(EnvHelper.ConnectionString, new MySqlServerVersion(new Version()));
        }
        
        public DbSet<Users> Users { get; set; }
    }
}