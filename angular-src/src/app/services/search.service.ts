import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class SearchService {

  lastSearch: string = "";

  constructor(private http:Http) { }

  getBars(location:string, offset:number = 0){
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http.get("/api/bars?location="+location+"&offset="+offset, {headers: headers})
      .map(res => res.json());
  }

  saveLastSearch(searchTerm:string){
    this.lastSearch = searchTerm;
  }

  addBar(bar_id:string, user_id:string){
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http.post("/api/bar", {bar_id: bar_id, user_id: user_id}, {headers: headers})
      .map(res => res.json());
  }

}
