import classes from './Trigger.module.scss';

interface ITrigger {
  count: number;
}

export const Trigger = ({ count }: ITrigger) => {
  return (
    <main className={classes.wrapper}>
      <span>{count}</span>
    </main>
  );
};
