using ClarkSnacks.MTS.Domain.Entities;
using System.Linq;

namespace ClarkSnacks.MTS.Domain.Repositories.Interfaces
{
    public interface IOperatorRepository
    {
        IQueryable<Operator> Get();
    }
}
