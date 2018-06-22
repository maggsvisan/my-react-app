import firebase from 'firebase';
import 'firebase/database';

import { DB_CONFIG } from "./config";

export default firebase.initializeApp(DB_CONFIG);