﻿using System;
using System.Linq;
﻿using Core.Smartcard;

namespace SmartCardPCL
{
    internal static class ExtensionMethods
    {
        public static string BytesToString(this byte[] bytes)
        {
            return bytes.Aggregate(String.Empty, (current, b) => current + (string.Format("{0:X2}", b) + " "));
        }

        public static byte[] CleanString(this byte[] bytes)
        {
            for (var i = 0; i < bytes.Length; i++)
            {
                if (bytes[i] < 0x20)
                {
                    bytes[i] = 0x20;
                }
            }

            return bytes;
        }

        public static string BytesToString(this APDUCommand bytes)
        {
            var ret = string.Empty;
            ret += string.Format("{0:X2}", bytes.Class) + " ";
            ret += string.Format("{0:X2}", bytes.Ins) + " ";
            ret += string.Format("{0:X2}", bytes.P1) + " ";
            ret += string.Format("{0:X2}", bytes.P2) + " ";
            ret += string.Format("{0:X2}", bytes.Le) + " ";
            if (bytes.Data == null) return ret;
            return bytes.Data.Aggregate(ret, (current, b) => current + (string.Format("{0:X2}", b) + " "));
        }
    }
}
