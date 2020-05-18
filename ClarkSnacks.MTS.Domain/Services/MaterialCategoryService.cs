using ClarkSnacks.MTS.Domain.Entities;
using ClarkSnacks.MTS.Domain.Repositories.Interfaces;
using ClarkSnacks.MTS.Domain.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ClarkSnacks.MTS.Domain.Services
{
    public class MaterialCategoryService : IMaterialCategoryService
    {
        private readonly IMaterialCategoryRepository _categoryRepository;

        public MaterialCategoryService(IMaterialCategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        /// <summary>
        /// Get All Material Categories
        /// </summary>
        /// <returns></returns>
        public List<MaterialCategory> GetAllCategories()
        {
            return _categoryRepository.Get().ToList();
        }

        /// <summary>
        /// Get Material Category by Id
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public MaterialCategory GetCategoryById(int id)
        {
            return _categoryRepository.Get().FirstOrDefault(x => x.Id == id);
        }
    }
}
