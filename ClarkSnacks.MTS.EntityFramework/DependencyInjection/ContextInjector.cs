using ClarkSnacks.MTS.EntityFramework.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace BeyondService.EntityFramework.DependencyInjection
{
    public static class ContextInjector
    {
        //public static void ConfigureEntityFramework(IServiceCollection services, string connectionString, string environment)
        //{
        //    if (environment.ToLower() != "production")
        //        services.AddDbContext<MTSDbContext>(options => options.UseSqlServer(connectionString)
        //            .EnableDetailedErrors()
        //            .EnableSensitiveDataLogging());
        //    else
        //        services.AddDbContext<MTSDbContext>(options => options.UseSqlServer(connectionString));
        //}
    }
}


