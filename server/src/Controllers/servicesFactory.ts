/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import { Model, Query } from 'mongoose';
import { IPopulateOptions } from '@Interfaces/common';
import AppError from '@Utils/AppError';
import APIFeatures from '@Utils/ApiFeatures';
import { StatusCodes } from 'http-status-codes';

export const getAll = async <T>(
  Model: Model<T>,
  req: Request,
  populateOptions?: IPopulateOptions
) => {
  const features = new APIFeatures(Model.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  if (populateOptions) features.query = features.query.populate(populateOptions);

  const doc: T[] = await features.query;

  return doc;
};

export const getOne = async <T>(
  Model: Model<T>,
  req: Request,
  populateOptions?: IPopulateOptions
) => {
  let query: Query<any, T> = Model.findById(req.params.id);
  if (populateOptions)
    (query as Query<T[], T, object, T, 'find'>) = query.populate(populateOptions);

  const doc: T = await query;
  if (!doc) throw new AppError('Record not found', StatusCodes.NOT_FOUND);

  return doc;
};

export const createOne = async <T>(
  Model: Model<T>,
  req: any,
  populateOptions?: IPopulateOptions
) => {
  let doc: T = await Model.create(req.body);

  if (populateOptions) {
    doc = await getOne(Model, req, populateOptions);
  }

  return doc;
};

export const updateOne = async <T>(
  Model: Model<T>,
  req: Request,
  populateOptions?: IPopulateOptions
) => {
  delete req.body._id;
  delete req.body.id;

  const document = await Model.findById(req.params.id);
  if (!document) throw new AppError('Record not found', StatusCodes.NOT_FOUND);

  let query = Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (populateOptions) query = query.populate(populateOptions);

  const doc = await query;

  return doc;
};

export const bulkUpdate = async <T>(Model: Model<T>, req: Request) => {
  const queries = [];

  for (let i = 0; i < req.body.length; i++) {
    const row = structuredClone(req.body[i]);
    delete row.id;

    queries.push(
      Model.findByIdAndUpdate(req.body[i].id, row, {
        new: true,
        runValidators: true,
      })
    );
  }

  const docs = await Promise.all(queries);

  return docs;
};

export const deleteOne = async <T>(Model: Model<T>, req: Request) => {
  const doc = await Model.findByIdAndDelete(req.params.id);
  if (!doc) throw new AppError('Record not found', StatusCodes.NOT_FOUND);

  return null;
};

export const deleteMany = async <T>(Model: Model<T>) => {
  const docs = await Model.deleteMany();
  if (!docs) throw new AppError('Record not found', StatusCodes.NOT_FOUND);

  return null;
};
