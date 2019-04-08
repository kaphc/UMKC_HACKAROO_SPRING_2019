import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { Router } from '@angular/router'
import { UserService } from '../user.service'

import { AlertController } from '@ionic/angular'
import { ActionSheetController } from '@ionic/angular'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = ""
  password: string = ""

  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router,
    public user: UserService,
    private actionSheet: ActionSheetController
  ) { }

  async exit(){
    this.router.navigate(['/home'])
  }

  ngOnInit() {
  }

  async login() {
    const { username, password } = this
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username + '@exists.com', password);

      if(res.user) {
        console.log(res)
        this.user.setUser({
          username,
          uid: res.user.uid
        })
        console.log(this.user)
        this.router.navigate(['/tabs'])
      }
    } catch(err) {
      console.dir(err)
      this.showAlert("Error!", err.code)
      console.log("user not found")
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      subHeader: "CrossTrack",
      message,
      buttons: ['Ok', 'GoBack']
    });

    await alert.present();
  }

}
