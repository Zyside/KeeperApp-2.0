import { Component, Input } from '@angular/core';
import { NavController } from "ionic-angular";
import { EditTablePage } from "../../pages/edit-table/edit-table";
import {OrderService} from "../../services/order.service";

@Component({
  selector: 'tables-component',
  templateUrl: 'tables.components.html'
})
export class TablesComponent {

  @Input('tableFree') tablesFree: any;
  @Input('tableAdmin') tablesAdmin: any;
  @Input('tableHookah') tablesHookah: any;

  constructor( public navCtrl: NavController, private orderService:OrderService) {
      this.checkingTableStatus();
  }

  editTable(item) {
     let getData = this.orderService.getData();
     let index = this.checkItem(item, getData);
     let totalScoreService = this.orderService.getTotalScoreService();
    console.log('totalScorservice',totalScoreService);
    if(index !== -1) {
      this.orderService.deleteTotalScoreService();
      for(let key in getData[index]['order']){
        this.orderService.addTotalScoreService(getData[index]['order'][key]);
      }
    } else {
      totalScoreService.length = 0;
    }
    item['status'] = this.orderService.getStatus();
    this.navCtrl.push(EditTablePage, {item:item});
    console.log(item);
  }

  checkItem(object, array) {
    for(let i=0; i<array.length; i++){
      console.log('length', array.length);
      console.log('i', i);
      if (array[i].name === object.name){
        return i;
      }
    }
    return -1
  }

  checkingTableStatus(){
      let tableStatus:string;
      let getData = this.orderService.getData();
      console.log(getData,'=============',this.tablesFree,this.tablesAdmin);
      // for(let i=0; i < getData.length;i++){
    //   for(let j=0; j < this.tablesFree.length; j++){
    //       if(getData()[i]['name'] === this.tablesFree[j]['name']){
    //         tableStatus = 'busy';
    //           console.log('xu65798i');
    //       } else {
    //           console.log('NEXUI');
    //       }
    //   }
    // }
  }
}
