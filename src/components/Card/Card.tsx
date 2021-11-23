import classes from './Card.module.css';

export interface CardProps {
  children: any;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return <div className={classes.card}>{children}</div>;
};

export default Card;
