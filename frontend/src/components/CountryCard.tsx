import Link from "next/link";

type Country = {
  id: number;
  emoji: string;
  name: string;
};

type CountryCardProps = {
  country: Country;
  link: string;
};
export default function CountryCard({
  country: { name, emoji },
  link,
}: CountryCardProps) {
  return (
    <div>
      <Link href={link}>
        <div className="country-card">
          <div className="country-card-emoji">{emoji}</div>
          <div className="country-card-name">{name}</div>
        </div>
      </Link>
    </div>
  );
}
