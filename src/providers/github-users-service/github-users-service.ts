import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class GithubUsersService {

  constructor(public http: Http) {
    console.log('Hello GithubUsersServiceProvider Provider');
  }

  getUsers(num:number = 0 ) {
  return this.http.get(`https://api.github.com/users?since=${num}`)
       .map(res => res.json());
  }
}
