using ClarkSnacks.MTS.Domain.Entities;
using System.Collections.Generic;

namespace ClarkSnacks.MTS.Domain.Services.Interfaces
{
    public interface IMaterialCategoryService
    {
        List<MaterialCategory> GetAllCategories();
        MaterialCategory GetCategoryById(int Id);
    }
}