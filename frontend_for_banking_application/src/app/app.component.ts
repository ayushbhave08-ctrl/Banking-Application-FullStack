import { Component } from '@angular/core';
import { RouterOutlet,RouterModule } from '@angular/router';
import { AccountListComponent } from "./account-list/account-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule, AccountListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Banking APP';
}
