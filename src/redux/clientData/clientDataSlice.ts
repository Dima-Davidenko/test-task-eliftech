import { createSlice } from '@reduxjs/toolkit';
import { clientData } from '../../types/types';

const initialState: clientData = {
  contacts: {
    name: '',
    email: '',
    phone: '',
    address: '',
    selectedAddress: '',
    selectedMarkerPosition: null,
  },
};

const clientDataSlice = createSlice({
  name: 'clientData',
  initialState,
  reducers: {
    updateClientName: (state, { payload }: { payload: string }) => {
      return { contacts: { ...state.contacts, name: payload } };
    },
    updateClientEmail: (state, { payload }: { payload: string }) => {
      return { contacts: { ...state.contacts, email: payload } };
    },
    updateClientPhone: (state, { payload }: { payload: string }) => {
      return { contacts: { ...state.contacts, phone: payload } };
    },
    updateClientAddress: (state, { payload }: { payload: string }) => {
      return { contacts: { ...state.contacts, address: payload } };
    },
    updateSelectedAddress: (state, { payload }: { payload: string }) => {
      return { contacts: { ...state.contacts, selectedAddress: payload } };
    },
    updateSelectedMarkerPosition: (
      state,
      { payload }: { payload: google.maps.LatLngLiteral | null }
    ) => {
      return { contacts: { ...state.contacts, selectedMarkerPosition: payload } };
    },
    resetClientData: () => initialState,
  },
});

export const {
  updateClientName,
  updateClientAddress,
  updateClientEmail,
  updateClientPhone,
  resetClientData,
  updateSelectedAddress,
  updateSelectedMarkerPosition,
} = clientDataSlice.actions;

export const clientDataReducer = clientDataSlice.reducer;
