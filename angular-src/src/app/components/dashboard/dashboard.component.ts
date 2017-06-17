import { Component, OnInit } from '@angular/core';

import { SearchService } from '../../services/search.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  bars:Array<any>;

  constructor(
    private searchService:SearchService,
    private authService:AuthService
  ) { }

  ngOnInit() {
    let id = this.authService.getId();
    this.searchService.getBarsByUserId(id).subscribe(data => {
      this.bars = data.docs;
    })
  }

  removeFromBar(bar_id:string, index:number){
    this.bars.splice(index, 1);

    let user_id = this.authService.getId();
    this.searchService.removeBar(bar_id, user_id).subscribe(data => {
      console.log(data);
    });
  }



}
