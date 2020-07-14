using ClarkSnacks.MTS.Domain.Entities;
using ClarkSnacks.MTS.Domain.Repositories.Interfaces;
using ClarkSnacks.MTS.EntityFramework.Context;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace ClarkSnacks.MTS.EntityFramework.Repositories
{
    public class LotRepository : ILotRepository
    {
        private readonly MTSDbContext _context;

        public LotRepository(MTSDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get Lots
        /// </summary>
        /// <returns></returns>
        public IQueryable<Lot> Get()
        {
            return _context.Lots
                 .Include(x => x.Item)
                    .ThenInclude(x => x.MaterialCategory)
                 .Include(x => x.Vendor);                                
        }

        /// <summary>
        /// Get Processed Lots
        /// </summary>
        /// <returns></returns>
        public IQueryable<ProcessedLot> GetProcessedLots()
        {
            return _context.ProcessedLots
                 .Include(x => x.Lot)
                    .ThenInclude(x => x.Item)
                        .ThenInclude(x => x.MaterialCategory)
                 .Include(x => x.Operator);
        }

        /// <summary>
        /// Add a new Lot
        /// </summary>
        /// <param name="lot"></param>
        public void Add(Lot lot)
        {
            _context.Lots.Add(lot);
        }

        /// <summary>
        /// Add a new Proccessed Lot
        /// </summary>
        /// <param name="processedLot"></param>
        public void AddProcessedLot(ProcessedLot processedLot)
        {
            _context.ProcessedLots.Add(processedLot);
        }

        /// <summary>
        /// Delete Processed Lot
        /// </summary>
        /// <param name="processedLot"></param>
        public void DeleteProcessedLot(ProcessedLot processedLot)
        {
            _context.Remove(processedLot);
        }

        /// <summary>
        /// Save changes
        /// </summary>
        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}
