import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {OrderService} from "../../services/order.service";
import {EditTablePage} from "../edit-table/edit-table";

@IonicPage()
@Component({
  selector: 'page-edit-modal',
  templateUrl: 'edit-modal.html',
})
export class EditModalPage {
  showDiscount: boolean = false;
  showPay: boolean = false;
  totalSum:number;
  status:boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, private orderService:OrderService) {
    this.totalSum = this.navParams.get('totalSum');

  }

  discountButton(item:number){
      this.status = false;
    if(item === 5){
      this.totalSum -= this.totalSum *0.05;
    } else if(item === 10){
        this.totalSum -= this.totalSum *0.1;
    } else if(item === 15){
        this.totalSum -= this.totalSum *0.15;
    } else if(item === 20){
        this.totalSum -= this.totalSum *0.2;
    } else if(item === 25){
        this.totalSum -= this.totalSum *0.25;
    } else if(item === 30){
        this.totalSum -= this.totalSum *0.3;

    } else if(item === 40){
        this.totalSum -= this.totalSum *0.4;
    } else if(item === 50){
        this.totalSum -= this.totalSum *0.5;
    } else if(item === 100){
        this.totalSum = 0;
    }
      let discount = {
          percent:item,
          totalSum:this.totalSum
       };
      this.orderService.addDiscount(discount);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditModalPage');
  }

}
