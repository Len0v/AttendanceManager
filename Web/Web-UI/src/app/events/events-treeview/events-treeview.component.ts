import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeTableModule, TreeNode, SharedModule } from 'primeng/primeng';
import { TreeviewService } from './treeview.service';

@Component({
  selector: 'app-events-treeview',
  templateUrl: './events-treeview.component.html',
  styleUrls: ['./events-treeview.component.css'],
  providers: [TreeviewService]
})
export class EventsTreeviewComponent implements OnInit{
  data: TreeNode[];

  constructor(private TreeviewService: TreeviewService) {}

  ngOnInit(){
    this.data = this.TreeviewService.getEvents();
  }
}
