import styles from './Loader.module.css';

interface LoaderProps {
  size?: 'large';
  className?: string;
}

export default function Loader({
  size = 'large',
  className = '',
}: LoaderProps) {
  return (
    <div
      className={`${styles.loaderWrapper} ${className}`}
      role="status"
      aria-label="Завантаження"
    >
      <span className={`${styles.spinner} ${styles[size]}`} />{' '}
    </div>
  );
}
