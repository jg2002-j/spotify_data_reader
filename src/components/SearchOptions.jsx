import Filters from "./SearchOptions/Filters";
import LoadLimit from "./SearchOptions/LoadLimit";
import SearchArtistAlbumTitle from "./SearchOptions/SearchArtistAlbumTitle";
import SearchDate from "./SearchOptions/SearchDate";

export default function SearchOptions({
  filters,
  filterSkippedSongs,
  setFilterSkippedSongs,
  loadLimit,
  setLoadLimit,
  searchGeneric,
  setSearchGeneric,
}) {
  // filters
  const toggleSkippedFilter = () => {
    setFilterSkippedSongs((filterSkippedSongs) => !filterSkippedSongs);
  };

  return (
    <div className="flex gap-3 flex-wrap">
      <Filters
        filters={filters}
        toggleSkippedFilter={toggleSkippedFilter}
        timeFilter={filterSkippedSongs}
      />
      <LoadLimit loadLimit={loadLimit} setLoadLimit={setLoadLimit} />
      <SearchArtistAlbumTitle
        searchGeneric={searchGeneric}
        setSearchGeneric={setSearchGeneric}
      />
      <SearchDate />
    </div>
  );
}
