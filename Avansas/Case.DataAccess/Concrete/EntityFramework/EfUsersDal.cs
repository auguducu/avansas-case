using Case.Core.DataAccess.EntityFramework;
using Case.DataAccess.Abstract;
using Case.Entities.Concrete;
using DataContext;

namespace Case.DataAccess.Concrete.EntityFramework;

public class EfUsersDal : EfEntityRepositoryBase<Users>, IUsersDal
{
    public EfUsersDal(DataContexts context) : base(context)
    {
    }
}