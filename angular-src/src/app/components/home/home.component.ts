import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  location: string;

  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.location = this.activatedRoute.snapshot.queryParams.searchTerm || "";
  }

  onSearch(){
    if(this.location){
      this.router.navigate(["/search", this.location]);
    }
  }

}
