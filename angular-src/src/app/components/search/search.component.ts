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
  bars: Array<object> = [];
  error: boolean = false;
  offset: number = 0;
  barSub;
  showLoadExtra: boolean = false;

  constructor(
    private activatedRoute:ActivatedRoute,
    private searchService:SearchService,
    private router:Router
  ) { }

  ngOnInit() {
    this.location = this.activatedRoute.snapshot.params.location;
    this.searchService.saveLastSearch(this.location);

    this.loadBars();
  }

  ngOnDestroy(){
    this.barSub.unsubscribe();
  }

  loadBars(){
    this.barSub = this.searchService.getBars(this.location, this.offset).subscribe(json => {
      console.log(this.offset,json);

      if(!json.error){
        this.bars.push(...json.data.businesses);

        if(json.data.total > this.bars.length){
          this.showLoadExtra = true;
        }else{
          this.showLoadExtra = false;
        }

      }else{
        this.error = true;
      }
    });
  }

  onBack(){
    this.router.navigate(["/"], {queryParams: {searchTerm: this.location}});
  }

  onLoadExtra(){
    this.offset += 50;
    this.barSub.unsubscribe();
    this.loadBars();
  }

}
