import styles from './DailyStocks.module.scss';

export const DailyStocks = ({ name }) => {
  return (
    <div className={styles.flexBetween}>
      <p className={styles.accordionContent}>{name}</p>
    </div>
  );
};