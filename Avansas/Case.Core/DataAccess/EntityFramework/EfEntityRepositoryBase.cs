using System;
using Case.Core.Entities;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace Case.Core.DataAccess.EntityFramework
{
    public class EfEntityRepositoryBase<T> : IEntityRepository<T> where T : class, IEntity
    {
        private readonly DbContext _context;
        public EfEntityRepositoryBase(DbContext context) => _context = context;

        public T Get(Expression<Func<T, bool>> filter)
            => _context.Set<T>()
                .SingleOrDefault(filter);

        public List<T> GetList(Expression<Func<T, bool>> filter = null)
            => filter == null
                ? _context.Set<T>().ToList()
                : _context.Set<T>().Where(filter).ToList();

        public async Task<bool> AddAsync(T entity)
        {
            try
            {
                var addedEntity = await _context.AddAsync(entity);
                addedEntity.State = EntityState.Added; 
                await _context.SaveChangesAsync();
                
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public async Task<T> GetAsync(Expression<Func<T, bool>> filter, bool lazyLoading = false)
        {
            _context.ChangeTracker.LazyLoadingEnabled = lazyLoading;
            return await _context.Set<T>().FirstOrDefaultAsync(filter);
        }
        public async Task<List<T>> GetListAsync(Expression<Func<T, bool>> filter = null, bool lazyLoading = false)
        {
            _context.ChangeTracker.LazyLoadingEnabled = lazyLoading;
            if (filter == null)
            {
                return await _context.Set<T>().ToListAsync();
            }
            else
            {
                return await  _context.Set<T>().Where(filter).ToListAsync();
            }
        }
   

        public async Task<bool> UpdateAsync(T entity)
        {
            try
            {
                _context.Entry(entity).State = EntityState.Modified;
                return await _context.SaveChangesAsync().ContinueWith(x => true);
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}