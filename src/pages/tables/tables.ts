import { Component } from '@angular/core';
import {LoadingController, ModalController} from 'ionic-angular';
import { LoadingService } from "../../services/loading-service";
import { NavController, NavParams } from 'ionic-angular';
import {EditTablePage} from "../edit-table/edit-table";
import {HomePage} from "../home/home";
import {TotalModalPage} from "../total-modal/total-modal"
import {OrderService} from "../../services/order.service";

@Component({
  selector: 'page-tables',
  templateUrl: 'tables.html',
})
export class TablesPage {

  showFree:boolean = false;
  status:string;
  showAdmin:boolean = false;
  showHookah:boolean = false;
  tablesFree: object[];
  tablesHookah: object[];
  tablesAdmin: object[];
  allTables:any = [];

  showTableForAdmins:boolean = false;
  showTableForHookah:boolean = false;
  showTableForWaiters:boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public loading: LoadingController, private loadingService: LoadingService,
              public modalCtrl: ModalController,
              private orderService:OrderService) {
    this.status = this.navParams.get('status');
    this.showingStuff();
    this.tablesFree = [
        {
          name:'зал 1'
        },
        {
          name: 'зал 2'
        },
        {
          name: 'зал 3'
        },
        {
          name: 'зал 4'
        },
        {
          name: 'зал 5'
        },
        {
          name: 'зал 6'
        },
        {
          name: 'зал 7'
        },
        {
          name: 'зал 8'
        },
        {
          name: 'зал 9'
        },
        {
          name: 'зал 10'
        },
        {
          name: 'зал 11'
        },
        {
          name: 'зал 12'
        },
        {
          name: 'зал 13'
        },
        {
          name: 'зал 14'
        },
        {
          name: 'зал 15'
        },
        {
          name: 'зал 16'
        },
        {
          name: 'зал 17'
        },
        {
          name: 'зал 18'
        }];
      this.tablesHookah = [
        {
          name: 'кальян 1'
        },
        {
          name: 'кальян 2'
        },
        {
          name: 'кальян 3'
        },
        {
          name: 'кальян 4'
        },
        {
          name: 'кальян 5'
        },
        {
          name: 'кальян 6'
        },
        {
          name: 'кальян 7'
        },
        {
          name: 'кальян 8'
        },
        {
          name: 'кальян 9'
        },
        {
          name: 'кальян 10'
        },
        {
          name: 'кальян 11'
        },
        {
          name: 'кальян 12'
        },
        {
          name: 'кальян 13'
        },
        {
          name: 'кальян 14'
        },
        {
          name: 'кальян 15'
        },
        {
          name: 'кальян 16'
        },
        {
          name: 'кальян 17'
        },
        {
          name: 'кальян 18'
        }];
      this.tablesAdmin = [
        {
          name: 'Admin 1'
        },
        {
          name: 'Admin 2'
        },
        {
          name: 'Admin 3'
        },
        {
          name: 'Admin 4'
        },
        {
          name: 'Admin 5'
        }
    ];
      this.allTables = [this.tablesFree, this.tablesHookah, this.tablesAdmin];
      this.orderService.addTables(this.allTables);
    console.log('ALLTABLES', this.allTables);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TablesPage');
  }

  exit() {
    this.navCtrl.push(HomePage);
  }

  presentProfileModal() {
    let profileModal = this.modalCtrl.create(TotalModalPage);
    profileModal.present();
  }
  showingStuff(){
    if(this.status ==='admin'){
      this.showTableForAdmins =  true;
      this.showTableForWaiters = true;
      this.showTableForHookah = true;
    } else if (this.status === 'hookah'){
      this.showTableForHookah = true;
    } else if (this.status === 'waiier'){
      this.showTableForWaiters = true;
    }
  }
}
