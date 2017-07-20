import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GithubUsersService } from '../../providers/github-users-service/github-users-service'

@Component({
  selector: 'page-virtual-scroll',
  templateUrl: 'virtual-scroll.html',
})
export class VirtualScrollPage {
  public users:any = []; // html側の[virtualScroll]="items"と名前を合わせる
  private startIndex:number = 0; // 最初は0番目からDBレコードを取得していく
  next: number = 0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private ghs: GithubUsersService,
  ) {
    this.ghs.getUsers().subscribe(users => {
      users.map(_ => {
        this.users.push(_);
      });
      this.next = users[users.length -1].id;
    },err => console.log(err),
    () => {});
  }

  doInfinite(infiniteScroll:any) {
    console.log('doInfinite, start is currently '+this.startIndex);
    this.startIndex+=30;

    this.ghs.getUsers(this.next).subscribe(users => {
      users.map(_ => this.users.push(_));
      this.next = users[users.length -1].id;
      infiniteScroll.complete();
    },err => console.log(err),
    () => {});
  }
}
