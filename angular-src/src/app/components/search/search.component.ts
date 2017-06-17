import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SearchService } from '../../services/search.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  location: string;
  bars: Array<{id, count, bar_id, user_id, people}> = [];
  error: boolean = false;
  offset: number = 0;
  barSub;
  showLoadExtra: boolean = false;

  constructor(
    private activatedRoute:ActivatedRoute,
    private searchService:SearchService,
    private authService:AuthService,
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

  goToBar(bar_id:string, index:number){
    if(this.authService.loggedIn()){
      this.bars[index].people.push({user_id: this.authService.getId()});

      let user_id = this.authService.getId();
      this.searchService.addBar(bar_id, user_id).subscribe(data => {
        console.log(data);
      });
    }else{
      this.router.navigate(["/login"]);
    }
  }

  removeFromBar(bar_id:string, index:number){
    for(let i = 0; i < this.bars[index].people.length; i++){
      if(this.bars[index].people[i].user_id === this.authService.getId()){
        this.bars[index].people.splice(i, 1);
      }
    }

    let user_id = this.authService.getId();
    this.searchService.removeBar(bar_id, user_id).subscribe(data => {
      console.log(data);
    });
  }

  going(people:Array<any>){
    let x = people.find((el, i) => {
      return el.user_id  = this.authService.getId();
    });

    return !x;
  }

  onLoadExtra(){
    this.offset += 50;
    this.barSub.unsubscribe();
    this.loadBars();
  }

}
