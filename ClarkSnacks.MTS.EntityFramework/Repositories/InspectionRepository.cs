using ClarkSnacks.MTS.Domain.Entities;
using ClarkSnacks.MTS.Domain.Repositories.Interfaces;
using ClarkSnacks.MTS.EntityFramework.Context;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace ClarkSnacks.MTS.EntityFramework.Repositories
{
    public class InspectionRepository : IInspectionRepository
    {
        private readonly MTSDbContext _context;

        public InspectionRepository(MTSDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Add New Inspection
        /// </summary>
        /// <param name="inspection"></param>
        public void AddInspection(Inspection inspection)
        {
            _context.Inspections.Add(inspection);
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
