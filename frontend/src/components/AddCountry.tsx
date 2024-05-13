import {
  useAddCountryMutation,
  useCountriesQuery,
  useGetContinentsQuery,
} from "@/graphql/generated/schema";
import { useRouter } from "next/router";
import { FormEvent } from "react";

export default function AddCountry() {
  const [addCountry] = useAddCountryMutation();
  const router = useRouter();
  const { data } = useGetContinentsQuery();
  const continents = data?.continents || [];
  const { refetch: refetchCountries } = useCountriesQuery();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    formJSON.continent = { id: parseInt(formJSON.continent) };
    try {
      await addCountry({
        variables: { data: { ...formJSON } },
        onCompleted: async () => {
          await refetchCountries();
          await router.push("/");
        },
      });
    } catch (error) {
      console.error("Une erreur est survenue:", error);
    }
  };

  return (
    <>
      <form className="form" method="dialog" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            placeholder="France"
            type="text"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="emoji">Emoji</label>
          <input
            id="emoji"
            name="emoji"
            placeholder="🇫🇷"
            type="text"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="code">Code</label>
          <input id="code" name="code" placeholder="FR" type="text" required />
        </div>

        <div className="form-field">
          <label className="label" htmlFor="continent">
            <span className="label-text">Catégorie</span>
          </label>
          <select id="continent" name="continent" required>
            {continents.map((continent) => (
              <option key={continent.id} value={continent.id}>
                {continent.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Enregistrer</button>
      </form>
    </>
  );
}
