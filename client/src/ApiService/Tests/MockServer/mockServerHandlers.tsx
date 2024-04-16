import { rest } from 'msw';
import { USER_QUERY_KEY } from '@CommonConstants';

interface IGoal {
  id: string;
}
const mockData = {
  id: '1',
};

export const mockServerHandlers = [
  // User Handlers
  rest.get(`*/${USER_QUERY_KEY}`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json<IGoal[]>([mockData]))
  ),
  rest.get(`*/${USER_QUERY_KEY}/:id`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json<IGoal>(mockData))
  ),
  rest.post(`*/${USER_QUERY_KEY}`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json<IGoal>(mockData))
  ),
  rest.put(`*/${USER_QUERY_KEY}/:id`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json<IGoal>(mockData))
  ),
  rest.delete(`*/${USER_QUERY_KEY}/:id`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json<IGoal['id']>('Success deleting Goal'))
  ),
];
