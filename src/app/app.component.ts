import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gitsearch';
  tagName = `NO DATA TO DISPLAY`;
  dataAvailable: boolean = false;
  newData: boolean = false;
  details;
  user;
  profile = '';

  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }

  search(user) {
    this.newData = true;
    if (localStorage.getItem(user) != null) {
      this.dataAvailable = true;
      this.newData = false;
      this.details = JSON.parse(localStorage.getItem(user));
      this.tagName = user;
    } else {
      // tslint:disable-next-line: max-line-length
      this.httpClient.get(`https://api.github.com/users/` + user).subscribe(
        (res: any) => {
          this.newData = false;
          this.dataAvailable = true;
          this.details = res;
          this.tagName = user;
          this.profile = JSON.stringify(this.details);
          localStorage.setItem(user, this.profile);
        },
        () => {
          this.tagName = `NO DATA TO DISPLAY`;
          this.dataAvailable = false;
          this.toastr.warning('Invalid User');
        }
      );
    }
  }
}
