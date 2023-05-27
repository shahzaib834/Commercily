import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home-screen',
  templateUrl: './home-screen.component.html'
})
export class HomeScreen implements OnInit {
    constructor() {
        console.log('contructed!')
    }

    ngOnInit(): void {
        console.log('Initilized. NgOnInit Call')
    }
}
