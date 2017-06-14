import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  location: string;

  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private searchService:SearchService
  ) { }

  ngOnInit() {
    this.location = this.activatedRoute.snapshot.queryParams.searchTerm || "";
    this.searchService.saveLastSearch("");
  }

  onSearch(){
    if(this.location){
      this.router.navigate(["/search", this.location]);
    }
  }

}
