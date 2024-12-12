import { ExploreCategoryItems } from "./_components/explore-category-items";

type Props = {
  params: Promise<{ category: string }>;
};
const ExploreCategory = async ({ params }: Props) => {
  const { category } = await params;
  return (
    <div>
      <ExploreCategoryItems category={category} />
    </div>
  );
};

export default ExploreCategory;
