using Autofac;
using Case.Business.Abstract;
using Case.Business.Concrete;
using Case.DataAccess.Abstract;
using Case.DataAccess.Concrete.EntityFramework;
using DataContext;

namespace Cars.Business.DependencyResolvers.Autofac;

public class AutofacBusinessModule : Module
{
    protected override void Load(ContainerBuilder builder)
    {
        builder.RegisterType<UsersManager>().As<IUsersService>();
        builder.RegisterType<EfUsersDal>().As<IUsersDal>();
        
        builder.RegisterType<DataContexts>().InstancePerLifetimeScope();
    }
}