import {Component, OnInit} from '@angular/core';
import {DataTable} from 'primeng/primeng';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  yearFilter = null;

  statusFilterDropdown = [
    {
      label: '',
      value: ''
    },
    {
      label: 'Active',
      value: 'Active'
    },
    {
      label: 'Incoming',
      value: 'Incoming'
    },
    {
      label: 'Expired',
      value: 'Expired'
    }
  ];

  data = [
    {
      name: 'Podstawy teleinformatyki - ćwiczenia',
      status: 'Active',
      repeatable: false,
      date: '09/01/2017',
      timeFrom: '15.30',
      timeTo: '17.30',
      standardDay: null
    },
    {
      name: 'Inżynieria oprogramowania',
      status: 'Incoming',
      repeatable: false,
      date: '09/01/2017',
      timeFrom: '15.30',
      timeTo: '17.30',
      standardDay: null
    },
    {
      name: 'Bazy danych',
      status: 'Incoming',
      repeatable: true,
      date: '09/01/2017',
      timeFrom: '15.30',
      timeTo: '17.30',
      standardDay: 'Wednesday'
    },
    {
      name: 'Wykład 1',
      status: 'Expired',
      repeatable: true,
      date: '09/01/2017',
      timeFrom: '15.30',
      timeTo: '17.30',
      standardDay: 'Monday'
    },
    {
      name: 'Wykład 2',
      status: 'Incoming',
      repeatable: false,
      date: '09/01/2017',
      timeFrom: '15.30',
      timeTo: '17.30',
      standardDay: null
    },
    {
      name: 'Szkolenie',
      status: 'Expired',
      repeatable: true,
      date: '09/01/2017',
      timeFrom: '15.30',
      timeTo: '17.30',
      standardDay: 'Friday'
    },
    {
      name: 'Podstawy teleinformatyki - ćwiczenia',
      status: 'Active',
      repeatable: false,
      date: '09/01/2017',
      timeFrom: '15.30',
      timeTo: '17.30'
    },
    {
      name: 'Inżynieria oprogramowania',
      status: 'Incoming',
      repeatable: false,
      date: '09/01/2017',
      timeFrom: '15.30',
      timeTo: '17.30'
    },
    {
      name: 'Bazy danych',
      status: 'Incoming',
      repeatable: true,
      date: '09/01/2017',
      timeFrom: '15.30',
      timeTo: '17.30'
    },
    {
      name: 'Wykład 1',
      status: 'Expired',
      repeatable: true,
      date: '09/01/2017',
      timeFrom: '15.30',
      timeTo: '17.30'
    },
    {
      name: 'Wykład 2',
      status: 'Incoming',
      repeatable: false,
      date: '09/01/2017',
      timeFrom: '15.30',
      timeTo: '17.30'
    },
    {
      name: 'Szkolenie',
      status: 'Expired',
      repeatable: true,
      date: '09/01/2017',
      timeFrom: '15.30',
      timeTo: '17.30'
    },
    {
      name: 'Podstawy teleinformatyki - ćwiczenia',
      status: 'Active',
      repeatable: false,
      date: '09/01/2017',
      timeFrom: '15.30',
      timeTo: '17.30'
    },
    {
      name: 'Inżynieria oprogramowania',
      status: 'Incoming',
      repeatable: false,
      date: '09/01/2017',
      timeFrom: '15.30',
      timeTo: '17.30'
    },
    {
      name: 'Bazy danych',
      status: 'Incoming',
      repeatable: true,
      date: '09/01/2017',
      timeFrom: '15.30',
      timeTo: '17.30'
    },
    {
      name: 'Wykład 1',
      status: 'Expired',
      repeatable: true,
      date: '09/01/2017',
      timeFrom: '15.30',
      timeTo: '17.30'
    },
    {
      name: 'Wykład 2',
      status: 'Incoming',
      repeatable: false,
      date: '09/01/2017',
      timeFrom: '15.30',
      timeTo: '17.30'
    },
    {
      name: 'Szkolenie',
      status: 'Expired',
      repeatable: true,
      date: '09/01/2017',
      timeFrom: '15.30',
      timeTo: '17.30'
    },
    {
      name: 'Podstawy teleinformatyki - ćwiczenia',
      status: 'Active',
      repeatable: false,
      date: '09/01/2017',
      timeFrom: '15.30',
      timeTo: '17.30'
    },
    {
      name: 'Inżynieria oprogramowania',
      status: 'Incoming',
      repeatable: false,
      date: '09/01/2017',
      timeFrom: '15.30',
      timeTo: '17.30'
    },
    {
      name: 'Bazy danych',
      status: 'Incoming',
      repeatable: true,
      date: '09/01/2017',
      timeFrom: '15.30',
      timeTo: '17.30'
    },
    {
      name: 'Wykład 1',
      status: 'Expired',
      repeatable: true,
      date: '09/01/2017',
      timeFrom: '15.30',
      timeTo: '17.30'
    },
    {
      name: 'Wykład 2',
      status: 'Incoming',
      repeatable: false,
      date: '09/01/2017',
      timeFrom: '15.30',
      timeTo: '17.30'
    },
    {
      name: 'Szkolenie',
      status: 'Expired',
      repeatable: true,
      date: '09/01/2017',
      timeFrom: '15.30',
      timeTo: '17.30'
    },
    {
      name: 'Podstawy teleinformatyki - ćwiczenia',
      status: 'Active',
      repeatable: false,
      date: '09/01/2017',
      timeFrom: '15.30',
      timeTo: '17.30'
    },
    {
      name: 'Inżynieria oprogramowania',
      status: 'Incoming',
      repeatable: false,
      date: '09/01/2017',
      timeFrom: '15.30',
      timeTo: '17.30'
    },
    {
      name: 'Bazy danych',
      status: 'Incoming',
      repeatable: true,
      date: '09/01/2017',
      timeFrom: '15.30',
      timeTo: '17.30'
    },
    {
      name: 'Wykład 1',
      status: 'Expired',
      repeatable: true,
      date: '09/01/2017',
      timeFrom: '15.30',
      timeTo: '17.30'
    },
    {
      name: 'Wykład 2',
      status: 'Incoming',
      repeatable: false,
      date: '09/01/2017',
      timeFrom: '15.30',
      timeTo: '17.30'
    },
    {
      name: 'Szkolenie',
      status: 'Expired',
      repeatable: true,
      date: '09/01/2017',
      timeFrom: '15.30',
      timeTo: '17.30'
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

  reset(dataTable: DataTable) {
    console.log('reset');
    dataTable.reset();
  }
}
