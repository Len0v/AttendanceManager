using AMDotNet.Helpers;
using Newtonsoft.Json;
using SmartCardPCL;
using SmartCardPCL.Readers;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace AMDotNet
{
    class Program
    {
        public static int roomID;

        private Dictionary<string, ElectronicStudentCardContactDataReader> ReaderList = new Dictionary<string, ElectronicStudentCardContactDataReader>();
        private async Task RunReadersWatcher()
        {
            while (true)
            {
                var readers = ElectronicStudentCardContactDataReader.ReaderList();
                foreach (var reader in ReaderList.Keys.Except(readers).ToList())
                {
                    ReaderList.Remove(reader);
                }
                foreach (var reader in readers)
                {

                    if (!ReaderList.ContainsKey(reader))
                    {
                        ReaderList.Add(reader, InitializeStudentCardReader(reader));
                    }
                }
                await Task.Delay(1000);
            }
        }

        private void Reader_OnCardConnected(object sender, EventArgs e)
        {
            Debug.WriteLine("OnCardConnected 1");
            ACR122UReader.TurnBuzzerOffOnStart();
            Debug.WriteLine("OnCardConnected 2");
        }
        private async void Reader_OnException(object sender, SmartCardExceptionEventArgs e)
        {
            Debug.WriteLine("OnException 1");
            if (Settings.SoundDefault)
            {
                ACR122UReader.BlinkRedAndBuzz();
            }
            else
            {
                ACR122UReader.BlinkRed();
            }
            Debug.WriteLine("OnException 2");
            HandleException(e.InnerException);
            Debug.WriteLine("OnException 3");
        }

        private async void Reader_OnCardInserted(object sender, EventArgs e)
        {
            Debug.WriteLine("OnCardInserted 1");
            //PrintWaitInfo();
            Debug.WriteLine("OnCardInserted 2");
        }

        private async void Reader_OnCardReadSucceed(object sender, ElectronicStudentCardReadEventArgs e)
        {
            Debug.WriteLine("OnCardReadSuccess 1");
            if (Settings.SoundDefault)
            {
                ACR122UReader.BlinkGreenAndBuzz();
            }
            else
            {
                ACR122UReader.BlinkGreen();
            }
            Debug.WriteLine("OnCardReadSuccess 2");
            await PrintStudentCardDataAsync(e.SmartCardData);
            Debug.WriteLine("OnCardReadSuccess 3");
        }

        private ElectronicStudentCardContactDataReader InitializeStudentCardReader(string name)
        {
            var reader = new ElectronicStudentCardContactDataReader();
            reader.OnException += Reader_OnException;
            reader.OnCardInserted += Reader_OnCardInserted;
            reader.OnCardConnected += Reader_OnCardConnected;
            reader.OnCardSuccessfullyRead += Reader_OnCardReadSucceed;
            reader.InitializeReader(name);
            return reader;
        }


        private async Task PrintStudentCardDataAsync(Models.ElectronicStudentCardData data)
        {
            Console.WriteLine(string.Format("First Name: {0} \nMiddle Name: {1}\nLast Name: {2}\nEdition No: {3}\n" +
                                                    "Id: {4}\nMarticular No: {5}\nNationality: {6}\nPersonal No: {7}\n" +
                                                    "Serial No: {8}\n" +
                                                    "University: {9}\n" +
                                                    "Valid until: {10}"
                                                    , data.FirstName, data.MiddleName, data.LastName, data.EditionNo,
                                                    data.Id, data.MatriculaNo, data.Nationality, data.PersonalNo, data.SerialNumber, data.UniversityName, data.ValidUntil));
            var user = new Models.User(data);
            var client = new HttpClient();
            client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
            var json = JsonConvert.SerializeObject(user);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var result = await client.PostAsync("http://attendancemanagerapi.azurewebsites.net/api/eventattendees/Register?roomId="+ roomID, content);            
            await Task.Delay(1000);
            ResetInfoState();
        }

        private void ResetInfoState()
        {
            Console.WriteLine("Przyłóż legitymację");
        }

        private void PrintErrorState()
        {
            Console.WriteLine("PONÓW PRÓBĘ");
        }

        private void HandleException(Exception ex)
        {
            Debug.WriteLine(ex);
            PrintErrorState();
        }

        static void Main(string[] args)
        {
            roomID = Int16.Parse("1");
            Console.WriteLine("Application started!");
            MainAsync().Wait();     
        }

        static async Task MainAsync()
        {
            Program p = new Program();
            await p.RunReadersWatcher();
        }
    }
}

