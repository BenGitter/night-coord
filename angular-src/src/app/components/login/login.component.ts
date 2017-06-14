import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SearchService } from '../../services/search.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private authService:AuthService,
    private searchService:SearchService,
    private router:Router,
    private flashMessage:FlashMessagesService  
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      console.log(data);
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show("You are now logged in", {cssClass: "alert-success", timeout: 5000 });

        if(this.searchService.lastSearch !== ""){
          this.router.navigate(['/search', this.searchService.lastSearch]);
        }else{
           this.router.navigate(['/']);
        }
      }else{
        this.flashMessage.show(data.msg, {cssClass: "alert-danger", timeout: 5000 });
        this.router.navigate(['/login']);
      }
    });
  }

}
