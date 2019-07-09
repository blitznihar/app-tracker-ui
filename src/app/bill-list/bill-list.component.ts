import { Component, OnInit } from '@angular/core';


import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 'E4324234', name: 'Mark', status: 'New Business', step: '11' },
  {position: 'G4324234', name: 'Don', status: 'Payment Pending', step: '19'},
  {position: 'PF324234', name: 'Michelle', status: 'Customer', step: '01'},
  {position: 'D4324234', name: 'Berry', status: 'Agent', step: '2'},
  {position: 'L4324234', name: 'Turf', status: 'Signature', step: '6'},
  {position: 'J4324234', name: 'Carbon', status: 'NIGO', step: '8'},
  {position: 'P4324234', name: 'Joe', status: 'Payment Pending', step: '19'},
  {position: 'Q4324234', name: 'Rick', status: 'New Business', step: '11'},
  {position: 'CX24234', name: 'Angel', status: 'New Business', step: '11'},
  {position: 'D4324234', name: 'Neon', status: 'New Business', step: '11'},
];

/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent {
  displayedColumns: string[] = ['position', 'name', 'status', 'progress'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}


/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */