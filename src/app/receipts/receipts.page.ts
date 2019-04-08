import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { firestore } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { Http } from '@angular/http'
import { UserService } from '../user.service';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.page.html',
  styleUrls: ['./receipts.page.scss'],
})
export class ReceiptsPage implements OnInit {

  constructor(public router: Router,
    public http: Http,
    public afstore: AngularFirestore,
    public user: UserService) { 
      // const post = afstore.doc(`users/${this.user.getUID()}/posts`).get()
      // console.log(post)
    }

  items = [];
  // ref = firebase.database().ref('/users');

  ngOnInit() {
  }

  async addreceipt() {
    this.router.navigate(['/receipt-upload'])
  }

  async snapreceipt() {
    this.router.navigate(['/receipt-camera'])
  }
}
