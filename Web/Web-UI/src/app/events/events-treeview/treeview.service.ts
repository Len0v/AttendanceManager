import {Injectable} from '@angular/core';
import {TreeNode} from 'primeng/primeng';

@Injectable()
export class TreeviewService {
  data = [
    {
      label: 'Informatyka',
      type: 'folder',
      children: [
        {
          label: 'Rocznik 2014',
          type: 'folder',
          children: [
            {
              label: 'Podstawy teleinformatyki - ćwiczenia',
              type: 'event',
              repeatable: true,
              status: 'incoming',
              date: '09/10/2017',
              timeFrom: '17.30',
              timeTo: '19.00'
            },
            {
              label: 'Inżynieria oprogramowania',
              type: 'event',
              repeatable: false,
              status: 'active',
              date: '09/10/2017',
              timeFrom: '17.30',
              timeTo: '19.00'
            }
          ]
        }
      ]
    },
    {
      label: 'Wykłady otwarte',
      type: 'folder',
      children: [
        {
          label: 'Wykłady C++',
          type: 'Folder',
          children: [
            {
              label: 'Semestr letni',
              type: 'folder',
              children: [
                {
                  label: 'Wykład 1',
                  type: 'event',
                  status: 'expired',
                  date: '09/10/2017',
                  timeFrom: '10.00',
                  timeTo: '12.00'
                },
                {
                  label: 'Wykład 2',
                  type: 'event',
                  status: 'expired',
                  date: '14/04/2017',
                  timeFrom: '19.30',
                  timeTo: '20.30'
                },
                {
                  label: 'Wykład 3',
                  type: 'event',
                  status: 'incoming',
                  date: '09/10/2017',
                  timeFrom: '10.00',
                  timeTo: '12.00'
                },
                {
                  label: 'Wykład 2',
                  type: 'event',
                  status: 'incoming',
                  date: '09/10/2017',
                  timeFrom: '10.00',
                  timeTo: '12.00'
                },
                {
                  label: 'Wykład 2',
                  type: 'event',
                  status: 'incoming',
                  date: '09/10/2017',
                  timeFrom: '10.00',
                  timeTo: '12.00'
                }
              ]
            },
            {
              label: 'Semestr zimowy',
              type: 'folder',
              children: [
                {
                  label: 'Inżynieria oprogramowania',
                  type: 'event',
                  repeatable: false,
                  status: 'active',
                  date: '09/10/2017',
                  timeFrom: '17.30',
                  timeTo: '19.00'
                },
                {
                  label: 'Inżynieria oprogramowania',
                  type: 'event',
                  repeatable: false,
                  status: 'active',
                  date: '09/10/2017',
                  timeFrom: '17.30',
                  timeTo: '19.00'
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  constructor() {
  }

  getEvents() {
    return <TreeNode[]> this.data;
  }
}
