import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { Company } from '../interfaces/company.interface';

@Component({
  selector: 'create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  company: Company;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private authenticationSerivce: AuthenticationService) {
    this.company = { _id: '', Address: '', Name: '', Description: '' };
  }

  ngOnInit(): void {}

  @Output()
  closeComponent = new EventEmitter<void>();

  closeModal() {
    this.closeComponent.emit();
  }

  onCreate() {
    this.authenticationSerivce.createCompany(this.company);
    this.closeModal();
  }
}
