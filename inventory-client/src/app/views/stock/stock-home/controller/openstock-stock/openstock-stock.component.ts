import { Component, OnInit } from '@angular/core';

import { reject } from 'q';
import { ToastrService } from 'ngx-toastr';
import { StockServiceService } from 'src/app/views/stock/stock-home/service/stock-service.service';
import { Batch } from 'src/app/views/stock/stock-home/model/batch.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-openstock-stock',
  templateUrl: './openstock-stock.component.html',
  styleUrls: ['./openstock-stock.component.css']
})
export class OpenstockStockComponent implements OnInit {
  imageUrl: string = "/assets/img/default-image.png";
  imageUrl2: string = "/assets/img/default-image.png";
  fileToUpload: File = null;
  constructor(private service: StockServiceService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  OnSubmitImage(Image){

    // getBase64();
    let payload = {
      // "id": 1,
      "string": this.getBase64()
    }
    console.log(payload);
    
    this.insertBatch(payload);
    
   
  }
  getBase64() {
    let me = this;
    let file = this.fileToUpload;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      //me.modelvalue = reader.result;
      console.log(reader.result);
      // dataURItoBlob(reader.result)
      return reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
      return null;
    };
  }
  insertBatch(payload, ) {
    let response;
    this.service.postImage(payload).subscribe(res => {
      
      response = res;
      console.log(response);
      // this.toastr.success(response.message, response.status);
      // this.service.RefreshBatchDetails("second");

    },
      err => {
        reject(err)
        // this.toastr.error(err.error.message, err.error.status);
                console.log(err);
      });
  }
   

}

// function getBase64() {
//   let me = this;
//   let file = this.fileToUpload;
//   let reader = new FileReader();
//   reader.readAsDataURL(file);
//   reader.onload = function () {
//     //me.modelvalue = reader.result;
//     console.log(reader.result);
//     dataURItoBlob(reader.result)
//     return reader.result;
//   };
//   reader.onerror = function (error) {
//     console.log('Error: ', error);
//     return null;
//   };
// }
function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  var arrayBuffer = new ArrayBuffer(byteString.length);
  var _ia = new Uint8Array(arrayBuffer);
  for (var i = 0; i < byteString.length; i++) {
      _ia[i] = byteString.charCodeAt(i);
  }

  var dataView = new DataView(arrayBuffer);
  var blob = new Blob([dataView], { type: mimeString });
  console.log(dataView)

  return blob;
}
