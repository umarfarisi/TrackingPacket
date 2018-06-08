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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { PacketComponent } from './Packet/Packet.component';

import { PersonComponent } from './Person/Person.component';
import { CheckpointComponent } from './Checkpoint/Checkpoint.component';

import { ShipComponent } from './Ship/Ship.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Packet', component: PacketComponent },
  { path: 'Person', component: PersonComponent },
  { path: 'Checkpoint', component: CheckpointComponent },
  { path: 'Ship', component: ShipComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
