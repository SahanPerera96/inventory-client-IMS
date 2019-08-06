import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http'
import { reject } from 'q';
import { Batch } from '../model/batch.model';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class StockServiceService {

  batchDetails : Batch;
  batchList : Batch[];

  constructor(private http:HttpClient,  private toastr: ToastrService) { }
  readonly Default_URL ='http://localhost:8080';

  postBatchDetails(batchDetails : Batch){
    return this.http.post(this.Default_URL+ '/stock/batch',batchDetails)
  }

  getAllBatchDetails(){
    return this.http.get(this.Default_URL+ '/stock/batch')
  }

  RefreshBatchDetails(type : string){
    return new Promise((resolve , reject) => {
      let response;
      this.http.get(this.Default_URL+'/stock/batch').subscribe(res => {
              resolve(res);
              response = res
              this.batchList = response.batches as Batch[];
          },
          err => {
              reject(err);
              if(type != "first"){
                this.toastr.error(err.error.message, err.error.status);
            
              }
              this.batchList = null as Batch[];
              
          });
      });
  }

  putBatchDetails(batchDetails : Batch){
    return this.http.put(this.Default_URL +'/stock/batch/'+ batchDetails.id ,batchDetails)
  }

  deleteBatchDetails(id : number){
    return this.http.delete(this.Default_URL +'/stock/batch/'+ id )
  }

  postImage(string){
    return this.http.post(this.Default_URL+ '/stock/uploadImage',string)
  }

}
