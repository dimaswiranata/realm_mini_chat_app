import {createRealmContext} from '@realm/react';
import {User} from './User';
import {Room} from './Room';

export const {useRealm, useQuery, RealmProvider} = createRealmContext({
  schema: [User, Room],
  deleteRealmIfMigrationNeeded: true,
});
