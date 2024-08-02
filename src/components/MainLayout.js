import styles from '../../styles/MainLayout.module.scss';

export default function MainLayout({children}) {
    return (
        <div className={styles.MainLayout}>
            {children}
        </div>
    )
}