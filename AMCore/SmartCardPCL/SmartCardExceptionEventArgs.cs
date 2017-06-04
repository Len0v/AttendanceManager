using System;

namespace SmartCardPCL
{
    public class SmartCardExceptionEventArgs : EventArgs
    {
        public SmartCardExceptionEventArgs(string message, SmartCardExceptionCode code, Exception innerException)
        {
            var segments = message.Split(new[] {": "}, StringSplitOptions.None);
            Message = segments[0];
            Code = (int) code;

            if (segments.Length > 1)
            {
                //TODO Error code when is 64bit
                //ResolvedCode = int.Parse(segments[1]);
            }

            InnerException = innerException;
        }

        public string Message { get; }
        public int Code { get; }
        public int ResolvedCode { get; }
        public Exception InnerException { get; }
    }

    public enum SmartCardExceptionCode
    {
        Unknown,
        ConnectionException,
        TransmitException,
        EmptyResponse,
        SW613E
    }
}
