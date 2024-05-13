import CountryCard from "@/components/CountryCard";
import Layout from "@/components/Layout";
import { useCountriesQuery } from "@/graphql/generated/schema";
import { useEffect } from "react";

export default function RecentCountries() {
  const { data, loading, refetch } = useCountriesQuery();

  useEffect(() => {
    refetch();
  }, []);

  if (loading) return "Chargement...";

  const countries = data?.countries || [];

  return (
    <div className="countries-list">
      {countries.map((country) => (
        <CountryCard
          key={country.id}
          country={country}
          link={`/countries/${country.code}`}
        />
      ))}
    </div>
  );
}
