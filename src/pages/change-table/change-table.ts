import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {OrderService} from "../../services/order.service";
import {EditTablePage} from "../edit-table/edit-table";
import {TablesPage} from "../tables/tables";
import {LoadingService} from "../../services/loading-service";

/**
 * Generated class for the ChangeTablePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-table',
  templateUrl: 'change-table.html',
})
export class ChangeTablePage {

    table: any;
    orderFrom: any;
    tableWithOrder: object[] = [];
    currentTable: any;
    changedTable: object[] = [];
    status:any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private orderService: OrderService,
                private loadingService: LoadingService) {
        this.status = this.orderService.getStatus();
        this.table = this.navParams.get('table');
        this.currentTable = this.navParams.get('currentTable');
        this.orderFrom = this.orderService.getData();
        this.tableWithOrder = this.orderService.getTotalScoreService();
        console.log('order:', this.orderFrom);
        console.log('table:', this.table);
        console.log('currentTable', this.currentTable);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ChangeTablePage');
    }

    shiftOrder(linkItem) {
        let order = JSON.parse(JSON.stringify(linkItem));
        let index = this.checkItemForTotalModal(order, this.changedTable);
        if (index !== -1) {
            if (this.tableWithOrder[this.tableWithOrder.indexOf(linkItem)]['count'] !== 0) {
                this.tableWithOrder[this.tableWithOrder.indexOf(linkItem)]['sum'] -= order['price'];
                this.tableWithOrder[this.tableWithOrder.indexOf(linkItem)]['count'] -= 1;
                console.log('this.tableWithOrder.indexOf(linkItem)[\'count\']', this.tableWithOrder.indexOf(linkItem));
                console.log('this.tableWithOrder,', this.tableWithOrder);

                this.changedTable[index]['count'] += 1;
                this.changedTable[index]['sum'] += order['price'];
            }
        } else {
            this.changedTable.push(order);
            this.changedTable[this.changedTable.indexOf(order)]['count'] = 2;
            this.changedTable[this.changedTable.indexOf(order)]['sum'] = 2 * this.changedTable[this.changedTable.indexOf(order)]['price'];
            this.tableWithOrder[this.tableWithOrder.indexOf(linkItem)]['sum'] -= order['price'];
            this.tableWithOrder[this.tableWithOrder.indexOf(linkItem)]['count'] -= 1;

        }
        if (order.count !== 0) {
            order['count'] -= 1;
            order.sum -= order.price;
        } else {
            return;
        }
        if (this.tableWithOrder[this.tableWithOrder.indexOf(linkItem)]['sum'] === 0) {
            this.tableWithOrder.splice(this.tableWithOrder.indexOf(linkItem), 1);
        }
    }

    backShiftOrder(linkItem) {
        let order = JSON.parse(JSON.stringify(linkItem));
        let index = this.checkItemForTotalModal(order, this.tableWithOrder);
        if (index !== -1) {
            if (this.changedTable[this.changedTable.indexOf(linkItem)]['count'] !== 0) {
                this.changedTable[this.changedTable.indexOf(linkItem)]['sum'] -= order['price'];
                this.changedTable[this.changedTable.indexOf(linkItem)]['count'] -= 1;
                if (this.changedTable[this.changedTable.indexOf(linkItem)]['count'] === 0) {
                    this.changedTable.splice(this.changedTable.indexOf(linkItem), 1);
                }
                this.tableWithOrder[index]['count'] += 1;
                this.tableWithOrder[index]['sum'] += order['price'];
            }
        } else {
            this.tableWithOrder.push(order);
            this.tableWithOrder[this.tableWithOrder.indexOf(order)]['count'] = 2;
            this.tableWithOrder[this.tableWithOrder.indexOf(order)]['sum'] = 2 * this.tableWithOrder[this.tableWithOrder.indexOf(order)]['price'];
            this.changedTable[this.changedTable.indexOf(linkItem)]['sum'] -= order['price'];
            this.changedTable[this.changedTable.indexOf(linkItem)]['count'] -= 1;

        }
        if (order.count !== 0) {
            order['count'] -= 1;
            order.sum -= order.price;
        } else {
            return;
        }
        if (this.changedTable[this.changedTable.indexOf(linkItem)]['sum'] === 0) {
            this.changedTable.splice(this.changedTable.indexOf(linkItem), 1);
        }
    }

    shiftFullOrder() {
        for (let i = 0; i < this.tableWithOrder.length; i++) {
            if (this.changedTable.length !== 0) {
                for (let n = 0; n < this.changedTable.length; n++) {
                    if (this.tableWithOrder.length !== 0) {
                        if (this.tableWithOrder[i]['name'] === this.changedTable[n]['name'] && this.tableWithOrder[i]['name'] !== this.changedTable[n]['name'] || this.tableWithOrder[i]['name'] === this.changedTable[n]['name']) {
                            this.changedTable[n]['sum'] += this.tableWithOrder[i]['sum'];
                            this.changedTable[n]['count'] += this.tableWithOrder[i]['count'];
                        } else if(this.tableWithOrder[i]['name'] !== this.changedTable[n]['name']) {
                            this.changedTable.push(this.tableWithOrder[i]);
                        }
                        } else {
                           break;
                        }
                           this.tableWithOrder.splice(i, 1);
                        }
            } else {
                this.changedTable = this.tableWithOrder.slice();
                this.tableWithOrder.length = 0;
            }
        }
    }


    backShiftFullOrder() {
        for (let i = 0; i < this.changedTable.length; i++) {
            if (this.tableWithOrder.length !== 0) {
                for (let n = 0; n < this.tableWithOrder.length; n++) {
                    if (this.changedTable.length !== 0) {
                        if (this.changedTable[i]['name'] === this.tableWithOrder[n]['name'] && this.changedTable[i]['name'] !== this.tableWithOrder[n]['name'] || this.changedTable[i]['name'] === this.tableWithOrder[n]['name']) {
                            this.tableWithOrder[n]['sum'] += this.changedTable[i]['sum'];
                            this.tableWithOrder[n]['count'] += this.changedTable[i]['count'];
                        } else if(this.changedTable[i]['name'] !== this.tableWithOrder[n]['name']) {
                            this.tableWithOrder.push(this.changedTable[i]);
                        }
                    } else {
                        break;
                    }
                    this.changedTable.splice(i, 1);

                }
            } else {
                this.tableWithOrder = this.changedTable.slice();
                this.changedTable.length = 0;
            }
        }
    }

  checkItemForTotalModal(object, array) {
    for(let i=0; i<array.length; i++){
      console.log('length', array.length);
      console.log('i', i);
      if (array[i].name === object.name){
        return i;
      }
    }
    return -1;
  }

    acceptChanges(){
        let allOrders = this.orderService.getData();
        console.log('allOrders', allOrders);
        if(this.changedTable.length !== 0){
            this.table['order'] = this.changedTable;
            this.table['time'] = new Date();
            this.table['sum'] = this.getResultPrice();
            for(let i=0;i < allOrders.length; i++) {
                if(this.tableWithOrder.length === 0 && allOrders[i]['name'] === this.currentTable['name']){
                    this.orderService.deleteItemData(i);
                }
                console.log('this.table[\'name\']',this.table);
                console.log('allOrders[i][\'name\'] ',allOrders[i]);
                for(let j=0; j<allOrders.length;j++) {
                    if (allOrders[j]['name'] === this.table['name']) {
                        this.orderService.deleteItemData(j);
                    }
                }

            }
            this.orderService.addData(this.table);
            alert('перенос был произведен успешно:)');
            this.loadingService.showLoading();
            this.navCtrl.push(TablesPage,{status:this.status});
            this.loadingService.closeLoading();
            console.log('acceptChangesTABLE',this.table);
        } else {
            alert('Стол пуст!!');
        }
    }

    getResultPrice() {
        return this.changedTable.reduce((prev, el) => {
            return prev + el['sum'];
        }, 0);
    }

    checkItem(arr, array) {
        for(let i=0; i<array.length; i++) {
            for(let j=0; j<arr.length; j++) {
                if (array[i].name === arr[j].name) {
                    return i;
                }
                console.log('length', array.length);
                console.log('i', i);
            }
        }
        return -1
    }
}
