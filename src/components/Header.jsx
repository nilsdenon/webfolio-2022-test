import Navigation from "./Navigation";
import Link from "next/link";
export const Header = (data) => {
  return (
    <header>
      {/* {data.map((item) => (
        <Link href={item.slug} key={item.id}>
          <a>{item.label}</a>
        </Link>
      ))} */}
    </header>
  );
};

export default Header;
