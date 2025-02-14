import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchContracts, addContract, /* getClientById, getDeveloperById, */ deleteContract } from './contractsApi';

// Асинхронное действие для получения списка договоров
export const fetchContractsData = createAsyncThunk('contracts/fetch', async (_, { getState }) => {
  const contracts = await fetchContracts(getState);
  const clients = getState().clients.list;
  const developers = getState().developers.list;

  const enrichedContracts = contracts.map((contract) => ({
    ...contract,
    client: clients.find((c) => c._id === contract.client)?.name || 'Неизвестный клиент',
    developer: developers.find((d) => d._id === contract.developer)?.name || 'Неизвестный разработчик',
  }));

  return enrichedContracts;
});

// Асинхронное действие для добавления нового договора
export const addContractData = createAsyncThunk('contracts/add', async (newContract, { getState }) => {
  const addedContract = await addContract(newContract, getState);
  return addedContract;
});

// Асинхронное действие для удаления договора
export const deleteContractData = createAsyncThunk('contracts/delete', async (contractId, { getState }) => {
  await deleteContract(contractId, getState);
  return contractId;
});

const contractsSlice = createSlice({
  name: 'contracts',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContractsData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContractsData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchContractsData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Произошла ошибка при загрузке списка договоров';
      })
      .addCase(addContractData.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(addContractData.rejected, (state, action) => {
        state.error = action.error.message || 'Произошла ошибка при добавлении договора';
      })
      .addCase(deleteContractData.fulfilled, (state, action) => {
        state.list = state.list.filter((contract) => contract._id !== action.payload);
      })
      .addCase(deleteContractData.rejected, (state, action) => {
        state.error = action.error.message || 'Произошла ошибка при удалении договора';
      });
  },
});

export default contractsSlice.reducer;