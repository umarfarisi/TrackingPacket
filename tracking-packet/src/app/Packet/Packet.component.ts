/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PacketService } from './Packet.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-packet',
  templateUrl: './Packet.component.html',
  styleUrls: ['./Packet.component.css'],
  providers: [PacketService]
})
export class PacketComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  id = new FormControl('', Validators.required);
  status = new FormControl('', Validators.required);
  name = new FormControl('', Validators.required);
  weight = new FormControl('', Validators.required);
  length = new FormControl('', Validators.required);
  width = new FormControl('', Validators.required);
  height = new FormControl('', Validators.required);
  checkpoint = new FormControl('', Validators.required);
  sender = new FormControl('', Validators.required);
  receiver = new FormControl('', Validators.required);

  constructor(private servicePacket: PacketService, fb: FormBuilder) {
    this.myForm = fb.group({
      id: this.id,
      status: this.status,
      name: this.name,
      weight: this.weight,
      length: this.length,
      width: this.width,
      height: this.height,
      checkpoint: this.checkpoint,
      sender: this.sender,
      receiver: this.receiver
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.servicePacket.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'mintips.kelompok05.miti.Packet',
      'id': this.id.value,
      'status': this.status.value,
      'name': this.name.value,
      'weight': this.weight.value,
      'length': this.length.value,
      'width': this.width.value,
      'height': this.height.value,
      'checkpoint': this.checkpoint.value,
      'sender': this.sender.value,
      'receiver': this.receiver.value
    };

    this.myForm.setValue({
      'id': null,
      'status': null,
      'name': null,
      'weight': null,
      'length': null,
      'width': null,
      'height': null,
      'checkpoint': null,
      'sender': null,
      'receiver': null
    });

    return this.servicePacket.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'id': null,
        'status': null,
        'name': null,
        'weight': null,
        'length': null,
        'width': null,
        'height': null,
        'checkpoint': null,
        'sender': null,
        'receiver': null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'mintips.kelompok05.miti.Packet',
      'status': this.status.value,
      'name': this.name.value,
      'weight': this.weight.value,
      'length': this.length.value,
      'width': this.width.value,
      'height': this.height.value,
      'checkpoint': this.checkpoint.value,
      'sender': this.sender.value,
      'receiver': this.receiver.value
    };

    return this.servicePacket.updateAsset(form.get('id').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.servicePacket.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.servicePacket.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'id': null,
        'status': null,
        'name': null,
        'weight': null,
        'length': null,
        'width': null,
        'height': null,
        'checkpoint': null,
        'sender': null,
        'receiver': null
      };

      if (result.id) {
        formObject.id = result.id;
      } else {
        formObject.id = null;
      }

      if (result.status) {
        formObject.status = result.status;
      } else {
        formObject.status = null;
      }

      if (result.name) {
        formObject.name = result.name;
      } else {
        formObject.name = null;
      }

      if (result.weight) {
        formObject.weight = result.weight;
      } else {
        formObject.weight = null;
      }

      if (result.length) {
        formObject.length = result.length;
      } else {
        formObject.length = null;
      }

      if (result.width) {
        formObject.width = result.width;
      } else {
        formObject.width = null;
      }

      if (result.height) {
        formObject.height = result.height;
      } else {
        formObject.height = null;
      }

      if (result.checkpoint) {
        formObject.checkpoint = result.checkpoint;
      } else {
        formObject.checkpoint = null;
      }

      if (result.sender) {
        formObject.sender = result.sender;
      } else {
        formObject.sender = null;
      }

      if (result.receiver) {
        formObject.receiver = result.receiver;
      } else {
        formObject.receiver = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'id': null,
      'status': null,
      'name': null,
      'weight': null,
      'length': null,
      'width': null,
      'height': null,
      'checkpoint': null,
      'sender': null,
      'receiver': null
      });
  }

}
