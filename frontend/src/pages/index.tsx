import Layout from "@/components/Layout";
import RecentCountries from "@/components/RecentCountries";
import AddCountry from "@/components/AddCountry";

export default function Home() {
  return (
    <Layout title="Checkpoint - Frontend">
      <AddCountry />
      <RecentCountries />
    </Layout>
  );
}
