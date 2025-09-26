import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserService } from '../browser.service';

@Component({
  selector: 'app-home',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public browserService = inject(BrowserService);

  GoToHome() {
    this.browserService.url = 'https://google.fr';
    this.browserService.goToPage(this.browserService.url);
  }
}
