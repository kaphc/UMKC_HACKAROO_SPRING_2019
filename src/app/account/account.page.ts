import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { firestore } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { Http } from '@angular/http'
import { UserService } from '../user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})

export class AccountPage implements OnInit {

  userPosts

  constructor() {
    }

  ngOnInit() {
  }

}
