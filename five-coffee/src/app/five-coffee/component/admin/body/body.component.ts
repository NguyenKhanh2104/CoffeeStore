import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  masterSelected: boolean;
  checklist: any;
  checkedList: any;
  constructor() {
    this.masterSelected = false;
    this.checklist = [
      { id: 1, value: 'content 1', isSelected: false },
      { id: 2, value: 'content 2', isSelected: false },
      { id: 3, value: 'content 3', isSelected: false },

    ]

  }

  ngOnInit(): void {
   
  }
   getCheckedItemList(){
    this.checkedList = [];
    for (var i = 0; i < this.checklist.length; i++) {
      if(this.checklist[i].isSelected)
      this.checkedList.push(this.checklist[i]);
    }
    this.checkedList = JSON.stringify(this.checkedList);
  }
  
  // Check All Checkbox Checked
  isAllSelected() {
    this.masterSelected = this.checklist.every(function(item:any) {
        return item.isSelected == true;
      })
    this.getCheckedItemList();
  }
  checkUncheckAll() {
    for (var i = 0; i < this.checklist.length; i++) {
      this.checklist[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }

}

