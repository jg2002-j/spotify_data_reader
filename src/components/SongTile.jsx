/* eslint-disable react/prop-types */
// import React from "react";

export default function SongTile({ item }) {
  return (
    <div className="p-5 bg-stone-900/10 dark:bg-stone-300/10 rounded-md flex flex-col gap-2">
      <h2 className="text-xl font-bold">{item.master_metadata_track_name}</h2>
      <div className="flex justify-between gap-5">
        <p>{item.master_metadata_album_album_name}</p>{" "}
        <p>{item.master_metadata_album_artist_name}</p>
      </div>
      <div className="flex items-center gap-2">
        <h2>Timestamp</h2>
        <p>{item.ts}</p>
      </div>
      <div className="flex items-center gap-2">
        <h2>Duration Streamed</h2>
        <p>{item.ms_played / 1000}s</p>
      </div>
      <div className="flex gap-2">
        <p>{item.shuffle ? "shuffled" : ""}</p>
        <p>{item.skipped ? "skipped" : ""}</p>
      </div>
    </div>
  );
}
