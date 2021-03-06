﻿using ClarkSnacks.MTS.Domain.Entities;
using ClarkSnacks.MTS.Domain.Repositories.Interfaces;
using ClarkSnacks.MTS.EntityFramework.Context;
using System.Linq;

namespace ClarkSnacks.MTS.EntityFramework.Repositories
{
    public class MaterialCategoryRepository : IMaterialCategoryRepository
    {
        private readonly MTSDbContext _context;

        public MaterialCategoryRepository(MTSDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get Vendors
        /// </summary>
        /// <returns></returns>
        public IQueryable<MaterialCategory> Get()
        {
            return _context.MaterialCategories;
        }
    }
}
