import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace mintips.kelompok05.miti{
   export class Packet extends Asset {
      id: string;
      status: string;
      name: string;
      weight: number;
      length: number;
      width: number;
      height: number;
      checkpoint: Checkpoint;
      sender: Person;
      receiver: Person;
   }
   export class Person extends Participant {
      username: string;
      firstName: string;
      lastName: string;
   }
   export class Checkpoint extends Participant {
      id: string;
      name: string;
      location: string;
   }
   export class Ship extends Transaction {
      packet: Packet;
      newCheckpoint: Checkpoint;
      newStatus: string;
   }
// }
