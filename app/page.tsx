import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
         Test app to send emails with Resend!
        </p>
      </div>
    </main>
  )
}
