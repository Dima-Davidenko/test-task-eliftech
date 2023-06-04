import { RootState } from '../store';

export const selectClientName = (s: RootState) => {
  return s.clientData.contacts.name;
};

export const selectClientEmail = (s: RootState) => {
  return s.clientData.contacts.email;
};

export const selectClientPhone = (s: RootState) => {
  return s.clientData.contacts.phone;
};

export const selectClientAddress = (s: RootState) => {
  return s.clientData.contacts.address;
};
