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

}
