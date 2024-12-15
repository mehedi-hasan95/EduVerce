import { Card } from "@/components/ui/card";

export const LeaderBoard = () => {
  return (
    <Card className="border-themeGray lg:sticky lg:top-5 mt-10 lg:mt-0 rounded-xl p-5 overflow-hidden">
      <h2 className="text-themeTextWhite text-xl font-bold">
        Leaderboard (30-days)
      </h2>
      <p className="text-themeTextGray text-sm">
        See who performed the best this month.
      </p>
    </Card>
  );
};
