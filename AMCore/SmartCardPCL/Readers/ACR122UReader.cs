using System;
using Core.Smartcard;
using System.Diagnostics;

namespace SmartCardPCL.Readers
{
    public class ACR122UReader
    {
        internal static CardNative CardNative { get; set; }

        public static void TurnBuzzerOffOnStart()
        {
            if (CardNative == null)
            {
                return;
            }
            try
            {
                var command2 = new byte[] { 0xFF, 0x00, 0x52, 0x00, 0x00 };
                var response = CardNative.TransmitRaw(command2);
                if (response.SW1 == 0x90 && response.SW2 == 0x00)
                {
                    return;
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
            }
            return;
        }

        public static void BlinkRedAndBuzz()
        {
            BlinkAndBuzz(0xDD, 10, 0, true);
        }

        public static void BlinkRed()
        {
            BlinkAndBuzz(0xDD, 10, 0, false);
        }

        public static void BlinkGreenAndBuzz()
        {
            BlinkAndBuzz(0xAE, 1, 3, true);
        }

        public static void BlinkGreen()
        {
            BlinkAndBuzz(0xAE, 1, 3, false);
        }

        public static void BlinkYellowAndBuzz()
        {
            BlinkAndBuzz(0xCF, 0x03, 0x00, true);
        }

        private static void BlinkAndBuzz(byte colors, int duration1, int duration2, bool buzz)
        {
            if (CardNative == null)
            {
                return;
            }
            try
            {
                var command2 = new byte[] { 0xFF, 0x00, 0x40, colors, 0x04, (byte)duration1, (byte)duration2, 0x01, (byte)((buzz) ? 0x01 : 0x00) };
                var response = CardNative.TransmitRaw(command2);
                if (response.SW1 != 0x90 || response.SW2 != 0x00)
                {
                    //error
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
            }
        }
    }
}