using System;
using System.Collections.Generic;
using System.Text;

namespace ClarkSnacks.MTS.Domain.Entities
{
    public class Operator
    {
        public Operator(){
            Lots = new HashSet<Lot>();
            ProcessedLots = new HashSet<ProcessedLot>();
            Inspections = new HashSet<Inspection>();
        }

        public int Id { get; set; }
        public string EmployeeName { get; set; }
        public int EmployeeNumber { get; set; }

        public virtual ICollection<ProcessedLot> ProcessedLots { get; set; }
        public virtual ICollection<Lot> Lots { get; set; }
        public virtual ICollection<Inspection> Inspections { get; set; }
    }
}
