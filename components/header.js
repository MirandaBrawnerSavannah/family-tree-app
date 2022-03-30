import Link from 'next/link'

const Header = () => (
  <header>
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/about">
          <a>About</a>
        </Link>
      </li>
      <li>
        <Link href="/locale/first">
          <a>First Locale</a>
        </Link>
      </li>
      <li>
        <Link href="/locale/second">
          <a>Second Locale</a>
        </Link>
      </li>
    </ul>
  </header>
)

export default Header