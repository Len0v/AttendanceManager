using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
using Core.Smartcard;
using SmartCardPCL.Readers;

namespace SmartCardPCL
{
    public class ElectronicStudentCardContactDataReader
    {
        public enum DisconnectCardMethod
        {
            Unpower = DISCONNECT.Unpower,
            Eject = DISCONNECT.Eject,
            Leave = DISCONNECT.Leave,
            Reset = DISCONNECT.Reset
        }

        private const ushort SC_OK = 0x9000;
        private const byte SC_PENDING = 0x9F;
        private const string EmptyResponseExceptionMessage = "Empty response";

        private static readonly byte[] DataSelectFileDf =
        {
            0xD6, // AID 1 (high)
            0x16, // AID 2
            0x00, // AID 3
            0x00, // AID 4
            0x30, // AID 5 (low)
            0x01, // PIX 1 (high)
            0x01
        }; // PIX 2 (low)
        
        private readonly CardNative iCard = new CardNative();

        public event EventHandler<SmartCardExceptionEventArgs> OnException;
        public event EventHandler<ElectronicStudentCardReadEventArgs> OnCardSuccessfullyRead;
        public event EventHandler OnCardInserted;
        public event EventHandler OnCardConnected;

        public void InitializeReader()
        {
            var readers = iCard.ListReaders();
            if (readers?.Length > 0)
            {
                InitializeReader(readers[0]);
            }
        }

        /// <summary>
        ///     Initializes the smart card reader.
        /// </summary>
        public void InitializeReader(string reader)
        {
            if (reader.Equals("ACS ACR122 0"))
            {
                ACR122UReader.CardNative = iCard;
            }
            iCard.OnCardInserted += iCard_OnCardInserted;
            iCard.StartCardEvents(reader);
        }

        public void DisconnectReader()
        {
            iCard.OnCardInserted -= iCard_OnCardInserted;
            iCard.StopCardEvents();
        }

        private static CardNative ReadersWatcher;
        public static List<string> ReaderList()
        {
            if (ReadersWatcher == null)
            {
                ReadersWatcher = new CardNative();
            }
            var result = new List<string>();
            foreach (var reader in ReadersWatcher.ListReaders() ?? new string[0] {})
            {
                result.Add(reader);
            }
            return result;
        }
        
        private void iCard_OnCardInserted(object sender, string reader)
        {
            OnCardInserted?.Invoke(this, EventArgs.Empty);
            try
            {
                iCard.Connect(reader, SHARE.Shared, PROTOCOL.T0orT1);

                Task.Delay(500).Wait();
                OnCardConnected?.Invoke(this, EventArgs.Empty);
                ReadELS();
                
                try
                {
                    DisconnectCard();
                }
                catch (Exception ex)
                {
                    RaiseException(ex.Message, SmartCardExceptionCode.Unknown);
                }
            }
            catch (Exception ex)
            {
                RaiseException(ex.Message, SmartCardExceptionCode.ConnectionException, ex);
            }
        }

        private void ReadELS()
        {
            try
            {
                if (!selectFileRaw(true, new byte[] {0x3F, 0x00}) || !selectAID(DataSelectFileDf) || !selectFileRaw(false, new byte[] { 0x00, 0x02 }))
                {
                    return;
                }
                var data = ReadRecord();

                OnCardSuccessfullyRead?.Invoke(this, new ElectronicStudentCardReadEventArgs(data));
            }
            catch (Exception ex)
            {
                RaiseException(ex.Message, SmartCardExceptionCode.Unknown);
            }
        }

        private void DisconnectCard(DisconnectCardMethod disconnectCardMethod = DisconnectCardMethod.Unpower)
        {
            iCard.Disconnect((DISCONNECT) disconnectCardMethod);
        }

        private bool selectFileRaw(bool mainFile, byte[] file)
        {
            var command = new List<byte>();
            command.AddRange(new Byte[] { 0x00, 0xA4, 0x00, 0x0C, 0x02});
            command.AddRange(file);

            var apduResp = iCard.TransmitRaw(command.ToArray());

            if (apduResp == null)
            {
                RaiseException(EmptyResponseExceptionMessage, SmartCardExceptionCode.EmptyResponse);
                return false;
            }

            if (apduResp.Status != SC_OK && apduResp.SW1 != SC_PENDING)
            {
                RaiseException(apduResp.ToString(), SmartCardExceptionCode.SW613E);
                return false;
            }

            return true;
        }

        private bool selectAID(byte[] bytes)
        {
            var command = new List<byte>();
            command.AddRange(new Byte[] { 0x00, 0xA4, 0x04, 0x0C, (byte) bytes.Length });
            command.AddRange(bytes);

            var apduResp = iCard.TransmitRaw(command.ToArray());

            if (apduResp == null)
            {
                RaiseException(EmptyResponseExceptionMessage, SmartCardExceptionCode.EmptyResponse);
                return false;
            }

            if (apduResp.Status != SC_OK && apduResp.SW1 != SC_PENDING)
            {
                RaiseException(apduResp.ToString(), SmartCardExceptionCode.SW613E);
                return false;
            }

            return true;
        }

        private ElectronicStudentCardData ReadRecord()
        {
            var offset = 0;

            var dataParser = new ElectronicStudentCardDataParser();

            for (var offs = 0; offs < 2; offs++)
            {
                var P1 = (byte) (((offset) >> 8) & 0xFF);
                var P2 = (byte) ((offset) & 0xFF);
                var command = new byte[] {0x00, 0xB0, P1, P2, 0xFF};
                var apduResp = iCard.TransmitRaw(command, 260);

                if (apduResp != null)
                {
                    dataParser.ParseRecords(apduResp.Data);

                    offset += 64;
                }
                else
                {
                    throw new Exception(string.Format("{0}: {1}", EmptyResponseExceptionMessage,
                        SmartCardExceptionCode.EmptyResponse));
                }
            }

            return dataParser.ToSmartCardData();
        }

        private void RaiseException(string message, SmartCardExceptionCode code = SmartCardExceptionCode.Unknown,
            Exception innerException = null)
        {
            OnException?.Invoke(this, new SmartCardExceptionEventArgs(message, code, innerException));
        }
    }
}