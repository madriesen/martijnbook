import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'martijnbook';

  onInit(): void {
    document
      .getElementsByTagName('router-outlet')[0]
      .nextElementSibling?.classList.add('flex-1');
  }
}
