import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Company } from './interfaces/company.interface';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent {
  openModal = false;
  company: Partial<Company> = {};
  updatedCompany: Partial<Company> = {};

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentCompanySubject.subscribe((company) => {
      this.company = company;

      this.updatedCompany.Name = company.Name;
      this.updatedCompany.Address = company.Address;
      this.updatedCompany.Description = company.Description;
    });
  }

  showModal() {
    this.openModal = true;
  }

  get companyModified() {
    return (
      this.updatedCompany.Name !== this.company.Name ||
      this.updatedCompany.Address !== this.company.Address ||
      this.updatedCompany.Description !== this.company.Description
    );
  }

  get canUpdate() {
    return this.authenticationService.currentUserValue.RoleID!.Name === 'Superadmin';
  }

  saveCompany() {
    console.log('save');
  }
}
