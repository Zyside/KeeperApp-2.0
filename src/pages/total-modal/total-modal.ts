import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {OrderService} from "../../services/order.service";
import {objectAssign} from "@ionic/app-scripts";


@IonicPage()
@Component({
  selector: 'page-total-modal',
  templateUrl: 'total-modal.html',
})
export class TotalModalPage {
    dataArr: any;
    showTotal: boolean = false;
    orderArray: object[] = [];
    sum: any;
    finishTotalScoreForOrderService: object[] = [];
    finishTotalScore: object[] = [];
    totalSum: any;
    discount: any;
    status: boolean = true;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private orderService: OrderService) {
        this.dataArr = this.orderService.getData();
        this.finishTotalScore = this.orderService.getfinishTotalScore();
        this.totalSum = this.navParams.get('totalSum');
        this.checkingFun();
    }

    showInfoAboutOrder(data) {
        if (data['percent']) {
            this.sum = data['sumWithDiscount'];
            this.status = false;
        } else {
            this.sum = data['sum'];
            this.status = true;
        }
            this.orderArray.length = 0;
            for (let key in data['order']) {
                this.orderArray.push(data['order'][key]);
                console.log('ORDERAARAY--->', this.orderArray);
            }
                this.orderArray.push({'tableName': data['name']});
            }


    ionViewDidLoad() {
        // console.log(this.orderService.getData());
    };

    checkingFun() {
        console.log('FINISHTOTAL SCORE', this.finishTotalScore);
        console.log('DataARR', this.dataArr);
        for (let key in this.dataArr) {
            console.log(this.finishTotalScore, 'finishTotalScoreBEFORE');

            if (this.finishTotalScore.length === 0) {


                this.finishTotalScoreForOrderService.push(this.dataArr[key]);
                this.orderService.addfinishTotalScore(this.finishTotalScoreForOrderService[key]);
            }
            else {
                for (let key in this.dataArr) {
                    this.finishTotalScoreForOrderService.push(this.dataArr[key]);
                    this.orderService.addfinishTotalScore(this.finishTotalScoreForOrderService[key]);
                }
            }
        }
    }


    discountButton(item: number) {
        if(this.orderArray.length !== 0){
            if (item === 5) {
                this.sum -= this.sum * 0.05;
            } else if (item === 10) {
                this.sum -= this.sum * 0.1;
            } else if (item === 15) {
                this.sum -= this.sum * 0.15;
            } else if (item === 20) {
                this.sum -= this.sum * 0.2;
            } else if (item === 25) {
                this.sum -= this.sum * 0.25;
            } else if (item === 30) {
                this.sum -= this.sum * 0.3;
            } else if (item === 40) {
                this.sum -= this.sum * 0.4;
            } else if (item === 50) {
                this.sum -= this.sum * 0.5;
            } else if (item === 100) {
                this.sum = '0';
            }
            this.orderArray['discount'] = this.discount;

        } else {
            alert('Нажмите на один из заказов');
        }
        this.discount = {
            percent: item,
            totalSum: this.sum,
            status:false
        };
        this.status = this.discount.status;
        for(let i=0; i < this.dataArr.length; i++){
            for(let j=0; j<this.orderArray.length; j++){
                if(this.dataArr[i]['name'] === this.orderArray[j]['tableName']){
                    this.dataArr[i]['percent'] = this.discount['percent'];
                    this.dataArr[i]['sumWithDiscount'] = this.discount['totalSum'];
                    this.dataArr[i]['discountStatus'] = this.discount['status'];
                }
            }
        }
    }
}

