using ClarkSnacks.MTS.Domain.Entities;
using System.Linq;

namespace ClarkSnacks.MTS.Domain.Repositories.Interfaces
{
    public interface IItemRepository
    {
        IQueryable<Item> Get();
    }
}
