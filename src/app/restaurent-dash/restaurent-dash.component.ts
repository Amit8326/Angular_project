import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RestaurantData } from 'resturant.modal';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css']
})
export class RestaurentDashComponent implements OnInit {

  formValue!: FormGroup
  restaurentModelObj: RestaurantData = new RestaurantData;
  allRestaurantData: any;
  showAdd!: boolean;
  showbtn!: boolean
  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    })
    this.getAllData()
  }
  clickaddRestaurant(){
    this.formValue.reset();
    this.showAdd=true;
    this.showbtn=false;
  }
  // Now Subscribing our data which is maped via Services..0
  addRestaurant() {
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.postRestaurant(this.restaurentModelObj).subscribe(res => {
      console.log(res);
      alert("Restaurant Records Added Successful");
      //clear fill from data
      let ref = document.getElementById('clear');
      ref?.click();

      this.formValue.reset()
      this.getAllData(); //when u post any data
    })
  }
  //get all Data
  getAllData() {
    this.api.getRestaurant().subscribe(res => {
      this.allRestaurantData = res;
    })
  }
  //delete Method
  deleteRestaurant(data: any) {
    this.api.deleteRestaurant(data.id).subscribe(res => {
      alert("Restaurant Records Deleted")
      this.getAllData(); //refresh data
    })
  }
  onEditRestaurant(data: any) {
    this.showAdd=false;
    this.showbtn=true;
    this.restaurentModelObj.id = data.id
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['Mobile'].setValue(data.mobile);
    this.formValue.controls['location'].setValue(data.location);
    this.formValue.controls['services'].setValue(data.services);

  }
  updateRestaurant(){
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.updateRestaurant(this.restaurentModelObj,this.restaurentModelObj.id).subscribe(res=>{
      alert("Restaurant Records Update")
      let ref = document.getElementById('clear');
      ref?.click();

      this.formValue.reset()
      this.getAllData(); //when u post any data
    })

  }
}


