import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/primeng';

@Injectable()
export class TreeviewService {
  data = [
    {
      data: {
        name: 'Elektryczny',
        type: 'folder'
      },
      children: [
        {
          data: {
            name: 'Informatyka',
            type: 'folder'
          },
          children: [
              {
                data: {
                  name: 'Podstawy teleinformatyki',
                  type: 'event'
                }
              }
            ]
          }
      ]
    },
    {
      data: {
        name: 'Informatyczny',
        type: 'folder'
      },
        children: [
          {
            data: {
              name: 'Informatyka',
              type: 'folder'
            },
              children: [
                {
                  data: {
                    name: 'Podstawy programowania',
                    type: 'event'
                  }
                }
              ]
            }
        ]
      }
  ];

  constructor() { }

  getEvents() {
    return <TreeNode[]>this.data;
  }
}
