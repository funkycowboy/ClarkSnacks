using ClarkSnacks.MTS.Domain.Dtos;
using ClarkSnacks.MTS.Domain.Entities;
using System.Collections.Generic;

namespace ClarkSnacks.MTS.Domain.Services.Interfaces
{
    public interface IInspectionService
    {
        Inspection CreateInspection(Inspection inspection);
    }
}