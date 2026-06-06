"use client";

import React from "react";
import { EmptyFavourite } from "./empty-favourite";
import { EmptySearch } from "../empty-search";
import { EmptyBoard } from "./empty-board";
interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favourites?: string;
  };
}

export const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = []; // Placeholder for your future Convex database query

  if (!data?.length && query.search) {
    return
      <EmptySearch/>
  }
    if (!data?.length && query.favourite) {
    return
      <EmptyFavourite/>
  }
    if (!data?.length ) {
    return <EmptyBoard/>
  }

  return (
    <div>
      <h2>Board List for Organization: {orgId}</h2>
      {/* We will map over the actual boards here later */}
    </div>
  );
};