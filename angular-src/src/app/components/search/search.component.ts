import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  location: string;
  bars: Array<object>;
  error: boolean = false;

  constructor(
    private activatedRoute:ActivatedRoute,
    private searchService:SearchService
  ) { }

  ngOnInit() {
    this.location = this.activatedRoute.snapshot.params.location;

    this.searchService.getBars(this.location).subscribe(json => {
      console.log(json);

      if(!json.error){
        this.bars = json.data.businesses;
      }else{
        this.error = true;
      }
    })
  }

}
