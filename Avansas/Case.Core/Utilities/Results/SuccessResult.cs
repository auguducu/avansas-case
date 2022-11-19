using System;
using System.Collections.Generic;
using System.Text;

namespace Case.Core.Utilities.Results
{
    public class SuccessResult : Result
    {
        public SuccessResult(bool success, string message) : base(success: true, message)
        {

        }

        public SuccessResult(bool success) : base(success: true)
        {

        }
    }
}
