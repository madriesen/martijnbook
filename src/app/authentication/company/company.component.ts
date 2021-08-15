import { Component } from '@angular/core';
import { faThumbsUp, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../authentication.service';
import { User } from '../interfaces/user.interface';
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
  userIcon: IconDefinition = faUser;
  thumbsUpIcon: IconDefinition = faThumbsUp;
  addUser: string = '';
  foundUser: User | undefined;

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

  findUser() {
    this.authenticationService.findUser(this.addUser).subscribe((user) => {
      this.foundUser = user;
    });
  }

  addUserToCompany() {
    if (this.company._id && this.foundUser?._id)
      this.authenticationService.addUserToCompany(this.company._id, this.foundUser?._id);
    this.addUser = '';
    this.foundUser = undefined;
  }

  get validateEmail() {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(this.addUser);
  }
}
