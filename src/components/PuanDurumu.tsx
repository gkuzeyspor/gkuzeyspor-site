import { getLeagueData } from "@/lib/tff";
import PuanDurumuView from "@/components/PuanDurumuView";

export default async function PuanDurumu() {
  const data = await getLeagueData();
  return (
    <PuanDurumuView
      leagueLabel={data.leagueLabel}
      weekLabel={data.weekLabel}
      groupLabel={data.groupLabel}
      standings={data.standings}
      fixtures={data.fixtures}
    />
  );
}
