using System;
using System.Runtime.InteropServices;

namespace SmartCardPCL
{
    //Wraps the SCARD_READERSTATE structure of PC/SC.
    [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Ansi)]
    public struct ReaderState
    {
        //Points to the name of the reader being monitored.
        [MarshalAs(UnmanagedType.LPWStr)]
        private string _reader;

        //Not used by the smart card subsystem but is used by the application.
        //Current state of reader at time of call
        //State of reader after state change
        //Number of bytes in the returned ATR
        [MarshalAs(UnmanagedType.U4)]
        private readonly int _attribute;

        //ATR of inserted card, with extra alignment bytes.
        [MarshalAs(UnmanagedType.ByValArray, SizeConst = 36)]
        private readonly byte[] _rgbAtr;

        public byte[] RGBAttribute()
        {
            return _rgbAtr;
        }

        public string Reader
        {
            get { return _reader; }
            set { _reader = value; }
        }

        public IntPtr UserData { get; set; }

        public CardState CurrentState { get; set; }

        public CardState EventState { get; }
    }
}
