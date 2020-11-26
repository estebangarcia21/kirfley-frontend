import Link from 'next/link';
import styles from '../styles/footer.module.css';

const Footer = () => {
  return (
    <div id={styles.container}>
      <footer id={styles.footer}>
        <ul className={styles.column}>
          <li>About</li>
          <li title='About the company behind Fern'>
            <Link href='/support'>Company</Link>
          </li>
        </ul>
        <ul className={styles.column}>
          <li>Support</li>
          <li title='Get help with any problems'>
            <Link href='/'>Contact Us</Link>
          </li>
        </ul>
        <ul className={styles.column}>
          <li>Legal</li>
          <li title="Fern's privacy policy">
            <Link href='/'>Privacy Policy</Link>
          </li>
          <li title='How we use cookies'>
            <Link href='/'>Cookies</Link>
          </li>
          <li id={styles.copyright}>&copy; Fern {new Date().getFullYear()}</li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;