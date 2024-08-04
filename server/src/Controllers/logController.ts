import Logs from '@Models/logModel';
import { getAll, getOne, updateOne, deleteOne, createOne } from './handlerFactory';

export const getAllLogs = getAll(Logs);
export const getLog = getOne(Logs);
export const createLog = createOne(Logs);
export const updateLog = updateOne(Logs);
export const deleteLog = deleteOne(Logs);
