import Layout from "@/components/Layout";
import { useGetCountryByIdQuery } from "@/graphql/generated/schema";
import { useRouter } from "next/router";
import { useEffect } from "react";

export type Continent = {
  name: string;
};

export type CountryDetail = {
  id: number;
  name: string;
  code: string;
  emoji: string;
  continent: Continent;
};

export default function CountryDetails() {
  const router = useRouter();
  const { countryId } = router.query;

  const countryCode = Array.isArray(countryId) ? countryId[0] : countryId;

  const { data, loading, error, refetch } = useGetCountryByIdQuery({
    variables: {
      code: countryCode || "",
    },
    skip: typeof countryId === "undefined",
  });

  useEffect(() => {
    refetch();
  }, []);

  const country = data?.country;

  return (
    <div>
      <Layout title="Checkpoint - Frontend">
        {data && country && (
          <div>
            <h1>{country.name}</h1>
            <p>Code: {country.code}</p>
            <p>Emoji: {country.emoji}</p>
            {data.country.continent && (
              <p>Continent: {data.country.continent.name}</p>
            )}
          </div>
        )}
      </Layout>
    </div>
  );
}
