using ClarkSnacks.MTS.Domain.Dtos;
using ClarkSnacks.MTS.Domain.Entities;
using System.Collections.Generic;

namespace ClarkSnacks.MTS.Domain.Services.Interfaces
{
    public interface ILotService
    {
        List<Lot> GetAllLots();
        Lot GetLotById(int Id);
        Lot CreateLot(Lot lot);
        ProcessedLot CreateProcessedLot(ProcessedLotDto processedlot);
        List<ProcessedLot> GetProcessedLots();
        void DeleteProcessedLot(int processedLotId);

    }
}