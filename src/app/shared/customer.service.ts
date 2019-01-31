import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private router: Router, private firebase: AngularFireDatabase) { }
  customerList: AngularFireList<any>;

  form = new FormGroup({
    $key: new FormControl(null),
    orgao: new FormControl('', Validators.required),
    objeto: new FormControl('', Validators.required),
    quantidade: new FormControl('', Validators.required),
    prazo: new FormControl('', Validators.required)
  });


  getCustomers() {
    this.customerList = this.firebase.list('customers');
    return this.customerList.snapshotChanges();
  }


  insertCustomer(customer) {
    this.customerList.push({
      orgao: customer.orgao,
      objeto: customer.objeto,
      quantidade: customer.quantidade,
      prazo: customer.prazo
    });
    setTimeout(() => this.router.navigate(["/lista"]), 3000);
  }

  populateForm(customer) {
    this.router.navigate(["/cadastro"]);
    this.form.setValue(customer);
  }

  updateCustomer(customer) {
    this.customerList.update(customer.$key,
      {
        orgao: customer.orgao,
        objeto: customer.objeto,
        quantidade: customer.quantidade,
        prazo: customer.prazo
      });
  }

  deleteCustomer($key: string) {
    this.customerList.remove($key);
  }

  logout(customer) {
    if (confirm('Deseja sair?')) {
      this.router.navigate(["/"]);
    }
    location.reload();
  }

}
