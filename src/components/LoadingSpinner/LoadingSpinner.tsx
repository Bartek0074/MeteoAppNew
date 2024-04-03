import styles from './LoadingSpinner.module.scss';
import classNames from 'classnames';

type Props = { text?: string };

export default function LoadingSpinner({ text = 'Loading...' }: Props) {
	const spinerOneClassees = classNames(styles.spinner, styles.spinnerOne);
	const spinerTwoClassees = classNames(styles.spinner, styles.spinnerTwo);
	const spinerThreeClassees = classNames(styles.spinner, styles.spinnerThree);

	return (
		<div className={styles.loadingSpinner}>
			<span className={spinerOneClassees}></span>
			<span className={spinerTwoClassees}></span>
			<span className={spinerThreeClassees}></span>
			<span className={styles.text}>{text}</span>
		</div>
	);
}
