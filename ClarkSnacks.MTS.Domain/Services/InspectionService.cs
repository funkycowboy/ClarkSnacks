using ClarkSnacks.MTS.Domain.Entities;
using ClarkSnacks.MTS.Domain.Repositories.Interfaces;
using ClarkSnacks.MTS.Domain.Services.Interfaces;

namespace ClarkSnacks.MTS.Domain.Services
{
    public class InspectionService : IInspectionService
    {

        private readonly IInspectionRepository _inspectionRepository;
        private readonly ILotRepository _lotRepository;

        public InspectionService(IInspectionRepository inspectionRepository, ILotRepository lotRepository)
        {
            _inspectionRepository = inspectionRepository;
            _lotRepository = lotRepository;
        }

        /// <summary>
        /// Create New Inspection
        /// </summary>
        /// <param name="inspection"></param>
        /// <returns></returns>
        public Inspection CreateInspection(Inspection inspection)
        {
            _inspectionRepository.AddInspection(inspection);

            _inspectionRepository.SaveChanges();

            return inspection;
        }
    }
}
