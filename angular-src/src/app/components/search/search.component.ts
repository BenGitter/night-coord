import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  location: string;

  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.location = this.activatedRoute.snapshot.params.location;
  }

}
