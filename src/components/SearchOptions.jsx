import Filters from "./SearchOptions/Filters";
import LoadLimit from "./SearchOptions/LoadLimit";
import SearchArtistAlbumTitle from "./SearchOptions/SearchArtistAlbumTitle";
import SearchDate from "./SearchOptions/SearchDate";

export default function SearchOptions({
  filters,
  toggleSkippedFilter,
  filterSkippedSongs,
  loadLimit,
  setLoadLimit,
}) {
  return (
    <div className="flex gap-5 flex-wrap">
      <Filters
        filters={filters}
        toggleSkippedFilter={toggleSkippedFilter}
        timeFilter={filterSkippedSongs}
      />
      <LoadLimit loadLimit={loadLimit} setLoadLimit={setLoadLimit} />
      <SearchArtistAlbumTitle />
      <SearchDate />
    </div>
  );
}
