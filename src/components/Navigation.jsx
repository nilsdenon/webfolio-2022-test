import Link from "next/link";

export const Navigation = ({ data }) => {
  return (
    <nav>
      {data.map((item) => (
        <Link href={item.slug} key={item.id}>
          <a>{item.label}</a>
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
