import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  location: string;
  bars: Array<object>;
  error: boolean = false;
  barSub;

  constructor(
    private activatedRoute:ActivatedRoute,
    private searchService:SearchService,
    private router:Router
  ) { }

  ngOnInit() {
    this.location = this.activatedRoute.snapshot.params.location;

    this.barSub = this.searchService.getBars(this.location).subscribe(json => {
      console.log(json);

      if(!json.error){
        this.bars = json.data.businesses;
      }else{
        this.error = true;
      }
    })
  }

  ngOnDestroy(){
    this.barSub.unsubscribe();
  }

  onBack(){
    this.router.navigate(["/"], {queryParams: {searchTerm: this.location}});
  }

}
