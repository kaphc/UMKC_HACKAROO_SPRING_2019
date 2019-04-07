import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
// import * as firebase from 'firebase';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.page.html',
  styleUrls: ['./receipts.page.scss'],
})
export class ReceiptsPage implements OnInit {

  constructor(public router: Router) { }

  items = [];
  // ref = firebase.database().ref('/users');

  ngOnInit() {
  }

  async addreceipt() {
    this.router.navigate(['/receipt-upload'])
  }

}
