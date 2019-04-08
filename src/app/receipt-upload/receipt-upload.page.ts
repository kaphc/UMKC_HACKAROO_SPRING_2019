import { Component, OnInit , ViewChild} from '@angular/core';
import { Http } from '@angular/http'
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase/app';
import { NavController } from '@ionic/angular';
import { ReceiptsPage } from '../receipts/receipts.page';

import { Router } from '@angular/router'

@Component({
  selector: 'app-receipt-upload',
  templateUrl: './receipt-upload.page.html',
  styleUrls: ['./receipt-upload.page.scss'],
})
export class ReceiptUploadPage implements OnInit {

  imageURL: string
  desc: string

  @ViewChild('fileButton') fileButton

  constructor(public http: Http,
    public afstore: AngularFirestore,
    public user: UserService,
    public nav:NavController,
    public router: Router) { }

  ngOnInit() {
  }
  async navigateBack(){
    this.router.navigate(['/tabs'])
  }

 /* uploadFile() {
    this.fileButton.nativeElement.click()
  }*/
  
  createPost() {
    const image = this.imageURL
    const desc = this.desc

    this.afstore.doc(`users/${this.user.getUID()}`).update({
      posts: firestore.FieldValue.arrayUnion({
        image,desc
      })
    });
  }

  filechanged(event) {
    const files = event.target.files
    console.log(files)

    const data = new FormData()
    data.append('file', files[0])
    data.append('UPLOADCARE_STORE', '1')
    data.append('UPLOADCARE_PUB_KEY', '4d8ea82853e5d6780df7')


    this.http.post('https://upload.uploadcare.com/base/', data)
    .subscribe(event => {
      console.log(event)
      this.imageURL = event.json().file
    })
  }
}


