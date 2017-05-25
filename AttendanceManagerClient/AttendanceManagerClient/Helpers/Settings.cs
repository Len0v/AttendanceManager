using System;
using Windows.Storage;

namespace AttendanceManagerClient.Helpers
{
    public class Settings
    {
        private const bool SoundDefault = false;
        
        public static bool Sound
        {
            get
            {
                if (ApplicationData.Current.LocalSettings.Values["Sound"] == null)
                {
                    return SoundDefault;
                }
                return (bool)(ApplicationData.Current.LocalSettings.Values["Sound"]);
            }
            set { ApplicationData.Current.LocalSettings.Values["Sound"] = value; }
        }

        public static string EventId
        {
            get { return ApplicationData.Current.LocalSettings.Values["FBEventId"] as string; }
            set { ApplicationData.Current.LocalSettings.Values["FBEventId"] = value; }
        }
    }
}
