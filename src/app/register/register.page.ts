import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { Router } from '@angular/router'
import { AngularFirestore } from '@angular/fire/firestore'

import { AlertController } from '@ionic/angular'
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = ""
  password: string = ""
  cpassword: string = ""

  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router,
    public afstore: AngularFirestore,
    public user: UserService
    ) { }

  ngOnInit() {
  }

  async register() {
    const { username, password, cpassword} = this
    if(password !== cpassword) {
      this.showAlert("Error!", "Password don't match")
      return console.error("Passwords don't match")
    }

    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(username + '@exists.com', password)
      
      this.afstore.doc(`users/${res.user.uid}`).set({
        username: username,
        uid: res.user.uid
      })

      this.user.setUser({
        username,
        uid: res.user.uid
      })
      
      console.log(res)
      this.showAlert("Sucess!", "Welcome aboard!")
      this.router.navigate(['/login'])
    } catch(error){
      console.dir(error)
      this.showAlert("Error!", error.message)
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      subHeader: "CrossTrack",
      message,
      buttons: ['Ok']
    });

    await alert.present();
  }
}
