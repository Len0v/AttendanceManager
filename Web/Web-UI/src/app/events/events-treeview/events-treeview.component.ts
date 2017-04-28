import {Component, OnInit, ViewChild} from '@angular/core';
import {TreeNode, Tree} from 'primeng/primeng';
import {TreeviewService} from './treeview.service';

@Component({
  selector: 'app-events-treeview',
  templateUrl: './events-treeview.component.html',
  styleUrls: ['./events-treeview.component.css'],
  providers: [TreeviewService]
})
export class EventsTreeviewComponent implements OnInit {
  @ViewChild('expandingTree')
  tree: Tree;

  data: TreeNode[];

  constructor(private TreeviewService: TreeviewService) {
  }

  ngOnInit() {
    this.data = this.TreeviewService.getEvents();
  }

  nodeSelect(event) {
    if (event.node.expanded === false) {
      event.node.expanded = true;
    } else {
      event.node.expanded = false;
    }
  }

  expandAll(){
    this.data.forEach( node => {
      this.expandRecursive(node, true);
    } );
  }

  collapseAll(){
    this.data.forEach( node => {
      this.expandRecursive(node, false);
    } );
  }

  private expandRecursive(node:TreeNode, isExpand:boolean){
    node.expanded = isExpand;
    if(node.children){
      node.children.forEach( childNode => {
        this.expandRecursive(childNode, isExpand);
      } );
    }
  }
}
