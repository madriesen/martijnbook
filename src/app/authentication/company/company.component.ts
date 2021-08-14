import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Company } from './interfaces/company.interface';

@Component({
  selector: 'company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  openModal = false;
  company: Company | undefined;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentCompanySubject.subscribe((company) => {
      this.company = company;
    });
  }

  ngOnInit(): void {}

  showModal() {
    this.openModal = true;
  }
}
