﻿using ClarkSnacks.MTS.Domain.Entities;
using System.Collections.Generic;

namespace ClarkSnacks.MTS.Domain.Services.Interfaces
{
    public interface IOperatorService
    {
        List<Operator> GetAll();       
    }
}