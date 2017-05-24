using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;
using SmartCardPCL.Readers;
using AttendanceManagerClient.Helpers;
using AttendanceManagerClient.Models;
using System.Threading;
using Windows.UI.Core;
using System.Threading.Tasks;
using SmartCardPCL;
using System.Diagnostics;
using Windows.UI.Popups;
using System.Net.Http;
using Windows.UI.Xaml.Media.Imaging;
using Windows.UI;

// The Blank Page item template is documented at https://go.microsoft.com/fwlink/?LinkId=402352&clcid=0x409

namespace AttendanceManagerClient
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class MainPage : Page
    {
        private CoreDispatcher dispatcher;
        private CancellationToken readersWatcherCancellationToken;
        private CancellationTokenSource readersWatcherCancellationTokenSource;

        public MainPage()
        {
            this.InitializeComponent();
            readersWatcherCancellationTokenSource = new CancellationTokenSource();
            readersWatcherCancellationToken = readersWatcherCancellationTokenSource.Token;
            Task.Run(() => RunReadersWatcher(), readersWatcherCancellationToken);
            this.Unloaded += MainPage_Unloaded;

            dispatcher = CoreWindow.GetForCurrentThread().Dispatcher;
        }
        private void MainPage_Unloaded(object sender, RoutedEventArgs e)
        {
            readersWatcherCancellationTokenSource?.Cancel();
        }

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

        private void Reader_OnCardConnected(object sender, EventArgs e)
        {
            Debug.WriteLine("OnCardConnected 1");
            ACR122UReader.TurnBuzzerOffOnStart();
            Debug.WriteLine("OnCardConnected 2");
        }

        private async void Reader_OnException(object sender, SmartCardExceptionEventArgs e)
        {
            Debug.WriteLine("OnException 1");
            if (Settings.Sound)
            {
                ACR122UReader.BlinkRedAndBuzz();
            }
            else
            {
                ACR122UReader.BlinkRed();
            }
            Debug.WriteLine("OnException 2");
            await dispatcher.RunAsync(CoreDispatcherPriority.Normal, () => HandleException(e.InnerException));
            Debug.WriteLine("OnException 3");
        }

        private async void Reader_OnCardInserted(object sender, EventArgs e)
        {
            Debug.WriteLine("OnCardInserted 1");
            await dispatcher.RunAsync(CoreDispatcherPriority.Normal, () => PrintWaitInfo());
            Debug.WriteLine("OnCardInserted 2");
        }

        private async void Reader_OnCardReadSucceed(object sender, ElectronicStudentCardReadEventArgs e)
        {
            Debug.WriteLine("OnCardReadSuccess 1");
            if (Settings.Sound)
            {
                ACR122UReader.BlinkGreenAndBuzz();
            }
            else
            {
                ACR122UReader.BlinkGreen();
            }
            Debug.WriteLine("OnCardReadSuccess 2");
            await dispatcher.RunAsync(CoreDispatcherPriority.Normal, async () => await PrintStudentCardDataAsync(e.SmartCardData));
            Debug.WriteLine("OnCardReadSuccess 3");
        }

        private void PrintWaitInfo()
        {
            StatusInfoTextBlock.Text = "Przytrzymaj";
            ColorInfoRectangle.Fill = new SolidColorBrush(Colors.Crimson);
            PersonImage.Source = null;
            PersonImage.Visibility = Visibility.Collapsed;
            NameInfoTextBlock.Text = string.Empty;
        }

        private async Task PrintStudentCardDataAsync(Models.ElectronicStudentCardData data)
        {
            try
            {
                if (string.IsNullOrEmpty(Settings.EventId))
                {
                    await new MessageDialog("Błąd! Zawołaj o pomoc! Informacja dla pomocy technicznej: No Event Id").ShowAsync();
                    return;
                }
                var user = await
                    App.MobileService.InvokeApiAsync<Models.ElectronicStudentCardData, FbUser>("Presence", data,
                        HttpMethod.Post, new Dictionary<string, string>() { { "eventId", Settings.EventId } });
                if (user?.picture?.url != null)
                {
                    PersonImage.Visibility = Visibility.Visible;
                    PersonImage.Source = new BitmapImage(new Uri(user.picture.url, UriKind.Absolute));
                }
                else
                {
                    PersonImage.Visibility = Visibility.Collapsed;
                }
            }
            catch (Exception ex)
            {
                PersonImage.Visibility = Visibility.Collapsed;
                HandleException(ex);
                await new MessageDialog("Błąd! Zawołaj o pomoc! Informacja dla pomocy technicznej: Comm Error").ShowAsync();
                return;
            }

            StatusInfoTextBlock.Text = "OK";
            ColorInfoRectangle.Fill = new SolidColorBrush(Colors.Chartreuse);

            //Debug.WriteLine(data);
            NameInfoTextBlock.Text = string.Format("Witaj, {0} {1}.", data.FirstName, data.LastName.Substring(0, 1));
            await Task.Delay(1000);
            ResetInfoState();
        }

        private void ResetInfoState()
        {
            StatusInfoTextBlock.Text = "Przyłóż legitymację";
            ColorInfoRectangle.Fill = new SolidColorBrush(Colors.Gold);
        }

        private void PrintErrorState()
        {
            StatusInfoTextBlock.Text = "PONÓW PRÓBĘ";
            ColorInfoRectangle.Fill = new SolidColorBrush(Colors.Crimson);
        }

        private void HandleException(Exception ex)
        {
            Debug.WriteLine(ex);
            PrintErrorState();
        }

        private int counter = 0;
        private void PageTitle_OnTapped(object sender, TappedRoutedEventArgs e)
        {
            counter++;
            if (counter >= 5)
            {
                counter = 0;
                Frame.Navigate(typeof(SettingsPage));
            }

        }
    }
}

