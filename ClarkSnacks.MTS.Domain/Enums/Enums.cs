using System;
using System.Collections.Generic;
using System.Text;

namespace ClarkSnacks.MTS.Domain.Enums
{
    /// <summary>
    /// Disposition Enums
    /// </summary>
    public enum DispositionEnum
    {
        UseAsIs = 1,
        CustomerApprovalToUse = 2,
        Dispose = 3,
        Rework = 4,
        ReturnToSupplier = 5,
        Other = 6
    }

    /// <summary>
    /// Hold Status Enums
    /// </summary>
    public enum HoldStatusEnum
    {
        Level1 = 1,
        Level2 = 2,
        NotApplicable = 3
    }


    /// <summary>
    /// Inspection Result Enums
    /// </summary>
    public enum InspectionResultEnum
    {
        Accepted = 1,
        Rejected = 2,
        Deviation = 3
    }

    /// <summary>
    /// Question Response Enums
    /// </summary>

    public enum QuestionResponseEnum
    {
        Yes = 1,
        No = 2,
        NotApplicable = 3
    }
}
