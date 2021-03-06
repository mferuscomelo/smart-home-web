import { Device } from './device.model';

export interface User {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName?: string;
  isAnonymous: boolean;
  phoneNumber?: string;
  photoURL?: string;
  devices: Device[];
  tokens: string[];
}
