import { ENDPOINT } from "../common/endPoint";
import ContentRow from "../components/ContentRow";


const Browse = () => {

  return (
    <section>
      <section>Banner Image</section>
      <ContentRow endPoint={ENDPOINT.MOVIES_POPULAR} title=" Popular"  />
      <ContentRow endPoint={ENDPOINT.TOP_RATED} title="Top Rated"  />
      <ContentRow endPoint={ENDPOINT.NOW_PLAYING} title="Now Playing"  />
    </section>
  );
};

export default Browse;
