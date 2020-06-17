using ClarkSnacks.MTS.Domain.Entities;
using ClarkSnacks.MTS.Domain.Repositories.Interfaces;
using ClarkSnacks.MTS.Domain.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace ClarkSnacks.MTS.Domain.Services
{
    public class OperatorService : IOperatorService
    {
        private readonly IOperatorRepository _operatorRepository;

        public OperatorService(IOperatorRepository operatorRepository)
        {
            _operatorRepository = operatorRepository;
        }

        /// <summary>
        /// Get All Operators
        /// </summary>
        /// <returns></returns>
        public List<Operator> GetAll()
        {
            return _operatorRepository.Get().ToList();
        }
    }
}
