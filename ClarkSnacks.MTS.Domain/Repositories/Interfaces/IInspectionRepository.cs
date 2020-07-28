using ClarkSnacks.MTS.Domain.Entities;

namespace ClarkSnacks.MTS.Domain.Repositories.Interfaces
{
    public interface IInspectionRepository
    {
        void AddInspection(Inspection inspection);
        void SaveChanges();
    }
}
