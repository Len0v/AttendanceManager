using System;
using System.Text;

namespace SmartCardPCL
{
    public class ElectronicStudentCardDataParser
    {
        private readonly byte[][] result = new byte[50][]; // parsuje rekordy do stringa
        private readonly int[] resultActualLen = new int[50];
        private readonly bool[] resultIsString = new bool[50]; // zapisuje, czy rekord to string (0x0C), czy int (0x13)
        //private readonly int[] resultLen = new int[50]; // odcztuje dlugosci stringow
        private string[] dataOnCard;
        private bool lastByteControl, hex_0x0C;
        private int lp;
        private int stringIndex;

        public ElectronicStudentCardDataParser()
        {
            for (var i = 0; i < result.Length; i++)
            {
                result[i] = new byte[255];
                resultActualLen[i] = 0;
            }
        }

        public void ParseRecords(byte[] tempData)
        {
            for (var i = 0; i < tempData.Length - 2; i++)
            {
                int code = tempData[i];
                lp++;
                var c = tempData[i];

                if ((code > 31) && (code < 256))
                {
                    if (hex_0x0C == false)
                    {
                        result[stringIndex][(resultActualLen[stringIndex]++)] = c;
                    }
                }

                if (hex_0x0C)
                {
                    //resultLen[stringIndex] = code;
                    hex_0x0C = false;
                }

                if (((code == 0x0C) || (code == 0x13) || (code == 0x18)) && (lastByteControl == false))
                {
                    lastByteControl = true;

                    // zeby nie traktowal dlugosci danych w rekordzie jako bajtu kontrolnego
                    stringIndex++;

                    if (code == 0x0C)

                    {
                        resultIsString[stringIndex] = true;
                    }
                    else
                    {
                        resultIsString[stringIndex] = false;
                    }

                    hex_0x0C = true;
                }
                else
                {
                    lastByteControl = false;
                }
            }
        }

        public string[] ToStringArray()
        {
            var fieldIndex = 0;
            dataOnCard = new string[10];
            string dataBuffer;

            for (var i = 0; i < result.Length; i++)
            {
                if (result[i] != null)
                {
                    dataBuffer = string.Empty;
                    try
                    {
                        var data = result[i];
                        dataBuffer = Encoding.UTF8.GetString(data, 0, data.Length).Substring(0, resultActualLen[i]);
                    }
                    catch
                    {
                    }
                    if ((i > 0) && (fieldIndex < dataOnCard.Length))
                    {
                        if (i != 5)
                        {
                            dataOnCard[fieldIndex] = dataBuffer;
                        }
                        else if ((i == 5) && resultIsString[i])
                        {
                            // drugie imie
                            dataOnCard[fieldIndex] = dataBuffer;
                        }
                        else
                        {
                            // jezeli drugie imie jest puste w tym miejscu znajduje sie numer indeksu!
                            fieldIndex++;
                            dataOnCard[fieldIndex] = dataBuffer;
                        }
                        fieldIndex++;
                    }
                }
            }

            /*if (resultIsString[5])
            {
                Console.WriteLine("Middle name not found");
            }*/

            dataOnCard[1] = TrimNumericEnd(dataOnCard[1]);
            dataOnCard[2] = TrimNumericEnd(dataOnCard[2]);
            dataOnCard[3] = TrimNumericEnd(dataOnCard[3]);

            return dataOnCard;
        }

        public ElectronicStudentCardData ToSmartCardData()
        {
            ToStringArray();

            // sformatowanie daty waznosci karty na RRRR-MM-DD

            var validUntil = new DateTime(int.Parse(dataOnCard[8].Substring(0, 4)),
                int.Parse(dataOnCard[8].Substring(4, 2)),
                int.Parse(dataOnCard[8].Substring(6, 2)));

            var data = new ElectronicStudentCardData
            {
                SerialNumber = dataOnCard[0],
                UniversityName = dataOnCard[1],
                LastName = dataOnCard[2],
                FirstName = dataOnCard[3],
                MiddleName = dataOnCard[4] ?? string.Empty,
                MatriculaNo = dataOnCard[5],
                EditionNo = dataOnCard[6],
                PersonalNo = dataOnCard[7],
                ValidUntil = validUntil,
                Version = 1,
                Nationality = dataOnCard[9]
            };

            return data;
        }

        private static string TrimNumericEnd(string value)
        {
            var maxIndex = value.Length - 1;
            while (value.Length > 0 && (value[maxIndex] == 0 || (value[maxIndex] >= '0' && value[maxIndex] <= '9')))
            {
                value = value.Substring(0, maxIndex);
                maxIndex = value.Length - 1;
            }

            return value;
        }
    }
}
