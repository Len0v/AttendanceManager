using System;
using System.Collections.Generic;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using AttendanceManagerClient.Models;

namespace AttendanceManagerClient.Helpers
{
    public class ConnectorParticipantTemplateSelector : DataTemplateSelector
    {
        public DataTemplate FacebookParticipantTemplate { get; set; }
        public DataTemplate ElsDataTemplate { get; set; }
        public DataTemplate ListDataTemplate { get; set; }

        protected override DataTemplate SelectTemplateCore(object item, DependencyObject container)
        {
            var connector = item as FbElsConnector;
            if (connector != null)
            {
                if (connector.FbUser != null)
                {
                    return FacebookParticipantTemplate;
                }
                if (connector.ElectronicStudentCard != null)
                {
                    return ElsDataTemplate;
                }
                if (connector.ListUser != null)
                {
                    return ListDataTemplate;
                }
            }
            return base.SelectTemplateCore(item, container);
        }
    }
}
