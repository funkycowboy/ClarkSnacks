using ClarkSnacks.MTS.Domain.Entities;
using ClarkSnacks.MTS.Domain.Repositories.Interfaces;
using ClarkSnacks.MTS.EntityFramework.Context;
using System.Linq;

namespace ClarkSnacks.MTS.EntityFramework.Repositories
{
    public class OperatorRepository : IOperatorRepository
    {
        private readonly MTSDbContext _context;

        public OperatorRepository(MTSDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get Operators
        /// </summary>
        /// <returns></returns>
        public IQueryable<Operator> Get()
        {
            return _context.Operators;
        }
    }
}
