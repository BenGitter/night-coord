import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  location: string;

  constructor(private router:Router) { }

  ngOnInit() {
  }

  onSearch(){
    if(this.location){
      this.router.navigate(["/search", this.location]);
    }
  }

}
