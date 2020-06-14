using ClarkSnacks.MTS.Domain.Entities;
using System.Linq;

namespace ClarkSnacks.MTS.Domain.Repositories.Interfaces
{
    public interface ILotRepository
    {
        IQueryable<Lot> Get();
        void Add(Lot lot);
        void AddProcessedLot(ProcessedLot processedLot);
        IQueryable<ProcessedLot> GetProcessedLots();
        void SaveChanges();
        void DeleteProcessedLot(ProcessedLot processedLot);
    }
}
