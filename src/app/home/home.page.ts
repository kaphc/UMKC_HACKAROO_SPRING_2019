import { Component } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public router: Router
    ) { }
  

  async login(){
    this.router.navigate(['/login'])
  }
  
  async register(){
    this.router.navigate(['/register'])
  }
}

