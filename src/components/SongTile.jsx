import { useEffect, useState, Suspense } from "react";
import { useImage } from "react-image";
import { Button } from "@headlessui/react";
import {
  User,
  DiscAlbum,
  RectangleEllipsis,
  Shuffle,
  SkipForward,
} from "lucide-react";

export default function SongTile({ item, setSearchGeneric }) {
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

  return (
    <div className="w-full p-5 bg-stone-900/10 dark:bg-stone-300/10 rounded-md flex items-center gap-5 group">
      <div className="w-24 min-w-24 aspect-square group-hover:min-w-28 duration-300 transition-all rounded overflow-hidden">
        <Suspense
          fallback={
            <h2 className="text-stone-600 font-extrabold">Loading...</h2>
          }
        >
          <AlbumCover thumbnail_url={thumbnailURL} />
        </Suspense>
      </div>
      <div className="flex flex-col gap-2 w-full overflow-hidden">
        <Button
          onClick={(e) => setSearchGeneric(e.target.textContent)}
          className="text-start text-xl font-bold truncate"
        >
          {item.master_metadata_track_name}
        </Button>
        <div className="flex flex-col items-start gap-2">
          <div className="flex gap-2 items-center justify-start w-full overflow-hidden">
            <div className="default p-1">
              <DiscAlbum className="size-4" />
            </div>
            <Button
              onClick={(e) => setSearchGeneric(e.target.textContent)}
              className="default px-2 py-1 text-start truncate"
            >
              {item.master_metadata_album_album_name}
            </Button>
          </div>
          <div className="flex gap-2 items-center justify-start w-full overflow-hidden">
            <div className="default p-1">
              <User className="size-4" />
            </div>
            <Button
              onClick={(e) => setSearchGeneric(e.target.textContent)}
              className="default px-2 py-1 text-start truncate"
            >
              {item.master_metadata_album_artist_name}
            </Button>
          </div>
          <div className="flex items-center justify-start gap-2">
            <div className="default p-1">
              <RectangleEllipsis className="size-4" />
            </div>
            <p className="default px-2 py-1 text-star flex gap-2 items-center">
              {parseDate(item.ts)}
            </p>
            <p className="default px-2 py-1 text-star flex gap-2 items-center">
              {parseMs(item.ms_played)}
            </p>
            {item.shuffle && (
              <div className="default p-1">
                <Shuffle className="size-3" />
              </div>
            )}
            {item.skipped && (
              <div className="default p-1">
                <SkipForward className="size-3" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
