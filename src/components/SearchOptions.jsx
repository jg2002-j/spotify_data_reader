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
  searchDate,
  setSearchDate,
}) {
  // filters
  const toggleSkippedFilter = () => {
    setFilterSkippedSongs((filterSkippedSongs) => !filterSkippedSongs);
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
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
      <SearchDate searchDate={searchDate} setSearchDate={setSearchDate} />
    </div>
  );
}
