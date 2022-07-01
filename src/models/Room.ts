import {Realm} from '@realm/react';

export class Room extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  createdAt!: Date;
  message!: string;
  type!: string; // '1' : String, '2' : Image
  owner!: string; // 'U' : User, 'S' : Server
  roomId!: string; // Unique value

  static generate(
    message: string,
    type: string,
    owner: string,
    roomId: string,
  ) {
    return {
      _id: new Realm.BSON.ObjectId(),
      createdAt: new Date(),
      message,
      type,
      owner,
      roomId,
    };
  }

  static schema = {
    name: 'Room',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      createdAt: 'date',
      message: 'string',
      type: 'string',
      owner: 'string',
      roomId: 'string',
    },
  };
}
