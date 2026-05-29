import React from 'react';

interface UserIdTypeProps {
  params: {
    userId: string;
  };
}

export default function Page({ params }: UserIdTypeProps) {
  return (
    <div>
      {params.userId}
    </div>
  );
}