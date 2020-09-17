import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  displayedColumns: string[] = ['id', 'albumId', 'picture', 'title', 'actions'];
  dataSource : any;
  pageSize: number;
  pageIndex : number;
  pageLength : number;
  constructor(private appService : AppService){}

  ngOnInit() {
    this.pageSize = 5;
    this.pageIndex = 0;
    this.dataSource = new MatTableDataSource();     //initialize mat-table source for row data
    this.getAllData();
    this.dataSource.paginator = this.paginator;
  }

  getAllData() {
    let photos = JSON.parse(sessionStorage.getItem('photosData'));
    if(photos && photos.length>0){
      this.appService.photosData = photos;
      this.getData({
        pageSize: this.pageSize,
        pageIndex: this.pageIndex
      });
    } else {
      this.appService.getPhotos(this.pageIndex).subscribe((data) => {
        this.appService.photosData = data;
        sessionStorage.setItem('photosData', JSON.stringify(data));
        this.getData({
          pageSize: this.pageSize,
          pageIndex: this.pageIndex
        });
     });
    }
  }

  getData(event) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    let index = event.pageIndex * event.pageSize;
    this.dataSource.data =this.appService.photosData.slice(index, this.pageSize + index );
    this.pageLength = this.appService.photosData.length;
  }

  deleteItem(item) {
    let indexOfItem = this.appService.photosData.findIndex(e => e.id === item.id);
    if(indexOfItem > -1) {
      this.appService.photosData.splice(indexOfItem, 1);
      this.getData({
        pageSize: this.pageSize,
        pageIndex: this.pageIndex
      });
    }
  }
}

