using System;
using System.Collections.Generic;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using AttendanceManagerClient.Models;

namespace AttendanceManagerClient.Helpers
{
    public class ParticipantTemplateSelector : DataTemplateSelector
    {
        public DataTemplate FacebookParticipantTemplate { get; set; }
        public DataTemplate ElsDataTemplate { get; set; }

        protected override DataTemplate SelectTemplateCore(object item, DependencyObject container)
        {
            if (item is FbUser)
                return FacebookParticipantTemplate;
            if (item is EventUserPresence)
                return ElsDataTemplate;
            return base.SelectTemplateCore(item, container);
        }
    }
}
