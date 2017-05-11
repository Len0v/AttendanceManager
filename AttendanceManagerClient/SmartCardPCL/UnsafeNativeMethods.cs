using System;
using System.Runtime.InteropServices;

namespace SmartCardPCL
{
    public enum ScopeOption
    {
        //User
        None = 0,
        Terminal = 1,
        System = 2
    }

    public class UnsafeNativeMethods
    {
        public const int SCARD_S_SUCCESS = 0;
        public const int SCARD_SHARE_SHARED = 2;
        public const int SCARD_PROTOCOL_T0 = 0x01; // T=0 is the active protocol.
        public const int SCARD_PROTOCOL_T1 = 0x02; // T=1 is the active protocol.

        [StructLayout(LayoutKind.Sequential)]
        public struct SCARD_IO_REQUEST
        {
            public int dwProtocol;
            public int cbPciLength;
        }

        [StructLayout(LayoutKind.Sequential)]
        public struct SCARD_READERSTATE
        {
            public string RdrName;
            public int UserData;
            public int RdrCurrState;
            public int RdrEventState;
            public int ATRLength;
            [MarshalAs(UnmanagedType.ByValArray, SizeConst = 37)] public byte ATRValue;
        }

        #region WinScard.DLL Imports

        [DllImport("winscard.dll")]
        public static extern int SCardTransmit(int hCard, ref SCARD_IO_REQUEST pioSendRequest, ref byte SendBuff,
            int SendBuffLen, ref SCARD_IO_REQUEST pioRecvRequest,
            ref byte RecvBuff, ref int RecvBuffLen);

        [DllImport("winscard.dll")]
        public static extern int SCardEstablishContext(int dwScope, int pvReserved1, int pvReserved2, ref int phContext);

        [DllImport("winscard.dll")]
        public static extern int SCardConnect(SmartcardContextSafeHandle hContext, string szReaderName, int dwShareMode,
            int dwPrefProtocol, ref int phCard, ref int ActiveProtocol);

        [DllImport("winscard.dll", EntryPoint = "SCardEstablishContext", CharSet = CharSet.Unicode,
            SetLastError = true)]
        public static extern uint EstablishContext(ScopeOption scope, IntPtr reserved1,
            IntPtr reserved2, ref SmartcardContextSafeHandle context);

        [DllImport("winscard.dll", EntryPoint = "SCardReleaseContext", CharSet = CharSet.Unicode,
            SetLastError = true)]
        public static extern uint ReleaseContext(IntPtr context);

        [DllImport("winscard.dll", EntryPoint = "SCardListReaders", CharSet = CharSet.Unicode,
            SetLastError = true)]
        public static extern uint ListReaders(SmartcardContextSafeHandle context, string groups,
            string readers, ref int size);

        [DllImport("winscard.dll", EntryPoint = "SCardGetStatusChange", CharSet = CharSet.Unicode,
            SetLastError = true)]
        public static extern uint GetStatusChange([In, Out] SmartcardContextSafeHandle context,
            [In, Out] int timeout, [In, Out] ReaderState[] states, [In, Out] int count);

        //[DllImport("winscard.dll", EntryPoint = "SCardGetStatusChange", CharSet = CharSet.Unicode,
        //     SetLastError = true)]
        // static public extern uint GetStatusChange([In(), Out()] SmartcardContextSafeHandle context,
        //     [In(), Out()] int timeout, [In(), Out()] ReaderState state, [In(), Out()] int count);

        #endregion
    }
}
