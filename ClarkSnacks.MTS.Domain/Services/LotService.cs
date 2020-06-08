using ClarkSnacks.MTS.Domain.Entities;
using ClarkSnacks.MTS.Domain.Repositories.Interfaces;
using ClarkSnacks.MTS.Domain.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace ClarkSnacks.MTS.Domain.Services
{
    public class LotService : ILotService
    {
        private readonly ILotRepository _lotRepository;

        public LotService(ILotRepository lotRepository)
        {
            _lotRepository = lotRepository;
        }

        /// <summary>
        /// Get All Lots
        /// </summary>
        /// <returns></returns>
        public List<Lot> GetAllLots()
        {
            return _lotRepository.Get().ToList();
        }

        /// <summary>
        /// Get Processed Lots
        /// </summary>
        /// <returns></returns>
        public List<ProcessedLot> GetProcessedLots()
        {
            return _lotRepository.GetProcessedLots().ToList();
        }

        /// <summary>
        /// Get Lot by Id
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public Lot GetLotById(int id)
        {
            return _lotRepository.Get().FirstOrDefault(x => x.Id == id);
        }

        /// <summary>
        /// Create a new lot
        /// </summary>
        /// <param name="lot"></param>
        /// <returns></returns>
        public Lot CreateLot(Lot lot)
        {
            var newLot = new Lot
            {
                LotNumber = lot.LotNumber,
                ItemId = lot.ItemId,
                VendorId = lot.VendorId,
                StatusId = 1,
                Quantity = lot.Quantity
            };

            _lotRepository.Add(newLot);

            _lotRepository.SaveChanges();

            return newLot;
        }

        /// <summary>
        /// Create a new processed lot
        /// </summary>
        /// <param name="processedLot"></param>
        /// <returns></returns>
        public ProcessedLot CreateProcessedLot(ProcessedLot processedLot)
        {
            var newProcessedLot = new ProcessedLot
            {
                LotId = processedLot.LotId,
                ProcessedByUserId = 1
            };

            _lotRepository.AddProcessedLot(newProcessedLot);

            _lotRepository.SaveChanges();

            return newProcessedLot;
        }
    }
}
