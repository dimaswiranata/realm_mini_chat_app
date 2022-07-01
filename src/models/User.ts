import {Realm} from '@realm/react';

export class User extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  createdAt!: Date;
  name!: string;
  roomId!: string;
  bgAvatar!: string;

  static generate(name: string) {
    return {
      _id: new Realm.BSON.ObjectId(),
      createdAt: new Date(),
      name,
      roomId: Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1),
      bgAvatar: Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0'),
    };
  }

  static schema = {
    name: 'User',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      createdAt: 'date',
      name: 'string',
      roomId: 'string',
      bgAvatar: 'string',
    },
  };
}
