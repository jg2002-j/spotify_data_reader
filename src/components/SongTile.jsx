import { useEffect, useState, Suspense } from "react";
import { useImage } from "react-image";

export default function SongTile({ item }) {
  const fetch_url = `https://open.spotify.com/oembed?url=${item.spotify_track_uri}`;

  const AlbumCover = ({ thumbnail_url }) => {
    const fallbackImg = "../Primary_Logo_Black_RGB.svg";
    const imageSrc = thumbnail_url;
    const { src } = useImage({
      srcList: [imageSrc, fallbackImg],
    });

    return <img alt="Album artwork" src={src} />;
  };

  const [thumbnailURL, setThumbnailURL] = useState(null);

  useEffect(() => {
    const fetchAlbumArt = async () => {
      try {
        const response = await fetch(fetch_url);
        const data = await response.json();
        setThumbnailURL(data.thumbnail_url);
      } catch (err) {
        console.error("Error fetching album artwork: ", err);
      }
    };
    fetchAlbumArt();
  }, [fetch_url]);

  const parseDate = (input) => {
    const date = new Date(input);
    return date.toLocaleDateString();
  };

  const parseMs = (input) => {
    const minutes = Math.floor(input / 60000);
    const seconds = Math.floor((input % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const returnShuffleIcon = (shuffled) => {
    if (shuffled) {
      return (
        <div className="padded">
          <svg
            className="w-4 h-4 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M13.484 9.166 15 7h5m0 0-3-3m3 3-3 3M4 17h4l1.577-2.253M4 7h4l7 10h5m0 0-3 3m3-3-3-3"
            />
          </svg>
        </div>
      );
    }
  };

  const returnSkipIcon = (skipped) => {
    if (skipped) {
      return (
        <div className="padded">
          <svg
            className="w-4 h-4 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M16 6v12M8 6v12l8-6-8-6Z"
            />
          </svg>
        </div>
      );
    }
  };

  return (
    <div className="w-full p-5 bg-stone-900/10 dark:bg-stone-300/10 rounded-md flex items-center gap-5 group">
      <div className="h-24 w-24 aspect-square group-[hover]:h-32 group-[hover]:w-32 duration-300 transition-all rounded overflow-hidden">
        <Suspense
          fallback={
            <h2 className="text-stone-600 font-extrabold">Loading...</h2>
          }
        >
          <AlbumCover thumbnail_url={thumbnailURL} />
        </Suspense>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold w-56 truncate text-ellipsis">
          {item.master_metadata_track_name}
        </h2>
        <div className="flex items-center gap-5">
          <p className="padded">{item.master_metadata_album_album_name}</p>{" "}
          <p className="padded">{item.master_metadata_album_artist_name}</p>
        </div>
        <div className="flex items-center gap-5">
          <p className="padded">{parseDate(item.ts)}</p>
          <p className="padded">{parseMs(item.ms_played)}</p>
        </div>
        <div className="flex gap-2">
          {returnShuffleIcon(item.shuffle)}
          {returnSkipIcon(item.skipped)}
        </div>
      </div>
    </div>
  );
}
