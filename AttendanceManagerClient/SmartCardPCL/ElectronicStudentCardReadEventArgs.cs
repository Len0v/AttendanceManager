using System;

namespace SmartCardPCL
{
    public class ElectronicStudentCardReadEventArgs : EventArgs
    {
        public ElectronicStudentCardReadEventArgs(ElectronicStudentCardData smartCardData)
        {
            SmartCardData = smartCardData;
        }

        public ElectronicStudentCardData SmartCardData { get; }
    }
}
